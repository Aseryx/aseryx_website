# Aseryx

**Data licensing for owners with a buyer**

Pick the file or the tables. Lock a copy. Get paid. Open access for a set term.

Version 3.2-draft | September 2026 | Aseryx  
**Status.** Draft for founder review. Filter: Bootstrapping v3.2 only. Supersedes STALE Whitepaper 2.4. Not public until approved.  
**Not.** A marketplace pitch. Not a Score product. Not a hospital beachhead paper.

---

## Abstract

Paid AI data deals in this market are mostly one-to-one. The hard part is not inventing a buyer. It is closing when a buyer is already in the room: name the use, bound the data, disclose where copies go, take payment, and open access for a set term.

Aseryx is a close rail for that job. An owner who can name a paying buyer builds a defined cut (file or tables and columns), locks a frozen copy, may attach a quality packet, gets paid, and grants access on a dataset name for a fixed term. Conversion against email, a shared folder, and counsel alone is the experiment. It is not a proven must-have.

Appraisal is a quality gate on the already-frozen copy. The Score inside that gate is not a price and not what the buyer came to buy. Exchange is not the default tour. Listing is an explicit choice: an appraisal proof is created unlisted, and the owner publishes it to Exchange only when they choose to.

This paper states the door, the path, custody by step, and the language the stack can and cannot keep. It replaces the prior protocol-era whitepaper (see Appendix B).

---

## 1. Backdrop, not the door

Public training data is harder to scrape. Synthetic data does not fully replace human corpora. That scarcity is real as backdrop.

It is not the filter that qualifies the first account. An arbitrary warehouse table is not automatically scarce. An owner with inventory and no payer is not progress on this door. Anger at scraping is attention. A peer’s big license headline is attention. An inbound cheap-license or API offer is a counterparty shape.

The door for the next ninety days is narrower: a rights-holding operator who already has, or is about to have, a named buyer for a proprietary corpus they can bound.

---

## 2. Who this is for

**Customer.** A rights-holding operator (founder- or editor-led, roughly 1–50 people, lightly regulated, no data team or general counsel required) who can hand over a file or point at a database, and who can name who writes the check.

**Buyer (counterparty, not the ICP).** Specified as tightly as the owner: who pays, whether the use is training, inference, or retrieval, exclusivity, refresh, who signs. Without that second name there is only a supplier.

**Not this quarter**

- Anyone with a warehouse table and no buyer  
- A public-hub dumper hunting a Score so they can list  
- Enterprise internal-agent table selection (Glean, Copilot, Horizon, Palantir) as the company door  
- Brand-name eight-figure license winners who already have counsel  
- Insurance, healthcare, hospital, or carrier procurement (parked for firmographics and public-chain custody)  
- Investors, unless fundraising is a separate ask  

---

## 3. When data is an asset on this door

Data is not useful until a use is named. It is not an asset on this door until all three are true:

1. **Someone would change a decision with a defined cut.** A specific buyer would act differently because of a named, bounded set of data, not “the whole database someday.”  
2. **The holder may legally grant that use.**  
3. **Both sides can complete transfer, payment, and a term.**

A Score alone does not make data an asset. Mechanisms (Workspace, Vault, Appraisal, Queries, catalogs) are not those facts.

---

## 4. The commercial object

**North Star.** A paid, time-bounded license between a named owner and a named buyer.

Money is why the owner completes the deal. A named use at the desk is why the operator builds a defined cut. Surfaces run in sequence, not as alternatives:

**Workspace** builds the cut → disclose custody → **Vault** freezes it → **Appraisal** may attach a quality packet (Score inside Appraisal only) → **Access** pays and grants on the **dataset name** → optional **Queries**.

**Appraisal is not what they came to buy.** Do not talk as if Score is the product. The bootstrap is the license.

**Honest limit of the live grant.** Money and term-lock are real. The grant binds a dataset nickname, not the freeze hash and not a named-use field. Do not sell “exact-cut bind” until that ships.

Live fee split already in code: **80% to the holder, 20% to the platform.**

---

## 5. How the path should behave

