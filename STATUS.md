# Timbrature — STATUS

## Cosa è
Web app (PWA) personale per iPhone: pulsanti ENTRATA/USCITA, calendario mensile, totali di oggi/settimana/mese/anno.
Pubblicata con GitHub Pages dal repository `timbros`, installata da Safari con "Aggiungi alla schermata Home".

## Decisioni approvate
- PWA invece di app nativa: requisito gratis + duratura + sviluppabile da Windows.
- Nessun server: dati solo sul telefono (localStorage, chiave `timbrature.v1`). Backup con Esporta/Importa (JSON).
- Più turni al giorno (tipico 8–12 e 17–20), sommati. Correzione/aggiunta/eliminazione manuale dei turni.
- Le ore contano nel giorno di entrata; nessuna gestione speciale della mezzanotte.
- Settimana da lunedì. Niente straordinari. Grafica semplice, conta la comodità.
- Nessuna dipendenza esterna: un solo `index.html` + `sw.js` (offline) + manifest + icone.

## Stato
- App completa e provata nel browser (Chromium, 375×812): timbrature, totali, calendario, modifica, validazione, eliminazione, importazione, funzionamento offline.
- Online su https://gioelesoggiu.github.io/timbros/ (GitHub Pages, branch main, root).
- Installata su iPhone dalla schermata Home: funziona (confermato dall'utente il 2026-11-25).
- Da confermare: esportazione del backup su iPhone.

## Note tecniche
- `sw.js`: pagina network-first (aggiornamenti immediati se online), resto cache-first. Alzare `VERSION` se cambiano icone o manifest.
- Server locale di prova: `.claude/launch.json` (python http.server, porta 8765).

## Prossimo passo
Nessuno in corso. Eventuali modifiche: commit, push su `main`, l'app si aggiorna alla prossima apertura con rete.
