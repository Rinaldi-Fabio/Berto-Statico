# Berto Statico

Anteprima statica del primo concept del sito **Pizzeria Da Berto** (Gradara), fatto in Astro, pubblicata con GitHub Pages:
https://rinaldi-fabio.github.io/Berto-Statico/

Copia di sola lettura per far vedere il sito: pagine con `noindex` (Google non le indicizza).
I sorgenti stanno nel progetto `D:\Repo\Da Berto` (repo `Da-Berto-sito`).

## Aggiornare l'anteprima
Se hai cambiato i sorgenti, prima ricompila nel progetto (`npm run build` in `D:\Repo\Da Berto`). Poi, da questa cartella:

```bash
node esporta.mjs
git add -A && git commit -m "Aggiorna anteprima" && git push
```

`esporta.mjs` copia `../dist`, mette gli indirizzi sotto `/Berto-Statico/` e aggiunge il `noindex`.
GitHub Pages pubblica in 1-2 minuti.