1. Name the buyer and the use at the desk. In Workspace, build the cut (file, or tables, columns, and SQL). There is no buyer/ask object in product today.  
2. Custody is disclosed before Commit, by path (see §6).  
3. Commit / Vault writes the frozen copy.  
4. Appraisal then gates quality and richness on those vaulted bytes. Prove currently lists the certificate on Exchange. Do not tell a room that listing is optional until that hard-code is removed.  
5. Set price and term as a human quote. Score is not a price. Fitness for the buyer’s job is not a price.  
6. Pay, then grant the dataset name for a fixed term (UTC calendar terms such as 3 / 6 / 9 / 12 months). Not cancellable at will mid-term.  
7. Queries may optionally attest a named buyer predicate. Evidence only. Not a decrypt right and not the cut selector.  
8. Exchange is not the default tour.

**Assumption that may not hold:** many owners with a buyer still reach for a contract, a transfer method, and counsel first. They use Aseryx only if this path beats that default. That bar is the conversion experiment.

---

## 6. Custody said by path

Do not say “data never leaves,” “nothing is transmitted,” or “zero custody transfer.”

| Path | What happens |
|------|----------------|
| Runtime scan | Cells stay on the owner’s machine; the agent runs Discovery and preview locally. |
| Vault / Commit | An encrypted copy is stored; the CID is public after Commit. Disclose that. |
| Access | The buyer receives a decrypted copy for a fixed term. There is no mid-term cancel. |

Honesty about copies is part of the close rail. Absolute never-leaves claims are not.

---

## 7. Four objects. Do not collapse them

| Object | Job |
|--------|-----|
| **Workspace cut** | Selection: operator-selected tables, columns, and SQL (or file). Selection lives here. Freeze does not. |
| **Vault / Commit** | Freeze: encrypted frozen copy and plaintext hash. Vault freezes. Appraisal does not. |
| **Appraisal gate** | Use-agnostic L1 quality gate plus L2 richness on the already-vaulted copy. Score = the number inside the proof (`l2_final_score` after L1). Not a SKU. Not a price. Not the company offer. |
| **Grant** | Paid permission for a fixed term on a dataset name, then it expires. Live bind is the nickname, not a slice hash. |
| **Queries** (optional) | Requester predicate attestation. Evidence. Not a slice selector and not a decrypt right. |

Insights are unbuilt. Do not pitch them.

---

## 8. What an Appraisal is — and is not

An Appraisal is a proven profile of quality and richness on vaulted bytes. It is **not** a price. Price needs market context: who wants this data, how badly, how scarce the cut is, whether the license is exclusive. That context comes from the deal, not from the circuit.

What Appraisal delivers today is an input that can sit on the license path after Vault. It does not select the cut. It does not measure whether the cut fits the buyer’s job. Do not quote a license price from the Score. Fitness is not a price.

---

## 9. Language the stack can and cannot keep

| Cannot be said until the code matches | Can be said if the rest is disclosed |
|---------------------------------------|--------------------------------------|
| Data never leaves. Nothing is transmitted. Zero custody. | Runtime scan does not send cells to Aseryx. Vault CID is public after Commit. Access decrypts for a term. |
| AI builders see a verified Score. Know what your data is worth. | The Appraisal Score is a quality number on vaulted bytes. It is not the license price. It does not measure fit for the buyer’s job. |
| Appraisal selects a cut for the buyer’s stated use. | Workspace names the cut. Vault freezes it. Today’s Appraisal is use-agnostic quality on a vaulted copy. |
| The licensed object is the exact cut hash the buyer asked for. | Grant still binds to a dataset name. Binding to the freeze hash is a build item. |
| HIPAA-ready because data never moves. | Fee split 80/20 is already in code. |
| Come name a use for your own agents this quarter. | Internal selection is not the 90-day door. |

---

## 10. Position and refuse list

**What holds**

- Money as the reason an owner completes the deal  
- A named use at the desk as what makes the cut selectable  
- Workspace as selection; Vault as freeze; Appraisal as quality gate on the license path  
- Custody said by path  
- No automatic public listing as the *reason* to run Appraisal — listing is an explicit choice  

**Refuse**

