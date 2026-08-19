# -*- coding: utf-8 -*-
"""Gera carrossel estilo tweet (Tektus) — HTMLs 1080x1440 prontos pro render Playwright.

Uso:
  python build_tweet_slides.py <slides.json> <pasta-saida> [estilo]

slides.json:
  {
    "estilo": "branco" | "papel" | "dark" | "dark-verde",   (opcional; default papel)
    "slides": ["texto do slide 1", "texto **com bold** do slide 2", ...]
  }
  - Quebra de linha no slide: usar \n\n entre blocos (vira parágrafo com respiro).
  - **texto** vira negrito. Em dark-verde, negrito sai verde neon.

Perfil (nome/handle/avatar) vem de ../perfil.json. Sem avatar.jpg -> círculo com iniciais.
Render depois:  node render-external.mjs "<pasta-saida>"   (ou npx playwright screenshot)
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SKILL_DIR = os.path.dirname(HERE)

ESTILOS = {
    # fundo, cor texto, cor handle, cor bold, card? (tweet flutua em card ou direto no fundo)
    "branco":     dict(bg="#FFFFFF", fg="#0f1419", sub="#536471", bold="#0f1419", badge="#1d9bf0"),
    "papel":      dict(bg="#ECECEC", fg="#141414", sub="#6b6b6b", bold="#141414", badge="#1d9bf0"),
    "dark":       dict(bg="#000000", fg="#e7e9ea", sub="#71767b", bold="#FFFFFF", badge="#1d9bf0"),
    "dark-verde": dict(bg="#0D100F", fg="#e7e9ea", sub="#8FA396", bold="#00FF85", badge="#00DD4B"),
}

PAGE = """<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8"><title>tweet {n:02d}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap" rel="stylesheet">
<style>
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:1080px;height:1440px;overflow:hidden;background:{bg};
  font-family:'Lato',sans-serif;-webkit-font-smoothing:antialiased}}
.slide{{position:relative;width:1080px;height:1440px;display:flex;flex-direction:column;
  align-items:stretch;justify-content:center;padding:96px 100px}}
.slide.top{{justify-content:center}}
.tweet{{width:100%}}
.head{{display:flex;align-items:center;gap:26px;margin-bottom:40px}}
.avatar{{width:110px;height:110px;border-radius:50%;object-fit:cover;flex-shrink:0}}
.avatar-fallback{{width:110px;height:110px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,#00FF85,#00DD4B);display:flex;align-items:center;justify-content:center;
  font-weight:900;font-size:44px;color:#0D100F}}
.who .nome{{display:flex;align-items:center;gap:12px;font-weight:900;font-size:40px;color:{fg}}}
.who .handle{{font-size:32px;color:{sub};margin-top:4px}}
.who .bio{{font-size:29px;color:{sub};margin-top:6px;line-height:1.3}}
.badge{{width:38px;height:38px}}
.txt{{font-size:{fs}px;line-height:1.42;color:{fg};letter-spacing:-0.2px}}
.txt p{{margin-bottom:0.85em}}
.txt p:last-child{{margin-bottom:0}}
.txt strong{{font-weight:900;color:{bold}}}
.midia{{display:block;width:100%;height:660px;object-fit:cover;border-radius:30px;
  margin-top:40px;border:1px solid {mediabd}}}
</style></head><body>
<div class="slide {slide_cls}">
  <div class="tweet">
    <div class="head">
      {avatar_html}
      <div class="who">
        <div class="nome">{nome}{badge_html}</div>
        {who_line}
      </div>
    </div>
    <div class="txt">{corpo}</div>
    {media_html}
  </div>
</div>
</body></html>
"""

BADGE_SVG = ('<svg class="badge" viewBox="0 0 24 24" fill="{badge}"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/></svg>')


def md_bold(t):
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)


def font_size(texto):
    n = len(texto)
    if n <= 120:
        return 62
    if n <= 220:
        return 54
    if n <= 340:
        return 47
    return 42


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    slides_path, out_dir = sys.argv[1], sys.argv[2]
    os.makedirs(out_dir, exist_ok=True)

    data = json.load(open(slides_path, encoding="utf-8"))
    estilo_nome = (sys.argv[3] if len(sys.argv) > 3 else data.get("estilo", "papel"))
    estilo = ESTILOS[estilo_nome]
    # borda da mídia: clara nos temas claros, translúcida nos escuros
    mediabd = "rgba(0,0,0,.12)" if estilo["bg"].upper() in ("#FFFFFF", "#ECECEC") else "rgba(255,255,255,.10)"

    # perfil: override em slides.json ("perfil": {...}) OU o perfil.json da skill
    if data.get("perfil"):
        perfil = data["perfil"]
        avatar_path = os.path.join(out_dir, perfil["avatar"]) if perfil.get("avatar") else ""
    else:
        perfil = json.load(open(os.path.join(SKILL_DIR, "perfil.json"), encoding="utf-8"))
        avatar_path = os.path.join(SKILL_DIR, perfil.get("avatar", "assets/avatar.jpg"))

    if avatar_path and os.path.exists(avatar_path):
        import shutil
        dest = os.path.join(out_dir, "avatar" + os.path.splitext(avatar_path)[1])
        if os.path.abspath(avatar_path) != os.path.abspath(dest):
            shutil.copy(avatar_path, dest)
        avatar_html = f'<img class="avatar" src="{os.path.basename(dest)}">'
    else:
        iniciais = "".join(w[0] for w in perfil["nome"].replace("@", "").split()[:2]).upper()
        avatar_html = f'<div class="avatar-fallback">{iniciais}</div>'

    badge_html = BADGE_SVG.format(badge=estilo["badge"]) if perfil.get("verificado") else ""
    bio = perfil.get("bio", "")

    for i, s in enumerate(data["slides"], start=1):
        # slide pode ser string (texto) ou objeto {"texto","midia","bio"}
        if isinstance(s, dict):
            texto, midia = s.get("texto", ""), s.get("midia")
            slide_bio = s.get("bio", bio)
        else:
            texto, midia, slide_bio = s, None, bio
        # linha sob o nome: bio (modelo marca) ou o @handle (modelo pessoal)
        who_line = (f'<div class="bio">{slide_bio}</div>' if slide_bio
                    else f'<div class="handle">{perfil["handle"]}</div>')
        media_html = f'<img class="midia" src="{midia}">' if midia else ""
        slide_cls = "top" if midia else ""
        # fonte: override explícito ("fs") > menor quando tem mídia (a foto domina) > auto
        if isinstance(s, dict) and s.get("fs"):
            fs = s["fs"]
        elif midia:
            fs = min(font_size(texto), 44)
        else:
            fs = font_size(texto)
        corpo = "".join(f"<p>{md_bold(p.strip())}</p>" for p in texto.split("\n\n") if p.strip())
        html = PAGE.format(
            n=i, fs=fs, nome=perfil["nome"], handle=perfil["handle"],
            avatar_html=avatar_html, badge_html=badge_html, corpo=corpo,
            who_line=who_line, media_html=media_html, slide_cls=slide_cls, mediabd=mediabd,
            **estilo,
        )
        name = f"tweet-{i:02d}-feed.html"
        with open(os.path.join(out_dir, name), "w", encoding="utf-8") as f:
            f.write(html)
        print("wrote", name)
    print(f"done: {len(data['slides'])} slides · estilo {estilo_nome}")


if __name__ == "__main__":
    main()
