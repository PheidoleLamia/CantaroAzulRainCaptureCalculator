'use client'
import { motion } from 'motion/react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.4,
}

function Vignette({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return (
    <div className="my-6 border-l-2 border-zinc-300 pl-4 dark:border-zinc-700">
      <p className="mb-2 text-sm font-medium italic text-zinc-500 dark:text-zinc-400">
        {name}
      </p>
      <div className="text-zinc-700 dark:text-zinc-300">{children}</div>
    </div>
  )
}

export default function Home() {
  return (
    <motion.main
      className="pb-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sewage 2040: A Speculative Timeline
        </h1>
        <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">Andy Liu</p>
      </motion.section>

      {/* Intro */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
        <p className="mb-10 leading-relaxed text-zinc-700 dark:text-zinc-300">
          Wastewater monitoring is a rapidly emerging technology that has largely gone under the radar.
          In 2025, 150 million Americans will have their wastewater surveilled. While the technology
          has rapidly developed since its wide-scale adoption during the COVID-19 pandemic, little to
          no attention has been paid to the potential ELSI (Ethical, Legal, and Social Implications)
          of its development. Below is a scenario that represents my best guess about what unregulated
          surveillance without intervention may look like.
        </p>
        <hr className="mb-10 border-zinc-200 dark:border-zinc-800" />
      </motion.section>

      {/* Section 1 */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION} className="mb-10">
        <h2 className="mb-4 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          Early 2020: The world sees its first glimpse of wastewater monitoring. However, most
          don't know of its existence.
        </h2>
        <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Behind the numbers and statistics on the dashboards was a method most Americans had
            never heard of. While the public tracked COVID-19 through test results and
            hospitalization rates, a quieter surveillance system was taking shape in the sewers
            beneath their feet.
          </p>
          <p>
            In February 2020, researchers in the Netherlands made a discovery that would reshape
            public health surveillance: they detected SARS-CoV-2 RNA in wastewater samples
            collected before the first clinical cases were confirmed in their communities. The
            virus, shed abundantly in feces by infected individuals, including those without
            symptoms, left traces in sewage that could be detected days or even weeks before
            traditional surveillance methods picked up an outbreak.
          </p>
          <p>
            Similar findings emerged rapidly from Australia, Italy, Spain, and France. By April,
            U.S. news agencies were reporting on the research, though the coverage was buried
            beneath the avalanche of pandemic news. Scientists began collecting samples from
            wastewater treatment plants across the country, quantifying viral loads that
            represented the infections of thousands, sometimes millions, of people in a single
            test.
          </p>
          <p>
            The advantages were immediately apparent. Wastewater surveillance could provide one
            to two weeks of advance warning before clinical case counts rose. It captured
            infections in asymptomatic individuals who would never seek testing. And it did so at
            a fraction of the cost of individual diagnostics: a single wastewater sample could
            represent an entire city's infection status.
          </p>
          <p>
            What most people didn't realize was that this emergency measure was laying the
            foundation for something far more permanent and far-reaching than a pandemic response.
          </p>
        </div>
      </motion.section>

      {/* Section 2 */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION} className="mb-10">
        <h2 className="mb-4 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          September 2020: The CDC launches the National Wastewater Surveillance System.
        </h2>
        <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            In September 2020, the Centers for Disease Control and Prevention formally established
            the National Wastewater Surveillance System (NWSS). The goal was to coordinate the
            fragmented local efforts that had sprung up across the country, creating a unified
            national infrastructure for tracking SARS-CoV-2 through sewage.
          </p>
          <p>
            The system expanded with remarkable speed. Partnerships formed with state and local
            health departments. By December 2022, NWSS would cover approximately 47 percent of
            the U.S. population across 46 states, with over 1,000 sampling sites.
          </p>
          <p>
            The system delivered on its promise. Wastewater data tracked COVID-19 waves with
            precision, and when the Omicron variant emerged in late 2021, some California
            sewersheds detected it before clinical cases were confirmed. Wastewater sequencing
            identified variant proportions that helped officials anticipate the characteristics
            of coming surges.
          </p>
          <p>
            But in the rush to deploy, fundamental questions went unasked. Who would have access
            to the data? What other targets might be monitored? The surveillance infrastructure
            was built first. The guardrails would have to come later, if they came at all.
          </p>
        </div>
      </motion.section>

      {/* Section 3 */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION} className="mb-10">
        <h2 className="mb-4 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          2021–2024: The pandemic recedes but surveillance does not.
        </h2>
        <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            As the acute phase of COVID-19 faded, wastewater surveillance did not retreat with
            it. Instead, the infrastructure built during the emergency began expanding to new
            targets.
          </p>
          <p>
            The CDC added Mpox, Influenza A, and Respiratory Syncytial Virus (RSV) to the NWSS
            monitoring list. Researchers began testing for foodborne pathogens, antimicrobial
            resistance genes, and dozens of other biomarkers. The National Institute on Drug
            Abuse launched pilot programs in over 70 cities, measuring opioid metabolites,
            fentanyl, methamphetamine, and cocaine in sewage.
          </p>
          <p>
            The stated purpose was compelling: real-time data on the overdose epidemic killing
            over 100,000 Americans annually. Wastewater monitoring could detect changes in drug
            supply, like the arrival of new synthetic opioids, before the effects of the drugs
            could take place.
          </p>
          <p>
            As a result, the geographic precision began shifting. During the pandemic, most
            surveillance occurred at treatment plants serving hundreds of thousands of people.
            The data was anonymous. But as sampling moved "upstream" to lift stations, building
            outflows, and dormitory plumbing, the populations shrank. Population-level
            surveillance is starting to become individual surveillance.
          </p>
        </div>
      </motion.section>

      {/* Section 4 */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION} className="mb-10">
        <h2 className="mb-4 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          2025: The present moment, a choice is still possible.
        </h2>
        <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Today, approximately 150 million Americans live in communities where their wastewater
            is monitored. Most have no idea. There has been no national debate, no congressional
            hearing, no public referendum.
          </p>
          <p>
            The legal landscape remains patchy. No federal law specifically addresses wastewater
            surveillance. HIPAA does not apply to population-level sewage data. The Genetic
            Information Nondiscrimination Act (GINA) of 2008, designed to prevent genetic
            discrimination in employment and insurance, was written for individually identifiable
            genetic test results, not aggregate sewage analysis.
          </p>
          <p>
            The Fourth Amendment offers little protection. The Supreme Court's 1988 decision in{' '}
            <em>California v. Greenwood</em> held that individuals have no reasonable expectation
            of privacy in garbage left for collection. Lower courts have extended this reasoning
            to sewage, treating biological material flushed down toilets as "abandoned property"
            with no constitutional protection. No court has reconsidered this decision since the
            development of modern genetic analysis.
          </p>
          <p>
            The CDC maintains voluntary ethical guidelines for NWSS, including a 3,000-person
            minimum reporting threshold and tools to remove human DNA from sequencing data.
            However, these are only recommended frameworks and not legal requirements. They
            don't bind state agencies, law enforcement, or private companies conducting their
            own surveillance.
          </p>
          <p>
            We stand at a fork, what follows is one possible path: the path we take if nothing
            changes.
          </p>
        </div>
      </motion.section>

      {/* Section 5 */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION} className="mb-10">
        <h2 className="mb-4 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          2026–2027: Regulation fails and the Wastewater Monitoring Industry explodes.
        </h2>
        <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Representative Robert Garcia (D-CA) introduces the Wastewater Privacy Protection Act
            (WPPA) with bipartisan cosponsors: purpose limitations to prevent function creep, a
            10,000-person minimum threshold, mandatory data destruction after 90 days, and a
            prohibition on law enforcement access without a warrant.
          </p>
          <p>
            The opposition mobilizes. The wastewater analytics industry, now worth $4.2 billion
            annually, funds a coalition including utilities, analytics companies, and law
            enforcement associations. The FBI warns the bill would "interfere with drug
            investigations." At the hearing, a CDC witness admits they have documented no actual
            harms, only "prospective" ones. The bill dies in committee, 28–24.
          </p>
          <p>
            With federal regulation off the table, the commercial market matures. A startup
            called BioBot Analytics raises a $180 million Series C, offering municipalities free
            monitoring in exchange for data rights they monetize through an analytics platform.
            By year's end, they cover 89 million Americans. Customers include insurance
            companies, real estate investors, and political consultants.
          </p>
        </div>

        <Vignette name="Marcus Williams, 34, Homeowner, Cleveland, OH">
          <p>
            Marcus receives a letter: his homeowner's premium will increase 23 percent due to
            "updated neighborhood risk assessment." The representative mentions "environmental
            health indicators" but won't explain further. Marcus has lived here for eight years.
            He doesn't use drugs. He has no idea his street has been sampled weekly for two
            years, that data show elevated opioid metabolites three blocks away, or that this
            information was sold to insurers. He never consented. He was never informed. All he
            knows is that his costs are rising and his home value is declining, and no one will
            tell him why.
          </p>
        </Vignette>

        <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
          Civil rights organizations document "Redlining 2.0": majority-Black neighborhoods are
          three times more likely to be classified as "elevated risk" based on wastewater data
          than similar white neighborhoods. GINA's limitations have finally become apparent: the
          law covers individual genetic tests, not aggregate sewage analysis.
        </p>
      </motion.section>

      {/* Section 6 */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION} className="mb-10">
        <h2 className="mb-4 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          2028–2029: Continuous Fine Wastewater Monitoring Technology Develops.
        </h2>
        <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            MIT researchers announce SewerSense: low-cost sensors deployable throughout sewer
            networks for continuous, real-time monitoring. Previous surveillance required
            collecting samples and transporting them to labs. SewerSense sensors, costing under
            $200 each, perform on-site molecular analysis using CRISPR-based detection. A single
            city can deploy thousands, monitoring not just treatment plants but individual
            building outflows.
          </p>
          <p>
            Police departments adopt it immediately. Laredo City Government installs 47 sensors,
            dividing the city into monitoring zones of 2,000–5,000 residents, flagging zones
            with elevated drug metabolites for increased patrols.
          </p>
        </div>

        <Vignette name="Maria Santos, 28, Riverside, CA">
          <p>
            Maria has been stopped three times this month. Each time, a routine traffic stop,
            broken tail light, failure to signal. Each time, questions about drugs. She's a
            dental hygienist. She doesn't use drugs. She doesn't know her neighborhood has been
            flagged by wastewater analytics, that patrols have tripled, that officers have been
            instructed to find reasons to make contact with residents. She just knows something
            has changed. The police are everywhere. Her neighbors, mostly Black and brown, mostly
            working-class, are all talking about the same thing.
          </p>
        </Vignette>

        <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
          The ACLU sues, arguing that continuous fine monitoring violates the Fourth Amendment.
          The district court rules against them, citing <em>California v. Greenwood</em>: sewage
          is abandoned property. The court affirms 2–1, backing{' '}
          <em>Carpenter v. United States</em> on the grounds that wastewater data cannot identify
          individuals. The Supreme Court declines to hear the case. The precedent stands:
          wastewater surveillance needs no warrant.
        </p>
      </motion.section>

      {/* Section 7 */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION} className="mb-10">
        <h2 className="mb-4 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          2030–2031: Individual Level Identification Wastewater Surveillance Technology is
          Developed.
        </h2>
        <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            A genomics startup called GenoSeq announces "Amplified Individual Recovery" (AIR):
            a technique for extracting and sequencing individual human DNA from wastewater
            samples. Combined with expanded genetic databases, consumer services, law enforcement
            collections, and newborn screening, it can identify individuals from community-level
            samples.
          </p>
          <p>
            Congress tries again. Senator Don Bacon (D-NE) introduces the Biological Privacy
            Protection Act, amending GINA to cover environmental genetic data and requiring
            warrants for surveillance capable of individual identification. It passes the Senate
            52–48. It dies in the House when the Committee chair refuses to schedule a hearing.
          </p>
          <p>Then comes the FBI request that changes everything.</p>
        </div>

        <Vignette name="Dr. Sarah Park, 45, New York Public Health Laboratory Director">
          <p>
            Dr. Park stares at the FBI email. They want archived wastewater samples from 2028,
            collected for COVID variant surveillance, to extract human DNA for a serial murder
            investigation using GenoSeq's AIR technique. The samples were collected under CDC
            protocols promising the data would never be used for law enforcement. But there's no
            law prohibiting it. The FBI has made clear: cooperate voluntarily, or they'll seek a
            court order. She thinks about the thousands of people whose genetic material sits in
            those freezers, people who flushed their toilets without knowing their DNA would be
            captured, stored, and eventually searched. She sends the samples.
          </p>
        </Vignette>

        <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
          The arrest makes national news: a serial killer caught through "innovative forensic
          techniques." What receives less attention: thousands of people's genetic material was
          searched without knowledge or consent, not because they were suspected of anything,
          but because they lived in the geographic area of interest. The defense attorney's
          motions are denied and the precedent is set.
        </p>
      </motion.section>

      {/* Section 8 */}
      <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION} className="mb-10">
        <h2 className="mb-4 text-lg font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
          2033–2040: Integration of Wastewater Monitoring into Everyday Society.
        </h2>
        <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            By 2033, wastewater surveillance has been fully integrated into infrastructure
            across the United States. Over 85 percent of Americans live in monitored sewersheds.
            Continuous sensor monitoring has replaced periodic sampling. Applications have
            multiplied: employers test workplace facilities for drug use, landlords test building
            outflows as lease conditions, schools track students, and insurance companies adjust
            premiums based on neighborhood biological profiles.
          </p>
        </div>

        <Vignette name="The Thompson Family, Suburban Atlanta, GA">
          <p>
            David and Michelle are refinancing when their application is flagged for "property
            location risk factors." The loan officer mentions "community health indicators."
            David eventually learns that wastewater data showed elevated prescription
            metabolites, medications for depression and anxiety, incorporated into a "community
            wellness score" affecting property values and lending decisions. David doesn't take
            those medications. Neither does Michelle. Their teenage daughter was prescribed an
            antidepressant last year. They had no idea the chemical evidence was flowing through
            the sewer system, affecting their family's financial standing.
          </p>
        </Vignette>

        <div className="space-y-4 leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            By 2040, the concept of biological privacy has become largely obsolete. GenoSeq's
            AIR technique has been incorporated into standard sensor platforms. Individual
            genetic identification occurs automatically, in real-time. Every person's health
            status, genetic predispositions, medication use, and behaviors are knowable through
            analysis of household waste, generated automatically, collected without consent,
            retained indefinitely without any frameworks or guidelines protecting the average
            civilian.
          </p>
        </div>

        <Vignette name="Senator Cory Booker, 69, Chair, Senate Commerce Committee, 2038">
          <p>
            Senator Booker reviews the draft of the Biological Privacy Restoration Act, the
            fifth major attempt at federal regulation since the failed WPPA of 2026. His staff
            has already flagged the problems. The industry coalition has pledged $120 million to
            oppose it. Three members of his own committee have received six-figure contributions
            from wastewater analytics PACs. They argue that the bill's restrictions would
            eliminate 60,000 jobs in the first year alone.
          </p>
          <p className="mt-3">
            The insurance industry has sent letters warning that restricting access to
            wastewater data would force premium increases of 15–20 percent across all
            policyholders. The law enforcement lobby argues the bill would "roll back a decade
            of progress against the opioid epidemic." Even the public health establishment is
            divided as the CDC quietly opposes provisions that would require destroying archived
            samples, arguing they represent an irreplaceable research resource.
          </p>
          <p className="mt-3">
            Booker remembers voting against the WPPA in 2026. The harms were hypothetical then,
            and the industry was small enough to regulate. Now the harms are real but the
            industry has grown beyond Congress's reach. "We had a window," he tells his staff.
            "We missed it."
          </p>
          <p className="mt-3">
            Senator Booker shelves the bill. There aren't enough votes. There never are anymore.
          </p>
        </Vignette>

        <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
          Twenty years after the first COVID-19 wastewater detection, what began as an emergency
          public health measure has become a comprehensive system for biological monitoring of
          the American population without barriers of privacy or consent. The window for
          meaningful reform has closed. The industry that grew in the regulatory vacuum has
          become too big to fail and too powerful to constrain.
        </p>
      </motion.section>
    </motion.main>
  )
}