- Leading with assetize, protocol-as-pitch, or “know what your data is worth”  
- Treating a selected cut with no payer as a win  
- Describing the company as a marketplace or brokerage brand  
- Selling Appraisal as the machine that selects the buyer’s cut  
- Claiming the grant is bound to the exact cut / freeze hash before that ships  
- Hospital / insurance beachhead as this quarter’s GTM  

---

## 11. Working language

**Message.** If someone already wants to buy a use of your data, we give you a close rail: build that cut in Workspace, freeze it in Vault, take payment, and grant a term on the dataset name. Listing on Exchange is a choice, not a side effect of proving. Do not tour Exchange as the win. Appraisal is not what they came to buy.

**Vision.** When high-quality human data can no longer be scraped, the owner who already has a buyer should be able to sell a defined use without dumping the corpus onto a public shelf. Scarcity is backdrop, not the first-account filter.

**Owner value proposition.** If you already have someone who wants to buy a use of your data, Aseryx is a close rail you can try instead of email, a shared folder, and counsel alone: build a defined cut, freeze it, disclose custody, attach a quality packet, get paid, grant a fixed term on the dataset name. Conversion is the experiment.

**For the buyer.** A time-bounded grant to a dataset name for a vaulted frozen copy, with custody disclosed and an optional quality packet. Not an open-ended dump of the whole corpus, and not a hash-bound cut until that ships.

**First meeting.** Tell us who wants it and for what. We build that cut, freeze it, and run the grant. We do not sell you a Score.

---

## 12. The ninety-day test

Within ninety days: one rights-holding owner, one paying requester, one use the buyer stated at the desk, one Workspace-built / Vault-frozen copy, custody disclosed by path, escrow moved, grant of that dataset name opened and later expired.

Find the pair through a warm introduction. Not a catalog. Not a scoreboard. Stop at three qualified intros before widening. A named use with no payer is not a substitute win.

If that loop cannot be completed, Aseryx does not yet have a bootstrap. It has machinery.

---

## 13. Build list named by this door

- Bind grant to the Workspace freeze hash / plaintext hash, not only a nickname, before claiming exact-cut delivery  
- Named-use field only if you intend to store it  
- Keep Appraisal as the quality gate on vaulted bytes  

---

## Appendix A. Technical spine (demoted)

Public GTM voice does not lead with chain or circuit names. For operators and diligence:

**Spine.** Runtime → Connectors → Workspace → Vault → Appraisal → Access → Queries.

| Surface | Job on this door |
|---------|------------------|
| Runtime | On-device scan and export. Honest default custody path. |
| Connectors | Inventory of systems of record. A connected database is not yet a licensable object. |
| Workspace | Turn the buyer ask into an operator cut. Discovery, Refine, Review, then vault commit. |
| Vault | Freeze the copy. Disclose that the CID is public after Commit. |
| Appraisal | Quality and richness gate on vaulted bytes. Live circuit family over dataset-wide aggregates. Score is the number inside the proof. |
| Access | Pay, grant, expire. Term-locked. Object is the dataset name. |
| Queries | Optional buyer-predicate proof. |
| Exchange | Off the default path. A dataset appears only when the owner publishes its appraisal proof. |

Digital Key / access control and encrypted storage are implementation detail for the grant path. They are not the company pitch. Do not write NFT / non-fungible token in GTM copy.

---

## Appendix B. Supersedes Whitepaper 2.4

Whitepaper 2.4 (*A Data Verification and Assetization Protocol*, August 2026) is **STALE** and **do-not-send**. Same for 2.3 / 2.2 lineage.

Removed from the public thesis:

- Assetization / protocol-as-company title  
- Absolute never-takes-custody / without-a-single-record-leaving  
- Hospital oncology and bank beachhead scenarios as the opening ICP  
- Score / “learn what it is worth” as the door  
- Marketplace / rails flywheel as the win  
- HIPAA-ready because data never moves  

Kept and strengthened:

- Appraisal is not a price  
- Holder fee share (80/20) when stated with the live code  

---

## Close

If you already have a buyer for a use of your data, the question is whether Aseryx beats email, a folder, and counsel on that deal. That is the paper. That is the product test.

Tell us who wants it and for what.
