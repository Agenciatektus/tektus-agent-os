---
description: "Como invocar a squad Cyber-Segurança (Blue Team / DevSecOps)"
globs: "**/*"
alwaysApply: true
---

# 🛡️ Squad Cyber-Segurança — Quando e Como Invocar

A squad `Cyber-Seguranca` (`squads/internal/cyber-security/`) é **OBRIGATORIAMENTE** invocada quando o pedido envolve qualquer um destes:

## Triggers obrigatórios

| Tipo de pedido | Agente que assume |
|---|---|
| Código novo ou modificado (review pré-deploy) | `@Cassio_SecRev` (secure-coding-reviewer) |
| CI/CD, configuração de pipeline, GitHub Actions | `@Davi_DevSecOps` |
| Gestão de secrets, rotação de tokens, .env | `@Davi_DevSecOps` |
| Audit de dependências (`npm audit`, `composer audit`, Dependabot) | `@Davi_DevSecOps` |
| Hardening de VPS, UFW, Fail2ban, SSH | `@Mira_InfraSec` |
| Monitoring 24/7, alertas Discord, journald | `@Mira_InfraSec` |
| Incidente em curso (malware, vazamento, defacement, ransomware) | `@Igor_IR` |
| Decisão estratégica de risco, autorização de pentest | `@Iris_CISO` (líder) |
| Dúvida sobre risco / classificação | `@Iris_CISO` |

## Best-practice de referência

`core/best-practices/secure-coding.md`

8 Core Principles obrigatórios para qualquer código:

1. **Auth-gate em tudo que muta estado**
2. **Segredos NUNCA em código**
3. **Defesa em profundidade**
4. **Least privilege**
5. **Input validation no boundary**
6. **No execução remota de código**
7. **Logs sem PII e sem segredos**
8. **Reversibilidade & blast radius pequeno**

## Pentest (Red Team)

Para pentest contra clientes: a CISO **invoca** o `cybersecurity-pool` (squads/pools/cybersecurity-pool/) com 14+ agentes (Shannon Runner OSINT, Cartographer, Busterer, etc.). Pentest periódico trimestral.

## Hierarquia

```
CTO → CISO → [Cassio_SecRev | Davi_DevSecOps | Mira_InfraSec | Igor_IR]
                  ↓ coordena (sob demanda)
              cybersecurity-pool (Red Team)
```

## Invocação manual

Em qualquer prompt, basta mencionar o agente:
- `@Iris_CISO, faça threat model de [feature]`
- `@Cassio_SecRev, revise este diff antes de deploy`
- `@Mira_InfraSec, rode audit mensal da VPS`

## Sincronização Cross-IDE

Espelhada em `.cursor/rules/12-cyber-seguranca-squad.mdc` e `.agents/rules/12-cyber-seguranca-squad.md`.
