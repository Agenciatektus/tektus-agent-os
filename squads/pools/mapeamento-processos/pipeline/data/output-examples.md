# Output Examples

### Example 1: Playbook de Onboarding Comercial

```markdown
# Playbook: Onboarding Comercial Tektus

## 1. Identificação
- **Área:** Comercial / CS
- **Processo:** Passagem de Bastão do Fechamento para o Onboarding
- **Gatilho Inicial:** Contrato assinado e pagamento confirmado via Stripe.
- **Responsável:** Consultor de Venda (passa) / Analista de CS (recebe).

## 2. Passo a Passo

1. **Acessar CRM (HubSpot)**
   - Vá no deal do cliente ganho.
   - Verifique se os campos obrigatórios (Briefing inicial, Contrato, Print do PGTO) estão anexados.
2. **Gerar Pasta do Cliente**
   - Acesse o Google Drive Interno.
   - Crie a pasta no formato: `[{ANO}] {Nome do Cliente}`
3. **Enviar E-mail de Boas-Vindas**
   - Pegue o template `vendas_onboarding`.
   - Substitua `{NOME}` e coloque Cco a equipe operacional.

## 3. Árvore de Decisão
- **Se** o cliente assinou mas **não pagou**:
  - Aplique a tag `Inadimplente - Espera`.
  - Agende follow-up para 48h.
- **Se** o cliente pagou e assinou:
  - Siga o Passo a Passo acima de criação de pasta.

## 4. Troubleshooting Diário
- **Problema:** E-mail de boas vindas caindo no Spam.
  - **Causa/Prevenção:** Cliente usando servidor restritivo. Avisar no WhatsApp pessoal dele que o e-mail oficial foi disparado.
```
