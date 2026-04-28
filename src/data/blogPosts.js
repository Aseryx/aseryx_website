const BLOG_POSTS = [
    {
        slug: 'whos-really-making-money-off-your-data',
        title: 'Who\'s Really Making Money Off Your Data?',
        excerpt: 'The data brokerage industry is a $278 billion machine. It exists because institutions can\'t sell data directly and buyers can\'t verify what they\'re getting.',
        date: '2026-04-24',
        category: 'Data Economics',
        featured: true,
        readTime: '14 min read',
        content: `The data brokerage industry is a $278 billion machine. It exists because institutions can't sell data directly and buyers can't verify what they're getting. Both problems are solvable. The brokers just don't want them solved.

The global data brokerage industry was valued at $278 billion in 2024. It is projected to reach $512 billion by 2033. That's not the size of the data itself. That's the size of the cut taken by the people standing between the data's owner and the data's buyer.

These brokers exist because of a structural failure. Institutions that own valuable data, hospitals, banks, research universities, automotive OEMs, can't license it directly to the companies that need it. And the companies that need it, frontier labs, AI model builders, pharmaceutical companies, hedge funds, can't verify what they're buying before they pay. The broker steps into that gap, takes custody of the data, strips it down, repackages it, and sells it at a markup that neither side can see or audit.

This isn't a marketplace. It's an extraction layer. And it's failing both sides of every transaction.

## How the Broker Model Actually Works

The economics of data brokerage are deliberately opaque. Specific revenue-share agreements between brokers and their data sources are almost never disclosed publicly. This opacity is not incidental. It's the business model. If institutions knew what their data was being sold for downstream, they would demand a different split. If buyers knew how little of their payment reached the institution that generated the data, they would demand a different channel.

Here's what we can piece together from public information.

Tempus, the precision medicine company, has signed three major pharmaceutical deals with GSK, AstraZeneca, and Pfizer collectively worth approximately $700 million. The GSK deal alone was $70 million for access to de-identified oncology data sourced from over 40% of U.S. oncologists. What did those oncologists and their institutions receive? Tempus doesn't disclose it. The institutions that generated the clinical encounters, documented the outcomes, and bore the cost of data collection have no public accounting of their share. The only certainty is that it's a fraction of $700 million.

Truveta operates a different model but produces a similar asymmetry. Thirty health systems pool de-identified EHR data into a collective database now covering over 120 million patients, roughly one-third of the U.S. population, sourced from 900 hospitals and 20,000 clinics. The member systems received equity in Truveta through a $320 million preferred investment at a valuation exceeding $1 billion. That sounds like a fair trade until you consider that the health systems contributed the data that constitutes Truveta's entire product, and they received minority equity in exchange for permanent, irrevocable access to their patient records. The data flows one direction. The upside accrues to the intermediary.

When Roche acquired Flatiron Health for $1.9 billion in 2018, they were buying a network of 265 community cancer clinics and 6 major academic centers. The acquisition price reflected the value of the clinical data flowing through that network. What the individual oncology practices and hospitals received for their contribution to that $1.9 billion valuation is, again, not publicly disclosed.

IQVIA, the largest health data intermediary in the world, sources data from hundreds of suppliers, including pharmacies, hospitals, and insurance claims processors. Their datasets cover 93% of outpatient prescriptions through the National Prescription Audit and over 107 million unique enrollees through Pharmetrics Plus. Enterprise access to IQVIA's analytics platform ranges from $5,000 to over $50,000 per month. The institutions whose patient encounters and prescription records generated that data receive a per-record payment that bears no relationship to the downstream revenue IQVIA extracts.

The pattern is consistent. Institutions generate the data. Brokers aggregate, de-identify, and repackage it. Buyers pay premium prices at the cost of an arm and a leg. The institution, the entity that bore the cost of generating the data in the first place, captures the smallest share of value. And none of the economics are visible to any party except the broker.

## What Sellers Lose

The financial extraction is obvious. But the damage to data sellers goes beyond the revenue split.

De-identification destroys signals. When a hospital licenses data through a broker, HIPAA Safe Harbor de-identification strips dates to year-level granularity, removes geographic specificity below the state level, and eliminates any field that could identify an individual patient. This is necessary for compliance. But it also eliminates the temporal precision that makes clinical data valuable for AI training. If you're building a model to predict adverse drug events, you need to know the sequence and timing of interventions. Year-level date resolution doesn't give you that. The de-identified version of a rich clinical dataset is a shadow of the original.

Research published in the National Center for Biotechnology Information has documented that HIPAA Safe Harbor de-identification renders data unsuitable for rare-disease studies, small-population analyses, and any use case requiring precise event timelines. Meanwhile, a landmark study demonstrated that 63% to 87% of the U.S. population can be uniquely identified using only birth date, gender, and ZIP code, meaning that even after Safe Harbor processing, residual re-identification risk is not zero. Institutions are simultaneously losing the signal that makes their data valuable and retaining the risk that makes it dangerous.

Institutions also lose control. Once data is handed to a broker, the institution has limited visibility into how it's used downstream. Flatiron Health sued Tempus in 2019 over allegations that a poached executive carried proprietary knowledge about data compilation techniques. The dispute illustrates a broader reality: when you hand your data to an intermediary, you're trusting that intermediary's competitive practices, security posture, and downstream licensing decisions. You have no audit trail. You have no revocation mechanism. If the intermediary is breached, your patients' data is in the blast radius.

And breaches are not hypothetical. Veradigm, a health data intermediary, agreed to a $10.5 million settlement after a December 2024 breach compromised over 2 million patient records. A whistleblower alleged that Verily, Google's life sciences subsidiary, used 25,000 patient records without authorization and covered up HIPAA violations. These are the companies institutions are trusting with custody of their most sensitive data.

Perhaps the most damaging consequence is participation suppression. The broker model is so unfavorable to institutions that most of them simply don't participate. The average hospital generates approximately 50 petabytes of data annually. Over 100 million patient records across the U.S. healthcare system sit underutilized. Storage and compliance costs run into the millions per year per hospital, costs borne entirely by the institution, while the data's commercial value flows to intermediaries who contributed nothing to its creation.

## What Buyers Lose

The buyer side of the equation is just as broken.

Organizations lose an average of $12.9 million annually due to poor data quality, according to Gartner. Across U.S. businesses, IBM estimates the aggregate cost of poor data at $3.1 trillion annually. A significant portion of that cost is attributable to bad data acquisitions: datasets purchased from brokers that looked adequate in the sample set and fell apart at scale.

The numbers get worse when AI is involved. Seventy percent of AI projects fail due to data quality issues rather than algorithmic limitations. Data preparation consumes 60% to 80% of AI project budgets, yet organizations typically allocate only 20% to 30% to that phase. Industry case studies document AI projects where data remediation costs exceeded the original project budget by two to three times, with the majority of overruns attributable to purchased data that didn't meet specifications.

The root cause is the same trust gap that creates the broker model in the first place. Buyers can't verify data quality before purchasing. The broker provides a sample set, makes claims about completeness and accuracy, and the buyer signs the contract hoping the full dataset matches. When it doesn't, the remediation cost falls on the buyer.

Harvard Business Review found that only 3% of companies' data meets basic quality standards. Forty-seven percent of newly created data records have at least one critical error. When you're buying data through a broker pipeline that has already stripped, de-identified, aggregated, and repackaged the original dataset, the probability that the end product meets your exact specifications is low. But you won't know that until after the money has changed hands, because there is no verification step between "here is the sample" and "here is the invoice."

Buyers also overpay, structurally and unavoidably. The broker's margin is embedded in every transaction, invisible to the buyer. When an AI lab pays IQVIA $50,000 per month for enterprise analytics access, some fraction of that payment represents the actual cost of the underlying data, and the rest represents the broker's margin for aggregation, de-identification, infrastructure, and profit. The buyer has no way to decompose that price. They can't compare the broker's markup to a direct licensing alternative because the direct alternative doesn't exist. The broker's opacity is self-reinforcing: by controlling the only channel, they control the price.

## The Regulatory Walls Are Closing

Regulators are starting to notice.

In January 2024, the Federal Trade Commission took its first-ever enforcement action banning a data broker from selling sensitive location data, targeting X-Mode Social and InMarket with orders requiring deletion of previously collected data and prohibition of future sales. In January 2025, the FTC finalized similar orders against Gravy Analytics and Mobilewalla, the latter of which had collected over 500 million consumer advertising IDs with precise location data between 2018 and 2020. In February 2026, the FTC issued warning letters to 13 data brokers regarding compliance with the Protecting Americans' Data from Foreign Adversaries Act, with penalties up to $53,088 per violation.

California's DELETE Act, SB 362, went into enforcement in January 2026. The law requires data brokers to register with the state, respond to consumer deletion requests through a centralized portal, and comply with deletion within defined timelines. Penalties are $200 per day per unfulfilled request. Vermont, which has maintained a data broker registry since 2018, is proposing to increase non-registration penalties from $50 per day capped at $10,000 to $200 per day with no cap.

In the EU, GDPR enforcement has produced over $5.65 billion in total fines since inception, with enforcement accelerating year over year. The French data protection authority fined data broker Tagadamedia in January 2024 for lacking legal basis for data processing and CALOGA in 2025 for obtaining prospect data from other brokers without authorization.

On the health data front, HIPAA enforcement actions in 2024 resulted in $9.9 million in penalties across 22 cases. The most relevant: Montefiore Medical Center paid $4.75 million after employees were caught selling patient data, over 12,500 records. That case didn't involve a broker. It involved insiders extracting value from data they had custody of. The custody model creates the incentive.

The regulatory trajectory is clear. Every year, the penalties get larger, the enforcement gets more aggressive, and the broker model gets harder to sustain. Institutions that license data through intermediaries are exposed to these regulatory risks without controlling the intermediary's compliance posture. When the FTC investigates a broker's data handling practices, every institution that supplied data to that broker has a compliance problem.

## The Alternative Already Exists

The broker model persists because both sides of the market believe the alternative doesn't exist. Institutions believe they can't license data directly because buyers need to evaluate the data before committing, and evaluation means exposure. Buyers believe they can't go direct because institutions won't share data without a trusted intermediary handling the compliance and de-identification.

Both beliefs are wrong. They're artifacts of a market that hasn't had the infrastructure for direct, verified transactions.

A verification layer that lets institutions prove specific, measurable claims about their data, completeness, accuracy, temporal span, statistical properties, without revealing the underlying records, eliminates the reason both sides hire a broker in the first place.

The seller doesn't need a broker to de-identify and repackage the data because the data never moves. The buyer doesn't need a broker to vouch for quality because quality is cryptographically provable. The broker's value proposition, "trust us, we checked," is replaced by mathematical proof that either verifies or doesn't.

And the economics reverse entirely. Instead of an institution receiving an undisclosed fraction of the downstream revenue while a broker captures the margin, the institution sets its own price based on the market, approves or declines every request, and retains 80% to 85% of the licensing fee per transaction. The data stays in the institution's infrastructure. The buyer gets verified proof of quality before committing a budget. The broker gets disintermediated.

This isn't theoretical. This is the architecture we're building at Aseryx. A data licensing protocol where institutions value and monetize their data while enabling AI model builders to verify and license it without ever exposing the records. No custody transfer. No middleman margin. No trust required.

The data brokerage industry is $278 billion because both sides of every data transaction have been told they need a middleman. They don't. They need proof. And proof doesn't take a cut.

Learn more at aseryx.xyz and follow us @AseryxHQ
By the Aseryx Team`,
    },
    {
        slug: 'the-training-data-dead-end',
        title: 'The Training Data Dead End.',
        excerpt: 'He needed real-world data to train his model. He couldn\'t find it publicly and couldn\'t afford a broker. The model can\'t work without the data. This is the cold start trap killing AI model builders.',
        date: '2026-04-16',
        category: 'AI Strategy',
        featured: false,
        readTime: '12 min read',
        content: `A Founder Called Us Looking for Training Data. What He Described Is the Entire Market's Problem.

He needed real-world data to train his model. He couldn't find it publicly and couldn't afford a broker. The model can't work without the data. This is the cold start trap killing AI model builders.

Last week, a founder building an AI-powered cost modeling engine sat down with us. His product helps engineering teams spending over a million dollars a year on cloud infrastructure understand where their money is actually going. His need was simple: training data. But the kind he needed was extremely specific, and it doesn't exist anywhere he can access it.

We spent 30 minutes on the phone. What he described wasn't a niche problem. It was a structural failure in how the AI training data market works.

## The Data Doesn't Exist Publicly

The founder's first move was obvious. He searched the internet. Open datasets, public repositories, academic collections, government data portals. He found nothing. Companies don't publish this specific type of data. Not in aggregate, not anonymized, not for research purposes. It's competitively sensitive, operationally specific, and governed by vendor agreements that prohibit disclosure.

The most valuable training data for AI models, the data that would produce models with genuine competitive differentiation and impact, sits inside institutions that have no incentive or mechanism to make it public. Hospitals don't publish clinical records. Banks don't publish transaction histories. Automotive OEMs don't publish sensor telemetry. Research universities don't publish longitudinal study data. The data exists. The demand exists. The public supply is zero.

The AI industry has been operating on the assumption that public data is sufficient. It was, for a while. Common Crawl, Wikipedia, open-access research papers, and publicly licensed text corpora powered the first generation of large language models. But that well is running dry. Nature reported in 2024 that the vast reservoir of data that fueled the last wave of AI breakthroughs is approaching exhaustion. Epoch AI estimates that the roughly 300 trillion tokens of quality human-generated public text will be fully utilized by frontier labs between 2026 and 2032. Meanwhile, data restrictions are accelerating: a growing number of the highest-quality public data sources have added restrictions that limit or prohibit AI training use, with major publishers, news organizations, and content platforms implementing crawling bans and licensing requirements between 2023 and 2024.

Every AI company building a domain-specific model is hitting the same wall. The public data is either already in every other model, providing zero competitive advantage, or it doesn't exist for the domain they need.

## The Brokers Don't Fit

The founder's second move was to explore data brokers. He knew people in the industry. He made calls. What he found was a market designed for a completely different kind of buyer.

Data brokers deal in volume. Their core product is massive aggregated datasets: billions of transaction records, hundreds of millions of patient encounters, terabytes of consumer behavior data. They sell to pharmaceutical companies with nine-figure data budgets, hedge funds running quantitative strategies, and enterprise analytics platforms. The minimum viable deal for a broker is typically six figures. The data is pre-packaged, broadly scoped, and sold at margins that reflect the broker's aggregation, de-identification, and compliance overhead.

The founder needed something narrow and specific. The brokers he contacted either didn't have it, because cloud spend data is niche and operationally sensitive, or wanted to sell him something far larger and more expensive than what he needed. As he put it: "They want to give you huge transaction data and charge you millions. We don't have that kind of money."

This is the broker market's fundamental misalignment with the AI builder ecosystem. The fastest-growing segment of data demand isn't coming from pharmaceutical giants or Wall Street quant desks. It's coming from early-stage and growth-stage AI companies building vertical models for specific industries. These companies need small, precise, high-quality datasets tailored to their exact use case. The broker model, built for volume at high margins, doesn't serve them.

And even when a broker has relevant data, the buyer can't verify quality before purchasing. The founder described his experience with broker-offered data: "They sell and then you end up buying things that you don't need." There's no verification step between the sample set and the signed contract. You pay, you receive the data, and you discover whether it meets your specifications. If it doesn't, the remediation cost falls entirely on you. Harvard Business Review found that only 3% of companies' data meets basic quality standards. Forty-seven percent of newly created data records have at least one critical error. When you're buying from a broker who has already aggregated, stripped, and repackaged data from multiple sources, the probability of receiving exactly what you need is low.

Gartner estimates that organizations lose an average of $12.9 million annually to poor data quality. For a company like his, a single bad data acquisition doesn't cost millions. It costs months. Months of pipeline work, model training, evaluation, and iteration, all built on a dataset that was never right in the first place.

## Synthetic Data Is a Dead End

The founder's third move was synthetic data. This is where most AI companies end up when the real data isn't available and the brokers don't fit. Generate artificial training data that mimics the statistical properties of what you need. It's fast, it's cheap, and it works in the short term.

It also degrades your model over time.

A 2025 paper published at ICLR, one of the top machine learning conferences, demonstrated that even 0.1% synthetic data contamination, one synthetic token per thousand, triggers what researchers call "strong model collapse." The degradation isn't gradual. It's structural. Once a model begins training on its own outputs or outputs that mimic its own distribution, the tails of the distribution, the rare events, edge cases, and outlier patterns that make real-world data valuable, begin to disappear. The model converges toward a narrower and narrower representation of reality.

The founder knew this. His words: "Synthetic data will be great for the short term, but the moment people start using your model, it degrades."

Gartner projects that 60% of AI training data will be synthetic by 2024, with 75% of enterprises using synthetic data generators by 2026. If the model collapse research is correct, and the evidence is mounting that it is, the industry is building on a foundation that will progressively undermine its own products. Not because synthetic data is useless, it has legitimate applications in data augmentation and privacy-preserving research, but because it cannot replace real-world data for training production models. The statistical diversity, the edge cases, the messy complexity of institutional data, can't be synthesized. It can only be observed.

## The Cold Start Trap

This is the loop most AI founders get stuck in. You need real data to train your model. You can't get real data without a pilot partnership with an enterprise customer. You can't get a pilot partnership without demonstrating that your model works. Your model can't work without real data.

One founder we spoke with described it plainly: "We need to do a case study on how accurate the platform is predicting so we can show them as proof. Otherwise nobody will be inclined to just share their data with us."

This is the cold start trap. It affects every AI company building a domain-specific model that requires proprietary training data. The institutional data holders won't share data without proof of value. The AI builder can't produce proof of value without the data. The broker sits in between, offering a bad alternative at a high price, and the synthetic data option works just long enough to look promising before the model collapses.

## What the Call Actually Revealed

We talked for 30 minutes. The founder laid out exactly what he needed, where he had looked, and what had failed.

Then he told us the one thing that would make him commit:

Proof that the data was complete, accurate, and structured the way he needed.

He didn't need custody. He needed verification. He didn't need to inspect every record. He needed mathematical certainty that the records existed, covered the right time period, and met his criteria.

That single sentence captured the entire market's problem.

The patterns we see says the same thing, in different words, for different data types: they don't need to own the data, they need proof that it meets their requirements. And the institutions holding the data don't need to surrender custody, they just need a safe way to demonstrate value without exposure.

At Aseryx, we built the protocol that makes it real. Institutions keep full custody and license their sensitive data directly to AI builders. Quality is proven mathematically before any transaction. The institution approves every request, and keeps 80-85% of the revenue. The AI builder gets verified proof of data quality before spending a dollar. Verification replaces trust, and neither side needs a middleman.

The founder we spoke with last week is not an outlier. He is the market. Thousands of AI companies are building domain-specific models and are stuck in the same cold-start trap. The institutions holding the data are also stuck unable to monetize a valuable asset because every traditional path requires surrendering custody or trusting an intermediary.

The trap has two sides. The fix must work for both. That's what we're building.

Learn more at aseryx.xyz and follow us @AseryxHQ 
By the Aseryx Team`,
    },
    {
        slug: 'your-data-worth-something-no-one-can-tell-how-much',
        title: 'Your Data Is Worth Something. No One Can Tell You How Much.',
        excerpt: 'The AI data market can verify quality. It still can\'t answer the only question that matters to sellers.',
        date: '2026-04-03',
        category: 'Data Valuation',
        featured: false,
        readTime: '11 min read',
        content: `Every hospital system, every bank, every research institution sitting on proprietary data has heard the same pitch by now: "Your data is valuable. AI companies will pay for it."

And they're right. The AI training data market is $3.6 billion today and projected to surpass $23 billion by 2034. Pharmaceutical companies are signing nine-figure data deals. AI labs are spending more on data acquisition than on compute. The demand is real, it's growing, and it's not going away.

But here's the question nobody can answer: how much is a specific dataset actually worth?

Not "data is valuable" in the abstract. Not a McKinsey slide about the data economy. The specific question: if a regional health system has 15 years of de-identified clinical documentation covering 800,000 patient encounters across cardiology, oncology, and primary care, what is that dataset worth to an AI lab building a clinical decision support model? Is it $50,000? $500,000? $5 million?

Right now, the honest answer is: nobody knows. And that's not a gap in the market. It's the gap that defines the market.

## The Pricing Vacuum

The current state of data pricing is roughly where real estate was before comparable sales data existed. Imagine trying to sell a house when there are no comps, no appraisals, no Zillow estimates, no public record of what similar properties sold for. You'd be left with two options: accept whatever the buyer offers, or hold out for a number you invented. Both are bad outcomes. One leaves money on the table. The other kills the deal.

That's exactly what's happening in data markets today.

When Tempus signed a $70 million data deal with GSK, that number wasn't derived from a standardised valuation framework. It was negotiated between two parties with asymmetric information, enormous legal teams, and months of back-and-forth. The price reflects the power dynamics of that specific transaction, not the intrinsic value of the data.

When Roche acquired Flatiron Health for $1.9 billion, they weren't just buying data. They were buying the infrastructure, the relationships, the clinical network, and the de-identification pipeline. What percentage of that $1.9 billion was the data itself worth? Flatiron couldn't tell you. Roche probably couldn't tell you either. The valuation was a function of strategic urgency, competitive dynamics, and Roche's willingness to pay to keep the asset away from competitors.

These aren't data valuations. They're power negotiations with data attached.

And they only work at the top of the market, between billion-dollar pharma companies and well-capitalized intermediaries. For the vast majority of institutions, the ones without Goldman Sachs advising the transaction, there is no pricing mechanism at all. A community hospital with 20 years of emergency department data has no framework to determine whether that dataset should be priced at $10,000 or $1 million. So most of them don't price it. They either sell to an intermediary at whatever rate is offered, or they don't participate at all.

## Quality Is Not Value

The data industry has made real progress on the quality question. Standards are emerging. ISO/IEC 25012 defines 15 data quality characteristics. Companies are building evaluation frameworks, benchmarks, and scoring rubrics. Our last article argued that verification, the ability to prove data meets quality standards without exposing it, is the missing layer. And that's true.

But here's what quality frameworks don't do: they don't tell you what data is worth.

A dataset can score perfectly on every quality dimension, completeness, accuracy, consistency, timeliness, and still be worth very little. If the data covers a common condition that dozens of other datasets also cover, it's commodity data with commodity pricing. Conversely, a dataset with moderate quality scores covering rare disease populations or underrepresented demographics could be extraordinarily valuable because nothing else like it exists.

Quality tells you whether data is usable. Value tells you whether data is scarce, relevant, and in demand.

These are different questions, and collapsing them into a single score, as most current frameworks do, destroys the information that both buyers and sellers need to make good decisions.

A compliance officer needs to know: does this data meet our regulatory requirements? That's a pass/fail question.

A procurement lead needs to know: how information-rich is this dataset compared to alternatives? That's a scored question.

A CFO needs to know: what should we charge, or what should we pay? That's a market question.

No single number answers all three. And pretending it does is how institutions end up selling million-dollar datasets for five figures, or how AI labs end up overpaying for commodity data because they had no way to compare.

## Two Scores, Not One

The fix isn't a better composite score. It's separating what should never have been combined.

Data Readiness answers the compliance officer's question. It's a pass/fail gate across defined quality dimensions: is the data complete enough, accurate enough, consistent enough, current enough to meet the buyer's stated requirements? Either it passes or it doesn't. There is no "70% compliant." In regulated industries, partial compliance is non-compliance.

Data Richness answers the procurement lead's question. It's a continuous score, 0 to 100, measuring information density: how many records, how many variables, what temporal span, what statistical diversity, how much unique signal does this dataset contain relative to what's already available? A richness score of 90 tells a buyer "this dataset has exceptional information density." A richness score of 30 tells them "this is thin."

Together, these two scores give both sides of a transaction something they've never had: a shared, verifiable language for discussing data value before any money changes hands.

A dataset that passes Readiness with a Richness score of 85 is a premium asset. A dataset that passes Readiness with a Richness score of 25 is compliant but commodity. A dataset that fails Readiness with a Richness score of 90 is valuable but unlicensable until the quality issues are resolved. Each combination tells a different story, and each story requires a different pricing conversation.

A single composite score would collapse all four of those scenarios into a number in the 50-70 range, telling you nothing actionable.

## The Frameworks Behind the Scores

This isn't an arbitrary system. Both scores are grounded in established, peer-reviewed frameworks.

The Readiness gate draws from ISO/IEC 25012, the international standard for data quality characteristics, which defines 15 dimensions of data quality across inherent and system-dependent categories. Eight of those dimensions, accuracy, completeness, consistency, credibility, currentness, precision, traceability, and understandability, can be evaluated through direct data inspection. The gate also incorporates Benford's Law analysis, a statistical technique established by Mark Nigrini's foundational 2012 work on forensic data analysis. Benford's Law detects manipulation and fabrication in numerical fields by comparing leading digit frequency distributions against the expected mathematical distribution. If someone is manufacturing data or selectively editing records, the leading digits will deviate from the predicted pattern in ways that are statistically detectable.

The Richness score draws from the Dataset Nutrition Label framework developed by Holland et al. (2018) at the Berkman Klein Center and MIT Media Lab. The Nutrition Label provides a standardized disclosure structure with quantitative modules, including distributions, correlations, completeness profiles, and qualitative modules covering collection methodology and intended use. The quantitative modules feed directly into the richness calculation. The score also incorporates information-theoretic proxies derived from Shannon's foundational 1948 work on communication theory. These proxies measure the statistical diversity and information density of each variable in the dataset: how much unique signal does each column carry versus how much is redundant or repetitive.

The result is a scoring system that institutional buyers can trust because it's built on frameworks they already recognize, not proprietary black-box algorithms.

## From Scores to Prices

Readiness and Richness don't directly produce a dollar figure. That's deliberate. Pricing depends on market dynamics that no quality or richness framework can capture: how many buyers want this type of data right now, how many comparable datasets exist, what regulatory changes are increasing or decreasing demand, and what the buyer's specific use case requires.

But Readiness and Richness do something almost as important: they create the preconditions for rational pricing. When a seller and a buyer both have a verified Readiness pass and a Richness score for a dataset, they're negotiating from a shared factual basis. The seller can justify their price with evidence. The buyer can compare alternatives on substance, not promises.

This is how every mature asset market works. Real estate has appraisals, square footage, comparable sales. Equities have earnings multiples, revenue growth, book value. Bonds have credit ratings, duration, yield curves. None of these metrics directly produce a price, but they create the informational infrastructure that makes price discovery possible.

Data markets have been operating without that infrastructure. Every deal is bespoke. Every valuation is a guess. Every negotiation starts from zero. The result is a market where the people closest to the data capture the least value, because they lack the tools to articulate what their data is worth and the evidence to back it up.

## What This Means for Institutions on the Sidelines

If you're a hospital system, a financial institution, a research university, or any organization sitting on proprietary data you've considered monetizing, the obstacle isn't that the market doesn't exist. The obstacle is that you have no way to walk into a negotiation and say, with evidence, "here's what our data looks like, here's what it's worth, and here's the verified proof."

The institutions that will capture the most value in the coming data economy aren't the ones with the most data. They're the ones that can characterize, verify, and articulate the value of their data before the first conversation with a buyer. Quality gates prove the data meets standards. Richness scores demonstrate information density. Together, they turn an opaque asset into something a buyer can evaluate, compare, and price rationally.

This is the infrastructure we're building at Aseryx. We started with verification: proving data meets quality standards without exposing it. Now we're building valuation, giving institutions the tools to understand and articulate what their data is actually worth, backed by international standards and mathematical rigor.

If you're an institution trying to figure out what your data is worth, or an AI team tired of pricing negotiations that feel like guesswork, this is the problem we're solving.

Learn more at aseryx.xyz and follow us @AseryxHQ

By the Aseryx Team`,
    },
    {
        slug: 'six-breaches-one-week-ai-stack-failing',
        title: 'Six Breaches in One Week: Why the Modern AI Stack Keeps Failing',
        excerpt: 'The last week of March 2026 was a masterclass in how the modern AI stack fails.',
        date: '2026-04-02',
        category: 'AI Security',
        featured: false,
        readTime: '12 min read',
        content: `The last week of March 2026 was a masterclass in how the modern AI stack fails.

LiteLLM, the open-source proxy layer that routes API calls to every major language model, was backdoored. A threat actor compromised the maintainer's PyPI credentials through a prior attack on the Trivy security scanner used in LiteLLM's CI/CD pipeline, then published poisoned versions that harvested SSH keys, cloud credentials, Kubernetes secrets, and environment variables from every machine that installed the update. The package gets 3.4 million downloads per day. The backdoor was live for three hours.

Axios, the JavaScript HTTP client installed in virtually every Node.js application on earth, with over 100 million weekly downloads, was hit next. North Korean state hackers (attributed by Google's Threat Intelligence Group to the group UNC1069, also tracked as Sapphire Sleet by Microsoft) compromised a maintainer's npm account and published two backdoored versions that deployed platform-specific remote access trojans on macOS, Windows, and Linux.

Mercor, an AI recruiting platform last valued at $10 billion, was breached through the LiteLLM compromise. Lapsus$ claimed 4 terabytes of stolen data: 939 GB of source code, a 211 GB user database, and 3 TB of storage buckets containing video interviews and identity verification passports. Actual passport scans. Sitting in a storage bucket. Exfiltrated in bulk.

Railway, a popular cloud deployment platform, accidentally enabled CDN caching on domains that had it explicitly disabled. For 52 minutes, authenticated HTTP responses, including user session data, were served to unauthenticated requesters at edge servers globally.

OpenAI's Codex had a command injection vulnerability where malicious payloads embedded in GitHub branch names could execute arbitrary commands inside the agent's container, giving attackers read/write access to a victim's entire codebase. The vulnerability was reported in December 2025 and patched in February 2026, but the disclosure timeline means it existed in production for an undetermined period.

And then there was Delve. A YC backed compliance startup accused of generating 494 fake SOC 2 and ISO 27001 compliance reports, 99.8% of which contained identical text, including the same grammatical errors. Companies relying on Delve's compliance certificates to demonstrate HIPAA and GDPR readiness may have been operating under fabricated assurances. The very infrastructure meant to prove data was being handled safely was itself a fraud.

Six incidents. One week. Different attack vectors, different companies, different scales. But the same underlying architecture failure.

## The Common Thread

Every one of these breaches shares a structural property: data was centrally held, broadly accessible, and minimally verified.

Mercor stored passport scans and video interviews in cloud storage buckets. When the perimeter was breached, everything behind it was exposed in bulk. There was no per-record access control, no cryptographic verification layer, no mechanism that would have limited what an attacker could extract even after gaining access. The security model was: keep the bad guys out. Once they got in, the data was unprotected.

The LiteLLM and Axios attacks exploited a different but related assumption: that the software supply chain is trustworthy by default. Every organization running LiteLLM or Axios trusted that the published package was the same code the maintainer intended to ship. There was no cryptographic verification of the package contents beyond what PyPI and npm provide natively, and those checks failed.

Railway's incident was a configuration error, but the underlying vulnerability is architectural: authenticated responses containing user data were flowing through shared infrastructure (CDN edge nodes) without per-response verification or encryption. The system assumed the CDN would never cache what it shouldn't cache. That assumption was wrong for 52 minutes, and during those 52 minutes, anyone hitting those edge nodes could receive another user's session data.

The Delve scandal is perhaps the most revealing and ironic in my opinion. Here you have a company whose entire product was supposed to be trust infrastructure, compliance verification. And the verification itself was fabricated. The companies relying on those certificates thought their data handling practices had been independently validated. They hadn't. The certificates were auto-generated templates with rubber-stamped signatures.

In every case, the failure pattern is the same: someone had to trust that data was being handled correctly, and that trust was misplaced.

## Why This Keeps Happening

The AI industry has built an infrastructure stack where data custody is the default model. Your data sits on someone else's servers, processed by someone else's code, secured by someone else's configuration, and verified by someone else's compliance reports. At every layer, you're trusting an intermediary.

This made sense when the alternative was impossibly complex. Fifteen years ago, the choice was "use AWS and trust Amazon" or "build your own data center." The centralized custody model won because it was cheaper, faster, and good enough.

But "good enough" is collapsing under two pressures simultaneously.

First, the attack surface has exploded. The modern AI stack isn't one vendor. It's a dependency tree hundreds of layers deep. A single compromised maintainer account on PyPI can cascade into breaches at thousands of organizations within hours. Supply chain attacks aren't edge cases anymore. They're the primary attack vector.

Second, the data being processed has become exponentially more sensitive. When cloud infrastructure was hosting static websites and SaaS tools, a breach meant leaked email addresses and hashed passwords. When AI infrastructure is processing patient records, financial transactions, passport scans, and biometric data, a breach means regulatory catastrophe. HIPAA penalties. GDPR fines of up to 4% of global revenue. Class action litigation. Reputational damage that no incident response plan can undo.

The security model of "trust the platform, trust the pipeline, trust the compliance report" doesn't scale when the data is this sensitive and the attack surface is this broad.

## What the Alternative Looks Like

The opposite of trust-based security is verification-based security. Instead of trusting that data is being handled correctly and discovering the failure after the fact, you build infrastructure where claims about data are cryptographically provable before any transaction occurs.

This is not a theoretical concept. It's the architectural principle behind zero-knowledge proofs: prove that a statement about data is true without revealing the data itself. Applied to the problems exposed this week, the implications are concrete.

The Mercor problem: bulk data exposure. If sensitive data (passport scans, interview recordings, identity documents) were never centrally stored in the first place, a perimeter breach wouldn't produce a 4-terabyte exfiltration. A verification architecture where the platform proves it has validated an applicant's identity without retaining the identity documents eliminates the honeypot. There is nothing in the storage bucket to steal because the storage bucket doesn't contain the raw data. It contains proofs about the data.

The Delve problem: fake compliance. If compliance verification is a cryptographic proof rather than a PDF report, it can't be fabricated. A zero-knowledge compliance certificate doesn't say "an auditor reviewed this and it passed." It says "here is a mathematical proof that this specific dataset, at this specific timestamp, met these specific criteria." Either the proof verifies or it doesn't. There is no room for a template with identical grammatical errors across 494 reports because there is no template. There is math.

The supply chain problem (LiteLLM, Axios). These attacks succeeded because credential theft at one point in the chain compromised every downstream consumer. In a verification architecture, even a compromised dependency can't fabricate proofs about data it never had legitimate access to. The blast radius shrinks because access to the code pipeline doesn't automatically grant access to the data the code processes. Data verification happens independently of code integrity. Defense in depth, not defense at the perimeter.

The configuration problem (Railway). Authenticated data served to unauthenticated users through a caching misconfiguration. In a model where responses contain cryptographically verified claims rather than raw data, a caching error might expose proofs, which are designed to be publicly verifiable, rather than session data, PII, or authentication tokens. The architecture assumes data will leak at some point and ensures that what leaks is verifiable metadata, not raw sensitive content.

## The Uncomfortable Truth

None of these breaches required sophisticated attacks. The LiteLLM backdoor exploited a compromised CI/CD pipeline, a known attack vector with known mitigations that weren't in place. The Axios compromise was a stolen npm credential. Railway was a configuration flag. Delve was a company that apparently never built what it claimed to sell.

These aren't exotic zero-day exploits. They're the predictable consequences of an infrastructure model that centralizes sensitive data, chains trust across dozens of intermediaries, and verifies compliance with PDF reports instead of cryptographic proofs.

The organizations that will navigate this environment safely aren't the ones with the biggest security budgets. They're the ones that stop assuming trust and start requiring proof. Proof that data meets quality standards before it's transacted. Proof that compliance claims are mathematically verifiable, not self-reported. Proof that sensitive data was never unnecessarily exposed to systems that didn't need to see it.

Every institution considering data valuation and monetization, hospitals, banks, research universities, should look at this week and ask a simple question: if our data were in a system that was breached tomorrow, what would be exposed? If the answer is "everything," the architecture is wrong. If the answer is "mathematical proofs about our data, but not the data itself," you've built for the threat landscape that actually exists.

That's the architecture we're building at Aseryx. Our verification infrastructure operates on a core principle: data should be provable without being exposed. Quality claims are verified through proofs generated client-side, meaning raw data never leaves the institution's environment. There is no central repository of sensitive data to breach. There is no compliance report to fabricate. There are mathematical proofs that either verify or they don't.

Six breaches in one week is not an anomaly. It's the new normal for centralized data custody and a bugged out internet. The question isn't whether the next breach will happen. It's whether your data will be in the blast radius when it does.

Learn more at aseryx.xyz and follow us @AseryxHQ`,
    },
    {
        slug: 'benchmarks-tell-you-what-to-measure',
        title: 'Benchmarks Tell You What to Measure. But Who Verifies the Data Actually Meets the Benchmark?',
        excerpt: 'The AI data market is building standards. It\'s forgetting to build proof.',
        date: '2026-04-01',
        category: 'Data Licensing',
        featured: false,
        readTime: '10 min read',
        content: `The AI industry has a data problem everyone knows about and no one has solved.

Public training data is running out. The datasets that built GPT-4, Claude, and Gemini (Common Crawl, Wikipedia, open-access research papers) have been scraped, filtered, and recycled so many times that the marginal return on another pass is approaching zero. The frontier models being built today and tomorrow need something different: proprietary, domain-specific, real-world data locked inside hospitals, banks, law firms, and research institutions.

The problem is that these institutions can't just hand it over.

A hospital sitting on 20 years of clinical documentation doesn't have a "sell data" button. That data is governed by HIPAA, institutional review boards, patient consent frameworks, and internal compliance teams who will kill any deal that introduces custody risk. A financial institution with decades of transaction records faces the same wall: regulatory exposure, client confidentiality, competitive sensitivity. The data exists. The demand exists. But the transaction infrastructure doesn't.

The industry knows this. And it's starting to respond.

## The Benchmarking Wave

Over the past year, we've seen a push toward standardizing what "good" AI training data looks like. Companies are launching benchmark datasets, quality frameworks, and evaluation rubrics designed to give buyers confidence that the data they're purchasing is worth the price.

This is genuine progress. For years, AI data procurement was the Wild West. Buyers negotiating with brokers, relying on sample sets and NDAs, hoping the full dataset matched what they were promised. Benchmarks create a shared language. They let an AI lab say "we need data that meets X standard for completeness, Y standard for accuracy, Z standard for compliance coverage" and have that mean something concrete.

But benchmarks only solve one side of the equation.

A benchmark tells you what to measure. It defines the bar. It says "a high-quality clinical documentation dataset should have these properties." That's valuable. What it doesn't do, and what nothing in the current market does well, is let the institution prove their data clears that bar without exposing the data itself.

And that's where the entire system breaks down.

## The Trust Gap

Here's how a typical data licensing deal works today in a regulated industry:

An AI lab identifies that it needs clinical data for a healthcare model. It finds an institution willing to discuss licensing. The institution says their data is comprehensive, clean, and compliant. The AI lab says "prove it."

The direct path of the institutions licensing data to AI labs barely functions. When it's attempted, the process looks like this: NDAs get drafted, legal teams on both sides spend weeks negotiating terms, a sample set gets carefully curated and de-identified and reviewed by compliance, the AI lab evaluates a fraction of the actual dataset that may not be representative, asks for more, gets pushback, and months pass. Many of these deals collapse. Not because the data was bad or the price was wrong, but because neither side could verify the other's claims without taking on risk they weren't willing to accept.

But here's what's more telling than the deals that die: most institutions never even try.

The direct licensing path is so broken that an entire middleman industry has formed to route around it. Companies like Tempus, Truveta, Flatiron Health (acquired by Roche for $2.1 billion), Segmed, and Avandra now pay hospitals for de-identified patient data and resell it to AI labs and pharma companies. Tempus alone secured a $70 million deal with GSK. Truveta is building a 10-million-patient genome database sourced from health system partners. A January 2025 STAT News investigation documented the growing wave of companies lining up to buy patient records for AI training.

This intermediary model is the market's current answer to the trust problem. And it's a bad answer for almost everyone involved.

The institution sells de-identified data at a fraction of its real value and loses control over how it's used downstream. The AI lab gets data that's been stripped of the clinical context and granularity that made it valuable in the first place. De-identification removes the signal along with the risk. And the intermediary captures the margin that should have gone to the data's original owner. Meanwhile, HIPAA enforcement actions targeting AI are up 340%, and the regulatory walls are getting higher, not lower.

The system isn't just slow. It's structurally misaligned. The people who own the most valuable data have the least ability to monetize it, and the current workaround is selling to a middleman who strips it down and resells it, destroying value for both the institution and the end buyer.

Benchmarks don't fix this. You can define the most rigorous quality standard in the world, but if the only way to verify a dataset meets that standard is to look at the raw data, or trust a middleman who says they've already checked, then you haven't solved the fundamental problem. You've just added another layer of trust to a system that's failing because of trust.

## What Verification Actually Requires

The missing layer isn't better benchmarks. It's verification infrastructure: a way for a data provider to prove specific, measurable claims about their dataset without revealing the dataset itself, and a way for a data buyer to independently verify those claims before any transaction occurs.

This isn't a theoretical concept. The cryptographic primitives for this have existed for decades. Zero-knowledge proofs allow one party to prove a statement is true without revealing any information beyond the truth of the statement itself. In the context of data licensing, that means an institution can prove:

- Their dataset contains X number of records spanning Y time period
- The data meets specific completeness thresholds for required fields
- Compliance checks have been passed for defined regulatory frameworks
- The data has specific statistical properties relevant to the buyer's use case

All without the buyer ever seeing a single record. And the buyer doesn't have to take the institution's word for it. The proof is mathematically verifiable. Either the data has the claimed properties or it doesn't. There's no trust required.

This changes the economics of every data deal.

The institution doesn't need to prepare sample sets, negotiate NDAs for evaluation access, or worry about data exposure during the sales process. The AI lab doesn't need to rely on promises, spend months in legal review, or risk paying for data that doesn't match specifications. Both sides get what they need. The seller proves value, the buyer verifies quality, and neither side takes on unnecessary risk.

## Standards and Proof Are Two Halves of the Same Infrastructure

Here's what the market is getting wrong: it's treating benchmarking and verification as the same problem. They're not. They're complementary.

Benchmarks define what "good" looks like. They create the criteria, the checklist that a dataset needs to meet for a specific use case. That work is important and it's happening. The companies building quality standards for healthcare AI data, financial data, legal corpora, they're laying necessary groundwork.

But a standard without enforcement is just a suggestion. And in data markets, "enforcement" means the ability to independently verify that a specific dataset meets a specific standard, with mathematical certainty, before money changes hands.

The companies defining standards and the infrastructure that enforces verification aren't competitors. They're two layers of the same stack. One without the other leaves the same gap that's been killing data deals in regulated industries for years.

**Define the bar. Then prove you clear it.** That's how data markets actually scale.

## The Shift That's Coming

The AI training data market is valued at roughly $3.6 billion today and projected to exceed $23 billion by 2034. But that growth depends on institutions actually participating, and right now, most of them are on the sidelines. Not because they don't want to monetize their data. Because they can't do it without taking on risk that their compliance teams, their boards, and their regulators won't accept.

The infrastructure that unlocks institutional participation isn't a better marketplace. It's not a more trusted broker. It's a verification layer that removes the need for trust entirely. One that lets a hospital prove their clinical data meets an AI lab's requirements without exposing a single patient record. One that lets a financial institution demonstrate the depth and quality of their transaction data without opening themselves to competitive or regulatory risk.

**Benchmarks opened the conversation about data quality. Verification infrastructure is what will close the deals.**

That's the layer we're building at Aseryx. And if you're an institution sitting on decades of proprietary data you can't safely monetize, or an AI team spending months negotiating data access that should take days, this is the problem we want to solve with you.`,
    },
];

export default BLOG_POSTS;
