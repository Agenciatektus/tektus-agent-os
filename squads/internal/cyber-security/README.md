# 🛡️ Squad Cyber Segurança (Blue Team / DevSecOps)

Equipe defensiva da Tektus. Foco: **proteger** seu produto, sites de cliente, e infraestrutura. Complementar (não duplicado) ao `cybersecurity-pool` (Red Team / Pentest) que mora em `squads/pools/cybersecurity-pool/`.

## Por que existe

Quem constrói software via "vibecoding" (sem background formal de dev) gera vulnerabilidades reais — exemplo recorrente: scripts PHP ad-hoc deixados em `wp-content/` raiz expondo tokens de gateway/API publicamente por semanas. Esta squad existe para que ESSE tipo de erro seja **bloqueado antes do deploy**, monitorado em produção, e respondido rapidamente quando algo passa.

## Composição

| Agente | Arquivo | Quando invocar |
|---|---|---|
| 🛡️ **CISO** (líder) | `ciso.md` | Estratégia, priorização de risco, autorização de pentest, comunicação de incidente |
| 🔍 **Secure Coding Reviewer** | `secure-coding-reviewer.md` | Antes de cada deploy/PR de código novo (vibecoded ou não) |
| ⚙️ **DevSecOps Engineer** | `devsecops-engineer.md` | CI/CD, secrets, deps, rotação de tokens, SAST |
| 📡 **Infra Security Monitor** | `infra-security-monitor.md` | Hardening VPS, monitoring 24/7, audit de saúde, AIOWPS WP |
| 🚨 **Incident Responder** | `incident-responder.md` | Durante incidente em curso (malware, vazamento, defacement) |

## Hierarquia

```
       CTO (@Dante_CTO)
          │
       CISO (@Iris_CISO)
          ├── @Cassio_SecRev (review de código)
          ├── @Davi_DevSecOps (CI/CD + secrets)
          ├── @Mira_InfraSec (monitoring + hardening)
          └── @Igor_IR (incidente)

  Coordena (não subordina): cybersecurity-pool (Red Team)
```

## Como invocar

A regra `.claude/rules/12-cyber-seguranca-squad.md` torna o uso desta squad **obrigatório** para pedidos que envolvem:

- Código novo ou modificado (vibecoded) — `@Cassio_SecRev` revisa antes do deploy
- Infraestrutura, deploy, secrets — `@Davi_DevSecOps` configura
- Mudanças em produção da VPS — `@Mira_InfraSec` valida saúde antes/depois
- Suspeita de incidente — `@Igor_IR` ativa playbook
- Decisão estratégica de risco / pentest agendado — `@Iris_CISO` decide

Para invocar manualmente: `@Iris_CISO, faça threat model de [feature]` ou `@Cassio_SecRev, revise este diff`.

## Recursos compartilhados

- **Best-practice principal:** [`core/best-practices/secure-coding.md`](../../../core/best-practices/secure-coding.md)
- **Runbook de IR (referência):** `<your-infra-docs>/incident-runbooks/` (ex.: recuperação de CVE pública crítica)
- **Scripts de hardening:** `<your-infra-scripts-path>/scripts/`, `<your-infra-scripts-path>/security/`
- **Doc de infra:** `<your-infra-docs>/VPS-baseline.md` (gitignored — credenciais)
- **Aprendizado contínuo:** `.learnings/LEARNINGS.md`, `.learnings/ERRORS.md`

## Princípio orientador

> Custo de prevenção é sempre menor que custo de remediação.
> Vibecoding não é desculpa para deixar webshell rodando.
> Cada incidente vira regra automática para o próximo.

## Próximos passos pendentes

- Squad de **Desenvolvimento/Engenharia** (FR-20260424-001) — complementar a esta. Foco em build/refactor/feature.
- Skill ATIVA `secure-code-review` (FR-20260424-002) — Semgrep + regras customizadas para automatizar parte do trabalho do `@Cassio_SecRev`.
- Pentest trimestral via `cybersecurity-pool` (autorizado pela CISO).
