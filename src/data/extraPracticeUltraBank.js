// data/extraPracticeUltraBank.js
//
// NEW, ADDITIONAL, STANDALONE question bank (650+ original practice questions).
// This file is completely separate from every other question file in the
// project (questions.js, officialEcsHse.js, officialEcsFess.js,
// officialEcsNetwork.js, officialEcsElectricalSafety.js, am2Data.js,
// extraPracticeElectrical.js, extraPracticeSafety.js, extraPracticeMega.js) —
// none of those files are modified or touched by this file.
//
// Adding this bank takes the app's total question count from ~2,450 to
// 3,000+ across all banks combined. All content below is original practice
// material, clearly marked official: false, written to reinforce UK
// electrical installation, testing, safety and trade knowledge relevant to
// ECS/EAL-style assessments. It is supplementary study material only — not
// official ECS/EAL exam questions.

export const EXTRA_PRACTICE_ULTRA_INFO = {
  official: false,
  title: "Extra Practice: 650+ More Mixed Questions (Ultra Bank)",
  officialQuestionBankPublic: false,
  disclaimer:
    "These are additional, original practice questions covering electrical installation, testing, earthing, protective devices, theory, calculations, health & safety, legislation and trade knowledge. They are supplementary study material only, not official ECS/EAL exam questions, and are a separate bank from every other question set in this app.",
};

export const extraPracticeUltraBank = [
  {
    text: "What is the correct order of the safe isolation procedure after identifying the circuit?",
    options: [
      "Isolate, prove, lock off, test dead",
      "Isolate, lock off, prove tester, test dead, prove tester again",
      "Test dead, isolate, lock off",
      "Lock off, isolate, test dead"
    ],
    correct: "Isolate, lock off, prove tester, test dead, prove tester again",
    explanation: "After isolating and locking off, the voltage indicator must be proved on a known source, used to test the circuit is dead, then proved again to confirm it is still working correctly.",
    topic: "Safe Isolation"
  },
  {
    text: "Why must a voltage indicator be 'proved' both before and after testing a circuit is dead?",
    options: [
      "It is not necessary, once is enough",
      "To confirm the instrument was working correctly throughout the test, not just before it",
      "To charge the battery",
      "To calibrate the device for the day"
    ],
    correct: "To confirm the instrument was working correctly throughout the test, not just before it",
    explanation: "Proving before and after guards against a fault developing in the tester during use, which could otherwise give a false 'dead' reading.",
    topic: "Safe Isolation"
  },
  {
    text: "Who should normally hold the key to a lock-off device used during isolation?",
    options: [
      "Any worker on site",
      "The site manager only",
      "The person carrying out the work, and no one else",
      "It should be left in the isolator"
    ],
    correct: "The person carrying out the work, and no one else",
    explanation: "Each person working on the isolated circuit should apply their own uniquely keyed lock, and keep the key on their person, so no one else can re-energise the circuit while they are working.",
    topic: "Safe Isolation"
  },
  {
    text: "What is a multi-lock hasp used for?",
    options: [
      "Testing insulation resistance",
      "Allowing several workers to each apply their own padlock to a single isolation point",
      "Measuring earth fault loop impedance",
      "Storing spare fuses"
    ],
    correct: "Allowing several workers to each apply their own padlock to a single isolation point",
    explanation: "A multi-lock hasp lets multiple operatives each fit their own padlock, so the isolator cannot be operated until every worker has removed their own lock.",
    topic: "Safe Isolation"
  },
  {
    text: "What information should a caution/warning notice at the point of isolation include?",
    options: [
      "Nothing, it just needs to be red",
      "The name of the person who isolated it and instruction not to switch on",
      "The building's fire escape plan",
      "The company's VAT number"
    ],
    correct: "The name of the person who isolated it and instruction not to switch on",
    explanation: "A caution notice should identify who is working on the circuit and clearly instruct others not to operate the isolator until it is safe to do so.",
    topic: "Safe Isolation"
  },
  {
    text: "Before starting the safe isolation procedure, what should be checked about the voltage indicator itself?",
    options: [
      "Its colour",
      "That it is undamaged, in date for calibration if required, and rated for the voltage present",
      "That it has a warranty card",
      "That it matches the colour of the padlock"
    ],
    correct: "That it is undamaged, in date for calibration if required, and rated for the voltage present",
    explanation: "A visual check for damage and confirmation the instrument is suitable for the voltage being tested are essential before relying on it for safe isolation.",
    topic: "Safe Isolation"
  },
  {
    text: "What is the purpose of a proving unit?",
    options: [
      "To generate a known test voltage to confirm a voltage indicator is functioning",
      "To isolate a circuit remotely",
      "To measure insulation resistance",
      "To record test results automatically"
    ],
    correct: "To generate a known test voltage to confirm a voltage indicator is functioning",
    explanation: "A proving unit provides a reliable known voltage source so the voltage indicator can be proved working before and after testing a circuit is dead.",
    topic: "Safe Isolation"
  },
  {
    text: "If a distribution board has multiple incoming supplies, what extra precaution is needed during isolation?",
    options: [
      "None, one isolation point is always enough",
      "All incoming supplies must be identified and isolated, not just one",
      "Only the largest supply needs isolating",
      "The board can be left partly live if clearly labelled"
    ],
    correct: "All incoming supplies must be identified and isolated, not just one",
    explanation: "Boards fed from more than one source (e.g. dual supply, standby generator, PV) must have every source isolated and proved dead before work begins.",
    topic: "Safe Isolation"
  },
  {
    text: "What should be done if, on testing, a circuit believed to be isolated is found to still be live?",
    options: [
      "Continue carefully",
      "Stop, re-identify the correct point of isolation and repeat the full procedure",
      "Only touch insulated parts",
      "Isolate a different circuit instead"
    ],
    correct: "Stop, re-identify the correct point of isolation and repeat the full procedure",
    explanation: "Finding the circuit still live means the wrong point was isolated or a fault exists; work must stop and the isolation procedure restarted correctly.",
    topic: "Safe Isolation"
  },
  {
    text: "On a three-phase supply, what must be tested for during safe isolation?",
    options: [
      "Line 1 to neutral only",
      "Between all combinations: each line to neutral, each line to earth, and line to line",
      "Neutral to earth only",
      "Just one phase, as they are always identical"
    ],
    correct: "Between all combinations: each line to neutral, each line to earth, and line to line",
    explanation: "On three-phase systems every combination of conductors must be tested dead — line-to-line, line-to-neutral and line-to-earth for each phase — to be certain nothing remains live.",
    topic: "Safe Isolation"
  },
  {
    text: "What is meant by 'securing the isolation' in a safe isolation procedure?",
    options: [
      "Only turning the switch off",
      "Physically preventing the isolator being operated, typically by locking it off",
      "Informing the client verbally",
      "Writing the date on the fuse board"
    ],
    correct: "Physically preventing the isolator being operated, typically by locking it off",
    explanation: "Securing isolation means the switch or isolator cannot physically be turned back on, usually achieved with a lock-off device and unique padlock.",
    topic: "Safe Isolation"
  },
  {
    text: "Why is switching off at a local switch (e.g. a wall switch) not sufficient for safe isolation?",
    options: [
      "It is always sufficient",
      "It does not isolate the supply and can often be switched back on by someone else without warning",
      "Local switches are always broken",
      "It uses too much electricity"
    ],
    correct: "It does not isolate the supply and can often be switched back on by someone else without warning",
    explanation: "A local switch only interrupts the circuit at that point and can usually be re-operated by anyone; true isolation requires switching off and securing at the point of supply.",
    topic: "Safe Isolation"
  },
  {
    text: "What colour is typically used for a 'Danger – Do Not Switch On' isolation warning notice?",
    options: [
      "Green",
      "Red and white/yellow with black text",
      "Blue",
      "Any colour is fine"
    ],
    correct: "Red and white/yellow with black text",
    explanation: "Safety signage conventions use red/black or red/yellow high-visibility warning notices so isolation warnings are instantly recognisable.",
    topic: "Safe Isolation"
  },
  {
    text: "GS38 guidance relates most closely to which piece of equipment?",
    options: [
      "Fire extinguishers",
      "Test probes, leads and voltage indicators used for electrical testing",
      "Ladders",
      "Manual handling techniques"
    ],
    correct: "Test probes, leads and voltage indicators used for electrical testing",
    explanation: "HSE guidance note GS38 covers the safe design and use of electrical test equipment, including finger guards, fused leads and shrouded probe tips.",
    topic: "Safe Isolation"
  },
  {
    text: "What should you do with the key to a lock-off padlock while the isolation is in place?",
    options: [
      "Leave it hanging on the lock",
      "Hand it to a colleague for safekeeping",
      "Keep it on your person at all times",
      "Leave it in the site office"
    ],
    correct: "Keep it on your person at all times",
    explanation: "Keeping the key on your person ensures only you can remove your own lock, preventing anyone else from re-energising the circuit while you are working.",
    topic: "Safe Isolation"
  },
  {
    text: "What is the main hazard of relying only on an indicator lamp on a switchboard to confirm a circuit is dead?",
    options: [
      "None, indicator lamps are always accurate",
      "The lamp itself could be faulty, giving a false 'off' indication",
      "Indicator lamps use too much power",
      "They are only for decoration"
    ],
    correct: "The lamp itself could be faulty, giving a false 'off' indication",
    explanation: "Indicator lamps can fail or be miswired, so they must never be used as the sole method of confirming a circuit is safely isolated — a proved voltage indicator must be used.",
    topic: "Safe Isolation"
  },
  {
    text: "When isolating a circuit fed from a UPS (uninterruptible power supply), what extra care is needed?",
    options: [
      "None, UPS systems are always safe",
      "The UPS itself must also be isolated, as it can continue supplying power after the mains is switched off",
      "Only the mains needs isolating",
      "UPS systems cannot be isolated"
    ],
    correct: "The UPS itself must also be isolated, as it can continue supplying power after the mains is switched off",
    explanation: "A UPS is designed to keep supplying a circuit even when the mains fails, so it must be separately identified and isolated or the circuit can remain live.",
    topic: "Safe Isolation"
  },
  {
    text: "What should be done if the correct isolation point cannot be positively identified?",
    options: [
      "Isolate the nearest switch and proceed",
      "Do not proceed with work until the point of isolation is positively confirmed",
      "Ask a colleague to guess",
      "Treat the whole building as isolated"
    ],
    correct: "Do not proceed with work until the point of isolation is positively confirmed",
    explanation: "Work must never begin until the correct isolation point has been positively identified, for example from accurate drawings, labelling or circuit charts.",
    topic: "Safe Isolation"
  },
  {
    text: "What is a 'point of work' test in relation to safe isolation?",
    options: [
      "Testing at the isolator only",
      "Testing for dead at the actual point where work will be carried out, not just at the isolator",
      "A test carried out after the job is finished",
      "A test of the isolator's paint condition"
    ],
    correct: "Testing for dead at the actual point where work will be carried out, not just at the isolator",
    explanation: "Testing should be carried out as close as practicable to the actual point of work, since wiring faults could mean the isolator does not control every conductor reaching that point.",
    topic: "Safe Isolation"
  },
  {
    text: "What should happen to isolation locks and notices once work is complete and it is safe to re-energise?",
    options: [
      "They can be left in place indefinitely",
      "They should be removed only by the person who applied them (or authorised person), after confirming it is safe",
      "Anyone can remove them at any time",
      "They should be thrown away immediately, before checking"
    ],
    correct: "They should be removed only by the person who applied them (or authorised person), after confirming it is safe",
    explanation: "Locks should only be removed by the person who fitted them (or a formally authorised person following a documented procedure) once it has been confirmed it is safe to restore supply.",
    topic: "Safe Isolation"
  },
  {
    text: "Which of the following best describes 'safe isolation'?",
    options: [
      "Switching off a circuit",
      "A documented procedure to disconnect and secure a circuit so it cannot be inadvertently re-energised while work is carried out",
      "Wearing rubber gloves while working live",
      "Working quickly to avoid remaining near the panel"
    ],
    correct: "A documented procedure to disconnect and secure a circuit so it cannot be inadvertently re-energised while work is carried out",
    explanation: "Safe isolation is a structured sequence — identify, isolate, secure, prove, test dead, prove again — to guarantee a circuit is dead and stays dead while worked on.",
    topic: "Safe Isolation"
  },
  {
    text: "Why should you avoid isolating a circuit using an RCD alone as the sole means of isolation?",
    options: [
      "RCDs cannot be switched off",
      "An RCD is a protective device, not always intended or rated as a suitable isolator, and may not provide full isolation of all conductors",
      "RCDs are too slow",
      "RCDs only work on three-phase systems"
    ],
    correct: "An RCD is a protective device, not always intended or rated as a suitable isolator, and may not provide full isolation of all conductors",
    explanation: "Not all RCDs are suitable or rated for use as an isolator; a dedicated, lockable isolating device rated for isolation duty should be used wherever possible.",
    topic: "Safe Isolation"
  },
  {
    text: "What does 'work equipment' regulations (PUWER) require in relation to isolation of machinery being worked on?",
    options: [
      "Nothing specific",
      "Suitable means of isolating machinery from its energy source before maintenance",
      "Only that machinery is painted a warning colour",
      "That machinery is scrapped after 5 years"
    ],
    correct: "Suitable means of isolating machinery from its energy source before maintenance",
    explanation: "PUWER requires work equipment to have effective means of isolation from all energy sources, so maintenance can be carried out safely.",
    topic: "Safe Isolation"
  },
  {
    text: "When more than one trade needs to work on an isolated system, what is the safest arrangement?",
    options: [
      "Only the first person locks off",
      "Each individual applies their own lock via a multi-lock hasp so all locks must be removed before re-energising",
      "One person removes all locks at the end of their shift regardless of others",
      "No locks are needed if everyone is informed verbally"
    ],
    correct: "Each individual applies their own lock via a multi-lock hasp so all locks must be removed before re-energising",
    explanation: "A multi-lock hasp allows every worker to independently secure the isolation, ensuring the supply cannot be restored until every individual has finished and removed their own lock.",
    topic: "Safe Isolation"
  },
  {
    text: "What is the purpose of an Electrical Installation Condition Report (EICR)?",
    options: [
      "To design a new installation",
      "To report on the condition of an existing electrical installation and identify any deficiencies",
      "To register a new supply with the DNO",
      "To replace the need for a fire risk assessment"
    ],
    correct: "To report on the condition of an existing electrical installation and identify any deficiencies",
    explanation: "An EICR assesses whether an existing installation is in a safe, serviceable condition and highlights any damage, deterioration, defects or non-compliance found.",
    topic: "Inspection & Testing"
  },
  {
    text: "What does a 'C1' classification code on an EICR mean?",
    options: [
      "Improvement recommended",
      "Danger present, risk of injury — immediate action required",
      "Further investigation required",
      "No action needed"
    ],
    correct: "Danger present, risk of injury — immediate action required",
    explanation: "C1 indicates an observed danger that presents a risk of injury and requires immediate remedial action, typically making the installation unsafe until addressed.",
    topic: "Inspection & Testing"
  },
  {
    text: "What does 'FI' stand for on an EICR schedule of test results?",
    options: [
      "Fault Identified",
      "Further Investigation required",
      "Final Isolation",
      "Fuse Installed"
    ],
    correct: "Further Investigation required",
    explanation: "FI is used when an observation cannot be fully classified without further investigation, without which a hazard cannot be ruled out.",
    topic: "Inspection & Testing"
  },
  {
    text: "What is the correct order of tests during initial verification, before energising the installation?",
    options: [
      "Dead tests are completed before live tests",
      "Live tests are always done first",
      "Only visual inspection is required, no testing",
      "Order does not matter"
    ],
    correct: "Dead tests are completed before live tests",
    explanation: "Dead (de-energised) tests such as continuity and insulation resistance must be completed and satisfactory before any live testing takes place, for safety reasons.",
    topic: "Inspection & Testing"
  },
  {
    text: "Which test confirms the continuity of the circuit protective conductor (CPC)?",
    options: [
      "Insulation resistance test",
      "R1+R2 or R2 continuity test",
      "Polarity test only",
      "Earth fault loop impedance test"
    ],
    correct: "R1+R2 or R2 continuity test",
    explanation: "The R1+R2 (or dedicated R2) test verifies continuity and measures the resistance of the line and circuit protective conductors, confirming a low-resistance earth path exists.",
    topic: "Inspection & Testing"
  },
  {
    text: "For a 230V circuit, what test voltage and minimum acceptable insulation resistance does BS 7671 typically specify?",
    options: [
      "250V DC, minimum 0.5 MΩ",
      "500V DC, minimum 1.0 MΩ",
      "1000V DC, minimum 2.0 MΩ",
      "50V DC, minimum 5.0 MΩ"
    ],
    correct: "500V DC, minimum 1.0 MΩ",
    explanation: "For low voltage (up to 500V) circuits, BS 7671 specifies a test voltage of 500V DC with a minimum acceptable insulation resistance of 1.0 MΩ.",
    topic: "Inspection & Testing"
  },
  {
    text: "What does the polarity test confirm?",
    options: [
      "That the circuit is dead",
      "That line, neutral and CPC conductors are correctly connected throughout the installation, e.g. switches in the line conductor",
      "That the cable size is correct",
      "That the RCD trips within the required time"
    ],
    correct: "That line, neutral and CPC conductors are correctly connected throughout the installation, e.g. switches in the line conductor",
    explanation: "The polarity test ensures single-pole switching devices are connected in the line conductor and that all conductors are correctly connected, preventing equipment remaining live when switched 'off'.",
    topic: "Inspection & Testing"
  },
  {
    text: "What does earth fault loop impedance (Zs) testing determine?",
    options: [
      "The colour of the earth conductor",
      "Whether the protective device will disconnect fast enough in the event of an earth fault",
      "The total length of cable installed",
      "The number of sockets on a ring final circuit"
    ],
    correct: "Whether the protective device will disconnect fast enough in the event of an earth fault",
    explanation: "Measuring Zs confirms the earth fault loop impedance is low enough that the protective device will operate within the required disconnection time during a fault.",
    topic: "Inspection & Testing"
  },
  {
    text: "What is Ze, as distinct from Zs?",
    options: [
      "Ze is the impedance of just the final circuit; Zs is the impedance of the whole earth system",
      "Ze is the external earth fault loop impedance (up to the origin); Zs is the total impedance including the circuit itself",
      "Ze and Zs are the same thing",
      "Ze only applies to TT systems"
    ],
    correct: "Ze is the external earth fault loop impedance (up to the origin); Zs is the total impedance including the circuit itself",
    explanation: "Ze is measured at the origin of the installation (external loop impedance), while Zs adds the resistance of the circuit's own line and CPC conductors (R1+R2) to Ze.",
    topic: "Inspection & Testing"
  },
  {
    text: "What is the purpose of RCD testing during inspection and testing?",
    options: [
      "To measure cable colour coding",
      "To confirm the RCD operates within the required time at rated and 5x rated residual current",
      "To measure supply voltage only",
      "To test light bulb wattage"
    ],
    correct: "To confirm the RCD operates within the required time at rated and 5x rated residual current",
    explanation: "RCD testing checks the device disconnects within specified time limits at its rated tripping current and at five times that current, confirming it will protect against earth faults.",
    topic: "Inspection & Testing"
  },
  {
    text: "What should be checked visually before any dead testing begins?",
    options: [
      "Nothing, testing can start immediately",
      "That the installation is correctly erected, cables undamaged, connections tight, correct components used, etc.",
      "Only that the consumer unit is the correct colour",
      "The supplier's billing address"
    ],
    correct: "That the installation is correctly erected, cables undamaged, connections tight, correct components used, etc.",
    explanation: "Visual inspection is carried out first to identify visible defects, damage or non-compliance before proceeding to dead and then live testing.",
    topic: "Inspection & Testing"
  },
  {
    text: "What is the purpose of a Schedule of Test Results?",
    options: [
      "To list the tools used on site",
      "To record the measured values for each circuit tested, for comparison against required limits",
      "To record staff attendance",
      "To list the cost of materials"
    ],
    correct: "To record the measured values for each circuit tested, for comparison against required limits",
    explanation: "The Schedule of Test Results documents actual measured values (continuity, insulation resistance, Zs, RCD operating times, etc.) for each circuit so they can be checked against acceptable limits.",
    topic: "Inspection & Testing"
  },
  {
    text: "What does 'periodic inspection' (now EICR) aim to identify?",
    options: [
      "New circuit designs required",
      "Deterioration, damage, defects and non-compliance in an existing installation over time",
      "The manufacturer of the consumer unit",
      "The DNO account number"
    ],
    correct: "Deterioration, damage, defects and non-compliance in an existing installation over time",
    explanation: "Periodic inspection and testing (an EICR) identifies wear, damage, overloading and non-compliance that may have developed since the installation was last inspected.",
    topic: "Inspection & Testing"
  },
  {
    text: "What is the recommended maximum interval between EICRs for a typical rented domestic property in England?",
    options: [
      "10 years or change of tenancy",
      "5 years or change of tenancy, whichever is sooner",
      "20 years",
      "There is no recommended interval"
    ],
    correct: "5 years or change of tenancy, whichever is sooner",
    explanation: "Under the Electrical Safety Standards regulations, private rented properties in England require an EICR at least every 5 years or at change of tenancy, whichever comes first.",
    topic: "Inspection & Testing"
  },
  {
    text: "Why must dead testing always precede live testing during initial verification?",
    options: [
      "It is faster",
      "To ensure faults such as short circuits or poor insulation are identified before the circuit is energised, reducing risk",
      "Live testing is always inaccurate",
      "There is no required order"
    ],
    correct: "To ensure faults such as short circuits or poor insulation are identified before the circuit is energised, reducing risk",
    explanation: "Carrying out dead tests first protects both the tester and the installation, since energising a faulty circuit prematurely could cause damage or injury.",
    topic: "Inspection & Testing"
  },
  {
    text: "What does 'continuity of ring final circuit conductors' testing verify?",
    options: [
      "That the ring is correctly wired as a true ring, without breaks or interconnections",
      "That the circuit is overloaded",
      "That the RCD is present",
      "That the sockets are the correct colour"
    ],
    correct: "That the ring is correctly wired as a true ring, without breaks or interconnections",
    explanation: "Ring final circuit testing (figure-of-eight method) confirms line, neutral and CPC conductors form a complete, unbroken ring with no interconnections between legs.",
    topic: "Inspection & Testing"
  },
  {
    text: "What instrument is typically used to measure insulation resistance?",
    options: [
      "A multimeter set to AC voltage",
      "An insulation resistance tester (megohmmeter/'megger')",
      "A clamp meter",
      "A proving unit"
    ],
    correct: "An insulation resistance tester (megohmmeter/'megger')",
    explanation: "An insulation resistance tester applies a DC test voltage and measures resistance in megohms, commonly referred to by the trade name 'megger'.",
    topic: "Inspection & Testing"
  },
  {
    text: "Why should sensitive electronic equipment be disconnected before insulation resistance testing?",
    options: [
      "It is not necessary",
      "The high test voltage could damage sensitive components such as dimmer switches or electronic controls",
      "It speeds up the test",
      "It changes the colour of the reading"
    ],
    correct: "The high test voltage could damage sensitive components such as dimmer switches or electronic controls",
    explanation: "Applying 500V DC across sensitive electronics can damage them, so such equipment should be disconnected or bridged out before insulation resistance testing.",
    topic: "Inspection & Testing"
  },
  {
    text: "During functional testing, what should be checked in addition to protective devices?",
    options: [
      "Nothing else is required",
      "That switchgear, controls and interlocks (e.g. RCDs, isolators, emergency stops) operate correctly",
      "Only decorative finishes",
      "The colour of cable trunking"
    ],
    correct: "That switchgear, controls and interlocks (e.g. RCDs, isolators, emergency stops) operate correctly",
    explanation: "Functional testing confirms assemblies such as switchgear, controls, interlocks and RCDs operate correctly and are properly mounted, adjusted and installed.",
    topic: "Inspection & Testing"
  },
  {
    text: "What should be done if a test result does not meet the required value?",
    options: [
      "Record it anyway and move on",
      "Investigate and rectify the fault, then retest before certifying the circuit as satisfactory",
      "Ignore it if only one circuit is affected",
      "Increase the protective device rating to compensate"
    ],
    correct: "Investigate and rectify the fault, then retest before certifying the circuit as satisfactory",
    explanation: "An unsatisfactory result must be investigated, the cause corrected, and the circuit retested before it can be certified as compliant.",
    topic: "Inspection & Testing"
  },
  {
    text: "What is the main purpose of earthing in an electrical installation?",
    options: [
      "To reduce electricity bills",
      "To provide a low-resistance path for fault current, allowing protective devices to operate and reduce shock risk",
      "To improve the appearance of the installation",
      "To increase the voltage available"
    ],
    correct: "To provide a low-resistance path for fault current, allowing protective devices to operate and reduce shock risk",
    explanation: "Earthing gives fault current a defined low-impedance path back to the source, ensuring protective devices operate quickly to disconnect the supply and limit danger.",
    topic: "Earthing & Bonding"
  },
  {
    text: "What is the difference between earthing and bonding?",
    options: [
      "They are the same thing",
      "Earthing connects the installation to earth; bonding connects extraneous/exposed metalwork together to keep them at the same potential",
      "Bonding is only used outdoors",
      "Earthing is only used in commercial buildings"
    ],
    correct: "Earthing connects the installation to earth; bonding connects extraneous/exposed metalwork together to keep them at the same potential",
    explanation: "Earthing provides the fault current path to the source of supply, while equipotential bonding connects conductive parts together to minimise voltage differences between them during a fault.",
    topic: "Earthing & Bonding"
  },
  {
    text: "What is 'main protective bonding' typically applied to in a domestic installation?",
    options: [
      "Wooden furniture",
      "Incoming water, gas and other services with extraneous-conductive-parts",
      "Carpets and curtains",
      "Only the consumer unit casing"
    ],
    correct: "Incoming water, gas and other services with extraneous-conductive-parts",
    explanation: "Main protective bonding connects incoming metallic services such as water and gas pipes to the main earthing terminal, reducing the risk of a dangerous potential difference.",
    topic: "Earthing & Bonding"
  },
  {
    text: "What is 'supplementary bonding' and where might it still be required?",
    options: [
      "Never required in modern installations",
      "Additional bonding between simultaneously accessible exposed and extraneous-conductive-parts, sometimes required in locations like bathrooms",
      "Bonding of decorative light fittings only",
      "A replacement for main bonding"
    ],
    correct: "Additional bonding between simultaneously accessible exposed and extraneous-conductive-parts, sometimes required in locations like bathrooms",
    explanation: "Supplementary bonding connects accessible conductive parts together in higher-risk locations; it may not be required where disconnection times and other conditions of BS 7671 are met, but is still specified in some circumstances.",
    topic: "Earthing & Bonding"
  },
  {
    text: "In a TN-C-S (PME) earthing system, what provides the earth path back to the source?",
    options: [
      "A combined protective earth and neutral (PEN) conductor for at least part of the run",
      "A local earth rod only",
      "There is no return path in TN-C-S",
      "Only the metal water pipe"
    ],
    correct: "A combined protective earth and neutral (PEN) conductor for at least part of the run",
    explanation: "TN-C-S combines earth and neutral into a single PEN conductor for part of the distribution, separating into distinct earth and neutral conductors within the consumer's installation.",
    topic: "Earthing & Bonding"
  },
  {
    text: "In a TT earthing system, how is the earth connection typically achieved?",
    options: [
      "Via the supplier's neutral conductor",
      "Via a local earth electrode (earth rod) installed by the consumer",
      "There is no earth in TT systems",
      "Via the gas pipe only"
    ],
    correct: "Via a local earth electrode (earth rod) installed by the consumer",
    explanation: "TT systems have no metallic earth path back to source from the supplier, so the consumer must provide their own local earth electrode, typically making an RCD essential.",
    topic: "Earthing & Bonding"
  },
  {
    text: "Why is an RCD generally essential on a TT earthing system?",
    options: [
      "It is not essential",
      "Because earth fault loop impedance via a local electrode is usually too high for fuses/MCBs alone to disconnect quickly enough",
      "RCDs are only used to save energy",
      "TT systems do not have protective devices"
    ],
    correct: "Because earth fault loop impedance via a local electrode is usually too high for fuses/MCBs alone to disconnect quickly enough",
    explanation: "The higher loop impedance typical of an earth electrode often means overcurrent devices cannot achieve the required disconnection time, so RCD protection is essential for TT systems.",
    topic: "Earthing & Bonding"
  },
  {
    text: "What colour/marking identifies a protective (earth) conductor in modern UK wiring?",
    options: [
      "Solid green",
      "Green and yellow stripes",
      "Solid yellow",
      "Blue and brown stripes"
    ],
    correct: "Green and yellow stripes",
    explanation: "Protective (earth) conductors are identified by green-and-yellow striped insulation under the harmonised colour scheme used in the UK.",
    topic: "Earthing & Bonding"
  },
  {
    text: "What is the purpose of the Main Earthing Terminal (MET)?",
    options: [
      "To connect all main protective bonding conductors, the earthing conductor and circuit protective conductors together at a single point",
      "To supply power to lighting circuits",
      "To connect only the water pipe",
      "To hold spare fuses"
    ],
    correct: "To connect all main protective bonding conductors, the earthing conductor and circuit protective conductors together at a single point",
    explanation: "The MET is the central point where the earthing conductor, main bonding conductors and circuit protective conductors are all connected together.",
    topic: "Earthing & Bonding"
  },
  {
    text: "Why must bonding clamps be labelled 'Safety Electrical Connection – Do Not Remove'?",
    options: [
      "It is decorative",
      "To warn anyone working on the service (e.g. plumber) that removing the clamp could remove vital earthing protection",
      "It is required by the water company only",
      "It is optional and rarely fitted"
    ],
    correct: "To warn anyone working on the service (e.g. plumber) that removing the clamp could remove vital earthing protection",
    explanation: "The warning label prevents someone unfamiliar with electrical safety from disconnecting a bonding conductor while working on pipework, which could leave the installation without vital protective bonding.",
    topic: "Earthing & Bonding"
  },
  {
    text: "What is meant by 'extraneous-conductive-part'?",
    options: [
      "A part of electrical equipment designed to carry current",
      "A conductive part not forming part of the electrical installation but liable to introduce a potential, e.g. a metal water pipe",
      "A decorative metal fitting with no earth path",
      "A plastic conduit"
    ],
    correct: "A conductive part not forming part of the electrical installation but liable to introduce a potential, e.g. a metal water pipe",
    explanation: "Extraneous-conductive-parts, like metal pipework, are not part of the electrical system but can carry a dangerous potential if not bonded, hence the need for main protective bonding.",
    topic: "Earthing & Bonding"
  },
  {
    text: "What is an 'exposed-conductive-part'?",
    options: [
      "A conductive part of electrical equipment that can be touched and could become live under fault conditions",
      "Any wire visible on the surface of a wall",
      "A conductor that has lost its insulation entirely",
      "A conductor buried underground"
    ],
    correct: "A conductive part of electrical equipment that can be touched and could become live under fault conditions",
    explanation: "Exposed-conductive-parts are touchable metal parts of electrical equipment (e.g. metal enclosures) that are normally not live but could become live if a fault occurs.",
    topic: "Earthing & Bonding"
  },
  {
    text: "Why is a low earth fault loop impedance important for effective earthing?",
    options: [
      "It is not important",
      "A low impedance allows sufficient fault current to flow so protective devices disconnect quickly during a fault",
      "It reduces the cost of cabling",
      "It only affects lighting circuits"
    ],
    correct: "A low impedance allows sufficient fault current to flow so protective devices disconnect quickly during a fault",
    explanation: "A low loop impedance ensures enough fault current flows to operate the protective device within the required disconnection time, minimising shock risk.",
    topic: "Earthing & Bonding"
  },
  {
    text: "What size is a typical main protective bonding conductor commonly installed as, in a domestic TN-C-S installation?",
    options: [
      "1.5mm² minimum",
      "10mm² minimum (subject to calculation based on supply conductor size)",
      "35mm² always, regardless of supply",
      "0.5mm²"
    ],
    correct: "10mm² minimum (subject to calculation based on supply conductor size)",
    explanation: "BS 7671 typically requires a minimum 10mm² main bonding conductor for domestic TN-C-S supplies, though the exact size depends on the supply conductor's cross-sectional area per the relevant table.",
    topic: "Earthing & Bonding"
  },
  {
    text: "What is the main function of a Residual Current Device (RCD)?",
    options: [
      "To protect against overload only",
      "To detect an imbalance between line and neutral current (earth leakage) and disconnect the supply rapidly",
      "To increase available fault current",
      "To reduce voltage drop"
    ],
    correct: "To detect an imbalance between line and neutral current (earth leakage) and disconnect the supply rapidly",
    explanation: "An RCD monitors the current flowing out and returning; if there is an imbalance indicating current is leaking to earth (e.g. through a person), it disconnects rapidly to reduce shock risk.",
    topic: "Protective Devices"
  },
  {
    text: "What is the main advantage of using RCBOs instead of a single RCD covering multiple circuits?",
    options: [
      "RCBOs are always cheaper",
      "A fault on one circuit only trips that RCBO, so other circuits remain in service (better discrimination)",
      "RCBOs do not require testing",
      "RCBOs never need replacing"
    ],
    correct: "A fault on one circuit only trips that RCBO, so other circuits remain in service (better discrimination)",
    explanation: "Because each circuit has its own RCBO, a fault or nuisance trip on one circuit does not affect others, unlike a single RCD protecting a whole board of circuits.",
    topic: "Protective Devices"
  },
  {
    text: "What is the difference between a Type B and Type C miniature circuit breaker (MCB)?",
    options: [
      "There is no difference",
      "Type B trips at a lower multiple of rated current than Type C, which is designed for circuits with higher inrush currents",
      "Type C is only used for lighting",
      "Type B is only used outdoors"
    ],
    correct: "Type B trips at a lower multiple of rated current than Type C, which is designed for circuits with higher inrush currents",
    explanation: "Type B MCBs trip instantaneously between 3-5x rated current, suited to resistive loads, while Type C trips between 5-10x, better suited to circuits with higher inrush currents like motors.",
    topic: "Protective Devices"
  },
  {
    text: "What is the primary purpose of an overcurrent protective device such as a fuse or MCB?",
    options: [
      "To detect earth leakage",
      "To disconnect the circuit automatically in the event of overload or short-circuit current, preventing damage and fire risk",
      "To measure voltage drop",
      "To provide lighting control"
    ],
    correct: "To disconnect the circuit automatically in the event of overload or short-circuit current, preventing damage and fire risk",
    explanation: "Overcurrent devices protect cables and equipment from excessive current, whether from gradual overload or a sudden short circuit, reducing fire and damage risk.",
    topic: "Protective Devices"
  },
  {
    text: "What does the 'breaking capacity' of a protective device refer to?",
    options: [
      "How many times it can be switched on and off",
      "The maximum fault current it can safely interrupt without being damaged or becoming dangerous",
      "The current it takes to trip on overload",
      "The colour it is rated to switch"
    ],
    correct: "The maximum fault current it can safely interrupt without being damaged or becoming dangerous",
    explanation: "Breaking capacity (rated short-circuit capacity) is the highest prospective fault current the device can safely interrupt; it must exceed the prospective fault current at its installed location.",
    topic: "Protective Devices"
  },
  {
    text: "What is 'discrimination' (selectivity) between protective devices?",
    options: [
      "Ensuring devices are all the same colour",
      "Ensuring only the device nearest a fault operates, leaving other circuits unaffected",
      "Choosing devices based on price",
      "Selecting a device at random"
    ],
    correct: "Ensuring only the device nearest a fault operates, leaving other circuits unaffected",
    explanation: "Good discrimination means a fault is cleared by the protective device closest to it, so upstream devices do not also trip unnecessarily, minimising disruption.",
    topic: "Protective Devices"
  },
  {
    text: "Why are fuses rated by their current-carrying (rated) current, not their breaking current?",
    options: [
      "Rated current is the maximum current the fuse can carry continuously without operating; breaking current is what it interrupts during a fault",
      "There is no distinction",
      "Fuses are never rated for continuous current",
      "Fuse rating only matters for lighting"
    ],
    correct: "Rated current is the maximum current the fuse can carry continuously without operating; breaking current is what it interrupts during a fault",
    explanation: "A fuse's rated current is its safe continuous current-carrying capability, while its breaking capacity describes the maximum fault current it can safely clear.",
    topic: "Protective Devices"
  },
  {
    text: "In what circumstances does BS 7671 typically require SPDs to be fitted in new domestic installations?",
    options: [
      "Never, they are always optional",
      "Based on a risk assessment considering factors such as loss of human life, service to the public, or the consequence of the transient overvoltage",
      "Only in commercial buildings",
      "Only where solar PV is installed"
    ],
    correct: "Based on a risk assessment considering factors such as loss of human life, service to the public, or the consequence of the transient overvoltage",
    explanation: "BS 7671 requires a risk assessment (or presumption of risk in many cases) to determine if SPD protection is needed, considering consequences like loss of human life, service or heritage.",
    topic: "Protective Devices"
  },
  {
    text: "What is a 'fusible link' fuse commonly known as?",
    options: [
      "MCB",
      "Rewireable fuse (semi-enclosed fuse)",
      "RCD",
      "SPD"
    ],
    correct: "Rewireable fuse (semi-enclosed fuse)",
    explanation: "A rewireable (semi-enclosed) fuse uses a replaceable fuse wire held in a fuse carrier — a traditional type still found in some older consumer units.",
    topic: "Protective Devices"
  },
  {
    text: "What is a key disadvantage of rewireable fuses compared to MCBs?",
    options: [
      "They are more expensive",
      "They can be rewired with incorrect fuse wire, altering the rated current and reducing protection accuracy",
      "They never need replacing",
      "They automatically reset"
    ],
    correct: "They can be rewired with incorrect fuse wire, altering the rated current and reducing protection accuracy",
    explanation: "Rewireable fuses rely on the correct fuse wire being fitted; using the wrong gauge changes the effective rating, and their characteristics are less precise than modern MCBs.",
    topic: "Protective Devices"
  },
  {
    text: "What does 'HRC' stand for in relation to fuses?",
    options: [
      "High Rupturing Capacity",
      "High Resistance Cable",
      "Hazardous Reduction Certificate",
      "Home Ring Circuit"
    ],
    correct: "High Rupturing Capacity",
    explanation: "HRC (cartridge) fuses are designed with a high breaking capacity, able to safely interrupt large fault currents without shattering or arcing excessively.",
    topic: "Protective Devices"
  },
  {
    text: "Why should an RCD be periodically tested using its integral test button?",
    options: [
      "It is not necessary",
      "To confirm the mechanical tripping mechanism is functioning, as recommended (e.g. quarterly)",
      "To reduce electricity consumption",
      "To reset the electricity meter"
    ],
    correct: "To confirm the mechanical tripping mechanism is functioning, as recommended (e.g. quarterly)",
    explanation: "Regularly pressing the test button confirms the mechanical trip mechanism still operates; manufacturers commonly recommend this every three to six months.",
    topic: "Protective Devices"
  },
  {
    text: "What is the formula for electrical power in a DC or purely resistive circuit?",
    options: [
      "P = V + I",
      "P = V × I",
      "P = V / I",
      "P = I²R only"
    ],
    correct: "P = V × I",
    explanation: "Power (in watts) equals voltage multiplied by current: P = V × I, for DC or purely resistive AC circuits.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "If a 230V circuit draws 4A, what is the power consumed?",
    options: [
      "57.5W",
      "920W",
      "234W",
      "226W"
    ],
    correct: "920W",
    explanation: "P = V × I = 230 × 4 = 920 watts.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What current would a 3kW immersion heater draw on a 230V supply (approximately)?",
    options: [
      "1.3A",
      "6.9A",
      "13A",
      "30A"
    ],
    correct: "13A",
    explanation: "I = P / V = 3000 / 230 ≈ 13A.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the effect of connecting resistors in series?",
    options: [
      "Total resistance decreases",
      "Total resistance is the sum of the individual resistances, increasing overall resistance",
      "Resistance stays the same",
      "Voltage across each resistor is always equal"
    ],
    correct: "Total resistance is the sum of the individual resistances, increasing overall resistance",
    explanation: "In a series circuit, total resistance equals the sum of all individual resistances (Rtotal = R1+R2+R3...).",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the effect of connecting resistors in parallel?",
    options: [
      "Total resistance is always higher than any single resistor",
      "Total resistance is always lower than the smallest individual resistor",
      "Total resistance equals the sum of resistances",
      "There is no effect on total resistance"
    ],
    correct: "Total resistance is always lower than the smallest individual resistor",
    explanation: "Adding parallel paths gives current more routes to flow, so the combined resistance is always less than the smallest individual resistor in the parallel group.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What does 'RMS' stand for in relation to AC voltage and current?",
    options: [
      "Rated Maximum Supply",
      "Root Mean Square",
      "Resistance Measurement Standard",
      "Real Mains Signal"
    ],
    correct: "Root Mean Square",
    explanation: "RMS (root mean square) values represent the effective, equivalent DC value of an alternating quantity, used for standard voltage/current ratings such as 230V AC.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the standard frequency of the UK mains supply?",
    options: [
      "50Hz",
      "60Hz",
      "100Hz",
      "230Hz"
    ],
    correct: "50Hz",
    explanation: "The UK mains supply operates at a nominal frequency of 50 hertz (cycles per second).",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the nominal single-phase voltage of the UK domestic mains supply?",
    options: [
      "110V",
      "230V",
      "400V",
      "12V"
    ],
    correct: "230V",
    explanation: "The nominal UK single-phase mains voltage is 230V (with a permitted tolerance range).",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the typical line-to-line voltage on a UK three-phase supply?",
    options: [
      "230V",
      "400V",
      "110V",
      "690V"
    ],
    correct: "400V",
    explanation: "On a standard UK three-phase supply, the voltage between any two lines is nominally 400V, with 230V between each line and neutral.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is 'power factor' in an AC circuit?",
    options: [
      "The ratio of real power to apparent power",
      "The total resistance of a circuit",
      "The frequency of the supply",
      "The number of phases in a system"
    ],
    correct: "The ratio of real power to apparent power",
    explanation: "Power factor is the ratio between real (useful) power in watts and apparent power in volt-amps, indicating how effectively current is being converted into useful work.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "A poor (low) power factor is typically caused by what type of load?",
    options: [
      "Purely resistive loads like heaters",
      "Inductive loads such as motors and fluorescent lighting ballasts",
      "LED lighting only",
      "Battery chargers only"
    ],
    correct: "Inductive loads such as motors and fluorescent lighting ballasts",
    explanation: "Inductive loads cause current to lag voltage, reducing power factor; capacitors are often used to correct this by counteracting the inductive reactance.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What does 'volt drop' refer to in a circuit?",
    options: [
      "The voltage lost across a conductor due to its resistance as current flows",
      "The rated voltage of the supply",
      "The voltage across an open switch",
      "The peak voltage of an AC waveform"
    ],
    correct: "The voltage lost across a conductor due to its resistance as current flows",
    explanation: "As current flows through a cable's resistance, some voltage is 'dropped' along its length, reducing the voltage available at the load end.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the maximum permitted voltage drop for lighting circuits in a typical UK domestic installation, per BS 7671 guidance?",
    options: [
      "3%",
      "10%",
      "25%",
      "There is no limit"
    ],
    correct: "3%",
    explanation: "BS 7671 guidance suggests a maximum voltage drop of around 3% for lighting circuits (and around 5% for other uses) in installations supplied directly from a public low-voltage network.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "Why does excessive voltage drop matter in a long cable run?",
    options: [
      "It has no practical effect",
      "It can cause equipment to malfunction, lights to dim, and motors to overheat or fail to start correctly",
      "It always trips the RCD",
      "It increases the circuit's power factor"
    ],
    correct: "It can cause equipment to malfunction, lights to dim, and motors to overheat or fail to start correctly",
    explanation: "Excess voltage drop reduces voltage at the load, which can cause dim lighting, poor motor performance, and equipment failing to operate within its designed tolerance.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the relationship between current, charge and time?",
    options: [
      "I = Q × t",
      "I = Q / t",
      "I = t / Q",
      "I = Q + t"
    ],
    correct: "I = Q / t",
    explanation: "Current (amperes) is the rate of flow of charge: I = Q (coulombs) divided by t (seconds).",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What does 'kWh' measure?",
    options: [
      "Instantaneous power",
      "A unit of energy — power (kW) used over time (hours)",
      "Voltage over time",
      "Resistance over time"
    ],
    correct: "A unit of energy — power (kW) used over time (hours)",
    explanation: "A kilowatt-hour is a unit of energy, representing 1 kilowatt of power consumed continuously for 1 hour — the basis for domestic electricity billing.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the diversity factor used for in electrical design?",
    options: [
      "To calculate cable colour",
      "To estimate the likely maximum demand of an installation, as not all loads operate simultaneously at full rating",
      "To measure earth resistance",
      "To size fuses for lighting only"
    ],
    correct: "To estimate the likely maximum demand of an installation, as not all loads operate simultaneously at full rating",
    explanation: "Diversity allows for the fact that not every circuit or appliance in an installation will be used at full load at the same time, giving a more realistic maximum demand figure for design purposes.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the correct SI unit for electrical energy?",
    options: [
      "Watt",
      "Joule",
      "Ohm",
      "Ampere"
    ],
    correct: "Joule",
    explanation: "The joule is the SI unit of energy; a watt is a joule per second (rate of energy transfer), while a kWh is a larger practical unit of energy commonly used for billing.",
    topic: "Electrical Theory & Calculations"
  },
  {
    text: "What is the main advantage of Steel Wire Armoured (SWA) cable?",
    options: [
      "It is the cheapest cable available",
      "It provides mechanical protection, making it suitable for burial or exposed outdoor/industrial installation",
      "It does not require a protective device",
      "It is only used for lighting circuits"
    ],
    correct: "It provides mechanical protection, making it suitable for burial or exposed outdoor/industrial installation",
    explanation: "SWA cable has a layer of steel wire armouring beneath its outer sheath, giving good mechanical protection for direct burial or exposed runs.",
    topic: "Cables & Wiring"
  },
  {
    text: "What does 'twin and earth' (T&E) cable typically consist of?",
    options: [
      "Two line conductors and no earth",
      "A line and neutral conductor plus a bare circuit protective conductor, all within a common sheath",
      "Three phase conductors",
      "A single conductor with no sheath"
    ],
    correct: "A line and neutral conductor plus a bare circuit protective conductor, all within a common sheath",
    explanation: "Standard twin and earth (T&E) cable contains insulated line and neutral conductors and a bare (uninsulated) CPC, all under one outer sheath.",
    topic: "Cables & Wiring"
  },
  {
    text: "Why must the bare CPC in twin and earth cable be sleeved in green/yellow sleeving at terminations?",
    options: [
      "For decoration only",
      "To correctly identify it as a protective conductor and prevent confusion with bare exposed metal",
      "It is not required",
      "To increase its current rating"
    ],
    correct: "To correctly identify it as a protective conductor and prevent confusion with bare exposed metal",
    explanation: "Green/yellow sleeving clearly identifies the bare CPC as a protective conductor wherever it is visible, complying with identification requirements.",
    topic: "Cables & Wiring"
  },
  {
    text: "What is the purpose of cable containment such as trunking or conduit?",
    options: [
      "To provide mechanical protection and support for cables, and allow future additions",
      "To increase cable resistance",
      "To replace the need for earthing",
      "To reduce voltage"
    ],
    correct: "To provide mechanical protection and support for cables, and allow future additions",
    explanation: "Containment systems like trunking and conduit protect cables from damage, provide support, and make it easier to add or replace cables later.",
    topic: "Cables & Wiring"
  },
  {
    text: "What factor most directly determines the current-carrying capacity of a cable?",
    options: [
      "Its colour",
      "Its cross-sectional area, insulation type and installation method (including ambient temperature and grouping)",
      "The length of the cable only",
      "The manufacturer's brand name"
    ],
    correct: "Its cross-sectional area, insulation type and installation method (including ambient temperature and grouping)",
    explanation: "A cable's rated current-carrying capacity depends on conductor size, insulation material, how it is installed, ambient temperature and whether it is grouped with other cables.",
    topic: "Cables & Wiring"
  },
  {
    text: "Why must correction factors be applied when several cables are grouped together?",
    options: [
      "Grouped cables need no adjustment",
      "Grouped cables generate more heat collectively, reducing each cable's safe current-carrying capacity",
      "Grouping always increases capacity",
      "Correction factors only apply to lighting cables"
    ],
    correct: "Grouped cables generate more heat collectively, reducing each cable's safe current-carrying capacity",
    explanation: "When cables are bunched together, they cannot dissipate heat as easily, so their effective current rating must be de-rated using grouping correction factors.",
    topic: "Cables & Wiring"
  },
  {
    text: "What does the term 'derating' mean when selecting cable size?",
    options: [
      "Increasing a cable's tabulated current rating",
      "Reducing a cable's tabulated current rating to account for factors like ambient temperature, grouping or thermal insulation",
      "Removing a cable from service",
      "Rewiring a circuit at a lower voltage"
    ],
    correct: "Reducing a cable's tabulated current rating to account for factors like ambient temperature, grouping or thermal insulation",
    explanation: "Derating applies correction factors to a cable's base tabulated rating to reflect real installation conditions, ensuring it is not overloaded in practice.",
    topic: "Cables & Wiring"
  },
  {
    text: "Why is running cable through thick thermal insulation a particular concern?",
    options: [
      "It has no effect on cable rating",
      "Insulation prevents heat escaping from the cable, significantly reducing its current-carrying capacity",
      "It always improves cable performance",
      "It only affects earth conductors"
    ],
    correct: "Insulation prevents heat escaping from the cable, significantly reducing its current-carrying capacity",
    explanation: "Thermal insulation traps heat around a cable, so its current rating must be reduced considerably compared with a cable clipped direct in free air.",
    topic: "Cables & Wiring"
  },
  {
    text: "What is a 'flat twin and earth' cable typically used for?",
    options: [
      "Underground three-phase distribution",
      "Fixed domestic and light commercial wiring such as lighting and socket circuits",
      "Overhead power lines",
      "Only for earthing conductors"
    ],
    correct: "Fixed domestic and light commercial wiring such as lighting and socket circuits",
    explanation: "Twin and earth is a common general-purpose fixed wiring cable for domestic/light commercial lighting and power circuits.",
    topic: "Cables & Wiring"
  },
  {
    text: "What is the purpose of a cable's outer sheath?",
    options: [
      "To carry current",
      "To provide overall mechanical and environmental protection to the insulated conductors within",
      "To reduce the voltage rating",
      "To act as the earth conductor"
    ],
    correct: "To provide overall mechanical and environmental protection to the insulated conductors within",
    explanation: "The outer sheath protects the insulated conductors from mechanical damage, moisture and other environmental factors.",
    topic: "Cables & Wiring"
  },
  {
    text: "What does 'FP' rated cable (e.g. FP200) typically indicate?",
    options: [
      "A cable rated for underwater use",
      "A fire-performance cable designed to maintain circuit integrity during a fire, often used for life-safety circuits",
      "A flexible cable for portable appliances",
      "A cable rated for use only in freezers"
    ],
    correct: "A fire-performance cable designed to maintain circuit integrity during a fire, often used for life-safety circuits",
    explanation: "Fire-performance cables like FP200 are designed to continue operating for a specified time during a fire, commonly used for fire alarm and emergency lighting circuits.",
    topic: "Cables & Wiring"
  },
  {
    text: "Why should cables not be installed with sharp bends below their minimum bending radius?",
    options: [
      "It has no effect",
      "It can damage the conductor insulation and increase the risk of cable failure",
      "It improves current flow",
      "It reduces voltage drop"
    ],
    correct: "It can damage the conductor insulation and increase the risk of cable failure",
    explanation: "Bending a cable too sharply can crack or stress the insulation and conductors, reducing reliability and safety over time.",
    topic: "Cables & Wiring"
  },
  {
    text: "What is meant by 'mechanical protection' of a cable installed in a stud wall zone, per BS 7671 Regulation guidance?",
    options: [
      "Painting the cable a bright colour",
      "Installing within a permitted safe zone or providing earthed metal covering/protection against nails and screws",
      "Only using flexible cable",
      "No protection is required by regulation"
    ],
    correct: "Installing within a permitted safe zone or providing earthed metal covering/protection against nails and screws",
    explanation: "Cables buried in walls should be within defined safe zones or otherwise mechanically protected (e.g. earthed steel conduit/capping) to reduce the risk of penetration by nails or screws.",
    topic: "Cables & Wiring"
  },
  {
    text: "What are 'safe zones' in relation to cable routes within walls?",
    options: [
      "Any location on a wall",
      "Defined horizontal/vertical zones (e.g. within 150mm of the top of a wall, or 150mm horizontally/vertically from an outlet) where cables can run without additional protection",
      "Only areas outside the building",
      "Areas that never require earthing"
    ],
    correct: "Defined horizontal/vertical zones (e.g. within 150mm of the top of a wall, or 150mm horizontally/vertically from an outlet) where cables can run without additional protection",
    explanation: "BS 7671 defines specific safe zones on walls (e.g. adjacent to corners, or aligned with switches/sockets) where cables can be run without additional mechanical protection.",
    topic: "Cables & Wiring"
  },
  {
    text: "What is the typical maximum current rating consideration when selecting cable for a domestic ring final circuit protected by a 32A device?",
    options: [
      "The cable must be rated to carry the full 32A at every point regardless of ring configuration",
      "The cable rating and ring configuration must together ensure the circuit is adequately protected against overload, per BS 7671 rules for ring circuits",
      "Ring circuits do not need cable rating checks",
      "Any cable size is acceptable"
    ],
    correct: "The cable rating and ring configuration must together ensure the circuit is adequately protected against overload, per BS 7671 rules for ring circuits",
    explanation: "Ring final circuit design (e.g. using 2.5mm² cable with a 32A device) relies on specific BS 7671 provisions recognising the ring's two parallel paths share the load.",
    topic: "Cables & Wiring"
  },
  {
    text: "What is the purpose of using a larger cable size than the minimum required for current-carrying capacity, in some installations?",
    options: [
      "There is never a reason to do this",
      "To limit voltage drop over long runs, or to allow for future load increases",
      "To reduce cable cost",
      "To make the cable easier to strip"
    ],
    correct: "To limit voltage drop over long runs, or to allow for future load increases",
    explanation: "Cable size is sometimes increased above the current-carrying minimum to keep voltage drop within limits on long runs, or to provide spare capacity for future loads.",
    topic: "Cables & Wiring"
  },
  {
    text: "What does a cable's 'CSA' refer to?",
    options: [
      "Cable Safety Assessment",
      "Cross-Sectional Area of the conductor",
      "Circuit Switching Arrangement",
      "Current Supply Adjustment"
    ],
    correct: "Cross-Sectional Area of the conductor",
    explanation: "CSA (cross-sectional area, measured in mm²) describes the conductor's size, which is a key factor in determining its current-carrying capacity and resistance.",
    topic: "Cables & Wiring"
  },
  {
    text: "Why is copper more commonly used than aluminium for domestic cable conductors in the UK?",
    options: [
      "Copper is heavier",
      "Copper has lower resistivity for a given size and better mechanical and connection properties, though it is more expensive",
      "Aluminium cannot conduct electricity",
      "Copper is always cheaper than aluminium"
    ],
    correct: "Copper has lower resistivity for a given size and better mechanical and connection properties, though it is more expensive",
    explanation: "Copper's lower resistivity, ductility and reliable termination characteristics make it the preferred conductor material for most UK domestic and commercial wiring, despite higher raw material cost.",
    topic: "Cables & Wiring"
  },
  {
    text: "What is the risk of using an undersized cable for a given load?",
    options: [
      "No risk, undersized cable is more efficient",
      "Overheating, insulation damage and increased fire risk due to excessive current for the cable's rating",
      "It will automatically increase in size",
      "It only affects appearance"
    ],
    correct: "Overheating, insulation damage and increased fire risk due to excessive current for the cable's rating",
    explanation: "A cable carrying more current than it is rated for will overheat, degrading its insulation over time and increasing the risk of fire or failure.",
    topic: "Cables & Wiring"
  },
  {
    text: "Why should hand tools be visually inspected before each use?",
    options: [
      "It is not necessary if tools look new",
      "To identify damage, wear or defects that could make the tool unsafe to use",
      "Only to check the brand name",
      "To calculate their resale value"
    ],
    correct: "To identify damage, wear or defects that could make the tool unsafe to use",
    explanation: "A pre-use check helps catch cracked handles, damaged insulation or worn components before they cause an accident.",
    topic: "Tools & Equipment"
  },
  {
    text: "What voltage rating should hand tools used for live working (where unavoidable) typically be insulated to?",
    options: [
      "No specific rating needed",
      "Insulated and rated (e.g. VDE 1000V) appropriate to the voltage present, and regularly inspected",
      "Only rated for 12V systems",
      "Any uninsulated tool is acceptable"
    ],
    correct: "Insulated and rated (e.g. VDE 1000V) appropriate to the voltage present, and regularly inspected",
    explanation: "Insulated tools used near or on live parts should carry an appropriate voltage rating (commonly to VDE or similar standards) and be regularly checked for damage.",
    topic: "Tools & Equipment"
  },
  {
    text: "What voltage is recommended for power tools used on many UK construction sites, to reduce shock risk?",
    options: [
      "230V only",
      "110V centre-tapped-to-earth supply",
      "400V",
      "12V only, with no exceptions"
    ],
    correct: "110V centre-tapped-to-earth supply",
    explanation: "110V site supply (centre-tapped to earth, giving a maximum of 55V to earth from either line) is widely used on construction sites to reduce the severity of electric shock in the event of a fault.",
    topic: "Tools & Equipment"
  },
  {
    text: "What is the purpose of a step-down transformer on a construction site?",
    options: [
      "To increase voltage for heavy machinery",
      "To reduce mains voltage to a safer level (e.g. 110V) for use with portable power tools",
      "To convert AC to DC",
      "To measure current"
    ],
    correct: "To reduce mains voltage to a safer level (e.g. 110V) for use with portable power tools",
    explanation: "Step-down transformers convert the higher site supply voltage to a reduced voltage, such as 110V, lowering shock risk for tools used in potentially harsh site conditions.",
    topic: "Tools & Equipment"
  },
  {
    text: "Why should power tool leads and cables be regularly inspected?",
    options: [
      "It is unnecessary if the tool still works",
      "Damaged leads can expose live conductors and present a serious shock or fire hazard",
      "Only to check their length",
      "To ensure the correct colour scheme"
    ],
    correct: "Damaged leads can expose live conductors and present a serious shock or fire hazard",
    explanation: "Cuts, abrasions or exposed conductors in a power tool lead can create a serious risk of electric shock, so leads should be checked before each use.",
    topic: "Tools & Equipment"
  },
  {
    text: "What is the purpose of using battery-powered (cordless) tools where practical?",
    options: [
      "They never need maintenance",
      "They can reduce trailing lead hazards and eliminate reliance on a mains supply at the point of use",
      "They are always more powerful than corded tools",
      "They eliminate the need for PPE"
    ],
    correct: "They can reduce trailing lead hazards and eliminate reliance on a mains supply at the point of use",
    explanation: "Cordless tools remove trailing cables that could be a trip hazard or become damaged, and avoid some risks associated with mains-powered equipment.",
    topic: "Tools & Equipment"
  },
  {
    text: "What is a torque screwdriver primarily used to prevent when tightening electrical terminations?",
    options: [
      "Over- or under-tightening a terminal, which could cause a poor connection or damage",
      "Cable colour mix-ups",
      "Overloading of the circuit",
      "Incorrect polarity"
    ],
    correct: "Over- or under-tightening a terminal, which could cause a poor connection or damage",
    explanation: "Torque tools help apply the manufacturer's specified tightening force, avoiding loose connections (risk of arcing/overheating) or over-tightening that can damage terminals.",
    topic: "Tools & Equipment"
  },
  {
    text: "What should be checked on an extension reel before use?",
    options: [
      "Nothing, extension reels are always safe",
      "That the cable is fully unwound (to avoid overheating), undamaged, and within its rated current",
      "Only the colour of the plug",
      "That it is at least 50m long"
    ],
    correct: "That the cable is fully unwound (to avoid overheating), undamaged, and within its rated current",
    explanation: "A partially wound extension reel can overheat because heat cannot dissipate from the coiled cable, so it should be fully unwound and checked for damage before heavy use.",
    topic: "Tools & Equipment"
  },
  {
    text: "What is the purpose of a proprietary cable stripping tool over a general-purpose knife?",
    options: [
      "It is purely for convenience",
      "It reduces the risk of nicking or damaging the conductor/insulation compared with using a knife",
      "It changes the conductor's resistance",
      "It is required for insurance purposes only"
    ],
    correct: "It reduces the risk of nicking or damaging the conductor/insulation compared with using a knife",
    explanation: "Purpose-made stripping tools are designed to remove insulation cleanly without nicking the conductor, unlike a knife which can weaken or damage the strands.",
    topic: "Tools & Equipment"
  },
  {
    text: "Why should electrical tools be stored in a dry, secure location when not in use?",
    options: [
      "To reduce moisture damage, corrosion and to prevent unauthorised or unsafe use",
      "Storage location has no effect on tool condition",
      "Only for aesthetic reasons",
      "To make them easier to sell"
    ],
    correct: "To reduce moisture damage, corrosion and to prevent unauthorised or unsafe use",
    explanation: "Proper storage protects tools from moisture-related deterioration and helps prevent damaged or unsuitable tools being picked up and used unsafely.",
    topic: "Tools & Equipment"
  },
  {
    text: "What should be done with a power tool found to have a damaged casing or exposed wiring?",
    options: [
      "Continue using it carefully",
      "Take it out of service immediately, label it as faulty and report it",
      "Wrap it in tape and continue",
      "Only use it for short jobs"
    ],
    correct: "Take it out of service immediately, label it as faulty and report it",
    explanation: "A tool with a damaged casing or exposed wiring must be removed from use straight away, clearly labelled, and reported so it can be repaired or replaced.",
    topic: "Tools & Equipment"
  },
  {
    text: "What is the purpose of using a clamp meter rather than a standard ammeter for many electrical measurements?",
    options: [
      "It allows current measurement without breaking the circuit, by clamping around a conductor",
      "It measures voltage only",
      "It removes the need for insulation resistance testing",
      "It is only used for DC circuits"
    ],
    correct: "It allows current measurement without breaking the circuit, by clamping around a conductor",
    explanation: "A clamp meter measures current via the magnetic field around a conductor, allowing measurement without disconnecting or breaking into the circuit.",
    topic: "Tools & Equipment"
  },
  {
    text: "Why is it important to use the correct size and type of screwdriver for electrical terminal screws?",
    options: [
      "It has no real importance",
      "The wrong size can slip, damage the screw head or terminal, or cause a poor/loose connection",
      "It only affects speed of work",
      "It changes the circuit's voltage rating"
    ],
    correct: "The wrong size can slip, damage the screw head or terminal, or cause a poor/loose connection",
    explanation: "Using an ill-fitting screwdriver risks damaging the terminal, stripping the screw head, or leaving a connection improperly tightened, which can cause overheating.",
    topic: "Tools & Equipment"
  },
  {
    text: "What is an important consideration when selecting a drill for use near existing live cables or pipework in a wall?",
    options: [
      "None, drilling is always safe",
      "Use a cable/pipe detector first and select appropriate drilling depth/technique to minimise risk of striking services",
      "Always drill at maximum speed",
      "Drilling near cables is never permitted under any circumstances"
    ],
    correct: "Use a cable/pipe detector first and select appropriate drilling depth/technique to minimise risk of striking services",
    explanation: "Before drilling into walls, using a cable/pipe detector and appropriate technique reduces the risk of striking hidden services such as live cables or gas/water pipes.",
    topic: "Tools & Equipment"
  },
  {
    text: "What is the correct order of priority in the hierarchy of hazard control, before relying on PPE?",
    options: [
      "PPE should always be the first line of defence",
      "Eliminate, substitute, engineering controls, administrative controls, then PPE as a last resort",
      "PPE, then administrative controls",
      "There is no set hierarchy"
    ],
    correct: "Eliminate, substitute, engineering controls, administrative controls, then PPE as a last resort",
    explanation: "The hierarchy of control aims to eliminate or reduce risk at source before relying on PPE, which protects the individual but does not remove the hazard itself.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "Who is legally responsible for providing suitable PPE where required, under UK law?",
    options: [
      "The employee, at their own cost",
      "The employer, generally free of charge to the employee",
      "The client only",
      "No one; PPE provision is optional"
    ],
    correct: "The employer, generally free of charge to the employee",
    explanation: "Under the PPE at Work Regulations, employers must provide suitable PPE free of charge where risks cannot be adequately controlled by other means.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "What should be checked about PPE before each use?",
    options: [
      "Only that it is the right colour",
      "That it is undamaged, clean, correctly fitted and suitable for the task/hazard",
      "Nothing, PPE never needs checking",
      "Only the manufacturer's logo"
    ],
    correct: "That it is undamaged, clean, correctly fitted and suitable for the task/hazard",
    explanation: "PPE should be inspected before use to confirm it is in good condition, correctly fitted, and appropriate for the hazard being controlled.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "What is the purpose of safety footwear with a steel or composite toe cap on site?",
    options: [
      "Fashion only",
      "To protect the foot from impact and compression injuries",
      "To reduce noise",
      "To improve grip on ice only"
    ],
    correct: "To protect the foot from impact and compression injuries",
    explanation: "Toe-capped safety footwear protects against crush and impact injuries from falling or moving objects, a common site hazard.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "What should be considered before attempting to manually lift a heavy or awkward load?",
    options: [
      "Just lift it quickly to get it over with",
      "Assess the load's weight, size, shape and the lifting route; use mechanical aids or get help where needed",
      "Only consider the destination",
      "Manual handling assessments are not required"
    ],
    correct: "Assess the load's weight, size, shape and the lifting route; use mechanical aids or get help where needed",
    explanation: "A TILE-type assessment (Task, Individual, Load, Environment) should be applied before lifting, using mechanical aids or team lifting to reduce risk where possible.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "What is the correct basic technique for lifting a load from the ground?",
    options: [
      "Bend at the waist with straight legs and lift quickly",
      "Keep the back straight, bend the knees, keep the load close to the body, and lift smoothly",
      "Twist the body while lifting for speed",
      "Hold the load at arm's length"
    ],
    correct: "Keep the back straight, bend the knees, keep the load close to the body, and lift smoothly",
    explanation: "Good manual handling technique keeps the spine in a neutral position, uses leg strength rather than the back, keeps the load close, and avoids twisting.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "Why should twisting while carrying a heavy load be avoided?",
    options: [
      "It has no effect on the body",
      "Twisting under load significantly increases the risk of back injury",
      "It slows down the task unnecessarily",
      "It is only a concern for lighter loads"
    ],
    correct: "Twisting under load significantly increases the risk of back injury",
    explanation: "Twisting the spine while carrying weight puts uneven stress on the back and greatly increases the risk of musculoskeletal injury.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "When should ear protection (hearing protection) be worn on site?",
    options: [
      "Never, hearing protection is optional",
      "When working in or entering areas with high noise levels, as identified by risk assessment or signage",
      "Only during lunch breaks",
      "Only if requested by a colleague"
    ],
    correct: "When working in or entering areas with high noise levels, as identified by risk assessment or signage",
    explanation: "Hearing protection should be worn in designated high-noise areas, identified through risk assessment and typically marked with mandatory ear protection signage.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "What is the purpose of safety glasses or goggles when drilling or cutting?",
    options: [
      "To improve visibility in low light",
      "To protect the eyes from flying debris, dust or particles",
      "To reduce glare from sunlight only",
      "They serve no real protective purpose"
    ],
    correct: "To protect the eyes from flying debris, dust or particles",
    explanation: "Eye protection guards against flying debris, dust and particles generated by activities such as drilling, cutting or grinding.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "What class of dust mask/respirator would typically be selected for fine, hazardous dust such as some insulation materials?",
    options: [
      "No mask is needed",
      "An appropriately rated respirator (e.g. FFP2/FFP3) selected based on a COSHH assessment of the specific hazard",
      "Any dust mask regardless of rating",
      "A surgical face mask only"
    ],
    correct: "An appropriately rated respirator (e.g. FFP2/FFP3) selected based on a COSHH assessment of the specific hazard",
    explanation: "Respiratory protection should be selected based on a proper assessment of the hazard (e.g. via COSHH), matching the mask rating to the level of protection required.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "What should be done with disposable PPE (such as gloves or masks) after use?",
    options: [
      "Reuse them indefinitely",
      "Dispose of them correctly, following site procedures, and never reuse single-use items",
      "Wash them for personal use",
      "Leave them anywhere on site"
    ],
    correct: "Dispose of them correctly, following site procedures, and never reuse single-use items",
    explanation: "Single-use PPE should be disposed of according to site waste procedures and not reused, as its protective properties may be compromised.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "What is a common consequence of poor manual handling technique over time?",
    options: [
      "Improved fitness with no downside",
      "Musculoskeletal disorders such as back pain and repetitive strain injuries",
      "No long-term effects",
      "Better posture automatically develops"
    ],
    correct: "Musculoskeletal disorders such as back pain and repetitive strain injuries",
    explanation: "Repeated poor manual handling practice is a leading cause of musculoskeletal disorders, including chronic back pain and joint problems.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "When should mechanical lifting aids (e.g. trolleys, hoists) be used instead of manual lifting?",
    options: [
      "Never, manual lifting is always preferred",
      "Wherever practicable, to reduce the risk of injury, especially for heavy or repetitive loads",
      "Only for loads under 5kg",
      "Only if requested by the client"
    ],
    correct: "Wherever practicable, to reduce the risk of injury, especially for heavy or repetitive loads",
    explanation: "Mechanical aids should be used wherever reasonably practicable to reduce manual handling risk, particularly for heavy, awkward or repetitive tasks.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "What is high-visibility (hi-vis) clothing primarily intended to do?",
    options: [
      "Keep the wearer warm",
      "Make the wearer clearly visible to others, particularly around vehicles and moving plant",
      "Protect against electric shock",
      "Provide waterproofing"
    ],
    correct: "Make the wearer clearly visible to others, particularly around vehicles and moving plant",
    explanation: "Hi-vis clothing increases visibility, reducing the risk of a worker being struck by vehicles, plant or machinery, especially in low light.",
    topic: "PPE & Manual Handling"
  },
  {
    text: "Which type of fire extinguisher must never be used on a live electrical fire?",
    options: [
      "CO2",
      "Water or foam",
      "Dry powder",
      "None, all are equally safe on live electrical fires"
    ],
    correct: "Water or foam",
    explanation: "Water and foam extinguishers conduct electricity and must never be used on a live electrical fire, due to the serious risk of electric shock.",
    topic: "Fire Safety"
  },
  {
    text: "Why is a CO2 extinguisher often preferred for fires involving electrical equipment?",
    options: [
      "It leaves a residue that protects equipment",
      "It does not conduct electricity and leaves minimal residue on sensitive equipment",
      "It is the cheapest option",
      "CO2 is not suitable for electrical fires"
    ],
    correct: "It does not conduct electricity and leaves minimal residue on sensitive equipment",
    explanation: "CO2 extinguishes fire by displacing oxygen without leaving a damaging residue and, being non-conductive, is suitable for use on live electrical equipment.",
    topic: "Fire Safety"
  },
  {
    text: "What is a Class A fire?",
    options: [
      "Fires involving flammable liquids",
      "Fires involving solid combustible materials such as wood, paper and textiles",
      "Fires involving flammable gases",
      "Fires involving cooking oils and fats"
    ],
    correct: "Fires involving solid combustible materials such as wood, paper and textiles",
    explanation: "Class A fires involve ordinary combustible solids like wood, paper, cardboard and textiles.",
    topic: "Fire Safety"
  },
  {
    text: "What is a Class C fire?",
    options: [
      "Fires involving flammable gases",
      "Fires involving metals",
      "Fires involving solids",
      "Electrical fires"
    ],
    correct: "Fires involving flammable gases",
    explanation: "Class C fires involve flammable gases such as propane or butane.",
    topic: "Fire Safety"
  },
  {
    text: "What is a Class F fire?",
    options: [
      "Fires involving cooking oils and fats",
      "Fires involving flammable liquids",
      "Fires involving textiles",
      "Fires involving electrical equipment"
    ],
    correct: "Fires involving cooking oils and fats",
    explanation: "Class F fires specifically involve cooking oils and fats, such as those in commercial kitchens, and require a specialist wet chemical extinguisher.",
    topic: "Fire Safety"
  },
  {
    text: "What are the three elements of the 'fire triangle'?",
    options: [
      "Heat, fuel and oxygen",
      "Heat, water and smoke",
      "Fuel, smoke and light",
      "Oxygen, carbon and hydrogen"
    ],
    correct: "Heat, fuel and oxygen",
    explanation: "The fire triangle represents the three things needed for fire: heat (ignition source), fuel, and oxygen; removing any one can extinguish or prevent a fire.",
    topic: "Fire Safety"
  },
  {
    text: "What should you do first upon discovering a fire on site?",
    options: [
      "Try to fight it regardless of size",
      "Raise the alarm and follow the site's fire evacuation procedure",
      "Take photographs for the report",
      "Look for the fire's cause before acting"
    ],
    correct: "Raise the alarm and follow the site's fire evacuation procedure",
    explanation: "On discovering a fire, the priority is to raise the alarm immediately and follow the established evacuation procedure, only attempting to fight small fires if trained, safe and appropriate to do so.",
    topic: "Fire Safety"
  },
  {
    text: "What common electrical faults can increase the risk of fire on a construction site?",
    options: [
      "Correctly rated circuits",
      "Overloaded circuits, damaged cables, loose connections and unauthorised temporary wiring",
      "Properly maintained RCDs",
      "Cables installed to BS 7671"
    ],
    correct: "Overloaded circuits, damaged cables, loose connections and unauthorised temporary wiring",
    explanation: "Overloading, cable damage, loose terminations and improvised/unauthorised wiring are common electrical causes of site fires, generating heat through resistance or arcing.",
    topic: "Fire Safety"
  },
  {
    text: "What is a 'hot work permit' used for?",
    options: [
      "Authorising work in warm weather",
      "Formally authorising and controlling activities that create heat, sparks or flame (e.g. welding, grinding) that could cause a fire",
      "Permitting overtime work",
      "Booking use of the site canteen"
    ],
    correct: "Formally authorising and controlling activities that create heat, sparks or flame (e.g. welding, grinding) that could cause a fire",
    explanation: "A hot work permit formalises the precautions needed (fire watch, clearing combustibles, extinguishers on hand) before activities that could ignite a fire are carried out.",
    topic: "Fire Safety"
  },
  {
    text: "What is a COSHH assessment intended to do?",
    options: [
      "Assess only the cost of hazardous substances",
      "Identify hazardous substances used or created by a task and determine control measures to reduce exposure",
      "Replace the need for PPE entirely",
      "Assess employee fitness levels"
    ],
    correct: "Identify hazardous substances used or created by a task and determine control measures to reduce exposure",
    explanation: "A COSHH assessment identifies hazardous substances present, evaluates the risk of exposure, and specifies control measures such as ventilation, PPE or substitution.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "Which of the following is an example of a substance that could require a COSHH assessment on an electrical site?",
    options: [
      "Drinking water",
      "Solvent-based adhesives, silica dust from drilling, or lead from old cable sheathing",
      "Fresh air",
      "Standard PPE"
    ],
    correct: "Solvent-based adhesives, silica dust from drilling, or lead from old cable sheathing",
    explanation: "Hazardous substances relevant to electrical work can include solvents, dust from drilling/cutting (e.g. silica), and old materials such as lead in historic cable sheathing.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "What is the purpose of a Safety Data Sheet (SDS) for a hazardous substance?",
    options: [
      "To advertise the product",
      "To provide information on hazards, safe handling, storage and emergency measures for the substance",
      "To record delivery times only",
      "To set the product's price"
    ],
    correct: "To provide information on hazards, safe handling, storage and emergency measures for the substance",
    explanation: "An SDS gives detailed information on a substance's hazards, safe use, storage, handling and what to do in an emergency such as a spill or exposure.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "What is a common early symptom that may indicate exposure to hazardous dust or fumes?",
    options: [
      "Improved concentration",
      "Coughing, irritation to eyes/throat, or breathing difficulty",
      "No symptoms are ever felt",
      "Increased appetite"
    ],
    correct: "Coughing, irritation to eyes/throat, or breathing difficulty",
    explanation: "Exposure to hazardous dust or fumes can cause immediate symptoms like coughing, irritation and breathing difficulty, as well as longer-term health effects.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "Why is welfare provision (toilets, washing facilities, drinking water) a legal requirement on construction sites?",
    options: [
      "It is optional and not legally required",
      "To protect workers' basic health, hygiene and wellbeing while at work",
      "Only required for sites over a certain size",
      "Only required in summer months"
    ],
    correct: "To protect workers' basic health, hygiene and wellbeing while at work",
    explanation: "Construction (Design and Management) Regulations require adequate welfare facilities, recognising their importance to workers' health, hygiene and wellbeing.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "Why should hands be washed before eating on a construction site?",
    options: [
      "It is not necessary if gloves were worn",
      "To remove hazardous substances, dust or contaminants that could be ingested and cause harm",
      "Only for personal comfort",
      "It has no health benefit"
    ],
    correct: "To remove hazardous substances, dust or contaminants that could be ingested and cause harm",
    explanation: "Washing hands before eating, drinking or smoking prevents ingestion of hazardous substances that may have been handled during work.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "What historic building material is a well-known serious health hazard that electricians may encounter?",
    options: [
      "Plasterboard",
      "Asbestos",
      "PVC cable insulation",
      "Modern LED lighting"
    ],
    correct: "Asbestos",
    explanation: "Asbestos, once widely used in older buildings, is a serious inhalation hazard if disturbed, and requires specific precautions and, in many cases, specialist removal.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "What should you do if you suspect you have disturbed asbestos-containing material?",
    options: [
      "Continue working and clean it up yourself",
      "Stop work immediately, avoid disturbing it further, and report it following site procedures",
      "Sweep the area to clear the dust",
      "Ignore it if it looks like normal dust"
    ],
    correct: "Stop work immediately, avoid disturbing it further, and report it following site procedures",
    explanation: "Suspected asbestos should never be disturbed further; work must stop, the area should be left undisturbed, and the find reported so specialists can assess and manage it.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "What does 'HAVS' stand for, a condition associated with prolonged use of vibrating tools?",
    options: [
      "Hand-Arm Vibration Syndrome",
      "Heavy Appliance Voltage Standard",
      "High Ambient Vapour Sensitivity",
      "Hazardous Air Ventilation System"
    ],
    correct: "Hand-Arm Vibration Syndrome",
    explanation: "HAVS is a condition caused by prolonged exposure to hand-transmitted vibration, leading to circulatory, nerve and joint damage in the hands and arms.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "How can the risk of HAVS be reduced when using vibrating tools?",
    options: [
      "Use the tool for as long as possible without breaks",
      "Limit exposure time, use lower-vibration tools where possible, and take regular breaks",
      "There is no way to reduce this risk",
      "Only wear thicker gloves, which fully eliminate the risk"
    ],
    correct: "Limit exposure time, use lower-vibration tools where possible, and take regular breaks",
    explanation: "HAVS risk is managed by limiting daily exposure time to vibration, selecting lower-vibration equipment, and taking regular breaks, alongside health surveillance.",
    topic: "Health & Hygiene / COSHH"
  },
  {
    text: "Under the Work at Height Regulations, what is the first consideration when planning work at height?",
    options: [
      "Choosing the cheapest access equipment",
      "Whether the work at height can be avoided altogether",
      "Only what PPE to wear",
      "How quickly the task can be completed"
    ],
    correct: "Whether the work at height can be avoided altogether",
    explanation: "The hierarchy for work at height starts with avoiding it if reasonably practicable, before considering how to prevent falls, and finally minimising the distance/consequences of a fall.",
    topic: "Work at Height"
  },
  {
    text: "What is the correct hierarchy of control for work at height, after avoidance?",
    options: [
      "Prevent falls, then minimise the distance and consequences of a fall if it cannot be prevented",
      "Always use a harness regardless of other measures",
      "Minimise falls first, then prevent them",
      "There is no hierarchy, any method is acceptable"
    ],
    correct: "Prevent falls, then minimise the distance and consequences of a fall if it cannot be prevented",
    explanation: "After avoiding work at height where possible, the priority is to prevent falls (e.g. guard rails), then to minimise the distance and consequences of a fall that does occur.",
    topic: "Work at Height"
  },
  {
    text: "What should be checked before using a ladder for short-duration work?",
    options: [
      "Nothing, ladders do not require checks",
      "That it is suitable for the task, in good condition, correctly footed/secured, and used within its duty rating",
      "Only that it is the right colour",
      "Only the manufacturer's logo"
    ],
    correct: "That it is suitable for the task, in good condition, correctly footed/secured, and used within its duty rating",
    explanation: "A pre-use ladder check should confirm it is undamaged, suitable for the task, correctly positioned/secured, and rated for the intended use and load.",
    topic: "Work at Height"
  },
  {
    text: "What is the recommended angle for positioning a leaning ladder (the '1 in 4' rule)?",
    options: [
      "For every 1 unit out at the base, 4 units up (approximately 75 degrees)",
      "45 degrees exactly",
      "Vertical, with no lean at all",
      "There is no recommended angle"
    ],
    correct: "For every 1 unit out at the base, 4 units up (approximately 75 degrees)",
    explanation: "The 1-in-4 rule means the base should be positioned 1 unit away from the wall for every 4 units of height, giving an angle of roughly 75 degrees for stability.",
    topic: "Work at Height"
  },
  {
    text: "How far should a leaning ladder extend above the stepping-off point (e.g. a roof edge) if a handhold is needed?",
    options: [
      "No extension is needed",
      "At least 1 metre (approximately 5 rungs) above the landing point",
      "Exactly level with the landing point",
      "10cm above the landing point"
    ],
    correct: "At least 1 metre (approximately 5 rungs) above the landing point",
    explanation: "Guidance recommends a ladder extend at least 1m above the stepping-off point to provide a secure handhold when getting on or off.",
    topic: "Work at Height"
  },
  {
    text: "What is the main advantage of a Mobile Elevating Work Platform (MEWP) over a ladder for extended work at height?",
    options: [
      "It is always cheaper",
      "It can provide a stable, often guarded working platform, reducing fall risk for longer or more complex tasks",
      "It requires no training to operate",
      "It eliminates the need for any risk assessment"
    ],
    correct: "It can provide a stable, often guarded working platform, reducing fall risk for longer or more complex tasks",
    explanation: "A MEWP typically offers a stable platform with edge protection, better suited to extended or complex tasks than a ladder, though it requires trained/certified operators.",
    topic: "Work at Height"
  },
  {
    text: "What is a key hazard associated with using a MEWP near overhead power lines?",
    options: [
      "There is no risk from overhead lines",
      "Contact with or close approach to live overhead lines can cause serious injury or death",
      "MEWPs cannot be used outdoors",
      "Overhead lines only pose a risk to ladders, not MEWPs"
    ],
    correct: "Contact with or close approach to live overhead lines can cause serious injury or death",
    explanation: "MEWPs can reach significant heights, so safe clearance distances from overhead power lines must always be maintained to avoid contact or arcing.",
    topic: "Work at Height"
  },
  {
    text: "What should be checked before using a mobile tower scaffold?",
    options: [
      "Nothing, towers are inherently safe",
      "That it has been erected by a competent person, is on firm level ground, correctly braced, and has guard rails/toe boards fitted",
      "Only that the wheels are locked",
      "Only that it matches the site colour scheme"
    ],
    correct: "That it has been erected by a competent person, is on firm level ground, correctly braced, and has guard rails/toe boards fitted",
    explanation: "Mobile towers must be erected correctly by a trained/competent person, on stable ground, fully braced, with edge protection such as guard rails and toe boards.",
    topic: "Work at Height"
  },
  {
    text: "Why must a mobile tower never be moved while someone is standing on it?",
    options: [
      "It has no additional risk",
      "Moving a tower with someone on it risks the tower toppling or the person falling",
      "It is faster to move with someone on it",
      "There is no rule against this"
    ],
    correct: "Moving a tower with someone on it risks the tower toppling or the person falling",
    explanation: "A mobile tower must always be vacated before moving, as movement with a person on the platform significantly increases the risk of instability and falls.",
    topic: "Work at Height"
  },
  {
    text: "What is the purpose of guard rails and toe boards on a working platform?",
    options: [
      "Decoration",
      "To prevent people falling from the edge and to stop tools/materials falling and striking people below",
      "To increase the platform's load capacity",
      "To provide electrical earthing"
    ],
    correct: "To prevent people falling from the edge and to stop tools/materials falling and striking people below",
    explanation: "Guard rails prevent falls from height, while toe boards stop tools and materials being kicked or knocked off the edge onto people below.",
    topic: "Work at Height"
  },
  {
    text: "What is a 'fall arrest' system designed to do?",
    options: [
      "Prevent a fall from beginning at all",
      "Safely stop and limit the distance/impact of a fall that has already begun, using a harness and lanyard",
      "Only alert others that a fall has occurred",
      "Increase working speed at height"
    ],
    correct: "Safely stop and limit the distance/impact of a fall that has already begun, using a harness and lanyard",
    explanation: "Fall arrest equipment, such as a full body harness with an energy-absorbing lanyard, is designed to safely stop a fall that has begun and limit the forces on the body.",
    topic: "Work at Height"
  },
  {
    text: "What is the difference between fall restraint and fall arrest equipment?",
    options: [
      "There is no difference",
      "Restraint prevents a person reaching a position where they could fall; arrest safely stops a fall that has already begun",
      "Arrest prevents falls; restraint stops them",
      "Restraint is only used indoors"
    ],
    correct: "Restraint prevents a person reaching a position where they could fall; arrest safely stops a fall that has already begun",
    explanation: "Fall restraint physically limits how far a person can move, preventing them reaching a fall hazard, while fall arrest allows movement but safely stops an actual fall.",
    topic: "Work at Height"
  },
  {
    text: "What should be inspected on a harness before use?",
    options: [
      "Nothing, harnesses require no checks",
      "Webbing for cuts/fraying, stitching, buckles, and the D-ring for damage or corrosion",
      "Only its colour",
      "Only the size label"
    ],
    correct: "Webbing for cuts/fraying, stitching, buckles, and the D-ring for damage or corrosion",
    explanation: "A pre-use harness inspection should check webbing, stitching, buckles and metal fittings for wear, damage or corrosion that could compromise its strength.",
    topic: "Work at Height"
  },
  {
    text: "What is a 'rescue plan' in relation to work at height with fall arrest equipment?",
    options: [
      "Not required if a harness is worn",
      "A pre-planned procedure for promptly rescuing a suspended person after a fall, to prevent suspension trauma",
      "A plan for evacuating the whole building",
      "A plan only needed for work below ground"
    ],
    correct: "A pre-planned procedure for promptly rescuing a suspended person after a fall, to prevent suspension trauma",
    explanation: "A rescue plan ensures a fallen, suspended worker can be rescued quickly, as prolonged suspension in a harness can cause dangerous suspension trauma.",
    topic: "Work at Height"
  },
  {
    text: "What is a stepladder's 'duty rating' intended to indicate?",
    options: [
      "Its colour classification",
      "The maximum safe load it is designed to carry for its intended use (e.g. industrial, trade, domestic)",
      "Its resistance to weather",
      "Its resale value"
    ],
    correct: "The maximum safe load it is designed to carry for its intended use (e.g. industrial, trade, domestic)",
    explanation: "Duty ratings classify ladders/stepladders by their maximum safe working load and suitability for different levels of use, from domestic to heavy industrial.",
    topic: "Work at Height"
  },
  {
    text: "Under HASAWA 1974, what must an employer do 'so far as is reasonably practicable'?",
    options: [
      "Nothing specific is required",
      "Ensure the health, safety and welfare of employees at work",
      "Only insure the business",
      "Only provide a canteen"
    ],
    correct: "Ensure the health, safety and welfare of employees at work",
    explanation: "Section 2 of HASAWA requires employers to ensure, so far as reasonably practicable, the health, safety and welfare of their employees while at work.",
    topic: "Legislation"
  },
  {
    text: "What does CDM stand for in UK construction legislation?",
    options: [
      "Construction (Design and Management) Regulations",
      "Certified Design Methodology",
      "Contractor Duty Management",
      "Construction Direct Materials"
    ],
    correct: "Construction (Design and Management) Regulations",
    explanation: "CDM Regulations set out duties for managing health, safety and welfare risks when carrying out construction projects, applying to clients, designers and contractors.",
    topic: "Legislation"
  },
  {
    text: "Who is a 'Principal Contractor' under CDM Regulations?",
    options: [
      "Any subcontractor on site",
      "The contractor appointed by the client to plan, manage, monitor and coordinate health and safety during the construction phase where there is more than one contractor",
      "The building's future occupier",
      "The local authority"
    ],
    correct: "The contractor appointed by the client to plan, manage, monitor and coordinate health and safety during the construction phase where there is more than one contractor",
    explanation: "Under CDM, the Principal Contractor coordinates health and safety arrangements during the construction phase on projects involving more than one contractor.",
    topic: "Legislation"
  },
  {
    text: "What are the Electricity at Work Regulations 1989 primarily concerned with?",
    options: [
      "Electricity billing disputes",
      "Preventing danger and injury from the use of electricity at work",
      "Only domestic electrical installations",
      "Only the supply of electricity by DNOs"
    ],
    correct: "Preventing danger and injury from the use of electricity at work",
    explanation: "EAWR 1989 places duties on employers and workers to prevent danger from electrical systems, covering areas such as safe systems of work, competence and equipment maintenance.",
    topic: "Legislation"
  },
  {
    text: "What is required by Regulation 4 of the Electricity at Work Regulations 1989 regarding electrical systems?",
    options: [
      "No specific requirement",
      "All electrical systems must be constructed and maintained so as to prevent danger, so far as reasonably practicable",
      "Only new systems need to be maintained",
      "Only systems above 1000V are covered"
    ],
    correct: "All electrical systems must be constructed and maintained so as to prevent danger, so far as reasonably practicable",
    explanation: "Regulation 4 requires electrical systems to be of construction that prevents danger, and to be maintained in that condition throughout their working life.",
    topic: "Legislation"
  },
  {
    text: "What does LOLER stand for, and what does it cover?",
    options: [
      "Lifting Operations and Lifting Equipment Regulations — covers safe use of lifting equipment",
      "Local Officer Legal Enforcement Rules — covers council inspections",
      "Low Load Electrical Regulations — covers reduced voltage systems",
      "Ladders Only Legislation for Elevated Roles"
    ],
    correct: "Lifting Operations and Lifting Equipment Regulations — covers safe use of lifting equipment",
    explanation: "LOLER requires lifting equipment to be safe, suitable, positioned correctly, and thoroughly examined and inspected at required intervals.",
    topic: "Legislation"
  },
  {
    text: "What are the Manual Handling Operations Regulations 1992 primarily concerned with?",
    options: [
      "Electrical safety",
      "Reducing the risk of injury from manual handling activities such as lifting, carrying and pushing",
      "Fire prevention",
      "Chemical storage"
    ],
    correct: "Reducing the risk of injury from manual handling activities such as lifting, carrying and pushing",
    explanation: "These regulations require employers to avoid manual handling where reasonably practicable and, where it cannot be avoided, to assess and reduce the risk of injury.",
    topic: "Legislation"
  },
  {
    text: "What are the Personal Protective Equipment at Work Regulations 1992 concerned with?",
    options: [
      "Requiring suitable PPE to be provided and used where risks cannot be adequately controlled by other means",
      "Only fire extinguisher provision",
      "Only vehicle safety",
      "Requiring PPE to be purchased by employees"
    ],
    correct: "Requiring suitable PPE to be provided and used where risks cannot be adequately controlled by other means",
    explanation: "These regulations require employers to provide suitable PPE free of charge where risk cannot be adequately controlled by other means, and ensure it is properly used and maintained.",
    topic: "Legislation"
  },
  {
    text: "What is BS 7671 commonly known as?",
    options: [
      "The Building Regulations",
      "The IET Wiring Regulations",
      "The Health and Safety at Work Act",
      "The Fire Safety Order"
    ],
    correct: "The IET Wiring Regulations",
    explanation: "BS 7671 is the national standard for electrical installations in the UK, commonly referred to as the IET Wiring Regulations.",
    topic: "Legislation"
  },
  {
    text: "Is BS 7671 (the IET Wiring Regulations) itself a statutory legal requirement in the UK?",
    options: [
      "Yes, it is a direct Act of Parliament",
      "No, but compliance is widely accepted as evidence of meeting the statutory requirements of the Electricity at Work Regulations and Building Regulations",
      "It has no relevance to legal compliance",
      "It only applies to industrial installations"
    ],
    correct: "No, but compliance is widely accepted as evidence of meeting the statutory requirements of the Electricity at Work Regulations and Building Regulations",
    explanation: "BS 7671 is a non-statutory British Standard, but following it is generally regarded as satisfying the legal requirements of EAWR and relevant Building Regulations.",
    topic: "Legislation"
  },
  {
    text: "What is the first priority when approaching a casualty who may have received an electric shock?",
    options: [
      "Touch them immediately to check for a response",
      "Ensure the area/supply is made safe before approaching, to avoid becoming a casualty yourself",
      "Move them immediately regardless of the source",
      "Call for an ambulance and do nothing else"
    ],
    correct: "Ensure the area/supply is made safe before approaching, to avoid becoming a casualty yourself",
    explanation: "You must never touch someone still in contact with a live source; isolate the supply first (or use a non-conductive item to break contact) to avoid becoming a casualty yourself.",
    topic: "First Aid"
  },
  {
    text: "What should you do if you cannot immediately isolate the electrical supply to a casualty?",
    options: [
      "Touch the casualty to pull them away",
      "Use a non-conductive item (e.g. dry wooden broom handle) to separate them from the source, without touching them directly",
      "Wait indefinitely for someone else to help",
      "Pour water on the area"
    ],
    correct: "Use a non-conductive item (e.g. dry wooden broom handle) to separate them from the source, without touching them directly",
    explanation: "If isolation is not immediately possible, a dry, non-conductive object can be used to break contact between the casualty and the electrical source, avoiding direct contact.",
    topic: "First Aid"
  },
  {
    text: "What does the acronym DRABC (or DR ABC) stand for in first aid?",
    options: [
      "Danger, Response, Airway, Breathing, Circulation",
      "Deliver, Reassure, Assist, Bandage, Call",
      "Diagnose, Report, Act, Bind, Complete",
      "Detect, React, Advise, Balance, Confirm"
    ],
    correct: "Danger, Response, Airway, Breathing, Circulation",
    explanation: "DRABC is a common first aid memory aid: check for Danger, assess Response, check Airway, check Breathing, and assess Circulation.",
    topic: "First Aid"
  },
  {
    text: "What is the correct compression rate for adult CPR, as commonly taught?",
    options: [
      "Around 10-20 compressions per minute",
      "Around 100-120 compressions per minute",
      "Around 300 compressions per minute",
      "There is no target rate"
    ],
    correct: "Around 100-120 compressions per minute",
    explanation: "Current UK first aid guidance recommends chest compressions at a rate of approximately 100-120 per minute for adult CPR.",
    topic: "First Aid"
  },
  {
    text: "What is the recommended compression-to-breath ratio for adult CPR by a lay first aider?",
    options: [
      "30 compressions to 2 rescue breaths",
      "5 compressions to 5 breaths",
      "50 compressions to 1 breath",
      "1 compression to 1 breath"
    ],
    correct: "30 compressions to 2 rescue breaths",
    explanation: "Standard adult CPR guidance for lay rescuers is 30 chest compressions followed by 2 rescue breaths, repeated continuously until help arrives or the casualty recovers.",
    topic: "First Aid"
  },
  {
    text: "What is an AED?",
    options: [
      "Automated External Defibrillator, used to help restore a normal heart rhythm during cardiac arrest",
      "A type of fire extinguisher",
      "An electrical test instrument",
      "A first aid dressing"
    ],
    correct: "Automated External Defibrillator, used to help restore a normal heart rhythm during cardiac arrest",
    explanation: "An AED delivers a controlled electric shock to help restore a normal heart rhythm in someone suffering cardiac arrest, guiding the user with voice prompts.",
    topic: "First Aid"
  },
  {
    text: "What should you do first when treating a minor burn from a hot surface or minor electrical arc?",
    options: [
      "Apply butter or oil to the burn",
      "Cool the burn under cool running water for at least 20 minutes",
      "Pop any blisters immediately",
      "Apply ice directly to the skin"
    ],
    correct: "Cool the burn under cool running water for at least 20 minutes",
    explanation: "Current first aid guidance recommends cooling a burn under cool (not ice-cold) running water for at least 20 minutes, and never applying creams, oils or ice directly.",
    topic: "First Aid"
  },
  {
    text: "What should you never do to a burn injury, according to standard first aid practice?",
    options: [
      "Cool it with running water",
      "Apply creams, oils, or burst blisters, or use ice directly on the burn",
      "Remove jewellery or tight clothing near the area before swelling starts",
      "Cover it with a clean, non-fluffy dressing once cooled"
    ],
    correct: "Apply creams, oils, or burst blisters, or use ice directly on the burn",
    explanation: "Creams, oils and ice can worsen burn injuries or increase infection risk; blisters should also never be deliberately burst.",
    topic: "First Aid"
  },
  {
    text: "What is the first step in treating severe external bleeding?",
    options: [
      "Apply firm, direct pressure to the wound, ideally with a clean dressing",
      "Wash the wound thoroughly first",
      "Apply a tourniquet immediately in all cases",
      "Elevate the limb only, with no pressure applied"
    ],
    correct: "Apply firm, direct pressure to the wound, ideally with a clean dressing",
    explanation: "Direct, firm pressure on a bleeding wound is the primary first aid response to control severe bleeding while help is sought.",
    topic: "First Aid"
  },
  {
    text: "Why is it important to report and record even minor first aid incidents at work?",
    options: [
      "It is not necessary for minor injuries",
      "To maintain accurate records, identify trends, and meet legal recording/reporting requirements",
      "Only to satisfy insurance companies",
      "Only serious injuries need recording"
    ],
    correct: "To maintain accurate records, identify trends, and meet legal recording/reporting requirements",
    explanation: "Recording all incidents, even minor ones, in an accident book helps identify patterns, supports investigations, and ensures compliance with reporting obligations such as RIDDOR where thresholds are met.",
    topic: "First Aid"
  },
  {
    text: "What should you check for before giving rescue breaths in CPR?",
    options: [
      "That the casualty's airway is open and clear of obstructions",
      "That the casualty is wearing PPE",
      "That the room temperature is comfortable",
      "That the casualty's phone is nearby"
    ],
    correct: "That the casualty's airway is open and clear of obstructions",
    explanation: "The airway should be opened (e.g. head tilt, chin lift) and checked for obstructions before attempting rescue breaths, to ensure air can reach the lungs.",
    topic: "First Aid"
  },
  {
    text: "What is a permit-to-work system used for?",
    options: [
      "Recording staff wages",
      "Formally authorising and controlling high-risk activities, ensuring precautions are in place before work starts",
      "Booking annual leave",
      "Ordering materials"
    ],
    correct: "Formally authorising and controlling high-risk activities, ensuring precautions are in place before work starts",
    explanation: "A permit-to-work is a formal document confirming that specific precautions have been taken and checked before high-risk work, such as work in confined spaces or on high-voltage systems, can begin.",
    topic: "Site Safety"
  },
  {
    text: "What should you do if you see an unsafe act or condition on site that you cannot immediately correct?",
    options: [
      "Ignore it, it is not your responsibility",
      "Report it to your supervisor or the relevant person as soon as possible",
      "Only tell your friends about it",
      "Wait until the end of the day"
    ],
    correct: "Report it to your supervisor or the relevant person as soon as possible",
    explanation: "Everyone has a duty to report hazards they identify, even if they cannot fix them personally, so the risk can be managed promptly.",
    topic: "Site Safety"
  },
  {
    text: "What is the purpose of signage such as 'Hard Hat Area' on a construction site?",
    options: [
      "Decoration",
      "To warn of a specific hazard and mandate the required precaution/PPE in that area",
      "To indicate a smoking area",
      "To show where deliveries are made"
    ],
    correct: "To warn of a specific hazard and mandate the required precaution/PPE in that area",
    explanation: "Mandatory signage such as 'Hard Hat Area' communicates a specific hazard (e.g. falling objects) and the required control measure (wearing a hard hat) in that zone.",
    topic: "Site Safety"
  },
  {
    text: "What is a confined space, in general health and safety terms?",
    options: [
      "Any small room in a building",
      "A space substantially (though not always entirely) enclosed, where there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions",
      "Only underground tunnels",
      "Any outdoor space"
    ],
    correct: "A space substantially (though not always entirely) enclosed, where there is a reasonably foreseeable risk of serious injury from hazardous substances or conditions",
    explanation: "A confined space is defined by the specified risks present (e.g. lack of oxygen, toxic gas, engulfment), not just by its physical size or enclosure.",
    topic: "Site Safety"
  },
  {
    text: "What should be done before entering a confined space?",
    options: [
      "Enter immediately if the task is urgent",
      "Carry out a specific risk assessment, obtain necessary permits, and ensure rescue arrangements are in place",
      "Only wear a hard hat",
      "No special precautions are needed"
    ],
    correct: "Carry out a specific risk assessment, obtain necessary permits, and ensure rescue arrangements are in place",
    explanation: "Entry into a confined space should only proceed after a specific risk assessment, appropriate permits, atmosphere testing and rescue arrangements are confirmed.",
    topic: "Site Safety"
  },
  {
    text: "Why should excavations on site be barriered off and clearly signed?",
    options: [
      "To prevent falls into the excavation and warn of the hazard",
      "It is not necessary if the excavation is shallow",
      "Only required at night",
      "To improve the appearance of the site"
    ],
    correct: "To prevent falls into the excavation and warn of the hazard",
    explanation: "Excavations present a fall and collapse hazard and must be effectively barriered and signed to protect workers and visitors from accidentally entering or falling in.",
    topic: "Site Safety"
  },
  {
    text: "What is the purpose of a Risk Assessment and Method Statement (RAMS)?",
    options: [
      "To record wages paid to workers",
      "To identify hazards, assess risks, and set out the safe sequence and control measures for carrying out a task",
      "To replace the need for training",
      "To order materials for a job"
    ],
    correct: "To identify hazards, assess risks, and set out the safe sequence and control measures for carrying out a task",
    explanation: "RAMS combine a risk assessment (hazards and controls) with a method statement (the safe sequence of work), providing a documented plan for carrying out a task safely.",
    topic: "Site Safety"
  },
  {
    text: "Who should read and understand the RAMS relevant to a task before starting work?",
    options: [
      "Only the site manager",
      "Everyone involved in carrying out the task",
      "No one needs to read it if experienced",
      "Only apprentices"
    ],
    correct: "Everyone involved in carrying out the task",
    explanation: "Everyone carrying out a task should understand the relevant RAMS, as it sets out the hazards and controls specific to that work.",
    topic: "Site Safety"
  },
  {
    text: "What is the purpose of segregating pedestrians from vehicle/plant routes on a busy construction site?",
    options: [
      "To reduce noise only",
      "To reduce the risk of people being struck by moving vehicles or plant",
      "To improve site appearance",
      "It is not an important consideration"
    ],
    correct: "To reduce the risk of people being struck by moving vehicles or plant",
    explanation: "Separating pedestrian routes from vehicle and plant movement areas significantly reduces the risk of collisions and being struck by moving machinery.",
    topic: "Site Safety"
  },
  {
    text: "What should you do if asked to carry out a task you believe is unsafe?",
    options: [
      "Carry it out anyway to avoid conflict",
      "Raise your concerns with your supervisor and, where necessary, refuse to proceed until it is made safe",
      "Do it quickly without telling anyone",
      "Ask a less experienced colleague to do it instead"
    ],
    correct: "Raise your concerns with your supervisor and, where necessary, refuse to proceed until it is made safe",
    explanation: "Workers have a right, and often a legal protection, to refuse work they reasonably believe presents a serious and imminent danger, after raising their concerns appropriately.",
    topic: "Site Safety"
  },
  {
    text: "What is a common hazard associated with working near unprotected floor openings?",
    options: [
      "Falls through the opening",
      "There is no significant hazard",
      "Only a hazard for children",
      "Only relevant in domestic properties"
    ],
    correct: "Falls through the opening",
    explanation: "Unprotected floor and roof openings present a serious fall hazard and should be covered, guarded, or otherwise made safe.",
    topic: "Site Safety"
  },
  {
    text: "What is the purpose of a banksman (traffic marshal) on a site with vehicle movements?",
    options: [
      "To operate vehicles remotely",
      "To help guide vehicles safely and warn pedestrians of vehicle movements, especially during reversing",
      "To repair vehicles",
      "To collect delivery invoices"
    ],
    correct: "To help guide vehicles safely and warn pedestrians of vehicle movements, especially during reversing",
    explanation: "A banksman assists drivers, particularly during reversing or manoeuvring in restricted areas, and helps protect pedestrians from vehicle movement hazards.",
    topic: "Site Safety"
  },
  {
    text: "What is the main difference between a single-phase and a three-phase induction motor?",
    options: [
      "Single-phase motors typically require a starting mechanism (e.g. capacitor) as they have no inherent rotating field at standstill; three-phase motors self-start due to their natural rotating field",
      "Three-phase motors always run slower",
      "Single-phase motors are always more powerful",
      "There is no significant difference"
    ],
    correct: "Single-phase motors typically require a starting mechanism (e.g. capacitor) as they have no inherent rotating field at standstill; three-phase motors self-start due to their natural rotating field",
    explanation: "A three-phase supply naturally produces a rotating magnetic field, allowing self-starting, while single-phase motors need additional starting components such as capacitors to begin rotation.",
    topic: "Motors & Control"
  },
  {
    text: "What is the purpose of a motor overload protection device (thermal overload relay)?",
    options: [
      "To increase motor speed",
      "To disconnect the motor if it draws excessive current for too long, protecting it from overheating damage",
      "To provide earth fault protection only",
      "To reverse the motor automatically"
    ],
    correct: "To disconnect the motor if it draws excessive current for too long, protecting it from overheating damage",
    explanation: "Thermal overload relays monitor motor current and disconnect the supply if sustained overcurrent (e.g. from a stalled or overloaded motor) risks overheating and damage.",
    topic: "Motors & Control"
  },
  {
    text: "What is a Variable Frequency Drive (VFD) used for?",
    options: [
      "To convert AC to DC only for storage",
      "To control motor speed and torque by varying the frequency (and voltage) of the supply to the motor",
      "To provide lighting control",
      "To replace the need for overload protection"
    ],
    correct: "To control motor speed and torque by varying the frequency (and voltage) of the supply to the motor",
    explanation: "A VFD (or inverter) varies the frequency and voltage supplied to an AC motor, allowing precise control of its speed and torque, and often reducing starting current.",
    topic: "Motors & Control"
  },
  {
    text: "What is 'interlocking' in a motor control circuit, such as a forward/reverse starter?",
    options: [
      "Connecting two motors in series",
      "A safety arrangement preventing two conflicting contactors (e.g. forward and reverse) from being energised at the same time",
      "A method for reducing motor noise",
      "A way to bypass overload protection"
    ],
    correct: "A safety arrangement preventing two conflicting contactors (e.g. forward and reverse) from being energised at the same time",
    explanation: "Interlocking, whether electrical or mechanical, prevents simultaneous operation of contactors that would otherwise create a dangerous short circuit or conflicting motor command.",
    topic: "Motors & Control"
  },
  {
    text: "What is the purpose of an emergency stop button on a motor-driven machine?",
    options: [
      "To adjust motor speed",
      "To immediately remove power from the machine in the event of danger",
      "To start the machine quickly",
      "To display the machine's operating hours"
    ],
    correct: "To immediately remove power from the machine in the event of danger",
    explanation: "Emergency stop devices are designed to rapidly disconnect power to remove danger, and must be easily accessible, clearly identified, and require deliberate reset before restarting.",
    topic: "Motors & Control"
  },
  {
    text: "Why must an emergency stop typically be a latching, manually reset device rather than momentary?",
    options: [
      "To prevent the machine restarting automatically once the danger has passed, without deliberate reset by an operator",
      "It has no particular reason",
      "To save on wiring costs",
      "So it can be reset remotely without checking the machine"
    ],
    correct: "To prevent the machine restarting automatically once the danger has passed, without deliberate reset by an operator",
    explanation: "A latching emergency stop stays engaged until manually released, ensuring the machine cannot restart automatically before it has been confirmed safe to do so.",
    topic: "Motors & Control"
  },
  {
    text: "What does a control transformer typically do in a motor control panel?",
    options: [
      "Increases the motor's running speed",
      "Steps down the supply voltage to a lower, safer voltage for the control circuit (e.g. 110V or 24V)",
      "Provides earthing for the panel",
      "Replaces the need for a contactor"
    ],
    correct: "Steps down the supply voltage to a lower, safer voltage for the control circuit (e.g. 110V or 24V)",
    explanation: "A control transformer reduces the main supply voltage to a lower voltage used for control circuitry (pushbuttons, relays), improving safety for operators.",
    topic: "Motors & Control"
  },
  {
    text: "What is the main advantage of LED lighting compared with traditional incandescent lighting?",
    options: [
      "LEDs are always cheaper to purchase",
      "LEDs are significantly more energy efficient and have a much longer lifespan",
      "LEDs produce more heat for warmth",
      "LEDs cannot be dimmed under any circumstances"
    ],
    correct: "LEDs are significantly more energy efficient and have a much longer lifespan",
    explanation: "LED lighting converts a much higher proportion of electrical energy into light rather than heat, and typically lasts far longer than incandescent lamps.",
    topic: "Lighting"
  },
  {
    text: "What is a common cause of flickering when dimming LED lamps with an incompatible dimmer?",
    options: [
      "LEDs never flicker",
      "Using a dimmer designed for resistive (incandescent) loads rather than one compatible with LED drivers",
      "Using too thick a cable",
      "Using an RCD in the circuit"
    ],
    correct: "Using a dimmer designed for resistive (incandescent) loads rather than one compatible with LED drivers",
    explanation: "LED lamps require dimmers specifically designed for their driver characteristics; using an incompatible leading-edge dimmer intended for resistive loads can cause flickering or buzzing.",
    topic: "Lighting"
  },
  {
    text: "What is the purpose of emergency lighting in a commercial building?",
    options: [
      "To decorate the building",
      "To provide illumination automatically in the event of a mains failure, allowing safe evacuation",
      "To reduce energy bills",
      "To replace normal lighting entirely"
    ],
    correct: "To provide illumination automatically in the event of a mains failure, allowing safe evacuation",
    explanation: "Emergency lighting automatically activates on loss of the normal supply, illuminating escape routes so occupants can evacuate safely.",
    topic: "Lighting"
  },
  {
    text: "How often should emergency lighting typically undergo a brief functional test, per common UK guidance?",
    options: [
      "Never, once installed it requires no further testing",
      "Monthly, with a full duration test annually",
      "Only every 10 years",
      "Only when a fault is suspected"
    ],
    correct: "Monthly, with a full duration test annually",
    explanation: "Common UK guidance (e.g. BS 5266) recommends a brief monthly functional test and a full-duration test annually to confirm the batteries can sustain emergency operation for the required period.",
    topic: "Lighting"
  },
  {
    text: "What does 'lux' measure in relation to lighting?",
    options: [
      "The colour temperature of a lamp",
      "The level of illuminance (light falling on a surface)",
      "The power consumption of a fitting",
      "The lifespan of a lamp"
    ],
    correct: "The level of illuminance (light falling on a surface)",
    explanation: "Lux is the SI unit of illuminance, measuring the amount of light falling on a given surface area.",
    topic: "Lighting"
  },
  {
    text: "What does 'colour temperature', measured in Kelvin, describe for a light source?",
    options: [
      "The physical temperature of the lamp",
      "The appearance of the light produced, from warm (yellowish) to cool (bluish white)",
      "The power rating of the lamp",
      "The lamp's expected lifespan"
    ],
    correct: "The appearance of the light produced, from warm (yellowish) to cool (bluish white)",
    explanation: "Colour temperature describes the visual warmth or coolness of light produced, with lower Kelvin values appearing warmer/yellower and higher values appearing cooler/bluer.",
    topic: "Lighting"
  },
  {
    text: "What is a two-way lighting switching arrangement used for?",
    options: [
      "Controlling a light from two separate switch locations, such as top and bottom of a staircase",
      "Controlling two separate lights from one switch",
      "Providing emergency lighting only",
      "Dimming a light automatically"
    ],
    correct: "Controlling a light from two separate switch locations, such as top and bottom of a staircase",
    explanation: "Two-way switching allows a single light to be turned on or off from either of two different switch locations, commonly used on stairs and in hallways.",
    topic: "Lighting"
  },
  {
    text: "What is an intermediate switch used for in lighting circuits?",
    options: [
      "To allow control of a single light from three or more switch positions, used with two-way switches",
      "To dim the light automatically",
      "To provide RCD protection",
      "It is only used for outdoor lighting"
    ],
    correct: "To allow control of a single light from three or more switch positions, used with two-way switches",
    explanation: "Intermediate switches are inserted between two two-way switches to allow control of a light from three or more locations.",
    topic: "Lighting"
  },
  {
    text: "What is the purpose of a PIR (passive infrared) sensor in a lighting circuit?",
    options: [
      "To measure voltage",
      "To automatically switch lighting on when it detects movement/heat, often used for security or energy-saving purposes",
      "To dim lighting based on daylight only",
      "To provide surge protection"
    ],
    correct: "To automatically switch lighting on when it detects movement/heat, often used for security or energy-saving purposes",
    explanation: "PIR sensors detect changes in infrared radiation (typically from movement of a warm body) and automatically switch connected lighting on, commonly used for security and energy efficiency.",
    topic: "Lighting"
  },
  {
    text: "What is the main purpose of a fire alarm system in a building?",
    options: [
      "To provide background music",
      "To detect a fire early and alert occupants so they can evacuate safely",
      "To control lighting levels",
      "To measure temperature only, without alerting anyone"
    ],
    correct: "To detect a fire early and alert occupants so they can evacuate safely",
    explanation: "A fire alarm system is designed to detect the presence of fire (via smoke, heat or manual call points) and alert occupants promptly so they can evacuate.",
    topic: "Alarm Systems"
  },
  {
    text: "What is a manual call point (MCP) on a fire alarm system?",
    options: [
      "An automatic smoke detector",
      "A device that a person operates manually (e.g. breaking the glass) to raise the fire alarm",
      "A speaker for voice alarm messages",
      "A backup battery unit"
    ],
    correct: "A device that a person operates manually (e.g. breaking the glass) to raise the fire alarm",
    explanation: "A manual call point allows a person who discovers a fire to raise the alarm manually, typically by breaking a glass element or pressing a button.",
    topic: "Alarm Systems"
  },
  {
    text: "What is the difference between an optical smoke detector and a heat detector?",
    options: [
      "There is no difference",
      "An optical smoke detector responds to smoke particles; a heat detector responds to a rise in temperature",
      "Heat detectors are always more sensitive than smoke detectors",
      "Optical detectors respond only to heat"
    ],
    correct: "An optical smoke detector responds to smoke particles; a heat detector responds to a rise in temperature",
    explanation: "Optical (photoelectric) smoke detectors sense smoke particles scattering light, while heat detectors respond to a rise in temperature, and are chosen based on the environment and likely fire type.",
    topic: "Alarm Systems"
  },
  {
    text: "Why might heat detectors be preferred over smoke detectors in a kitchen area?",
    options: [
      "Heat detectors are cheaper in all cases",
      "To reduce false alarms caused by cooking fumes/steam that could trigger smoke detectors",
      "Kitchens never require fire detection",
      "Heat detectors detect fires faster in every situation"
    ],
    correct: "To reduce false alarms caused by cooking fumes/steam that could trigger smoke detectors",
    explanation: "Cooking activities can generate smoke, steam and fumes that trigger false alarms on smoke detectors, so heat detectors are often more suitable in kitchen environments.",
    topic: "Alarm Systems"
  },
  {
    text: "What is a 'zone' in a conventional fire alarm panel?",
    options: [
      "A single device only",
      "A defined area of the building, allowing the panel to indicate roughly where a triggered detector or call point is located",
      "A type of cable used only for alarms",
      "The building's postcode area"
    ],
    correct: "A defined area of the building, allowing the panel to indicate roughly where a triggered detector or call point is located",
    explanation: "Conventional fire alarm systems divide the building into zones, so the panel can indicate which general area has triggered an alarm.",
    topic: "Alarm Systems"
  },
  {
    text: "What is the main advantage of an addressable fire alarm system over a conventional system?",
    options: [
      "It has no particular advantage",
      "Each device has a unique address, allowing the panel to identify the exact device that triggered, rather than just a general zone",
      "Addressable systems do not need testing",
      "It uses no cabling"
    ],
    correct: "Each device has a unique address, allowing the panel to identify the exact device that triggered, rather than just a general zone",
    explanation: "Addressable systems can pinpoint the specific device that has activated, giving much more precise location information than a conventional zone-based system.",
    topic: "Alarm Systems"
  },
  {
    text: "What is the purpose of a weekly fire alarm test?",
    options: [
      "To replace the need for annual servicing",
      "To confirm the system and a sample call point/sounder are operating correctly, and staff can hear the alarm",
      "To reset the fire alarm's internal clock",
      "It is not a recommended practice"
    ],
    correct: "To confirm the system and a sample call point/sounder are operating correctly, and staff can hear the alarm",
    explanation: "A routine weekly test (activating a different call point each week) confirms the system remains operational and audible throughout the building, alongside full annual servicing.",
    topic: "Alarm Systems"
  },
  {
    text: "What is an intruder alarm PIR sensor primarily designed to detect?",
    options: [
      "Smoke",
      "Movement, via changes in infrared radiation within its detection zone",
      "Water leaks",
      "Gas leaks"
    ],
    correct: "Movement, via changes in infrared radiation within its detection zone",
    explanation: "Intruder alarm PIR sensors detect movement by sensing changes in infrared radiation, typically triggered by a person moving through the detection zone.",
    topic: "Alarm Systems"
  },
  {
    text: "What is the purpose of a keypad on an intruder alarm system?",
    options: [
      "To control building lighting",
      "To allow authorised users to arm/disarm the system using a code",
      "To display the time only",
      "To adjust the fire alarm sensitivity"
    ],
    correct: "To allow authorised users to arm/disarm the system using a code",
    explanation: "The keypad allows authorised users to enter a code to set (arm) or unset (disarm) the intruder alarm system.",
    topic: "Alarm Systems"
  },
  {
    text: "What is a backup battery in a fire or intruder alarm panel used for?",
    options: [
      "To increase alarm volume",
      "To keep the system operational in the event of a mains power failure",
      "To power lighting circuits",
      "It has no practical purpose"
    ],
    correct: "To keep the system operational in the event of a mains power failure",
    explanation: "Alarm panels are fitted with backup batteries so they continue to operate and provide protection even if the mains supply is interrupted.",
    topic: "Alarm Systems"
  },
  {
    text: "What is the basic function of a solar photovoltaic (PV) panel?",
    options: [
      "To store electrical energy",
      "To convert sunlight directly into DC electricity",
      "To generate AC electricity directly with no conversion",
      "To heat water directly using electrical resistance"
    ],
    correct: "To convert sunlight directly into DC electricity",
    explanation: "Solar PV panels use the photovoltaic effect to convert sunlight directly into DC electricity, which is then typically converted to AC for use in a building.",
    topic: "Renewables"
  },
  {
    text: "What is the role of an inverter in a solar PV system?",
    options: [
      "To generate sunlight artificially",
      "To convert the DC electricity produced by the panels into AC electricity suitable for the building/grid",
      "To store excess energy chemically",
      "To measure wind speed"
    ],
    correct: "To convert the DC electricity produced by the panels into AC electricity suitable for the building/grid",
    explanation: "An inverter converts the DC output of solar panels into AC electricity compatible with the building's wiring and the public grid.",
    topic: "Renewables"
  },
  {
    text: "What is a battery energy storage system (BESS) typically used for in a domestic renewable installation?",
    options: [
      "To generate electricity from sunlight directly",
      "To store surplus energy (e.g. from solar PV) for later use, improving self-consumption",
      "To convert AC to a higher voltage",
      "To replace the need for a consumer unit"
    ],
    correct: "To store surplus energy (e.g. from solar PV) for later use, improving self-consumption",
    explanation: "Battery storage systems store excess generated energy so it can be used later, for example in the evening when solar generation has stopped, improving overall energy self-consumption.",
    topic: "Renewables"
  },
  {
    text: "What electrical consideration is important when installing an EV (electric vehicle) charge point?",
    options: [
      "No special considerations are needed beyond a standard socket",
      "Assessing supply capacity, providing appropriate earthing/protection (e.g. against PME issues), and correct circuit design per BS 7671 Section 722",
      "EV chargers cannot be hardwired",
      "EV chargers do not require RCD protection"
    ],
    correct: "Assessing supply capacity, providing appropriate earthing/protection (e.g. against PME issues), and correct circuit design per BS 7671 Section 722",
    explanation: "EV charge point installations require specific consideration of supply capacity, earthing arrangements (particularly with PME/TN-C-S supplies), and dedicated protection per BS 7671 Section 722.",
    topic: "Renewables"
  },
  {
    text: "Why can open-PEN fault conditions be a particular concern for EV charging on a PME (TN-C-S) supply?",
    options: [
      "They are never a concern",
      "A broken neutral upstream could cause exposed metalwork, such as a vehicle's chassis, to become dangerously live via the combined PEN conductor",
      "Open-PEN faults only affect lighting circuits",
      "PME supplies are not used for EV charging"
    ],
    correct: "A broken neutral upstream could cause exposed metalwork, such as a vehicle's chassis, to become dangerously live via the combined PEN conductor",
    explanation: "On a PME supply, if the combined neutral/earth (PEN) conductor breaks upstream, connected earthed metalwork can rise to a dangerous voltage — a particular concern for EV charging where a person may be in contact with the vehicle outdoors.",
    topic: "Renewables"
  },
  {
    text: "What is a common method used to mitigate open-PEN fault risk for an EV charge point on a PME supply?",
    options: [
      "Removing all earthing from the charge point",
      "Using a charge point with open-PEN fault detection or providing an independent earth electrode where required",
      "Ignoring the issue, as it never occurs in practice",
      "Only using extension leads"
    ],
    correct: "Using a charge point with open-PEN fault detection or providing an independent earth electrode where required",
    explanation: "Solutions include EV charge points with built-in open-PEN detection that disconnects on fault, or providing an independent earth electrode (effectively creating a TT arrangement for the charge point).",
    topic: "Renewables"
  },
  {
    text: "What is the general purpose of a wind turbine's generator?",
    options: [
      "To store wind energy chemically",
      "To convert the mechanical rotational energy of the turbine blades into electrical energy",
      "To measure wind speed only",
      "To heat water directly"
    ],
    correct: "To convert the mechanical rotational energy of the turbine blades into electrical energy",
    explanation: "A wind turbine's generator converts the mechanical energy from rotating blades (driven by wind) into electrical energy.",
    topic: "Renewables"
  },
  {
    text: "Why might micro-generation systems (e.g. solar PV) require specific notification or approval before connecting to the grid?",
    options: [
      "No notification is ever required",
      "To ensure the local network can safely accommodate the connection and appropriate protection is in place",
      "Only for aesthetic reasons",
      "It is purely a marketing requirement"
    ],
    correct: "To ensure the local network can safely accommodate the connection and appropriate protection is in place",
    explanation: "Grid-connected generation typically requires notification to (or approval from) the Distribution Network Operator, ensuring the connection is safe and compatible with the local network.",
    topic: "Renewables"
  },
  {
    text: "What is 'G98' and 'G99' in relation to grid-connected generation in the UK?",
    options: [
      "Types of cable",
      "Engineering Recommendations setting out the requirements for connecting small-scale and larger generation to the public distribution network",
      "Fire safety standards",
      "Types of protective device"
    ],
    correct: "Engineering Recommendations setting out the requirements for connecting small-scale and larger generation to the public distribution network",
    explanation: "G98 and G99 are UK Engineering Recommendations covering the connection of generating equipment (like solar PV or wind) to public low-voltage distribution networks, based on system size.",
    topic: "Renewables"
  },
  {
    text: "What does 'Cat 6' refer to in structured data cabling?",
    options: [
      "A category of fire extinguisher",
      "A category (standard) of twisted-pair copper cable used for Ethernet networking, supporting higher bandwidths than earlier categories",
      "A type of coaxial cable only",
      "A type of fibre optic connector"
    ],
    correct: "A category (standard) of twisted-pair copper cable used for Ethernet networking, supporting higher bandwidths than earlier categories",
    explanation: "Cat 6 is a standard for twisted-pair copper Ethernet cabling, offering improved performance and bandwidth compared with earlier categories like Cat 5e.",
    topic: "Data Cabling"
  },
  {
    text: "Why are twisted pairs used within structured data cables?",
    options: [
      "To make the cable look neater only",
      "To reduce electromagnetic interference (crosstalk) between pairs",
      "To increase the cable's current-carrying capacity",
      "It has no technical purpose"
    ],
    correct: "To reduce electromagnetic interference (crosstalk) between pairs",
    explanation: "Twisting conductor pairs together helps cancel out electromagnetic interference and crosstalk between pairs, maintaining signal integrity.",
    topic: "Data Cabling"
  },
  {
    text: "What does UTP stand for in data cabling terminology?",
    options: [
      "Unshielded Twisted Pair",
      "Underground Termination Point",
      "Universal Transfer Protocol",
      "Utility Testing Panel"
    ],
    correct: "Unshielded Twisted Pair",
    explanation: "UTP describes twisted-pair cable without additional shielding, commonly used for standard network cabling in typical office/domestic environments.",
    topic: "Data Cabling"
  },
  {
    text: "What does STP stand for, and why might it be chosen over UTP?",
    options: [
      "Shielded Twisted Pair — used to provide extra protection against electromagnetic interference in high-EMI environments",
      "Standard Twisted Pair — the default option everywhere",
      "Short Trunk Path — used only for short runs",
      "Surface Termination Plate — a type of wall socket"
    ],
    correct: "Shielded Twisted Pair — used to provide extra protection against electromagnetic interference in high-EMI environments",
    explanation: "STP includes additional shielding around the conductors, offering greater protection against electromagnetic interference, useful in environments with significant EMI, such as near industrial equipment.",
    topic: "Data Cabling"
  },
  {
    text: "Why should data cables generally be kept a minimum separation distance from power cables?",
    options: [
      "There is no need for separation",
      "To reduce the risk of electromagnetic interference from the power cable affecting the data signal",
      "To reduce the cost of installation",
      "Power cables are always installed after data cables"
    ],
    correct: "To reduce the risk of electromagnetic interference from the power cable affecting the data signal",
    explanation: "Running data cables too close to power cables can introduce interference that degrades signal quality, so minimum separation distances (or segregated containment) are recommended.",
    topic: "Data Cabling"
  },
  {
    text: "What is fibre optic cable primarily used for in structured cabling?",
    options: [
      "Carrying mains power",
      "Transmitting data as pulses of light, often used for longer runs or higher bandwidth requirements than copper allows",
      "Providing earthing for a network",
      "Powering network switches directly"
    ],
    correct: "Transmitting data as pulses of light, often used for longer runs or higher bandwidth requirements than copper allows",
    explanation: "Fibre optic cable carries data as light pulses, allowing much longer transmission distances and higher bandwidth than copper cabling, and is immune to electromagnetic interference.",
    topic: "Data Cabling"
  },
  {
    text: "What is the main advantage of fibre optic cable over copper for data transmission over long distances?",
    options: [
      "Fibre is always cheaper",
      "Fibre suffers far less signal loss over distance and is immune to electromagnetic interference",
      "Fibre carries mains voltage more safely",
      "Fibre requires no special termination tools"
    ],
    correct: "Fibre suffers far less signal loss over distance and is immune to electromagnetic interference",
    explanation: "Light signals in fibre optic cable experience much lower attenuation over distance than electrical signals in copper, and are unaffected by electromagnetic interference.",
    topic: "Data Cabling"
  },
  {
    text: "What is PoE (Power over Ethernet) used for?",
    options: [
      "Delivering electrical power to devices such as IP cameras or access points over the same cable used for data",
      "Powering an entire building's lighting circuit",
      "Providing fire alarm power only",
      "It has no practical application"
    ],
    correct: "Delivering electrical power to devices such as IP cameras or access points over the same cable used for data",
    explanation: "PoE allows network cabling to carry both data and low-voltage DC power to compatible devices, avoiding the need for a separate power supply at each device.",
    topic: "Data Cabling"
  },
  {
    text: "What is a patch panel used for in a structured cabling installation?",
    options: [
      "To provide a termination point that allows flexible connection between cable runs and network equipment via patch leads",
      "To store spare tools",
      "To provide mains power distribution",
      "To display network status only"
    ],
    correct: "To provide a termination point that allows flexible connection between cable runs and network equipment via patch leads",
    explanation: "A patch panel provides fixed terminations for structured cabling runs, with short patch leads used to connect to network switches, allowing flexible, organised reconfiguration.",
    topic: "Data Cabling"
  },
  {
    text: "What tool is typically used to terminate data cable conductors into a keystone jack or patch panel?",
    options: [
      "A hammer",
      "A punch-down tool",
      "A pipe wrench",
      "A voltage indicator"
    ],
    correct: "A punch-down tool",
    explanation: "A punch-down tool is used to press individual conductors into insulation-displacement connectors on keystone jacks and patch panels, making a secure termination.",
    topic: "Data Cabling"
  },
  {
    text: "Why is it important to maintain the correct twist rate as close as possible to the termination point on Cat 6 cable?",
    options: [
      "It has no effect on performance",
      "Untwisting the pairs too far from termination can increase crosstalk and degrade cable performance",
      "It only affects the cable's colour coding",
      "It is only a cosmetic consideration"
    ],
    correct: "Untwisting the pairs too far from termination can increase crosstalk and degrade cable performance",
    explanation: "Maintaining the twist as close to the termination point as possible (per the relevant standard) helps preserve the cable's performance and reduces crosstalk.",
    topic: "Data Cabling"
  },
  {
    text: "Why is correct disposal of waste electrical equipment (WEEE) important?",
    options: [
      "It is not important, general waste disposal is fine",
      "To prevent hazardous materials entering landfill and to support recycling of valuable materials",
      "Only large companies need to consider WEEE disposal",
      "WEEE disposal has no environmental relevance"
    ],
    correct: "To prevent hazardous materials entering landfill and to support recycling of valuable materials",
    explanation: "WEEE regulations aim to reduce the environmental impact of electrical waste by encouraging reuse and recycling and preventing hazardous substances from entering general landfill.",
    topic: "Environmental"
  },
  {
    text: "What is a common environmental consideration when disposing of old fluorescent tubes?",
    options: [
      "They can be placed in general waste with no precautions",
      "They contain mercury and should be disposed of as hazardous waste via appropriate recycling",
      "They should always be buried on site",
      "They have no special disposal requirements"
    ],
    correct: "They contain mercury and should be disposed of as hazardous waste via appropriate recycling",
    explanation: "Fluorescent tubes contain small amounts of mercury and must be disposed of via specialist recycling to prevent environmental contamination.",
    topic: "Environmental"
  },
  {
    text: "Why should waste cable offcuts be segregated for recycling rather than sent to general waste?",
    options: [
      "It has no environmental benefit",
      "Copper and other metals in cable can be recovered and recycled, reducing raw material extraction and waste",
      "It is a legal requirement with no environmental purpose",
      "Cable offcuts cannot be recycled"
    ],
    correct: "Copper and other metals in cable can be recovered and recycled, reducing raw material extraction and waste",
    explanation: "Segregating cable waste allows valuable metals such as copper to be recovered and recycled, reducing environmental impact compared with sending mixed waste to landfill.",
    topic: "Environmental"
  },
  {
    text: "What is the environmental benefit of specifying energy-efficient equipment (e.g. LED lighting, high-efficiency motors) in a design?",
    options: [
      "There is no environmental benefit",
      "Reduced energy consumption lowers associated carbon emissions and running costs",
      "It only benefits the manufacturer",
      "It always increases carbon emissions"
    ],
    correct: "Reduced energy consumption lowers associated carbon emissions and running costs",
    explanation: "Energy-efficient equipment reduces electricity consumption, which in turn reduces associated carbon emissions from generation and lowers running costs for the end user.",
    topic: "Environmental"
  },
  {
    text: "Why might a Site Waste Management Plan (SWMP) be used on a construction project?",
    options: [
      "To track and minimise waste generated, encouraging reuse and recycling",
      "It has no practical purpose",
      "Only to satisfy an optional preference of the client",
      "To increase the amount of waste sent to landfill"
    ],
    correct: "To track and minimise waste generated, encouraging reuse and recycling",
    explanation: "A SWMP helps a project plan for, monitor and reduce waste, encouraging reuse and recycling wherever practicable rather than defaulting to landfill disposal.",
    topic: "Environmental"
  },
  {
    text: "What environmental hazard can result from an uncontained oil or fuel spillage on site (e.g. from a generator)?",
    options: [
      "No hazard, spillages have no environmental effect",
      "Contamination of soil and watercourses, harming ecosystems",
      "It only affects the appearance of the site",
      "It automatically evaporates without harm"
    ],
    correct: "Contamination of soil and watercourses, harming ecosystems",
    explanation: "Oil and fuel spillages can contaminate soil and nearby watercourses, harming wildlife and ecosystems, so spill kits and containment measures should be available where such risks exist.",
    topic: "Environmental"
  },
  {
    text: "Why might excessive noise from site work be an environmental as well as a health concern?",
    options: [
      "It only affects workers, never neighbours",
      "Noise can disturb nearby residents and wildlife, in addition to posing hearing risks to workers",
      "Noise has no environmental impact",
      "Noise regulations only apply to nightclubs"
    ],
    correct: "Noise can disturb nearby residents and wildlife, in addition to posing hearing risks to workers",
    explanation: "Construction noise can be a nuisance to the local community and affect wildlife, alongside the direct occupational health risk of hearing damage to workers.",
    topic: "Environmental"
  },
  {
    text: "What precaution should be taken before excavating near suspected underground services?",
    options: [
      "Dig quickly to save time",
      "Use service drawings, cable/pipe locating equipment, and safe digging practices (e.g. hand digging near services)",
      "No precautions are needed if the area looks clear",
      "Only check for services if digging deeper than 5 metres"
    ],
    correct: "Use service drawings, cable/pipe locating equipment, and safe digging practices (e.g. hand digging near services)",
    explanation: "Before excavating, service plans should be checked, cable/pipe locators used to trace services, and safe digging techniques (such as hand digging close to suspected services) followed.",
    topic: "Special Site Hazards"
  },
  {
    text: "What is a key hazard when working near or on overhead power lines?",
    options: [
      "There is no hazard if the line looks insulated",
      "Contact or close approach can cause a high-voltage arc or electrocution, even without direct contact",
      "Overhead lines are only dangerous when switched off",
      "Only vehicles are at risk, not people"
    ],
    correct: "Contact or close approach can cause a high-voltage arc or electrocution, even without direct contact",
    explanation: "High voltage can arc across an air gap, so even close proximity to overhead lines (without direct contact) can be extremely dangerous; safe clearance distances must always be maintained.",
    topic: "Special Site Hazards"
  },
  {
    text: "What is a common method for identifying the safe clearance distance from overhead power lines on site?",
    options: [
      "Guessing based on experience",
      "Consulting the relevant guidance (e.g. HSE guidance note GS6) and, where necessary, liaising with the network operator",
      "There is no established method",
      "Assuming a fixed 10cm distance regardless of voltage"
    ],
    correct: "Consulting the relevant guidance (e.g. HSE guidance note GS6) and, where necessary, liaising with the network operator",
    explanation: "HSE guidance such as GS6 sets out recommended clearance distances for work near overhead lines, and the network operator should be consulted for higher-risk situations.",
    topic: "Special Site Hazards"
  },
  {
    text: "What is a key risk of working in an unventilated area where fuel-powered equipment (e.g. a generator) is used?",
    options: [
      "No risk, as long as the equipment is switched on",
      "Build-up of carbon monoxide, a colourless, odourless and highly toxic gas",
      "Only a fire risk, no toxicity concerns",
      "It only affects equipment performance, not people"
    ],
    correct: "Build-up of carbon monoxide, a colourless, odourless and highly toxic gas",
    explanation: "Fuel-powered equipment run in poorly ventilated spaces can produce dangerous levels of carbon monoxide, a toxic gas that is undetectable without specific monitoring, posing a serious risk to health.",
    topic: "Special Site Hazards"
  },
  {
    text: "What is a common hazard when working at height on a roof with fragile roof lights or sheeting?",
    options: [
      "There is no additional risk from fragile surfaces",
      "Stepping on a fragile surface can cause it to give way, resulting in a fall through the roof",
      "Fragile surfaces are always clearly load-rated for standing on",
      "This hazard only applies to flat roofs"
    ],
    correct: "Stepping on a fragile surface can cause it to give way, resulting in a fall through the roof",
    explanation: "Roof lights and certain roofing materials can be fragile and unable to support a person's weight, so specific precautions (crawling boards, edge protection, barriers) are needed.",
    topic: "Special Site Hazards"
  },
  {
    text: "What is a key hazard associated with lone working on an electrical site task?",
    options: [
      "There is no additional hazard from working alone",
      "Reduced ability to get immediate help in an emergency, such as electric shock or injury",
      "Lone working is always safer than working in a team",
      "It only affects productivity, not safety"
    ],
    correct: "Reduced ability to get immediate help in an emergency, such as electric shock or injury",
    explanation: "Lone working increases risk because there is no one nearby to assist or raise the alarm quickly if an accident occurs, so additional precautions (check-in procedures, alarms) are often needed.",
    topic: "Special Site Hazards"
  },
  {
    text: "What precaution can help manage the risk of lone working on higher-risk electrical tasks?",
    options: [
      "No precautions are needed for lone working",
      "Using check-in procedures, personal alarms, or avoiding high-risk lone tasks such as live working alone",
      "Working faster to reduce time spent alone",
      "Ignoring company lone working policies"
    ],
    correct: "Using check-in procedures, personal alarms, or avoiding high-risk lone tasks such as live working alone",
    explanation: "Employers and workers can manage lone working risk through regular check-ins, personal safety alarms, and avoiding particularly high-risk activities (such as live working) when alone.",
    topic: "Special Site Hazards"
  },
  {
    text: "What is a common hazard in older buildings where the electrical installation history is unknown?",
    options: [
      "No hazard exists in older buildings",
      "Undocumented or non-standard wiring, deteriorated insulation, or absence of modern protective devices",
      "Older buildings always have modern RCBOs fitted",
      "Older wiring is always safer than modern wiring"
    ],
    correct: "Undocumented or non-standard wiring, deteriorated insulation, or absence of modern protective devices",
    explanation: "Older installations may have undocumented alterations, degraded insulation, and lack modern protective devices such as RCDs, requiring extra caution and thorough inspection before work.",
    topic: "Special Site Hazards"
  },
  {
    text: "What is a key hazard when working in a plant room containing large switchgear or transformers?",
    options: [
      "No hazard, plant rooms are always safe",
      "High fault levels, arc flash risk, and potentially restricted access/egress in an emergency",
      "Plant rooms never contain live equipment",
      "Only noise is a concern"
    ],
    correct: "High fault levels, arc flash risk, and potentially restricted access/egress in an emergency",
    explanation: "Plant rooms with high-capacity switchgear can have very high prospective fault currents, increasing arc flash risk, and may have limited escape routes in an emergency.",
    topic: "Special Site Hazards"
  },
  {
    text: "What does 'arc flash' refer to?",
    options: [
      "A type of decorative lighting effect",
      "A dangerous release of energy caused by an electrical fault, producing intense heat, light and pressure",
      "A normal part of switching an MCB",
      "A term for a flickering light fitting"
    ],
    correct: "A dangerous release of energy caused by an electrical fault, producing intense heat, light and pressure",
    explanation: "Arc flash is a sudden, violent release of energy during certain electrical faults, capable of causing severe burns, blindness, hearing damage and other serious injury.",
    topic: "Special Site Hazards"
  },
  {
    text: "What is the purpose of a wiring diagram compared with a circuit (schematic) diagram?",
    options: [
      "There is no difference between them",
      "A wiring diagram shows the physical layout and connections of components; a schematic shows the logical/functional circuit operation",
      "A schematic always shows physical positions of cables",
      "Wiring diagrams are only used for lighting"
    ],
    correct: "A wiring diagram shows the physical layout and connections of components; a schematic shows the logical/functional circuit operation",
    explanation: "Wiring diagrams depict actual physical connections and component layout, while schematic diagrams represent the logical operation of a circuit without necessarily showing physical positions.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is meant by 'as-built' drawings?",
    options: [
      "The original design drawings before construction",
      "Drawings updated to reflect the installation exactly as it was actually constructed, including any changes made during the work",
      "Drawings showing only the building's foundations",
      "Marketing drawings for prospective buyers"
    ],
    correct: "Drawings updated to reflect the installation exactly as it was actually constructed, including any changes made during the work",
    explanation: "As-built drawings are updated after construction to accurately reflect the final installation, including any deviations from the original design.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is the purpose of a specification document alongside drawings for an electrical project?",
    options: [
      "To describe the materials, standards and workmanship required, complementing the visual information in drawings",
      "To replace the need for drawings entirely",
      "To record staff holidays",
      "It has no practical purpose"
    ],
    correct: "To describe the materials, standards and workmanship required, complementing the visual information in drawings",
    explanation: "A specification sets out detailed requirements for materials, standards and workmanship, working alongside drawings to fully define what is required for a project.",
    topic: "Trade Knowledge"
  },
  {
    text: "Why is good communication with other trades important on a construction site?",
    options: [
      "It is not important, trades should work in isolation",
      "To avoid clashes (e.g. services conflicting), coordinate work sequencing, and maintain safety",
      "Only for social reasons",
      "It slows down the project unnecessarily"
    ],
    correct: "To avoid clashes (e.g. services conflicting), coordinate work sequencing, and maintain safety",
    explanation: "Coordinating with other trades helps avoid clashes between different services, ensures work is sequenced correctly, and maintains a safe working environment for everyone on site.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is the purpose of keeping accurate records of variations to the original scope of work?",
    options: [
      "It is unnecessary paperwork",
      "To ensure changes are documented, agreed, and correctly accounted for (e.g. for cost, time and certification purposes)",
      "Only relevant to the client's accountant",
      "To make the job look more complicated than it is"
    ],
    correct: "To ensure changes are documented, agreed, and correctly accounted for (e.g. for cost, time and certification purposes)",
    explanation: "Recording variations ensures changes to scope are properly agreed and reflected in cost, programme and certification, avoiding later disputes.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is the general purpose of 'snagging' at the end of an electrical installation project?",
    options: [
      "To identify and rectify minor defects or outstanding items before final handover",
      "To increase the project's overall cost unnecessarily",
      "To replace the need for testing",
      "It has no defined purpose"
    ],
    correct: "To identify and rectify minor defects or outstanding items before final handover",
    explanation: "A snagging list captures minor outstanding defects or incomplete items identified near project completion, which are then resolved before final handover to the client.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is a 'Method Statement' typically expected to describe?",
    options: [
      "Only the tools required for a job",
      "The safe sequence of work and control measures to be followed to carry out a specific task",
      "The wages paid for the task",
      "Only who is responsible for cleaning up"
    ],
    correct: "The safe sequence of work and control measures to be followed to carry out a specific task",
    explanation: "A method statement describes, step by step, how a task will be carried out safely, including the sequence of work and the control measures to be applied.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is the purpose of a Building Regulations Part P notification for domestic electrical work in England and Wales?",
    options: [
      "It has no practical purpose",
      "To ensure certain domestic electrical work is either carried out by a registered competent person or notified to and checked by building control",
      "It only applies to commercial buildings",
      "It replaces the need for testing entirely"
    ],
    correct: "To ensure certain domestic electrical work is either carried out by a registered competent person or notified to and checked by building control",
    explanation: "Part P of the Building Regulations requires certain domestic electrical work to be carried out by a registered competent person or notified to local building control, helping ensure safety compliance.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is the role of a competent person scheme (e.g. NICEIC, NAPIT) in relation to Part P?",
    options: [
      "To provide finance for electrical projects",
      "To allow registered electricians to self-certify certain notifiable domestic work, rather than notifying building control directly",
      "To set national electricity prices",
      "To replace the need for the IET Wiring Regulations"
    ],
    correct: "To allow registered electricians to self-certify certain notifiable domestic work, rather than notifying building control directly",
    explanation: "Competent person schemes allow registered members to self-certify notifiable domestic electrical work as compliant, streamlining the Part P notification process.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is 'diversity' in the context of electrical installation design, as opposed to its everyday meaning?",
    options: [
      "The variety of trades on site",
      "An allowance made for the fact that not all loads on an installation will be used simultaneously at maximum demand",
      "The number of circuits in a building",
      "A term for wiring colour variation"
    ],
    correct: "An allowance made for the fact that not all loads on an installation will be used simultaneously at maximum demand",
    explanation: "In electrical design, diversity refers to applying recognised allowances for the likelihood that not every circuit/appliance will be drawing full-rated current at the same time.",
    topic: "Trade Knowledge"
  },
  {
    text: "Why is continuing professional development (CPD) important for an electrician?",
    options: [
      "It is not important once qualified",
      "To keep knowledge current with changing regulations, technology and best practice",
      "It only benefits the employer, never the individual",
      "CPD is only relevant to managers"
    ],
    correct: "To keep knowledge current with changing regulations, technology and best practice",
    explanation: "Regulations, technology and best practice evolve over time, so ongoing CPD helps electricians maintain up-to-date, safe and competent working knowledge throughout their career.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is the purpose of an apprenticeship in the electrical trade?",
    options: [
      "To provide unpaid work experience with no formal qualification",
      "To combine structured on-the-job training with formal qualifications, developing a competent, qualified electrician",
      "It only covers theoretical classroom learning",
      "It has no recognised industry value"
    ],
    correct: "To combine structured on-the-job training with formal qualifications, developing a competent, qualified electrician",
    explanation: "An electrical apprenticeship combines practical, supervised on-the-job experience with formal study, leading to recognised qualifications and competence as an electrician.",
    topic: "Trade Knowledge"
  },
  {
    text: "What does the AM2/AM2S assessment primarily test?",
    options: [
      "Only theoretical knowledge with no practical element",
      "Practical, hands-on electrical installation, testing, fault-finding and safe working skills, typically at the end of an apprenticeship",
      "Only health and safety knowledge",
      "Only customer service skills"
    ],
    correct: "Practical, hands-on electrical installation, testing, fault-finding and safe working skills, typically at the end of an apprenticeship",
    explanation: "The AM2/AM2S is a practical, end-point assessment testing an apprentice's hands-on ability to install, inspect, test, fault-find and work safely to industry standards.",
    topic: "Trade Knowledge"
  },
  {
    text: "Why is good customer communication important when carrying out domestic electrical work?",
    options: [
      "It is not important, only the technical work matters",
      "To manage expectations, explain the work involved, and maintain a professional, trustworthy relationship",
      "It only matters for commercial clients",
      "Communication has no impact on customer satisfaction"
    ],
    correct: "To manage expectations, explain the work involved, and maintain a professional, trustworthy relationship",
    explanation: "Clear communication with customers about the scope, process and any issues found helps manage expectations and builds trust, which is an important part of professional trade practice.",
    topic: "Trade Knowledge"
  },
  {
    text: "What should you do if, during domestic work, you discover an unrelated serious electrical danger not part of the original job?",
    options: [
      "Ignore it, as it is outside the scope of work",
      "Inform the client of the danger and recommend appropriate action, even if outside the original scope",
      "Fix it without telling the client or charging",
      "Only mention it if specifically asked"
    ],
    correct: "Inform the client of the danger and recommend appropriate action, even if outside the original scope",
    explanation: "Electricians have a professional duty to inform clients of any serious danger discovered, even if unrelated to the original job, and to recommend appropriate remedial action.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is the purpose of leaving a client with a certificate (e.g. EIC or Minor Works Certificate) after completing notifiable work?",
    options: [
      "It is optional paperwork with no real purpose",
      "To provide documented evidence the work meets the required standard and to support future reference, sale of the property, or building control compliance",
      "Only required for commercial clients",
      "Certificates are never issued for domestic work"
    ],
    correct: "To provide documented evidence the work meets the required standard and to support future reference, sale of the property, or building control compliance",
    explanation: "Certification provides documented proof the work complies with BS 7671, useful for future reference, potential property sales, insurance and building control requirements.",
    topic: "Trade Knowledge"
  },
  {
    text: "What is a consumer unit (distribution board) primarily used for in a domestic installation?",
    options: [
      "To generate electricity",
      "To distribute the incoming supply to individual final circuits, each protected by its own protective device",
      "To store spare cable",
      "To measure energy usage only"
    ],
    correct: "To distribute the incoming supply to individual final circuits, each protected by its own protective device",
    explanation: "A consumer unit takes the incoming supply and splits it into separate final circuits, each protected by an appropriately rated device such as an MCB or RCBO.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "What material must modern domestic consumer unit enclosures generally be made from, per current UK Building Regulations guidance?",
    options: [
      "Any plastic material",
      "Non-combustible material (e.g. metal) or enclosed in a non-combustible cabinet",
      "Wood",
      "There is no requirement regarding enclosure material"
    ],
    correct: "Non-combustible material (e.g. metal) or enclosed in a non-combustible cabinet",
    explanation: "Following changes to Building Regulations guidance, domestic consumer units are generally required to have non-combustible enclosures (such as metal) to reduce fire spread risk.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "What is the purpose of a main switch in a consumer unit?",
    options: [
      "To isolate the entire installation from the incoming supply",
      "To control a single lighting circuit only",
      "To provide surge protection",
      "To measure voltage"
    ],
    correct: "To isolate the entire installation from the incoming supply",
    explanation: "The main switch allows the whole installation to be isolated from the incoming supply in one action, essential for safe maintenance of the consumer unit and its circuits.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "Why might a dual RCD (split-load) consumer unit be used instead of a single incoming RCD covering all circuits?",
    options: [
      "It has no advantage",
      "To provide better discrimination, so a fault on one RCD group does not lose power to circuits protected by the other, such as lighting",
      "It only saves space",
      "It reduces the number of circuits allowed"
    ],
    correct: "To provide better discrimination, so a fault on one RCD group does not lose power to circuits protected by the other, such as lighting",
    explanation: "Splitting circuits between two RCDs means a fault on one group (e.g. sockets) does not remove power from the other group (e.g. lighting), improving overall reliability.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "Why is it now common practice to protect socket-outlet and other circuits individually with RCBOs rather than a shared RCD?",
    options: [
      "RCBOs are always significantly cheaper",
      "Individual RCBOs improve discrimination, so a single faulty circuit does not disconnect other unrelated circuits",
      "RCBOs eliminate the need for a main switch",
      "It has no discrimination benefit"
    ],
    correct: "Individual RCBOs improve discrimination, so a single faulty circuit does not disconnect other unrelated circuits",
    explanation: "Using an RCBO per circuit means only the faulty circuit trips, leaving all other circuits (lighting, other sockets, appliances) unaffected — improving both safety and convenience.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "What information should be clearly labelled at a consumer unit, per BS 7671 requirements?",
    options: [
      "Only the installer's name",
      "Circuit details/chart, and warning notices such as periodic inspection recommendation and RCD test notices",
      "Nothing is required to be labelled",
      "Only the date of manufacture"
    ],
    correct: "Circuit details/chart, and warning notices such as periodic inspection recommendation and RCD test notices",
    explanation: "BS 7671 requires clear labelling identifying each circuit's purpose, along with warning notices such as periodic inspection recommendations and RCD test reminders.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "What is a distribution board (sub-board) typically used for in a larger installation?",
    options: [
      "To provide a secondary point of distribution downstream of the main consumer unit, feeding a group of circuits in a particular area",
      "To generate backup power",
      "To replace the need for a main switch",
      "It is only used outdoors"
    ],
    correct: "To provide a secondary point of distribution downstream of the main consumer unit, feeding a group of circuits in a particular area",
    explanation: "Sub-distribution boards feed groups of circuits serving specific areas or floors of a larger building, taking their supply from an upstream distribution point.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "What is the purpose of circuit charts/schedules typically fixed inside or near a consumer unit?",
    options: [
      "To identify what each protective device controls, aiding safe isolation and maintenance",
      "To display advertising",
      "To record staff attendance",
      "They serve no practical purpose"
    ],
    correct: "To identify what each protective device controls, aiding safe isolation and maintenance",
    explanation: "A circuit chart identifies which protective device controls which circuit, helping anyone working on the installation quickly and correctly identify the circuit they need to isolate.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "Why should spare ways in a consumer unit be blanked off if not in use?",
    options: [
      "It is purely cosmetic",
      "To maintain the enclosure's protection rating and prevent access to live parts or entry of foreign objects",
      "Blanking is not necessary if the door is closed",
      "It reduces the number of circuits available"
    ],
    correct: "To maintain the enclosure's protection rating and prevent access to live parts or entry of foreign objects",
    explanation: "Blanking plates maintain the consumer unit's ingress protection rating and prevent accidental contact with live busbars through unused ways.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "What is a 'split load' consumer unit?",
    options: [
      "A unit with only one RCD covering all circuits",
      "A consumer unit divided into two (or more) sections, each protected by a separate RCD, so a trip on one section does not affect the other",
      "A unit used only for three-phase supplies",
      "A unit with no protective devices fitted"
    ],
    correct: "A consumer unit divided into two (or more) sections, each protected by a separate RCD, so a trip on one section does not affect the other",
    explanation: "Split-load boards divide circuits between separate RCDs, so if one RCD trips, only the circuits on that section lose power, rather than the whole installation.",
    topic: "Consumer Units & Distribution"
  },
  {
    text: "What is the primary purpose of a documented emergency evacuation procedure on a site?",
    options: [
      "To assign parking spaces",
      "To ensure everyone knows how to leave the site or building safely and quickly in an emergency",
      "To record staff working hours",
      "It has no practical safety purpose"
    ],
    correct: "To ensure everyone knows how to leave the site or building safely and quickly in an emergency",
    explanation: "A clear evacuation procedure ensures everyone understands escape routes, assembly points and their responsibilities, reducing confusion and risk during an emergency.",
    topic: "Emergency Procedures"
  },
  {
    text: "Why is it important to keep escape routes and fire exits clear at all times on site?",
    options: [
      "It has no safety benefit",
      "Blocked routes can delay evacuation and increase risk of injury during an emergency",
      "It is only relevant to office buildings",
      "Fire exits are rarely used in practice"
    ],
    correct: "Blocked routes can delay evacuation and increase risk of injury during an emergency",
    explanation: "Escape routes must remain clear so people can evacuate quickly and safely; obstructions can cause delays, trips, or trap people during an emergency.",
    topic: "Emergency Procedures"
  },
  {
    text: "What should you do if the fire alarm sounds while you are working in a plant room?",
    options: [
      "Finish the current task before responding",
      "Stop work, make the area safe if quick to do so, and evacuate following the site procedure",
      "Ignore it unless you can see smoke",
      "Continue working, assuming it is a false alarm"
    ],
    correct: "Stop work, make the area safe if quick to do so, and evacuate following the site procedure",
    explanation: "On hearing a fire alarm, work should stop and the person should evacuate promptly, following the established site procedure, treating every alarm as genuine until confirmed otherwise.",
    topic: "Emergency Procedures"
  },
  {
    text: "What is a 'nominated fire warden/marshal' typically responsible for during an evacuation?",
    options: [
      "Fighting large fires personally",
      "Helping ensure their designated area is evacuated and reporting to the assembly point coordinator",
      "Repairing the fire alarm system",
      "Deciding whether to call the fire service"
    ],
    correct: "Helping ensure their designated area is evacuated and reporting to the assembly point coordinator",
    explanation: "Fire wardens/marshals help sweep their designated area during an evacuation, encourage occupants to leave, and report at the assembly point, but are not expected to fight large fires.",
    topic: "Emergency Procedures"
  },
  {
    text: "What is the general purpose of an emergency action plan for electrical work involving high-risk activities?",
    options: [
      "To describe how the team will respond if something goes wrong, including rescue and first aid arrangements",
      "It is only required for office-based tasks",
      "To replace risk assessments entirely",
      "It has no defined purpose"
    ],
    correct: "To describe how the team will respond if something goes wrong, including rescue and first aid arrangements",
    explanation: "An emergency action plan sets out how the team will respond to incidents such as electric shock, fall from height, or fire, including rescue and first aid arrangements.",
    topic: "Emergency Procedures"
  },
  {
    text: "Why should emergency contact numbers be readily available and known on site?",
    options: [
      "It has no practical use",
      "To ensure emergency services or key personnel can be contacted quickly if an incident occurs",
      "Only office staff need this information",
      "Contact numbers change too often to be useful"
    ],
    correct: "To ensure emergency services or key personnel can be contacted quickly if an incident occurs",
    explanation: "Having emergency contact information readily accessible ensures no time is lost trying to find help during a genuine emergency.",
    topic: "Emergency Procedures"
  },
  {
    text: "What should be done immediately after a serious accident on site, once the casualty has been cared for?",
    options: [
      "Continue work as normal with no further action",
      "Secure the scene where practicable, report the incident, and record relevant details for investigation",
      "Clean up the area immediately without recording anything",
      "Only inform close colleagues informally"
    ],
    correct: "Secure the scene where practicable, report the incident, and record relevant details for investigation",
    explanation: "After caring for the casualty, the scene should be secured where possible, the incident reported through proper channels, and details recorded to support investigation and prevent recurrence.",
    topic: "Emergency Procedures"
  },
  {
    text: "What are the five steps commonly used in the HSE's approach to risk assessment?",
    options: [
      "Identify hazards, decide who might be harmed and how, evaluate risks and decide precautions, record findings, review and update",
      "Only identify hazards and stop there",
      "Assign blame, write a report, close the file",
      "Purchase PPE, distribute it, move on"
    ],
    correct: "Identify hazards, decide who might be harmed and how, evaluate risks and decide precautions, record findings, review and update",
    explanation: "HSE's five-step approach: identify hazards, decide who might be harmed and how, evaluate risk and decide on precautions, record findings, and review the assessment regularly.",
    topic: "Risk Assessment"
  },
  {
    text: "What is a 'hazard' in health and safety terminology?",
    options: [
      "The likelihood of harm occurring",
      "Something with the potential to cause harm",
      "A completed risk assessment",
      "A type of PPE"
    ],
    correct: "Something with the potential to cause harm",
    explanation: "A hazard is anything with the potential to cause harm, such as a live conductor, a slippery floor, or a hazardous substance.",
    topic: "Risk Assessment"
  },
  {
    text: "What is 'risk' in health and safety terminology, as distinct from 'hazard'?",
    options: [
      "The same thing as a hazard",
      "The likelihood that a hazard will cause harm, combined with the severity of that harm",
      "A type of protective equipment",
      "The cost of an incident"
    ],
    correct: "The likelihood that a hazard will cause harm, combined with the severity of that harm",
    explanation: "Risk considers both the likelihood of a hazard causing harm and the severity of that harm, distinguishing it from the hazard itself (the source of potential harm).",
    topic: "Risk Assessment"
  },
  {
    text: "Why should risk assessments be reviewed and updated periodically?",
    options: [
      "They never need reviewing once written",
      "Conditions, tasks, personnel or equipment can change, potentially introducing new hazards or altering existing risks",
      "Only if requested by a client",
      "Reviewing is purely a legal formality with no safety value"
    ],
    correct: "Conditions, tasks, personnel or equipment can change, potentially introducing new hazards or altering existing risks",
    explanation: "Risk assessments should be living documents, reviewed when circumstances change (new equipment, different site conditions, after an incident) to remain accurate and effective.",
    topic: "Risk Assessment"
  },
  {
    text: "Who is generally best placed to identify hazards for inclusion in a task-specific risk assessment?",
    options: [
      "Only senior management, with no worker input",
      "Those actually carrying out or familiar with the task, in consultation with a competent person",
      "External consultants with no site knowledge",
      "No one; risk assessments are generic and unrelated to the actual task"
    ],
    correct: "Those actually carrying out or familiar with the task, in consultation with a competent person",
    explanation: "Workers who actually perform a task often have valuable practical insight into real hazards, and their input alongside a competent assessor improves the quality of the risk assessment.",
    topic: "Risk Assessment"
  },
  {
    text: "What is meant by a 'suitable and sufficient' risk assessment, as required by law?",
    options: [
      "An assessment covering every conceivable hazard in exhaustive detail regardless of relevance",
      "An assessment that identifies significant hazards and risks relevant to the specific task, proportionate to the level of risk",
      "A generic template applied to all tasks without modification",
      "Any brief note, regardless of content"
    ],
    correct: "An assessment that identifies significant hazards and risks relevant to the specific task, proportionate to the level of risk",
    explanation: "A 'suitable and sufficient' assessment identifies significant hazards genuinely relevant to the task, with a level of detail proportionate to the risks involved.",
    topic: "Risk Assessment"
  },
  {
    text: "What is the purpose of assigning a risk rating (e.g. low/medium/high, or a numerical score) during risk assessment?",
    options: [
      "To make the document look more official with no practical use",
      "To help prioritise which risks need the most urgent or significant control measures",
      "To assign blame to individuals",
      "It has no bearing on control measures chosen"
    ],
    correct: "To help prioritise which risks need the most urgent or significant control measures",
    explanation: "Risk ratings help prioritise action, ensuring higher risks receive more robust control measures and attention than lower risks.",
    topic: "Risk Assessment"
  },
  {
    text: "What is 'residual risk' after control measures have been applied?",
    options: [
      "The risk level before any controls were considered",
      "The level of risk remaining after control measures have been put in place",
      "A risk that has been completely eliminated",
      "A term with no defined meaning"
    ],
    correct: "The level of risk remaining after control measures have been put in place",
    explanation: "Residual risk is what remains after applying control measures; if this remains unacceptably high, further controls should be considered.",
    topic: "Risk Assessment"
  },
  {
    text: "Why does BS 7671 define specific 'zones' within a bathroom for electrical installation purposes?",
    options: [
      "Zones have no real purpose",
      "To specify the level of electrical protection and equipment suitable for areas at different risk of water exposure",
      "Only to help with interior design",
      "Zones only apply to commercial bathrooms"
    ],
    correct: "To specify the level of electrical protection and equipment suitable for areas at different risk of water exposure",
    explanation: "Bathroom zones (0, 1, 2 and outside zones) reflect differing exposure to water, dictating what electrical equipment and protection (such as IP rating) is permitted in each area.",
    topic: "Special Locations"
  },
  {
    text: "What is Zone 0 in a bathroom, as defined by BS 7671?",
    options: [
      "The area furthest from any water source",
      "The interior of the bath tub or shower basin itself",
      "The entire bathroom floor",
      "An area outside the bathroom"
    ],
    correct: "The interior of the bath tub or shower basin itself",
    explanation: "Zone 0 is inside the bath tub or shower basin, the area of highest exposure to water, where only specially rated low-voltage equipment (typically SELV) is permitted.",
    topic: "Special Locations"
  },
  {
    text: "What type of socket outlet is generally not permitted within the defined zones of a bathroom (other than a shaver socket meeting specific requirements)?",
    options: [
      "Standard unprotected socket outlets",
      "There is no restriction on socket outlets in bathrooms",
      "Only USB sockets are restricted",
      "Only three-phase sockets are restricted"
    ],
    correct: "Standard unprotected socket outlets",
    explanation: "General-purpose socket outlets are generally not permitted within bathroom zones, due to the increased shock risk from proximity to water.",
    topic: "Special Locations"
  },
  {
    text: "Why is a lower voltage (e.g. SELV) commonly specified for equipment used inside bathroom Zone 1?",
    options: [
      "It has no safety advantage",
      "To reduce the severity of electric shock risk in an area with higher exposure to water and reduced body resistance",
      "It is simply a cost-saving measure",
      "SELV is required for all bathroom equipment regardless of zone"
    ],
    correct: "To reduce the severity of electric shock risk in an area with higher exposure to water and reduced body resistance",
    explanation: "Wet skin has significantly lower resistance, increasing shock severity for a given voltage, so lower-voltage systems like SELV reduce risk in higher-exposure bathroom zones.",
    topic: "Special Locations"
  },
  {
    text: "What special consideration applies to agricultural and horticultural electrical installations under BS 7671?",
    options: [
      "No special considerations apply",
      "Increased protection is required due to factors like livestock sensitivity to voltage, damp conditions, and mechanical damage risk",
      "Agricultural installations are exempt from BS 7671",
      "Only lighting circuits require special consideration"
    ],
    correct: "Increased protection is required due to factors like livestock sensitivity to voltage, damp conditions, and mechanical damage risk",
    explanation: "Agricultural locations present unique risks including livestock's greater sensitivity to voltage, damp/corrosive environments, and higher risk of mechanical damage, requiring enhanced protective measures.",
    topic: "Special Locations"
  },
  {
    text: "Why might swimming pool installations require particularly stringent electrical safety measures?",
    options: [
      "Pools present no additional electrical hazard",
      "Water and wet skin significantly increase shock risk, requiring measures such as SELV, equipotential bonding and restricted equipment zones",
      "Only the pool pump requires special consideration",
      "Swimming pools are exempt from BS 7671 requirements"
    ],
    correct: "Water and wet skin significantly increase shock risk, requiring measures such as SELV, equipotential bonding and restricted equipment zones",
    explanation: "The combination of water and reduced body resistance around swimming pools demands enhanced protective measures, including zoned restrictions, SELV and supplementary bonding.",
    topic: "Special Locations"
  },
  {
    text: "What extra precaution might be needed for electrical installations in a caravan/park home or similar location?",
    options: [
      "No extra precautions are needed",
      "Specific requirements for supply connection, earthing arrangements, and protection suited to the mobile/temporary nature of the installation",
      "Only lighting circuits require attention",
      "Caravans are exempt from any wiring regulations"
    ],
    correct: "Specific requirements for supply connection, earthing arrangements, and protection suited to the mobile/temporary nature of the installation",
    explanation: "Caravan and similar installations have specific BS 7671 requirements addressing their mobile nature, supply connection arrangements and appropriate earthing/protection measures.",
    topic: "Special Locations"
  },
  {
    text: "What is the general term for the physiological effect of electric current passing through the body?",
    options: [
      "Electric shock",
      "Voltage drop",
      "Power factor",
      "Insulation resistance"
    ],
    correct: "Electric shock",
    explanation: "Electric shock is the term for the physiological effects (which can range from mild to fatal) caused by electric current passing through the human body.",
    topic: "Electric Shock & Physiology"
  },
  {
    text: "What is the main factor that determines how dangerous a given electric shock is likely to be?",
    options: [
      "The colour of the cable involved",
      "The magnitude of current, its path through the body, and the duration of exposure",
      "The time of day the shock occurs",
      "The brand of the equipment involved"
    ],
    correct: "The magnitude of current, its path through the body, and the duration of exposure",
    explanation: "Shock severity is influenced primarily by the amount of current flowing, the path it takes through the body (e.g. hand-to-hand across the heart is especially dangerous), and how long the exposure lasts.",
    topic: "Electric Shock & Physiology"
  },
  {
    text: "Why is a shock path from hand to hand, or hand to foot, generally considered more dangerous than other paths?",
    options: [
      "It is not more dangerous than any other path",
      "These paths can cause current to pass through or near the heart, risking a dangerous disturbance to its rhythm",
      "It only affects skin, never internal organs",
      "It is only relevant to DC shocks"
    ],
    correct: "These paths can cause current to pass through or near the heart, risking a dangerous disturbance to its rhythm",
    explanation: "Current passing across the chest, such as hand-to-hand, is particularly dangerous because it can pass through the heart, risking ventricular fibrillation.",
    topic: "Electric Shock & Physiology"
  },
  {
    text: "What is ventricular fibrillation, in the context of electric shock?",
    options: [
      "A minor muscle twitch",
      "A dangerous, irregular quivering of the heart that prevents it pumping blood effectively",
      "A term for skin burns",
      "A type of protective device malfunction"
    ],
    correct: "A dangerous, irregular quivering of the heart that prevents it pumping blood effectively",
    explanation: "Ventricular fibrillation is a life-threatening abnormal heart rhythm that can be triggered by electric current passing through the heart, preventing effective blood circulation.",
    topic: "Electric Shock & Physiology"
  },
  {
    text: "Why is wet skin more dangerous in relation to electric shock risk than dry skin?",
    options: [
      "Wet skin has no effect on shock risk",
      "Wet skin has significantly lower electrical resistance, allowing more current to flow for a given voltage",
      "Wet skin increases resistance, reducing risk",
      "It only matters in industrial environments"
    ],
    correct: "Wet skin has significantly lower electrical resistance, allowing more current to flow for a given voltage",
    explanation: "Water reduces the natural resistance of skin, meaning a given voltage can drive significantly more current through the body, increasing shock severity.",
    topic: "Electric Shock & Physiology"
  },
  {
    text: "What is a common secondary hazard resulting from electric shock, aside from the direct physiological effect of the current?",
    options: [
      "There are no secondary hazards",
      "Involuntary muscle contraction can cause a fall from height, or the person may be thrown, causing injury",
      "Electric shock only affects hearing",
      "Shock always improves reaction time"
    ],
    correct: "Involuntary muscle contraction can cause a fall from height, or the person may be thrown, causing injury",
    explanation: "The involuntary muscle contraction caused by shock can result in falls, being thrown, or gripping the source tighter, all of which can cause additional injury.",
    topic: "Electric Shock & Physiology"
  },
  {
    text: "Why can it be difficult for a shock casualty to let go of a live conductor they are gripping?",
    options: [
      "It is never difficult, people can always let go easily",
      "Current passing through the muscles can cause them to contract, preventing voluntary release of grip",
      "The casualty chooses not to let go",
      "This effect only occurs with DC current"
    ],
    correct: "Current passing through the muscles can cause them to contract, preventing voluntary release of grip",
    explanation: "Electric current can cause sustained muscle contraction, particularly in the forearm flexors, which can prevent a casualty from voluntarily releasing their grip on a live conductor.",
    topic: "Electric Shock & Physiology"
  },
  {
    text: "What internal injury can result from current passing through the body even without visible external burns?",
    options: [
      "No internal injury is possible without external burns",
      "Internal tissue and organ damage, including damage along the current's path",
      "Only hair loss can occur",
      "Only temporary discomfort, with no lasting effect"
    ],
    correct: "Internal tissue and organ damage, including damage along the current's path",
    explanation: "Electric current can cause significant internal tissue damage along its path through the body, even when the skin shows little or no visible burn injury.",
    topic: "Electric Shock & Physiology"
  },
  {
    text: "Why should a casualty who has experienced any electric shock, even if they appear to have recovered, generally be assessed medically?",
    options: [
      "Medical assessment is never required after electric shock",
      "Internal injuries, cardiac effects or delayed symptoms may not be immediately obvious",
      "Only shocks above 1000V require medical review",
      "Only visible burns require medical attention"
    ],
    correct: "Internal injuries, cardiac effects or delayed symptoms may not be immediately obvious",
    explanation: "Even an apparently mild shock can cause internal injury or cardiac effects that are not immediately obvious, so medical assessment is generally recommended as a precaution.",
    topic: "Electric Shock & Physiology"
  },
  {
    text: "Why is a good mechanical and electrical connection important at a cable termination?",
    options: [
      "It has no real importance",
      "A poor connection increases resistance, which can cause localised heating, arcing or failure",
      "It only affects the appearance of the work",
      "Terminations do not require careful attention"
    ],
    correct: "A poor connection increases resistance, which can cause localised heating, arcing or failure",
    explanation: "Loose or poorly made terminations create higher resistance at the joint, generating heat that can cause overheating, arcing, and eventual failure or fire.",
    topic: "Cable Joints & Terminations"
  },
  {
    text: "What is the purpose of a crimp connector when joining conductors?",
    options: [
      "To provide a mechanically secure, low-resistance connection by compressing the connector onto the conductor",
      "To insulate the joint without making an electrical connection",
      "To measure conductor resistance",
      "To reduce the current rating of the cable"
    ],
    correct: "To provide a mechanically secure, low-resistance connection by compressing the connector onto the conductor",
    explanation: "Crimp connectors use mechanical compression to create a secure, low-resistance joint between conductors or a conductor and a terminal.",
    topic: "Cable Joints & Terminations"
  },
  {
    text: "Why should the correct crimping tool be used for a given crimp connector?",
    options: [
      "It has no practical importance",
      "Using the wrong tool can result in an under- or over-crimped joint, weakening the mechanical and electrical connection",
      "Any tool will produce an identical result",
      "Crimping tools are interchangeable regardless of connector type"
    ],
    correct: "Using the wrong tool can result in an under- or over-crimped joint, weakening the mechanical and electrical connection",
    explanation: "Manufacturers specify particular tools and dies for their crimp connectors; using the wrong tool risks a poor-quality joint that could fail or create excess resistance.",
    topic: "Cable Joints & Terminations"
  },
  {
    text: "What is a common purpose of heat-shrink sleeving over a joint or termination?",
    options: [
      "To provide insulation and environmental protection once shrunk over the joint using heat",
      "To increase the joint's current rating beyond the cable's rating",
      "To colour-code the cable only",
      "To reduce the joint's mechanical strength"
    ],
    correct: "To provide insulation and environmental protection once shrunk over the joint using heat",
    explanation: "Heat-shrink sleeving contracts tightly around a joint when heated, providing electrical insulation and protection against moisture and mechanical damage.",
    topic: "Cable Joints & Terminations"
  },
  {
    text: "Why must all conductor strands be captured within a terminal when making a connection?",
    options: [
      "It is not necessary if most strands are captured",
      "Stray uncaptured strands can cause a short circuit, poor connection, or reduced current-carrying capacity",
      "Loose strands improve conductivity",
      "It only matters for single-strand conductors"
    ],
    correct: "Stray uncaptured strands can cause a short circuit, poor connection, or reduced current-carrying capacity",
    explanation: "Any stray strands left outside a terminal can bridge to adjacent terminals (causing a short) or reduce the effective conductor size actually clamped, weakening the connection.",
    topic: "Cable Joints & Terminations"
  },
  {
    text: "What is the purpose of a junction box in a cable installation?",
    options: [
      "To provide an accessible point for joining or branching cables",
      "To generate electricity",
      "To provide overload protection",
      "To reduce voltage"
    ],
    correct: "To provide an accessible point for joining or branching cables",
    explanation: "Junction boxes provide a safe, accessible enclosure for joining or branching cables, protecting the connections and allowing future access if needed.",
    topic: "Cable Joints & Terminations"
  },
  {
    text: "Why should cable joints generally be accessible after installation, rather than permanently buried in a wall without access?",
    options: [
      "Accessibility is never required for joints",
      "To allow inspection, testing and maintenance of the connection in the future",
      "It only matters for aesthetic reasons",
      "Buried joints are always preferred for safety"
    ],
    correct: "To allow inspection, testing and maintenance of the connection in the future",
    explanation: "BS 7671 generally requires joints to remain accessible for inspection and maintenance, rather than being permanently concealed where they cannot be checked.",
    topic: "Cable Joints & Terminations"
  },
  {
    text: "What could result from over-tightening a terminal screw on a cable connection?",
    options: [
      "Nothing, over-tightening always improves the connection",
      "Damage to the conductor strands or terminal, potentially weakening the connection over time",
      "It always improves current-carrying capacity",
      "It has no effect on the joint's integrity"
    ],
    correct: "Damage to the conductor strands or terminal, potentially weakening the connection over time",
    explanation: "Excessive tightening can crush or shear conductor strands, or damage the terminal itself, ultimately weakening rather than improving the connection.",
    topic: "Cable Joints & Terminations"
  },
  {
    text: "Who should erect, alter or dismantle a scaffold?",
    options: [
      "Any worker who needs to use it",
      "A competent person, typically a trained and qualified scaffolder",
      "The site cleaner",
      "It does not matter who does this"
    ],
    correct: "A competent person, typically a trained and qualified scaffolder",
    explanation: "Scaffold erection, alteration and dismantling must be carried out by competent, trained personnel, as incorrect assembly can create a serious collapse or fall risk.",
    topic: "Access Equipment & Scaffolding"
  },
  {
    text: "What is a 'scaff tag' (scaffold inspection tag) used for?",
    options: [
      "To identify the scaffold's owner only",
      "To confirm the scaffold has been inspected and is safe to use, typically showing the date of last inspection",
      "To display advertising",
      "To record the scaffold's weight"
    ],
    correct: "To confirm the scaffold has been inspected and is safe to use, typically showing the date of last inspection",
    explanation: "A scaff tag provides visible confirmation that a scaffold has been formally inspected and is currently safe to use, along with the inspection date.",
    topic: "Access Equipment & Scaffolding"
  },
  {
    text: "How often must a scaffold typically be formally inspected, per UK regulations, in normal use?",
    options: [
      "Only once, at initial erection",
      "At least every 7 days, and after any event likely to affect its stability",
      "Once a year",
      "There is no requirement for regular inspection"
    ],
    correct: "At least every 7 days, and after any event likely to affect its stability",
    explanation: "Scaffolds used for work at height must generally be inspected at least every 7 days, and additionally after any event (e.g. severe weather) that could have affected safety.",
    topic: "Access Equipment & Scaffolding"
  },
  {
    text: "What should you do if you find a scaffold with an incomplete or missing scaff tag?",
    options: [
      "Use it anyway if it looks stable",
      "Do not use the scaffold until it has been inspected and confirmed safe",
      "Add your own tag without an inspection",
      "Only avoid the top level"
    ],
    correct: "Do not use the scaffold until it has been inspected and confirmed safe",
    explanation: "A missing or incomplete inspection tag means the scaffold's current safety status is unconfirmed, so it should not be used until properly inspected.",
    topic: "Access Equipment & Scaffolding"
  },
  {
    text: "What is the purpose of base plates and sole boards on a scaffold?",
    options: [
      "Decoration only",
      "To spread the load of the scaffold standards over a wider area, improving stability, especially on soft ground",
      "To provide electrical earthing for the scaffold",
      "They serve no structural purpose"
    ],
    correct: "To spread the load of the scaffold standards over a wider area, improving stability, especially on soft ground",
    explanation: "Sole boards and base plates distribute the load from scaffold standards over a larger ground area, reducing the risk of settlement or instability, particularly on soft or uneven ground.",
    topic: "Access Equipment & Scaffolding"
  },
  {
    text: "What must be considered before using a podium step or tower for short-duration elevated work?",
    options: [
      "Nothing, podium steps require no checks",
      "Stability, ground conditions, guard rail fitment, and that it is suitable for the task and load",
      "Only its colour",
      "Only its brand name"
    ],
    correct: "Stability, ground conditions, guard rail fitment, and that it is suitable for the task and load",
    explanation: "Podium steps should be checked for stability on level ground, correct guard rail fitment, and suitability for the intended task before use.",
    topic: "Access Equipment & Scaffolding"
  },
  {
    text: "What certification is typically required to operate a Mobile Elevating Work Platform (MEWP) on a UK construction site?",
    options: [
      "No certification is required",
      "Recognised operator training/certification (e.g. IPAF), specific to the type of MEWP being used",
      "A standard driving licence only",
      "First aid certification only"
    ],
    correct: "Recognised operator training/certification (e.g. IPAF), specific to the type of MEWP being used",
    explanation: "Operating a MEWP typically requires recognised training and certification (such as IPAF), covering the specific category of platform being used.",
    topic: "Access Equipment & Scaffolding"
  },
  {
    text: "What is the typical electrical role of an electrician when installing an air conditioning unit?",
    options: [
      "Handling the refrigerant charge only",
      "Providing the electrical supply, isolation, control wiring and protection for the unit, often alongside an F-Gas qualified refrigeration engineer",
      "The electrician has no role in air conditioning installations",
      "Only painting the unit casing"
    ],
    correct: "Providing the electrical supply, isolation, control wiring and protection for the unit, often alongside an F-Gas qualified refrigeration engineer",
    explanation: "Electricians typically handle the electrical supply, isolation and control wiring for HVAC equipment, while refrigerant handling requires separate F-Gas qualified personnel.",
    topic: "HVAC & Building Services"
  },
  {
    text: "Why is a local isolator often required near HVAC or plant equipment, in addition to the main distribution board?",
    options: [
      "It is never required",
      "To allow safe isolation close to the equipment for maintenance, without needing to isolate the whole distribution board",
      "Only for decorative purposes",
      "Only required for equipment under 1kW"
    ],
    correct: "To allow safe isolation close to the equipment for maintenance, without needing to isolate the whole distribution board",
    explanation: "A local isolator lets maintenance personnel safely isolate specific equipment at the point of work, without needing to disconnect the whole board and affect other circuits.",
    topic: "HVAC & Building Services"
  },
  {
    text: "What is a Building Management System (BMS) typically used for?",
    options: [
      "To centrally monitor and control building services such as HVAC, lighting and security",
      "To generate electricity for the building",
      "To replace the need for a consumer unit",
      "It only controls fire alarms"
    ],
    correct: "To centrally monitor and control building services such as HVAC, lighting and security",
    explanation: "A BMS integrates monitoring and control of various building services (heating, ventilation, air conditioning, lighting, security) from a central system, improving efficiency and management.",
    topic: "HVAC & Building Services"
  },
  {
    text: "What is the purpose of a frost thermostat on a heating system?",
    options: [
      "To increase energy consumption",
      "To automatically activate heating to prevent pipes freezing when temperatures drop dangerously low",
      "To measure humidity",
      "To control lighting"
    ],
    correct: "To automatically activate heating to prevent pipes freezing when temperatures drop dangerously low",
    explanation: "A frost thermostat provides protection against freezing by triggering the heating system when the ambient temperature falls to a set low threshold.",
    topic: "HVAC & Building Services"
  },
  {
    text: "What electrical consideration is important for extractor fans installed in bathrooms?",
    options: [
      "No special consideration is needed",
      "Selection of a fan suitable for the relevant BS 7671 zone and IP rating, with appropriate isolation",
      "Extractor fans cannot be used in bathrooms",
      "Only the fan's noise level matters"
    ],
    correct: "Selection of a fan suitable for the relevant BS 7671 zone and IP rating, with appropriate isolation",
    explanation: "Bathroom extractor fans must be suitable for their installation zone, with an appropriate IP rating for protection against moisture, and correctly isolated per BS 7671.",
    topic: "HVAC & Building Services"
  },
  {
    text: "Why might a time delay or overrun feature be fitted to a bathroom extractor fan controlled by the light switch?",
    options: [
      "To reduce the fan's power consumption",
      "To allow the fan to continue running for a period after the light is switched off, ensuring adequate ventilation",
      "To make the fan run louder",
      "It has no functional purpose"
    ],
    correct: "To allow the fan to continue running for a period after the light is switched off, ensuring adequate ventilation",
    explanation: "An overrun timer lets the extractor fan continue after the light switch is turned off, ensuring sufficient time to clear moisture and odours from the room.",
    topic: "HVAC & Building Services"
  },
  {
    text: "What is the general purpose of an immersion heater thermostat?",
    options: [
      "To control water temperature and prevent overheating in a hot water cylinder",
      "To provide lighting control",
      "To measure current draw only",
      "To protect against earth faults"
    ],
    correct: "To control water temperature and prevent overheating in a hot water cylinder",
    explanation: "An immersion heater thermostat regulates water temperature, switching the heating element off once the set temperature is reached, and provides protection against overheating.",
    topic: "HVAC & Building Services"
  },
  {
    text: "What is the purpose of cable marker tape buried above underground electrical cables?",
    options: [
      "To decorate the trench",
      "To warn anyone excavating that a cable lies below before they reach it, reducing the risk of striking it",
      "To improve the cable's current rating",
      "To provide additional earthing"
    ],
    correct: "To warn anyone excavating that a cable lies below before they reach it, reducing the risk of striking it",
    explanation: "Warning tape is buried above cables to alert anyone digging that a service is present below, giving them the chance to stop before striking it.",
    topic: "Underground & Overhead Networks"
  },
  {
    text: "What is typical minimum burial depth guidance for low voltage underground cables in normal ground conditions (subject to local/site-specific requirements)?",
    options: [
      "There is no minimum depth",
      "Around 450-600mm, though this varies by cable type and installation guidance",
      "Cables must be laid on the surface only",
      "10 metres minimum"
    ],
    correct: "Around 450-600mm, though this varies by cable type and installation guidance",
    explanation: "Typical guidance for LV cable burial depth is in the region of 450-600mm, though actual requirements depend on cable type, ground conditions and relevant standards/specifications.",
    topic: "Underground & Overhead Networks"
  },
  {
    text: "What is a distribution substation's general function?",
    options: [
      "To generate new electricity",
      "To transform voltage between different levels within the distribution network, e.g. from higher distribution voltage down to LV supply",
      "To store energy chemically",
      "To measure customer energy usage"
    ],
    correct: "To transform voltage between different levels within the distribution network, e.g. from higher distribution voltage down to LV supply",
    explanation: "Distribution substations use transformers to step voltage down (or occasionally up) between different levels of the network, ultimately supplying LV power to consumers.",
    topic: "Underground & Overhead Networks"
  },
  {
    text: "What is the general purpose of a ring main unit (RMU) in a distribution network?",
    options: [
      "To provide switching and protection at points along a ring distribution network, improving flexibility and reliability of supply",
      "To generate additional voltage",
      "To measure domestic energy usage",
      "It has no functional purpose"
    ],
    correct: "To provide switching and protection at points along a ring distribution network, improving flexibility and reliability of supply",
    explanation: "RMUs allow sections of a ring distribution network to be switched and protected independently, improving supply flexibility and enabling faults to be isolated without affecting the whole ring.",
    topic: "Underground & Overhead Networks"
  },
  {
    text: "Why are overhead lines often used for rural electricity distribution rather than underground cables?",
    options: [
      "Overhead lines are always safer",
      "Overhead lines are generally cheaper to install and easier to maintain/repair over long rural distances",
      "Underground cables cannot be used in rural areas",
      "There is no reason, the choice is arbitrary"
    ],
    correct: "Overhead lines are generally cheaper to install and easier to maintain/repair over long rural distances",
    explanation: "Overhead line construction is typically more economical than underground cabling over long distances, and faults are often quicker and cheaper to locate and repair.",
    topic: "Underground & Overhead Networks"
  },
  {
    text: "What is the purpose of insulators on overhead power line poles/pylons?",
    options: [
      "To decorate the structure",
      "To electrically isolate the live conductors from the earthed supporting structure",
      "To increase the voltage carried",
      "To measure wind speed"
    ],
    correct: "To electrically isolate the live conductors from the earthed supporting structure",
    explanation: "Insulators support overhead conductors while preventing current from flowing to the earthed pole or pylon structure.",
    topic: "Underground & Overhead Networks"
  },
  {
    text: "Why should any suspected damage to underground or overhead network cables (e.g. from excavation or a vehicle strike) always be reported to the Distribution Network Operator?",
    options: [
      "It is not necessary to report unless someone is injured",
      "The DNO needs to assess and repair the damage safely, as the cable/line may still be live and dangerous",
      "Only the police need to be informed",
      "Cable damage is never dangerous once buried"
    ],
    correct: "The DNO needs to assess and repair the damage safely, as the cable/line may still be live and dangerous",
    explanation: "Damaged network cables or lines can remain live and dangerous; the DNO must be informed promptly so they can make the situation safe and carry out repairs.",
    topic: "Underground & Overhead Networks"
  },
  {
    text: "What is the basic function of a diode?",
    options: [
      "To store electrical charge",
      "To allow current to flow in one direction only, blocking the reverse direction",
      "To measure voltage",
      "To resist current flow equally in both directions"
    ],
    correct: "To allow current to flow in one direction only, blocking the reverse direction",
    explanation: "A diode is a semiconductor device that allows current to flow easily in one direction (forward bias) while blocking it in the reverse direction.",
    topic: "Basic Electronics"
  },
  {
    text: "What is the basic function of a capacitor?",
    options: [
      "To store electrical energy in an electric field, releasing it when needed",
      "To convert AC to DC directly",
      "To measure resistance",
      "To always increase circuit current indefinitely"
    ],
    correct: "To store electrical energy in an electric field, releasing it when needed",
    explanation: "A capacitor stores energy in an electric field between two conductive plates, and can release that energy back into a circuit, used for functions like smoothing, filtering and power factor correction.",
    topic: "Basic Electronics"
  },
  {
    text: "What is the basic function of a transformer?",
    options: [
      "To convert AC voltage from one level to another using electromagnetic induction",
      "To store energy chemically",
      "To convert AC to DC without any additional components",
      "To generate electricity from mechanical rotation"
    ],
    correct: "To convert AC voltage from one level to another using electromagnetic induction",
    explanation: "A transformer uses electromagnetic induction between primary and secondary windings to step voltage up or down, without a direct electrical connection between the windings.",
    topic: "Basic Electronics"
  },
  {
    text: "What is a rectifier used for in a basic electronic power supply?",
    options: [
      "To convert AC to DC",
      "To convert DC to AC",
      "To measure frequency",
      "To increase voltage without conversion"
    ],
    correct: "To convert AC to DC",
    explanation: "A rectifier, typically built from diodes, converts alternating current (AC) into direct current (DC) for use in DC-powered circuits.",
    topic: "Basic Electronics"
  },
  {
    text: "What does a transistor commonly function as in electronic circuits?",
    options: [
      "A basic switch or amplifier controlling current flow",
      "A device that only measures voltage",
      "A type of fuse",
      "A device used only for lighting control"
    ],
    correct: "A basic switch or amplifier controlling current flow",
    explanation: "Transistors are semiconductor devices commonly used as electronic switches or amplifiers, forming the basis of much modern electronic control circuitry.",
    topic: "Basic Electronics"
  },
  {
    text: "What is the purpose of a printed circuit board (PCB) in electronic equipment?",
    options: [
      "To provide a physical platform with conductive tracks connecting electronic components",
      "To generate electricity",
      "To provide mains isolation on its own",
      "It has no functional role"
    ],
    correct: "To provide a physical platform with conductive tracks connecting electronic components",
    explanation: "A PCB provides a mechanical support and pre-defined conductive copper tracks that connect electronic components together in a compact, reliable format.",
    topic: "Basic Electronics"
  },
  {
    text: "Why might an electrician need a basic understanding of electronics when working with modern equipment such as LED drivers or smart controls?",
    options: [
      "It is never relevant to electrical work",
      "Modern equipment increasingly incorporates electronic components, so understanding their basic operation helps with correct installation, fault-finding and compatibility",
      "Only electronic engineers need this knowledge",
      "Electronics has no connection to electrical installation work"
    ],
    correct: "Modern equipment increasingly incorporates electronic components, so understanding their basic operation helps with correct installation, fault-finding and compatibility",
    explanation: "As electrical installations increasingly integrate electronic components (drivers, smart controls, inverters), a basic understanding helps electricians install, diagnose and maintain equipment correctly.",
    topic: "Basic Electronics"
  },
  {
    text: "What is the standard mounting height guidance (per Building Regulations Part M) for socket outlets in new domestic work, to aid accessibility?",
    options: [
      "There is no accessibility guidance for socket height",
      "Typically between 450mm and 1200mm from finished floor level",
      "Always exactly 300mm from the floor",
      "Always at ceiling height"
    ],
    correct: "Typically between 450mm and 1200mm from finished floor level",
    explanation: "Building Regulations Part M guidance recommends socket outlets and switches be mounted within a height range (commonly 450mm-1200mm) to improve accessibility for a wider range of users.",
    topic: "Sockets & Switches Installation"
  },
  {
    text: "Why should a socket outlet not be installed directly above a heat source such as a cooker hob?",
    options: [
      "It has no practical risk",
      "Excess heat can degrade the socket and cable insulation, and increases fire risk near flammable materials",
      "It is only a cosmetic concern",
      "Sockets are always heat-resistant"
    ],
    correct: "Excess heat can degrade the socket and cable insulation, and increases fire risk near flammable materials",
    explanation: "Positioning sockets away from heat sources reduces the risk of insulation degradation and fire, and avoids leads trailing near hot surfaces.",
    topic: "Sockets & Switches Installation"
  },
  {
    text: "What is the purpose of shuttered socket outlets, commonly used in the UK?",
    options: [
      "To reduce cost only",
      "To prevent access to live contacts unless both line and neutral pins are inserted simultaneously, improving safety, especially around children",
      "To increase current rating",
      "They serve no safety function"
    ],
    correct: "To prevent access to live contacts unless both line and neutral pins are inserted simultaneously, improving safety, especially around children",
    explanation: "Shuttered sockets have internal shutters that block access to the live contacts unless a plug's line and neutral pins are inserted together, reducing the risk of foreign objects contacting live parts.",
    topic: "Sockets & Switches Installation"
  },
  {
    text: "Why is it good practice to avoid overloading a single socket outlet with multiple high-current appliances via adaptors?",
    options: [
      "It has no real risk if the adaptor looks sturdy",
      "It can exceed the rated current of the socket/circuit, causing overheating and fire risk",
      "Adaptors always increase the circuit's safe capacity",
      "It only matters for outdoor sockets"
    ],
    correct: "It can exceed the rated current of the socket/circuit, causing overheating and fire risk",
    explanation: "Using multiple adaptors to run several high-current appliances from one outlet can exceed the safe current rating of the socket or circuit, risking overheating.",
    topic: "Sockets & Switches Installation"
  },
  {
    text: "What is a fused connection unit (FCU) commonly used for?",
    options: [
      "To provide a fixed, fused supply connection to an appliance, often without a plug/socket arrangement",
      "To generate electricity",
      "To measure current only",
      "To provide RCD protection exclusively"
    ],
    correct: "To provide a fixed, fused supply connection to an appliance, often without a plug/socket arrangement",
    explanation: "An FCU provides a fused, often switched, fixed connection point for an appliance, commonly used for items like extractor fans, boilers or fixed heaters.",
    topic: "Sockets & Switches Installation"
  },
  {
    text: "Why might a switched FCU with a neon indicator be preferred for supplying a fixed appliance?",
    options: [
      "It provides a clear indication of whether the supply is on, aiding safety during maintenance",
      "It has no advantage over an unswitched version",
      "It reduces the appliance's power consumption",
      "It removes the need for isolation entirely"
    ],
    correct: "It provides a clear indication of whether the supply is on, aiding safety during maintenance",
    explanation: "A neon indicator on a switched FCU shows at a glance whether the connected appliance's supply is live, providing a useful visual check before working on the appliance.",
    topic: "Sockets & Switches Installation"
  },
  {
    text: "What consideration applies when installing outdoor socket outlets?",
    options: [
      "No special consideration is needed beyond standard indoor sockets",
      "They must have an appropriate IP rating for weather exposure and be RCD protected",
      "Outdoor sockets never require RCD protection",
      "Outdoor sockets must be uninsulated for drainage"
    ],
    correct: "They must have an appropriate IP rating for weather exposure and be RCD protected",
    explanation: "Outdoor socket outlets require a suitable IP rating to resist water/dust ingress and must be RCD protected, given the increased shock risk in outdoor/damp environments.",
    topic: "Sockets & Switches Installation"
  },
  {
    text: "What is a key hazard associated with reversing vehicles or plant on a construction site?",
    options: [
      "There is no significant hazard",
      "Restricted visibility to the rear can result in a person being struck",
      "Reversing is always safer than moving forward",
      "It only poses a risk to the vehicle itself"
    ],
    correct: "Restricted visibility to the rear can result in a person being struck",
    explanation: "Drivers often have limited visibility to the rear, increasing the risk of striking a pedestrian; banksmen, reversing alarms and cameras help mitigate this.",
    topic: "Vehicles & Plant on Site"
  },
  {
    text: "What is the purpose of exclusion zones around mobile plant such as excavators?",
    options: [
      "To keep pedestrians and other workers a safe distance from moving plant and its working radius",
      "To reserve parking spaces",
      "They serve no safety function",
      "Only to protect the plant from damage"
    ],
    correct: "To keep pedestrians and other workers a safe distance from moving plant and its working radius",
    explanation: "Exclusion zones prevent people entering the danger area around moving plant, such as an excavator's swing radius, reducing the risk of being struck.",
    topic: "Vehicles & Plant on Site"
  },
  {
    text: "Why must only trained and authorised persons operate mobile plant such as forklifts or excavators?",
    options: [
      "It is not important who operates plant",
      "Untrained operation significantly increases the risk of accidents, injury and damage",
      "Training has no real safety benefit",
      "Any worker can safely operate any plant"
    ],
    correct: "Untrained operation significantly increases the risk of accidents, injury and damage",
    explanation: "Operating mobile plant safely requires specific training and competence; allowing untrained persons to operate it significantly raises the risk of serious accidents.",
    topic: "Vehicles & Plant on Site"
  },
  {
    text: "What should a pedestrian do when working near operating mobile plant on site?",
    options: [
      "Assume the operator has seen them and continue as normal",
      "Make eye contact with the operator or use agreed signals before approaching, and stay within designated pedestrian routes",
      "Walk close behind the plant for shade",
      "There is no need for caution around plant"
    ],
    correct: "Make eye contact with the operator or use agreed signals before approaching, and stay within designated pedestrian routes",
    explanation: "Pedestrians should never assume they have been seen; confirming eye contact or using agreed signals, and sticking to designated pedestrian routes, reduces the risk of being struck.",
    topic: "Vehicles & Plant on Site"
  },
  {
    text: "What is the purpose of a Traffic Management Plan on a busy construction site?",
    options: [
      "It has no defined purpose",
      "To organise vehicle and pedestrian movement safely, reducing the risk of collisions",
      "Only to manage delivery schedules",
      "To replace the need for signage"
    ],
    correct: "To organise vehicle and pedestrian movement safely, reducing the risk of collisions",
    explanation: "A Traffic Management Plan defines routes, speed limits, segregation and controls for vehicles and pedestrians, aiming to reduce the risk of collisions on site.",
    topic: "Vehicles & Plant on Site"
  },
  {
    text: "What precaution should be taken before working underneath a raised vehicle body or plant attachment?",
    options: [
      "No precaution is needed if the hydraulics look secure",
      "Ensure it is mechanically supported (e.g. props/stands), not relying solely on hydraulics, which could fail",
      "Only check that the engine is switched off",
      "Working underneath raised bodies is always prohibited outright"
    ],
    correct: "Ensure it is mechanically supported (e.g. props/stands), not relying solely on hydraulics, which could fail",
    explanation: "Hydraulic systems can fail or leak down over time, so mechanical support such as props or stands should always be used before working beneath a raised body or attachment.",
    topic: "Vehicles & Plant on Site"
  },
  {
    text: "Why should outdoor electrical work generally be avoided during heavy rain or storms?",
    options: [
      "Weather has no effect on electrical work safety",
      "Wet conditions increase shock risk, and lightning presents a serious danger, particularly at height or near metal structures",
      "It only affects worker comfort, not safety",
      "Rain always improves earthing performance"
    ],
    correct: "Wet conditions increase shock risk, and lightning presents a serious danger, particularly at height or near metal structures",
    explanation: "Wet conditions reduce body resistance and increase shock severity, and lightning poses a serious danger, especially when working at height or near metal structures like scaffolding.",
    topic: "Weather & Outdoor Work"
  },
  {
    text: "What precaution should be taken regarding work at height during high winds?",
    options: [
      "Continue as normal regardless of wind speed",
      "Assess wind speed against equipment/task limits (e.g. MEWP manufacturer guidance) and postpone work if conditions are unsafe",
      "Only a concern for very tall buildings",
      "Wind has no effect on work at height safety"
    ],
    correct: "Assess wind speed against equipment/task limits (e.g. MEWP manufacturer guidance) and postpone work if conditions are unsafe",
    explanation: "High winds can destabilise access equipment and increase fall risk; work should be assessed against manufacturer and site limits, and postponed if conditions exceed safe thresholds.",
    topic: "Weather & Outdoor Work"
  },
  {
    text: "What is a risk of working outdoors in extreme cold for extended periods?",
    options: [
      "No risk, cold weather has no health impact",
      "Cold stress, reduced dexterity, and increased risk of slips on icy surfaces",
      "It only affects equipment, not workers",
      "It always improves concentration"
    ],
    correct: "Cold stress, reduced dexterity, and increased risk of slips on icy surfaces",
    explanation: "Prolonged cold exposure can cause cold stress and reduced manual dexterity, while icy surfaces significantly increase slip and fall risk.",
    topic: "Weather & Outdoor Work"
  },
  {
    text: "What is a risk of working outdoors in extreme heat for extended periods?",
    options: [
      "There is no risk from heat exposure",
      "Heat exhaustion or heat stroke, dehydration, and reduced concentration",
      "It only affects equipment performance",
      "Heat always improves worker alertness"
    ],
    correct: "Heat exhaustion or heat stroke, dehydration, and reduced concentration",
    explanation: "Prolonged heat exposure can cause heat exhaustion or, in severe cases, heat stroke, along with dehydration and reduced concentration, all of which can compromise safety.",
    topic: "Weather & Outdoor Work"
  },
  {
    text: "Why is appropriate clothing/PPE selection important for outdoor work in varying weather?",
    options: [
      "Clothing choice has no effect on safety or wellbeing",
      "It helps protect against cold, heat, wet conditions and UV exposure, reducing associated health risks",
      "It is purely a matter of personal preference",
      "Only high-visibility clothing matters, regardless of weather"
    ],
    correct: "It helps protect against cold, heat, wet conditions and UV exposure, reducing associated health risks",
    explanation: "Suitable clothing and PPE for the prevailing weather conditions helps manage risks from cold, heat, wet weather and UV exposure during outdoor work.",
    topic: "Weather & Outdoor Work"
  },
  {
    text: "What should be considered about ground conditions before positioning access equipment outdoors after rain?",
    options: [
      "Ground conditions do not need to be considered",
      "Soft or waterlogged ground can affect the stability of ladders, towers or MEWPs, increasing the risk of tipping or sinking",
      "Rain always firms up the ground",
      "Only relevant for very heavy plant"
    ],
    correct: "Soft or waterlogged ground can affect the stability of ladders, towers or MEWPs, increasing the risk of tipping or sinking",
    explanation: "Wet or soft ground can reduce the stability of access equipment, increasing the risk of the equipment sinking, tipping or becoming unstable during use.",
    topic: "Weather & Outdoor Work"
  },
  {
    text: "Why is it important to protect flooring and furnishings when working inside an occupied property?",
    options: [
      "It is not necessary if the job is quick",
      "To avoid causing accidental damage to the client's property and maintain professionalism",
      "Only required in commercial premises",
      "Protection has no practical benefit"
    ],
    correct: "To avoid causing accidental damage to the client's property and maintain professionalism",
    explanation: "Using dust sheets and floor protection helps prevent accidental damage to a client's property, supporting a professional standard of work.",
    topic: "Working in Occupied Premises"
  },
  {
    text: "Why should power tools and materials be kept tidy and secured while working in an occupied home, especially where children or vulnerable people live?",
    options: [
      "Tidiness is only a matter of appearance",
      "To reduce trip hazards and prevent unauthorised or accidental access to tools/materials that could cause harm",
      "It has no safety relevance",
      "Only relevant in commercial premises"
    ],
    correct: "To reduce trip hazards and prevent unauthorised or accidental access to tools/materials that could cause harm",
    explanation: "Keeping the work area tidy reduces trip hazards for occupants and prevents tools or materials being accessed by children or vulnerable people who could be harmed.",
    topic: "Working in Occupied Premises"
  },
  {
    text: "What should you do before disconnecting power to a whole property if occupants rely on essential medical equipment?",
    options: [
      "Disconnect without warning, as it is a minor inconvenience",
      "Inform the occupants in advance and plan the work to minimise disruption, considering alternative arrangements if needed",
      "It is not necessary to consider this",
      "Only medical staff need to be informed"
    ],
    correct: "Inform the occupants in advance and plan the work to minimise disruption, considering alternative arrangements if needed",
    explanation: "Where occupants depend on powered medical equipment, advance notice and careful planning are essential to avoid putting their health at risk during a supply interruption.",
    topic: "Working in Occupied Premises"
  },
  {
    text: "What is good practice regarding identification (ID) when attending a domestic customer's property?",
    options: [
      "ID is never necessary",
      "Carry and, if requested, show appropriate identification to reassure the customer of your identity and authorisation",
      "Only show ID if asked by police",
      "ID is only relevant for commercial sites"
    ],
    correct: "Carry and, if requested, show appropriate identification to reassure the customer of your identity and authorisation",
    explanation: "Carrying and showing ID when requested helps reassure customers of who is attending their property, an important part of professional and safe practice, especially for vulnerable occupants.",
    topic: "Working in Occupied Premises"
  },
  {
    text: "Why is it important to explain to a customer what you are about to do before starting work in their home, especially before isolating supplies?",
    options: [
      "Explanation is not required for professional tradespeople",
      "It manages expectations, avoids alarming occupants, and allows them to plan around any disruption such as loss of power",
      "It only benefits the tradesperson",
      "Customers never need advance notice of disruption"
    ],
    correct: "It manages expectations, avoids alarming occupants, and allows them to plan around any disruption such as loss of power",
    explanation: "Explaining planned work, especially anything causing disruption like a power cut, helps manage customer expectations and allows them to prepare accordingly.",
    topic: "Working in Occupied Premises"
  },
  {
    text: "What should be done at the end of a job in an occupied property before leaving?",
    options: [
      "Leave immediately without any checks",
      "Ensure the work area is left clean, safe and tidy, and confirm with the customer that everything is working as expected",
      "Leave tools behind for next time",
      "Only clean up if specifically requested"
    ],
    correct: "Ensure the work area is left clean, safe and tidy, and confirm with the customer that everything is working as expected",
    explanation: "Leaving the work area clean and safe, and confirming the completed work with the customer, are important parts of a professional standard of service.",
    topic: "Working in Occupied Premises"
  },
  {
    text: "According to GS38, what is a key safety feature of good quality test probes?",
    options: [
      "Bright colours only",
      "Finger guards/barriers and shrouded tips with minimal exposed metal to reduce accidental contact with live parts",
      "A long, sharp metal tip with no shrouding",
      "A heavy weighted handle"
    ],
    correct: "Finger guards/barriers and shrouded tips with minimal exposed metal to reduce accidental contact with live parts",
    explanation: "GS38 recommends test probes have finger guards and minimal exposed metal tip length, reducing the chance of the user's fingers slipping onto a live part.",
    topic: "Testing Instruments Deep Dive"
  },
  {
    text: "Why should test leads incorporate fused protection, per GS38 guidance?",
    options: [
      "Fuses are not recommended in test leads",
      "To limit the current that can flow through the leads/instrument in the event of an inadvertent short circuit or fault, protecting the user",
      "To increase the accuracy of readings",
      "Fuses in leads serve no safety function"
    ],
    correct: "To limit the current that can flow through the leads/instrument in the event of an inadvertent short circuit or fault, protecting the user",
    explanation: "Fused test leads limit the current that can flow if the probes are inadvertently shorted or a fault occurs, helping protect the user and instrument.",
    topic: "Testing Instruments Deep Dive"
  },
  {
    text: "Why should a voltage indicator be selected with a suitable CAT (category) rating for the environment it will be used in?",
    options: [
      "CAT ratings only affect the instrument's price",
      "The CAT rating reflects the instrument's ability to withstand transient overvoltages typical of different points in an electrical system",
      "CAT rating has no relevance to test instrument selection",
      "All test instruments have the same CAT rating"
    ],
    correct: "The CAT rating reflects the instrument's ability to withstand transient overvoltages typical of different points in an electrical system",
    explanation: "CAT ratings (CAT II, III, IV etc.) indicate an instrument's ability to safely withstand transient overvoltages likely at different points in an installation, from equipment level up to the origin of supply.",
    topic: "Testing Instruments Deep Dive"
  },
  {
    text: "Why should test instruments be periodically calibrated by an accredited facility?",
    options: [
      "Calibration is unnecessary once purchased",
      "To confirm the instrument continues to give accurate readings, which is essential for reliable and safe test results",
      "Calibration only affects the instrument's appearance",
      "Calibration is only required for insurance purposes, not safety"
    ],
    correct: "To confirm the instrument continues to give accurate readings, which is essential for reliable and safe test results",
    explanation: "Test instruments can drift out of accuracy over time or with damage; regular calibration confirms they continue to give reliable results, which is essential for safety-critical tests.",
    topic: "Testing Instruments Deep Dive"
  },
  {
    text: "What is the purpose of a continuity buzzer/tester's audible tone during testing?",
    options: [
      "It has no functional purpose",
      "To give an immediate audible indication of continuity without needing to watch a display, useful while testing at a distance",
      "To indicate the instrument's battery is low",
      "To warn of a dangerous voltage present"
    ],
    correct: "To give an immediate audible indication of continuity without needing to watch a display, useful while testing at a distance",
    explanation: "An audible continuity indication allows a tester to confirm a circuit's continuity without needing to visually monitor the display, useful when testing at a distance or in awkward positions.",
    topic: "Testing Instruments Deep Dive"
  },
  {
    text: "Why should an insulation resistance tester's leads be handled with care immediately after a test?",
    options: [
      "It is not necessary, the test voltage disappears instantly with no residual risk",
      "Capacitance in the circuit under test can retain a charge briefly after testing, presenting a residual shock risk",
      "Test leads are never a shock risk after testing",
      "The reading has no bearing on safety after the test"
    ],
    correct: "Capacitance in the circuit under test can retain a charge briefly after testing, presenting a residual shock risk",
    explanation: "Long cable runs or circuits with capacitive elements can retain a charge briefly after an insulation resistance test, so care should be taken even though many testers include auto-discharge features.",
    topic: "Testing Instruments Deep Dive"
  },
  {
    text: "What does a low-ohms continuity tester typically use to check the resistance of a conductor?",
    options: [
      "A small test current and voltage, measuring the resulting resistance in ohms",
      "A high voltage similar to insulation resistance testing",
      "Only a visual inspection with no current applied",
      "A magnetic field detector"
    ],
    correct: "A small test current and voltage, measuring the resulting resistance in ohms",
    explanation: "Continuity testers apply a small test current at low voltage to measure the resistance of a conductor path, distinct from the higher voltage used for insulation resistance testing.",
    topic: "Testing Instruments Deep Dive"
  },
  {
    text: "Why is it good practice to null (zero) test leads before taking a low-resistance continuity measurement?",
    options: [
      "It has no effect on the measurement",
      "To subtract the resistance of the test leads themselves, giving a more accurate reading of the conductor under test",
      "It changes the instrument's CAT rating",
      "It is only relevant for insulation resistance testing"
    ],
    correct: "To subtract the resistance of the test leads themselves, giving a more accurate reading of the conductor under test",
    explanation: "Nulling the leads compensates for their own small resistance, so the displayed reading more accurately reflects the resistance of the conductor being tested, particularly important for low-resistance measurements.",
    topic: "Testing Instruments Deep Dive"
  },
  {
    text: "What is the purpose of a standby generator in a commercial building?",
    options: [
      "To provide backup electrical power in the event of a mains supply failure",
      "To reduce normal electricity bills",
      "To replace the need for a consumer unit",
      "To provide lighting control only"
    ],
    correct: "To provide backup electrical power in the event of a mains supply failure",
    explanation: "Standby generators automatically or manually provide an alternative power source when the normal mains supply fails, maintaining supply to critical loads.",
    topic: "Standby Power & Generators"
  },
  {
    text: "What is the purpose of a changeover switch between mains and generator supply?",
    options: [
      "To increase voltage",
      "To ensure the mains and generator supplies can never be connected to the installation simultaneously, preventing dangerous back-feed",
      "To measure generator fuel levels",
      "It has no safety function"
    ],
    correct: "To ensure the mains and generator supplies can never be connected to the installation simultaneously, preventing dangerous back-feed",
    explanation: "A changeover switch (often interlocked) ensures only one source — mains or generator — is ever connected at a time, preventing dangerous back-feeding of the network, which could endanger network engineers.",
    topic: "Standby Power & Generators"
  },
  {
    text: "Why is 'back-feed' from a generator into the public network a serious hazard?",
    options: [
      "It has no real hazard",
      "It can energise supposedly dead network conductors, endangering network engineers working nearby who believe the line is isolated",
      "It only affects the generator itself",
      "Back-feed cannot occur with modern generators"
    ],
    correct: "It can energise supposedly dead network conductors, endangering network engineers working nearby who believe the line is isolated",
    explanation: "If a generator's output back-feeds into the isolated public network during a power cut, network engineers working on what they believe is a dead line could be seriously injured or killed.",
    topic: "Standby Power & Generators"
  },
  {
    text: "What is the purpose of an Automatic Transfer Switch (ATS) in a standby power system?",
    options: [
      "To automatically switch the load between mains and standby generator supply when the mains fails, and back again once restored",
      "To increase the generator's fuel efficiency",
      "To provide lighting control",
      "It has no functional purpose"
    ],
    correct: "To automatically switch the load between mains and standby generator supply when the mains fails, and back again once restored",
    explanation: "An ATS automatically detects mains failure, starts the generator (if not already running) and transfers the load, then switches back once the mains supply is restored and stable.",
    topic: "Standby Power & Generators"
  },
  {
    text: "What is the purpose of a UPS (Uninterruptible Power Supply)?",
    options: [
      "To provide immediate, short-term backup power (typically from batteries) to bridge the gap until mains is restored or a generator starts",
      "To replace the need for mains power permanently",
      "To provide long-term power for days at a time in all cases",
      "It has no relation to power continuity"
    ],
    correct: "To provide immediate, short-term backup power (typically from batteries) to bridge the gap until mains is restored or a generator starts",
    explanation: "A UPS provides near-instantaneous backup power, typically from batteries, to maintain supply to critical equipment during a brief interruption or while a generator starts up.",
    topic: "Standby Power & Generators"
  },
  {
    text: "Why should generators be operated in a well-ventilated area?",
    options: [
      "Ventilation is not important for generators",
      "To prevent dangerous build-up of exhaust fumes, including carbon monoxide",
      "Only to reduce noise",
      "Ventilation only affects fuel efficiency"
    ],
    correct: "To prevent dangerous build-up of exhaust fumes, including carbon monoxide",
    explanation: "Generator exhaust contains carbon monoxide and other harmful gases; adequate ventilation is essential to prevent dangerous concentrations building up, particularly in enclosed spaces.",
    topic: "Standby Power & Generators"
  },
  {
    text: "What routine checks are typically important for a standby generator installation?",
    options: [
      "No checks are needed once installed",
      "Regular testing under load, fuel checks, battery condition, and automatic changeover function tests",
      "Only a visual check of the paintwork",
      "Checks are only needed once every 10 years"
    ],
    correct: "Regular testing under load, fuel checks, battery condition, and automatic changeover function tests",
    explanation: "Standby generators require regular maintenance including load testing, fuel and battery checks, and confirming automatic changeover functions correctly, to ensure reliability when actually needed.",
    topic: "Standby Power & Generators"
  },
  {
    text: "What is the basic function of an access control system, such as a card/fob reader on a door?",
    options: [
      "To provide fire detection",
      "To restrict entry to authorised persons only, typically by verifying a credential such as a card, fob or code",
      "To provide emergency lighting",
      "It has no security function"
    ],
    correct: "To restrict entry to authorised persons only, typically by verifying a credential such as a card, fob or code",
    explanation: "Access control systems verify a presented credential (card, fob, code or biometric) against an authorised list before releasing a door lock, restricting entry to permitted individuals.",
    topic: "Access Control & Security Systems"
  },
  {
    text: "What is the purpose of a 'fail-safe' electric door lock in relation to fire safety?",
    options: [
      "It remains locked during a power failure",
      "It automatically unlocks (releases) if power is lost, allowing free egress during an emergency such as a fire",
      "It has no relation to power supply",
      "It only operates during normal business hours"
    ],
    correct: "It automatically unlocks (releases) if power is lost, allowing free egress during an emergency such as a fire",
    explanation: "Fail-safe locks release when power is removed, ensuring doors on escape routes can be opened freely if the electrical supply fails or the fire alarm activates.",
    topic: "Access Control & Security Systems"
  },
  {
    text: "What is the difference between a 'fail-safe' and 'fail-secure' electric lock?",
    options: [
      "There is no difference",
      "Fail-safe unlocks on power loss (for escape routes); fail-secure remains locked on power loss (for higher security areas)",
      "Fail-secure always unlocks on power loss",
      "Both types behave identically on power loss"
    ],
    correct: "Fail-safe unlocks on power loss (for escape routes); fail-secure remains locked on power loss (for higher security areas)",
    explanation: "Fail-safe locks release on power loss, prioritising means of escape, while fail-secure locks remain locked on power loss, prioritising security — the correct type depends on the door's role.",
    topic: "Access Control & Security Systems"
  },
  {
    text: "Why must access control door locking arrangements never compromise a required fire escape route?",
    options: [
      "Fire escape routes are not affected by locking arrangements",
      "A door that cannot be opened quickly during an emergency could trap occupants, risking serious injury or death",
      "It is only a design preference, not a safety requirement",
      "Security is always prioritised over means of escape"
    ],
    correct: "A door that cannot be opened quickly during an emergency could trap occupants, risking serious injury or death",
    explanation: "Fire safety legislation requires that means of escape are never compromised; access control on escape routes must allow free exit in an emergency, often via break-glass units or fail-safe locking.",
    topic: "Access Control & Security Systems"
  },
  {
    text: "What is a 'break glass' unit sometimes fitted alongside an electric door lock used for?",
    options: [
      "To sound the fire alarm only",
      "To provide a manual emergency override to release the door lock in the event of an emergency",
      "To measure smoke density",
      "It has no functional purpose"
    ],
    correct: "To provide a manual emergency override to release the door lock in the event of an emergency",
    explanation: "A break-glass unit provides a simple manual means of releasing an electrically locked door in an emergency, ensuring occupants can escape even if the automatic system fails.",
    topic: "Access Control & Security Systems"
  },
  {
    text: "What is the general purpose of CCTV (closed-circuit television) systems?",
    options: [
      "To provide live television broadcast",
      "To monitor and record activity in and around a premises for security purposes",
      "To provide lighting control",
      "It has no security application"
    ],
    correct: "To monitor and record activity in and around a premises for security purposes",
    explanation: "CCTV systems capture and often record video footage for security monitoring, deterrence and evidence purposes around a premises.",
    topic: "Access Control & Security Systems"
  },
  {
    text: "What electrical consideration is relevant when running cabling for an external CCTV camera?",
    options: [
      "No special consideration is needed",
      "Selecting cable and enclosures suitable for outdoor exposure, and appropriate isolation/protection for the supply",
      "External cameras never need a power supply",
      "Only the camera's picture quality matters"
    ],
    correct: "Selecting cable and enclosures suitable for outdoor exposure, and appropriate isolation/protection for the supply",
    explanation: "External CCTV installations need weather-resistant cable and enclosures, along with correctly protected and isolated power supplies, following standard good electrical installation practice.",
    topic: "Access Control & Security Systems"
  },
  {
    text: "What is the basic function of a battery in an electrical system?",
    options: [
      "To store chemical energy and convert it into electrical energy (DC) when required",
      "To convert AC to a higher voltage",
      "To generate AC electricity directly",
      "To measure current only"
    ],
    correct: "To store chemical energy and convert it into electrical energy (DC) when required",
    explanation: "A battery stores energy chemically and releases it as direct current (DC) electrical energy when connected to a circuit.",
    topic: "Batteries & DC Systems"
  },
  {
    text: "What is a key safety hazard associated with charging lead-acid batteries?",
    options: [
      "No hazard exists during charging",
      "The release of hydrogen gas, which is flammable and can form an explosive mixture with air if not adequately ventilated",
      "Only a risk of overheating the charger",
      "Lead-acid batteries cannot be overcharged"
    ],
    correct: "The release of hydrogen gas, which is flammable and can form an explosive mixture with air if not adequately ventilated",
    explanation: "Charging lead-acid batteries can release hydrogen gas, which is highly flammable; adequate ventilation is essential to prevent a build-up of an explosive gas mixture.",
    topic: "Batteries & DC Systems"
  },
  {
    text: "Why is lithium-ion battery fire risk a growing concern in electrical/construction environments?",
    options: [
      "Lithium-ion batteries present no fire risk",
      "Damaged, poor-quality or incorrectly charged lithium-ion cells can suffer thermal runaway, leading to intense, hard-to-extinguish fires",
      "Lithium-ion batteries cannot be charged incorrectly",
      "This risk only applies to very large batteries"
    ],
    correct: "Damaged, poor-quality or incorrectly charged lithium-ion cells can suffer thermal runaway, leading to intense, hard-to-extinguish fires",
    explanation: "Lithium-ion batteries can experience thermal runaway if damaged, defective, or improperly charged, resulting in intense fires that are difficult to extinguish and can reignite.",
    topic: "Batteries & DC Systems"
  },
  {
    text: "Why should damaged or swollen lithium-ion batteries never continue to be used or charged?",
    options: [
      "Damage has no effect on battery safety",
      "Physical damage or swelling can indicate internal cell failure, significantly increasing fire/explosion risk",
      "Swelling always means the battery is fully charged",
      "It is fine to continue using them if they still power the device"
    ],
    correct: "Physical damage or swelling can indicate internal cell failure, significantly increasing fire/explosion risk",
    explanation: "Physical damage or swelling in a lithium-ion battery often indicates internal degradation or failure, significantly raising the risk of fire, and such batteries should be taken out of service immediately.",
    topic: "Batteries & DC Systems"
  },
  {
    text: "Why should DC circuits be treated with particular care regarding arcing when disconnecting under load?",
    options: [
      "DC arcs are never a concern",
      "Unlike AC, DC does not naturally pass through zero current, so a DC arc can be more sustained and harder to extinguish",
      "DC circuits never carry significant current",
      "DC arcing is identical in behaviour to AC arcing"
    ],
    correct: "Unlike AC, DC does not naturally pass through zero current, so a DC arc can be more sustained and harder to extinguish",
    explanation: "AC current naturally passes through zero twice per cycle, which helps extinguish an arc; DC does not have this natural zero-crossing, so DC arcs can be more sustained and require devices specifically rated for DC switching.",
    topic: "Batteries & DC Systems"
  },
  {
    text: "Why must switchgear/isolators used in DC circuits (e.g. solar PV DC side) be specifically rated for DC use?",
    options: [
      "AC-rated devices are always suitable for DC use with no modification",
      "DC switching requires devices designed to safely extinguish a DC arc, which behaves differently from an AC arc",
      "DC devices are only needed for very low voltages",
      "There is no difference between AC and DC rated switchgear"
    ],
    correct: "DC switching requires devices designed to safely extinguish a DC arc, which behaves differently from an AC arc",
    explanation: "DC-rated isolators and switchgear are specifically designed to safely break a DC arc; using AC-rated equipment on a DC circuit can be dangerous, as it may not safely extinguish the arc.",
    topic: "Batteries & DC Systems"
  },
  {
    text: "What is the purpose of a Battery Management System (BMS) in a modern lithium-ion battery storage system?",
    options: [
      "To monitor and protect individual cells, balancing charge and preventing over-charge, over-discharge or overheating",
      "To generate additional electricity",
      "To provide lighting control",
      "It has no safety-related function"
    ],
    correct: "To monitor and protect individual cells, balancing charge and preventing over-charge, over-discharge or overheating",
    explanation: "A BMS monitors individual cell voltages and temperature, balances charge across cells, and protects against unsafe conditions such as over-charging, over-discharging or overheating.",
    topic: "Batteries & DC Systems"
  },
  {
    text: "What does IP rating (Ingress Protection) indicate about an enclosure?",
    options: [
      "Its resistance to impact only",
      "Its level of protection against the ingress of solid objects and liquids",
      "Its current rating",
      "Its colour classification"
    ],
    correct: "Its level of protection against the ingress of solid objects and liquids",
    explanation: "An IP rating (e.g. IP65) describes an enclosure's protection against solid object ingress (first digit) and liquid ingress (second digit).",
    topic: "General Mixed Revision"
  },
  {
    text: "What does an IP rating of IP65 typically indicate?",
    options: [
      "No protection against dust or water",
      "Dust-tight and protected against low-pressure water jets from any direction",
      "Protection only against solid objects, not water",
      "Protection only underwater"
    ],
    correct: "Dust-tight and protected against low-pressure water jets from any direction",
    explanation: "IP65 means the enclosure is completely dust-tight (6) and protected against low-pressure water jets from any direction (5).",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the purpose of a socket outlet's rated current marking (e.g. 13A)?",
    options: [
      "It indicates the maximum current the outlet is designed to safely carry",
      "It indicates the outlet's voltage rating only",
      "It has no practical significance",
      "It indicates the outlet's manufacture date"
    ],
    correct: "It indicates the maximum current the outlet is designed to safely carry",
    explanation: "The rated current marking shows the maximum current the socket outlet is designed to safely carry on a continuous basis.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the standard UK domestic plug fuse rating commonly used for general appliances?",
    options: [
      "3A or 13A, selected according to the appliance's rating",
      "Always 30A regardless of appliance",
      "There is no fuse in a UK plug",
      "Always 1A"
    ],
    correct: "3A or 13A, selected according to the appliance's rating",
    explanation: "UK BS 1363 plugs contain a cartridge fuse, commonly rated 3A (for lower-power appliances) or 13A (for higher-power appliances), selected to suit the specific appliance.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the purpose of the fuse fitted inside a UK 13A plug?",
    options: [
      "To protect the flexible cable/appliance from excessive current, in addition to the circuit's main protective device",
      "To provide earthing",
      "To reduce voltage",
      "It serves no protective purpose"
    ],
    correct: "To protect the flexible cable/appliance from excessive current, in addition to the circuit's main protective device",
    explanation: "The plug fuse provides an additional layer of protection specifically sized to the flexible cable and appliance, which typically has a lower current rating than the circuit's main protective device.",
    topic: "General Mixed Revision"
  },
  {
    text: "Why is 'competence' an essential requirement for anyone carrying out electrical work?",
    options: [
      "Competence is not a legal or safety requirement",
      "Incompetent work increases the risk of danger to the worker, others, and the eventual users of the installation",
      "Only qualifications matter, not practical ability",
      "Competence is only relevant for complex commercial work"
    ],
    correct: "Incompetent work increases the risk of danger to the worker, others, and the eventual users of the installation",
    explanation: "Competence — combining knowledge, skill and experience — is essential to carry out electrical work safely, as required by the Electricity at Work Regulations.",
    topic: "General Mixed Revision"
  },
  {
    text: "What does 'competent person' generally mean in an electrical safety context?",
    options: [
      "Anyone who owns tools",
      "A person with sufficient technical knowledge, skill and experience to avoid danger while carrying out the relevant work",
      "Someone who has only completed a single short course",
      "A person appointed regardless of qualifications"
    ],
    correct: "A person with sufficient technical knowledge, skill and experience to avoid danger while carrying out the relevant work",
    explanation: "A competent person has the necessary combination of knowledge, skills, training and experience to safely carry out a specific electrical task without creating danger.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the general purpose of an Electrical Installation Certificate (EIC)?",
    options: [
      "To certify a new installation, or an addition/alteration involving a new circuit, meets BS 7671 requirements",
      "To provide a fire risk assessment",
      "To record staff training records",
      "It has no formal purpose"
    ],
    correct: "To certify a new installation, or an addition/alteration involving a new circuit, meets BS 7671 requirements",
    explanation: "An EIC certifies that new work — a new installation or an alteration/addition including a new circuit — has been designed, constructed, inspected and tested in accordance with BS 7671.",
    topic: "General Mixed Revision"
  },
  {
    text: "Who is normally responsible for signing the 'design', 'construction' and 'inspection & testing' sections of an EIC?",
    options: [
      "Only the client",
      "The person(s) responsible for each stage, who may be the same person or different competent persons",
      "Only the local authority",
      "No signature is required"
    ],
    correct: "The person(s) responsible for each stage, who may be the same person or different competent persons",
    explanation: "Each section of an EIC (design, construction, inspection & testing) is signed by the person(s) responsible for that stage, confirming their part meets the required standard.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the purpose of maintaining a logbook or record of test instrument calibration?",
    options: [
      "To evidence the instrument has been regularly checked for accuracy, supporting the reliability of test results produced",
      "It has no practical value",
      "Only required for instruments over 10 years old",
      "To record the instrument's purchase price"
    ],
    correct: "To evidence the instrument has been regularly checked for accuracy, supporting the reliability of test results produced",
    explanation: "A calibration record provides evidence that a test instrument's accuracy has been verified, supporting confidence in the results it produces.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is meant by 'segregation' in relation to cabling within an installation?",
    options: [
      "Keeping certain types of cable (e.g. mains and data, or different voltage bands) physically separated to prevent interference or danger",
      "Colour-coding all cables the same",
      "Removing the need for containment",
      "Running all cables in a single bundle regardless of type"
    ],
    correct: "Keeping certain types of cable (e.g. mains and data, or different voltage bands) physically separated to prevent interference or danger",
    explanation: "Segregation keeps different categories of cable (e.g. mains power, data, fire alarm, different voltage bands) appropriately separated to avoid interference or safety issues.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the purpose of an 'as designed' vs 'as built' comparison at project completion?",
    options: [
      "It has no useful purpose",
      "To confirm the final installation matches the intended design, or to document and justify any deviations",
      "Only relevant to architectural drawings",
      "To assign blame for delays"
    ],
    correct: "To confirm the final installation matches the intended design, or to document and justify any deviations",
    explanation: "Comparing the design against what was actually built helps confirm the installation meets its intended purpose and provides accurate documentation of any changes made during construction.",
    topic: "General Mixed Revision"
  },
  {
    text: "Why should an electrician avoid working alone on a high-risk live working task, wherever possible?",
    options: [
      "There is no additional risk from working alone on live tasks",
      "Having someone else present can help raise the alarm or assist quickly if something goes wrong",
      "Working alone is always the safest approach",
      "A second person only slows down the work"
    ],
    correct: "Having someone else present can help raise the alarm or assist quickly if something goes wrong",
    explanation: "For genuinely high-risk tasks such as unavoidable live working, having a second competent person present significantly improves the chances of a quick, effective response if something goes wrong.",
    topic: "General Mixed Revision"
  },
  {
    text: "Under what circumstances might live working be considered, according to the Electricity at Work Regulations?",
    options: [
      "Whenever it is more convenient than isolating",
      "Only where it is unreasonable in all the circumstances to work dead, and suitable precautions are taken to prevent injury",
      "Live working is completely prohibited under all circumstances",
      "Only when requested by the client, regardless of risk"
    ],
    correct: "Only where it is unreasonable in all the circumstances to work dead, and suitable precautions are taken to prevent injury",
    explanation: "EAWR permits live working only where it is unreasonable to work dead (e.g. certain fault-finding) and where suitable precautions, including competent personnel and correct equipment, are in place to prevent injury.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is a 'method of construction' consideration when selecting a wiring system for a particular installation?",
    options: [
      "Choosing a system appropriate to the environment, mechanical protection needs, and aesthetic/functional requirements of the location",
      "Only the cheapest option regardless of suitability",
      "Wiring systems do not vary by application",
      "It has no bearing on the design"
    ],
    correct: "Choosing a system appropriate to the environment, mechanical protection needs, and aesthetic/functional requirements of the location",
    explanation: "Selecting an appropriate wiring system (e.g. surface conduit, concealed cable, SWA, trunking) depends on the environment, required mechanical protection and the functional/aesthetic needs of the installation.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the significance of a manufacturer's installation instructions when fitting electrical equipment?",
    options: [
      "They should always be followed, as they specify the safe and correct method of installation for that specific product",
      "They are optional guidance with no real importance",
      "Manufacturer instructions can be safely ignored if the installer has general experience",
      "They only apply to commercial equipment"
    ],
    correct: "They should always be followed, as they specify the safe and correct method of installation for that specific product",
    explanation: "Manufacturer instructions detail the specific safe installation requirements for a product; deviating from them can compromise safety, performance, and warranty validity.",
    topic: "General Mixed Revision"
  },
  {
    text: "Why is it important to check equipment ratings match the supply before connection?",
    options: [
      "It is not necessary if the plug fits the socket",
      "Connecting equipment to an incompatible voltage or frequency can cause damage, malfunction or danger",
      "All electrical equipment works on any supply",
      "Rating checks are only relevant for industrial equipment"
    ],
    correct: "Connecting equipment to an incompatible voltage or frequency can cause damage, malfunction or danger",
    explanation: "Equipment must be matched to the supply voltage and frequency it was designed for; mismatches can cause damage, malfunction, or create a dangerous situation.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the purpose of an 'operation and maintenance' (O&M) manual handed over at project completion?",
    options: [
      "To provide the client/facilities team with information needed to safely operate and maintain the installed systems",
      "It has no practical use after handover",
      "To replace the need for as-built drawings",
      "Only required for very large commercial projects"
    ],
    correct: "To provide the client/facilities team with information needed to safely operate and maintain the installed systems",
    explanation: "O&M manuals provide essential information — equipment details, maintenance schedules, safety information — needed by those responsible for operating and maintaining the installation after handover.",
    topic: "General Mixed Revision"
  },
  {
    text: "Why might a 'permit to work' be specifically required before working on high voltage (HV) equipment?",
    options: [
      "HV work carries no additional risk requiring formal control",
      "HV equipment carries significantly higher energy and danger, requiring rigorous, formally documented control of access and isolation",
      "Permits are only used for low voltage work",
      "It is purely an administrative formality with no safety value"
    ],
    correct: "HV equipment carries significantly higher energy and danger, requiring rigorous, formally documented control of access and isolation",
    explanation: "High voltage systems present significantly greater danger, so formal permit-to-work systems provide rigorous, documented control over isolation, access and safe working procedures.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the general definition of 'low voltage' as commonly used in UK electrical regulations (e.g. BS 7671/EAWR context)?",
    options: [
      "Any voltage below 1V",
      "Voltage normally exceeding extra-low voltage but not exceeding 1000V AC between conductors (varies slightly by specific definition/context)",
      "Any voltage used in a domestic property, regardless of level",
      "Voltage exceeding 11,000V"
    ],
    correct: "Voltage normally exceeding extra-low voltage but not exceeding 1000V AC between conductors (varies slightly by specific definition/context)",
    explanation: "'Low voltage' in UK electrical terminology generally covers voltages above extra-low voltage up to 1000V AC (or 1500V DC), distinct from 'high voltage' systems used for larger-scale distribution.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is 'extra-low voltage' (ELV) generally defined as, per BS 7671?",
    options: [
      "Voltage not exceeding 50V AC (or 120V ripple-free DC) between conductors or to earth",
      "Any voltage above 1000V",
      "Exactly 230V",
      "Only DC voltages, never AC"
    ],
    correct: "Voltage not exceeding 50V AC (or 120V ripple-free DC) between conductors or to earth",
    explanation: "Extra-low voltage is defined by BS 7671 as not exceeding 50V AC or 120V ripple-free DC, a voltage band generally considered to present a lower shock risk under normal dry conditions.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is SELV (Separated Extra-Low Voltage)?",
    options: [
      "An extra-low voltage system that is electrically separated from earth and from higher voltage systems, providing enhanced shock protection",
      "A standard mains voltage system",
      "A voltage level only used in industrial motors",
      "A term unrelated to electrical safety"
    ],
    correct: "An extra-low voltage system that is electrically separated from earth and from higher voltage systems, providing enhanced shock protection",
    explanation: "SELV circuits are extra-low voltage and electrically isolated from earth and from other higher-voltage circuits, providing a high level of protection against electric shock, often used in bathrooms and similar higher-risk locations.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is PELV (Protective Extra-Low Voltage), as distinct from SELV?",
    options: [
      "PELV is identical to SELV in every respect",
      "PELV is an extra-low voltage system that, unlike SELV, may have a connection to earth at one point",
      "PELV only applies to DC systems",
      "PELV is used exclusively for street lighting"
    ],
    correct: "PELV is an extra-low voltage system that, unlike SELV, may have a connection to earth at one point",
    explanation: "PELV is similar to SELV but permits a protective earth connection at one point in the circuit, unlike SELV, which must remain fully isolated from earth.",
    topic: "General Mixed Revision"
  },
  {
    text: "What is the general purpose of a smart home lighting control system?",
    options: [
      "To allow remote or automated control of lighting, often via an app, voice control or sensors",
      "To replace the need for any wiring",
      "To generate electricity",
      "To provide fire detection only"
    ],
    correct: "To allow remote or automated control of lighting, often via an app, voice control or sensors",
    explanation: "Smart lighting systems allow lighting to be controlled remotely or automatically, using apps, voice assistants, schedules or sensors, in addition to or instead of standard switches.",
    topic: "Smart Home & Automation"
  },
  {
    text: "What protocol families are commonly used for smart home device communication?",
    options: [
      "Wi-Fi, Zigbee, Z-Wave and Bluetooth are common examples",
      "Only mains cabling can be used",
      "Only fibre optic cable is used",
      "Smart devices use a single universal protocol with no variation"
    ],
    correct: "Wi-Fi, Zigbee, Z-Wave and Bluetooth are common examples",
    explanation: "Smart home devices commonly communicate using wireless protocols such as Wi-Fi, Zigbee, Z-Wave or Bluetooth, each with different range, power and interoperability characteristics.",
    topic: "Smart Home & Automation"
  },
  {
    text: "Why is a neutral conductor often required at a smart light switch, unlike some traditional switches?",
    options: [
      "Neutral is never required at switches",
      "Many smart switches need a small standby power draw to operate their electronics, requiring a neutral connection",
      "Neutral is only required for three-phase switches",
      "It has no relevance to smart switch installation"
    ],
    correct: "Many smart switches need a small standby power draw to operate their electronics, requiring a neutral connection",
    explanation: "Smart switches often contain electronics (e.g. Wi-Fi modules) that need continuous low power, requiring a neutral conductor at the switch position, unlike many traditional switches.",
    topic: "Smart Home & Automation"
  },
  {
    text: "What is a smart thermostat generally designed to do?",
    options: [
      "Automatically or remotely control heating based on schedules, occupancy or learned behaviour, to improve comfort and efficiency",
      "Only display the current temperature with no control function",
      "Replace the boiler entirely",
      "It has no relation to heating control"
    ],
    correct: "Automatically or remotely control heating based on schedules, occupancy or learned behaviour, to improve comfort and efficiency",
    explanation: "Smart thermostats can control heating based on schedules, detected occupancy, or learned usage patterns, often improving both comfort and energy efficiency compared with basic timers.",
    topic: "Smart Home & Automation"
  },
  {
    text: "Why might an electrician need to consider Wi-Fi signal strength when positioning smart home hubs/controllers?",
    options: [
      "Signal strength has no bearing on smart device reliability",
      "Poor signal can cause smart devices to disconnect or respond unreliably, affecting system performance",
      "Wi-Fi signal only matters for internet browsing, not device control",
      "Smart devices never use wireless communication"
    ],
    correct: "Poor signal can cause smart devices to disconnect or respond unreliably, affecting system performance",
    explanation: "Weak or obstructed wireless signal can cause smart devices to become unreliable or disconnect, so hub/controller positioning is an important practical consideration.",
    topic: "Smart Home & Automation"
  },
  {
    text: "What is a key consideration when integrating smart home devices with the existing fixed wiring installation?",
    options: [
      "No consideration is needed, as smart devices are entirely independent of fixed wiring",
      "Ensuring compatibility with existing circuits (e.g. neutral availability, load type) and compliance with BS 7671",
      "Smart devices cannot be connected to fixed wiring under any circumstances",
      "Only the device's appearance matters"
    ],
    correct: "Ensuring compatibility with existing circuits (e.g. neutral availability, load type) and compliance with BS 7671",
    explanation: "Integrating smart devices into fixed wiring requires checking compatibility with existing circuits and ensuring the installation still complies with BS 7671 requirements.",
    topic: "Smart Home & Automation"
  },
  {
    text: "What is the general purpose of an electricity meter?",
    options: [
      "To measure the amount of electrical energy consumed, for billing purposes",
      "To provide overload protection",
      "To generate electricity",
      "To provide earthing for the installation"
    ],
    correct: "To measure the amount of electrical energy consumed, for billing purposes",
    explanation: "An electricity meter records the amount of energy (typically in kWh) consumed by an installation over time, forming the basis for billing by the supplier.",
    topic: "Metering"
  },
  {
    text: "What is a smart meter, as distinct from a traditional meter?",
    options: [
      "A meter that can communicate consumption data automatically to the supplier and often provide real-time usage information to the consumer",
      "A meter with no digital display",
      "A meter that generates electricity",
      "A type of meter used only for gas"
    ],
    correct: "A meter that can communicate consumption data automatically to the supplier and often provide real-time usage information to the consumer",
    explanation: "Smart meters automatically send consumption readings to the energy supplier and typically provide the consumer with more detailed, near real-time information on their usage.",
    topic: "Metering"
  },
  {
    text: "Who is generally responsible for the installation, connection and sealing of the electricity meter and cut-out at a domestic property?",
    options: [
      "Any general electrician, without restriction",
      "The Distribution Network Operator (DNO) or meter operator, as it is part of the metering/supply infrastructure",
      "The homeowner personally",
      "It is never installed at domestic properties"
    ],
    correct: "The Distribution Network Operator (DNO) or meter operator, as it is part of the metering/supply infrastructure",
    explanation: "The service cut-out, fuse and meter are generally the responsibility of the DNO or appointed meter operator, and are typically sealed to prevent unauthorised access or tampering.",
    topic: "Metering"
  },
  {
    text: "Why must the DNO's supply fuse/cut-out never be interfered with by an unauthorised person?",
    options: [
      "It is a purely cosmetic seal with no real restriction",
      "It remains live at all times (even with the main switch off) and unauthorised access is both dangerous and against regulations",
      "It only matters for commercial supplies",
      "There is no risk associated with the cut-out"
    ],
    correct: "It remains live at all times (even with the main switch off) and unauthorised access is both dangerous and against regulations",
    explanation: "The supply fuse/cut-out remains live even when the consumer's own main switch is off, so interfering with it is both extremely dangerous and against supply regulations without DNO authorisation.",
    topic: "Metering"
  },
  {
    text: "What is a 'time of use' or 'economy' tariff meter arrangement designed to support?",
    options: [
      "Charging different rates depending on the time of day electricity is used, often to encourage off-peak consumption",
      "It has no relation to electricity pricing",
      "Charging a single flat rate regardless of usage pattern",
      "Only used for commercial premises"
    ],
    correct: "Charging different rates depending on the time of day electricity is used, often to encourage off-peak consumption",
    explanation: "Time-of-use tariffs (like Economy 7) charge different rates at different times of day, incentivising consumers to shift usage to cheaper off-peak periods where practical.",
    topic: "Metering"
  },
  {
    text: "What is the purpose of a sub-meter within a larger multi-occupancy building?",
    options: [
      "To measure the electricity consumption of an individual tenant/unit separately from the main supply meter",
      "To replace the main meter entirely",
      "To provide RCD protection only",
      "Sub-meters have no billing relevance"
    ],
    correct: "To measure the electricity consumption of an individual tenant/unit separately from the main supply meter",
    explanation: "Sub-metering allows individual consumption within a larger building (e.g. separate flats or tenants) to be measured and billed separately from the overall building supply.",
    topic: "Metering"
  },
  {
    text: "What is a key hazard of using a temporary extension lead on a construction site over a long period?",
    options: [
      "No hazard exists if it is long enough",
      "Wear, damage, or overloading from repeated use in a harsh environment can create a shock or fire risk",
      "Temporary leads never need inspection",
      "Extension leads are always safer than fixed wiring"
    ],
    correct: "Wear, damage, or overloading from repeated use in a harsh environment can create a shock or fire risk",
    explanation: "Temporary leads used repeatedly on site are exposed to mechanical damage, moisture and overloading risk, so they require regular inspection and should not become a long-term substitute for proper fixed wiring.",
    topic: "Portable & Temporary Supplies"
  },
  {
    text: "What is the purpose of a temporary distribution board on a construction site?",
    options: [
      "To provide a controlled, protected source of power for site tools and equipment during the construction phase",
      "To generate electricity",
      "To provide permanent building power",
      "It has no defined role on site"
    ],
    correct: "To provide a controlled, protected source of power for site tools and equipment during the construction phase",
    explanation: "Temporary distribution boards provide appropriately protected power outlets (often at both 230V and 110V) for tools and equipment used during the construction phase of a project.",
    topic: "Portable & Temporary Supplies"
  },
  {
    text: "Why should temporary electrical installations on a construction site still be inspected and tested regularly?",
    options: [
      "Temporary installations do not require inspection",
      "They are subject to the same fundamental safety requirements as permanent installations, and are also exposed to harsher site conditions",
      "Only permanent installations require testing",
      "Site conditions have no effect on temporary wiring safety"
    ],
    correct: "They are subject to the same fundamental safety requirements as permanent installations, and are also exposed to harsher site conditions",
    explanation: "Temporary site installations must still meet fundamental safety requirements and are often exposed to more demanding conditions, making regular inspection and testing particularly important.",
    topic: "Portable & Temporary Supplies"
  },
  {
    text: "What is a common cause of failure in temporary site cabling connectors if not properly rated?",
    options: [
      "Connectors never fail if the cable is long enough",
      "Ingress of moisture or dust into connectors not rated for the environment, leading to corrosion or short circuits",
      "Connectors are unaffected by weather",
      "Temporary connectors require no IP rating"
    ],
    correct: "Ingress of moisture or dust into connectors not rated for the environment, leading to corrosion or short circuits",
    explanation: "Site connectors exposed to weather need an appropriate IP rating; inadequate protection can allow moisture or dust ingress, leading to corrosion, poor connections, or short circuits.",
    topic: "Portable & Temporary Supplies"
  },
  {
    text: "Why is a residual current device (RCD) particularly important for temporary supplies feeding portable tools on a construction site?",
    options: [
      "RCDs are not needed for temporary supplies",
      "The higher risk of cable damage and use in wet/harsh conditions on site increases shock risk, which RCD protection helps mitigate",
      "RCDs only protect against overload, which is not a concern with portable tools",
      "Portable tools are inherently immune to earth faults"
    ],
    correct: "The higher risk of cable damage and use in wet/harsh conditions on site increases shock risk, which RCD protection helps mitigate",
    explanation: "Construction sites present higher risks of cable damage and wet conditions, making RCD protection for portable tool supplies particularly important in reducing the risk and severity of electric shock.",
    topic: "Portable & Temporary Supplies"
  },
  {
    text: "What is the common maximum continuous operating temperature for standard PVC-insulated cable?",
    options: [
      "70°C",
      "35°C",
      "150°C",
      "10°C"
    ],
    correct: "70°C",
    explanation: "Standard general-purpose PVC-insulated cable is typically rated for a maximum continuous conductor operating temperature of 70°C.",
    topic: "Cable & Insulation Standards"
  },
  {
    text: "What is a common maximum continuous operating temperature for XLPE (cross-linked polyethylene) insulated cable?",
    options: [
      "90°C",
      "50°C",
      "20°C",
      "35°C"
    ],
    correct: "90°C",
    explanation: "XLPE-insulated cable typically has a higher maximum continuous operating temperature (commonly 90°C) than standard PVC, allowing greater current-carrying capacity for a given size.",
    topic: "Cable & Insulation Standards"
  },
  {
    text: "Why might XLPE-insulated cable be chosen over PVC for a given application?",
    options: [
      "It has no practical advantage over PVC",
      "Its higher operating temperature rating allows a smaller cable to carry the same current, or the same cable to carry more current",
      "It is always cheaper than PVC",
      "It cannot be used outdoors"
    ],
    correct: "Its higher operating temperature rating allows a smaller cable to carry the same current, or the same cable to carry more current",
    explanation: "The higher permissible operating temperature of XLPE insulation generally gives it a higher current-carrying capacity than an equivalent-sized PVC cable, useful where space or capacity is limited.",
    topic: "Cable & Insulation Standards"
  },
  {
    text: "What does a BASEC mark or approval typically indicate on cable?",
    options: [
      "The cable has been independently certified as meeting relevant British/European cable standards",
      "The cable is a specific colour",
      "The cable was manufactured in the UK only",
      "It has no relevance to cable quality"
    ],
    correct: "The cable has been independently certified as meeting relevant British/European cable standards",
    explanation: "BASEC (British Approvals Service for Cables) certification indicates a cable has been independently tested and approved as meeting the relevant standards, providing assurance of quality.",
    topic: "Cable & Insulation Standards"
  },
  {
    text: "What does LSZH (or LSF) stand for in relation to certain cable types?",
    options: [
      "Low Smoke Zero Halogen (or Low Smoke and Fume) — cable that emits less toxic smoke and fumes when burnt",
      "Low Sound Zero Hum — a type of cable with reduced electrical noise",
      "Large Section Zone Hazard — a rating for very large cables",
      "It has no established meaning"
    ],
    correct: "Low Smoke Zero Halogen (or Low Smoke and Fume) — cable that emits less toxic smoke and fumes when burnt",
    explanation: "LSZH/LSF cables are designed to emit significantly less smoke and fewer toxic/corrosive fumes than standard PVC cable if involved in a fire, often specified in areas with high occupancy or limited escape routes.",
    topic: "Cable & Insulation Standards"
  },
  {
    text: "Why might LSZH cable be specified for use in a public building such as a hospital or shopping centre?",
    options: [
      "It has no particular benefit in these settings",
      "To reduce the release of toxic smoke and fumes in the event of a fire, protecting occupants during evacuation",
      "It is always cheaper than standard PVC cable",
      "LSZH cable carries more current than standard cable of the same size"
    ],
    correct: "To reduce the release of toxic smoke and fumes in the event of a fire, protecting occupants during evacuation",
    explanation: "In buildings with high occupancy or complex evacuation routes, LSZH cable helps reduce toxic smoke and fume hazards during a fire, supporting safer evacuation.",
    topic: "Cable & Insulation Standards"
  },
  {
    text: "What does EMC stand for in relation to electrical/electronic equipment?",
    options: [
      "Electromagnetic Compatibility",
      "Electrical Metering Code",
      "Emergency Maintenance Contract",
      "Extra Motor Control"
    ],
    correct: "Electromagnetic Compatibility",
    explanation: "EMC (Electromagnetic Compatibility) concerns equipment's ability to function correctly in its electromagnetic environment without causing unacceptable interference to other equipment.",
    topic: "EMC & Interference"
  },
  {
    text: "What is a common source of electromagnetic interference (EMI) in an electrical installation?",
    options: [
      "Motors, switching power supplies, and dimmer switches, among other sources",
      "Only daylight",
      "Copper cables carrying DC only",
      "Fully de-energised circuits"
    ],
    correct: "Motors, switching power supplies, and dimmer switches, among other sources",
    explanation: "Equipment such as motors, switch-mode power supplies and some dimmers can generate electromagnetic interference that may affect nearby sensitive equipment or data circuits.",
    topic: "EMC & Interference"
  },
  {
    text: "How can cable segregation help reduce EMC issues between power and data cabling?",
    options: [
      "It has no effect on EMC performance",
      "Physical separation reduces the coupling of electromagnetic interference from power cables into sensitive data circuits",
      "Segregation only affects appearance, not performance",
      "Data cables are immune to interference regardless of proximity"
    ],
    correct: "Physical separation reduces the coupling of electromagnetic interference from power cables into sensitive data circuits",
    explanation: "Keeping power and data cabling appropriately separated (or using screened cable/segregated containment) reduces the risk of electromagnetic coupling degrading data signal quality.",
    topic: "EMC & Interference"
  },
  {
    text: "Why might a filter be fitted to certain equipment to improve EMC performance?",
    options: [
      "Filters have no relevance to EMC",
      "To reduce the level of conducted electrical noise the equipment emits onto or receives from the supply",
      "Filters are only used for water systems",
      "Filters increase equipment power consumption with no other benefit"
    ],
    correct: "To reduce the level of conducted electrical noise the equipment emits onto or receives from the supply",
    explanation: "EMC filters help limit the conducted electrical noise transmitted onto (or received from) the supply, reducing interference with other connected equipment.",
    topic: "EMC & Interference"
  },
  {
    text: "What is generally the first step in designing an electrical circuit for a new installation?",
    options: [
      "Selecting the cable colour",
      "Determining the load requirements (design current) of the circuit",
      "Fitting the consumer unit",
      "Choosing the client's preferred socket style"
    ],
    correct: "Determining the load requirements (design current) of the circuit",
    explanation: "Circuit design typically begins by establishing the load requirements, giving the design current (Ib), which then informs the selection of protective device, cable and installation method.",
    topic: "Circuit Design Process"
  },
  {
    text: "What is 'Ib' in the standard circuit design process?",
    options: [
      "The rated current of the protective device",
      "The design current — the current the circuit is intended to carry in normal use",
      "The breaking capacity of a fuse",
      "The insulation resistance value"
    ],
    correct: "The design current — the current the circuit is intended to carry in normal use",
    explanation: "Ib is the design current, representing the current the circuit is expected to carry under normal service conditions, forming the starting point for device and cable selection.",
    topic: "Circuit Design Process"
  },
  {
    text: "What is 'In' in circuit design, relating to protective devices?",
    options: [
      "The nominal/rated current of the protective device selected for the circuit",
      "The design current of the circuit",
      "The current-carrying capacity of the cable",
      "The insulation resistance of the circuit"
    ],
    correct: "The nominal/rated current of the protective device selected for the circuit",
    explanation: "In is the nominal (rated) current of the chosen overcurrent protective device, which must be equal to or greater than Ib (the design current) but not exceed Iz (the cable's current-carrying capacity).",
    topic: "Circuit Design Process"
  },
  {
    text: "What is 'Iz' in circuit design terminology?",
    options: [
      "The effective current-carrying capacity of the cable, accounting for installation conditions",
      "The design current of the circuit",
      "The rated current of the protective device",
      "The prospective fault current"
    ],
    correct: "The effective current-carrying capacity of the cable, accounting for installation conditions",
    explanation: "Iz is the effective current-carrying capacity of the selected cable, taking into account installation method and any applicable correction factors for grouping, temperature and thermal insulation.",
    topic: "Circuit Design Process"
  },
  {
    text: "What is the general relationship required between Ib, In and Iz in circuit design (per BS 7671)?",
    options: [
      "Iz must always be less than Ib",
      "Ib ≤ In ≤ Iz",
      "In must always exceed Iz",
      "There is no defined relationship"
    ],
    correct: "Ib ≤ In ≤ Iz",
    explanation: "BS 7671 requires the design current (Ib) to be no more than the protective device rating (In), which in turn must be no more than the cable's effective current-carrying capacity (Iz).",
    topic: "Circuit Design Process"
  },
  {
    text: "Why is it important to check disconnection times as part of the circuit design process?",
    options: [
      "Disconnection time is irrelevant to safety",
      "To confirm the protective device will disconnect the supply quickly enough to prevent danger in the event of a fault",
      "Only relevant for lighting circuits",
      "Disconnection time only matters for three-phase circuits"
    ],
    correct: "To confirm the protective device will disconnect the supply quickly enough to prevent danger in the event of a fault",
    explanation: "BS 7671 specifies maximum disconnection times for different circuit types to limit the duration of dangerous touch voltages during a fault; the design must confirm these times can be achieved.",
    topic: "Circuit Design Process"
  },
  {
    text: "Why should voltage drop be checked as part of the circuit design process, in addition to current rating?",
    options: [
      "Voltage drop has no bearing on circuit design",
      "A cable adequately rated for current alone might still cause excessive voltage drop over a long run, affecting equipment performance",
      "Voltage drop only matters for three-phase supplies",
      "Voltage drop checks are only relevant to lighting circuits"
    ],
    correct: "A cable adequately rated for current alone might still cause excessive voltage drop over a long run, affecting equipment performance",
    explanation: "Even a cable correctly sized for current-carrying capacity may cause unacceptable voltage drop on a long run, so voltage drop must be separately checked and, if necessary, a larger cable selected.",
    topic: "Circuit Design Process"
  },
  {
    text: "What is a professional first step when a client raises a complaint about completed electrical work?",
    options: [
      "Dismiss the complaint immediately",
      "Listen carefully, investigate the issue, and respond professionally and promptly",
      "Ignore the complaint if the invoice has been paid",
      "Blame the client for the issue without investigation"
    ],
    correct: "Listen carefully, investigate the issue, and respond professionally and promptly",
    explanation: "Handling complaints professionally — listening, investigating and responding promptly — helps resolve issues fairly and maintains trust and reputation.",
    topic: "Client Care & Complaints"
  },
  {
    text: "Why is it good practice to provide clients with a clear, written quotation before starting work?",
    options: [
      "It has no practical benefit",
      "It sets clear expectations on scope and cost, reducing the risk of disputes later",
      "Written quotations are legally prohibited",
      "Only verbal agreements are considered valid"
    ],
    correct: "It sets clear expectations on scope and cost, reducing the risk of disputes later",
    explanation: "A clear written quotation helps both parties agree on scope, cost and expectations upfront, reducing the potential for later disputes or misunderstandings.",
    topic: "Client Care & Complaints"
  },
  {
    text: "What is the purpose of a guarantee or warranty offered on completed electrical work?",
    options: [
      "It has no real function",
      "To give the client assurance that defects arising from the work within a defined period will be rectified",
      "It only benefits the electrician, not the client",
      "Warranties are never offered in the electrical trade"
    ],
    correct: "To give the client assurance that defects arising from the work within a defined period will be rectified",
    explanation: "A warranty or guarantee reassures clients that any genuine defects related to the work will be addressed within an agreed period, supporting confidence in the quality of work provided.",
    topic: "Client Care & Complaints"
  },
  {
    text: "Why does BS 7671 require electrical equipment and materials to be installed in accordance with the manufacturer's instructions?",
    options: [
      "It is optional guidance only",
      "To ensure the equipment performs as intended and remains safe, as tested and certified by the manufacturer",
      "Manufacturer instructions have no bearing on compliance",
      "Only relevant for imported equipment"
    ],
    correct: "To ensure the equipment performs as intended and remains safe, as tested and certified by the manufacturer",
    explanation: "Following manufacturer instructions helps ensure equipment operates as designed and tested, maintaining both performance and safety as intended by the manufacturer.",
    topic: "Quality & Workmanship"
  },
  {
    text: "What does 'workmanship' refer to in the context of BS 7671 compliance?",
    options: [
      "Only the speed at which work is completed",
      "The standard and quality of the physical installation work carried out, which must be in accordance with recognised good practice",
      "The colour scheme of the finished installation",
      "It has no formal relevance to compliance"
    ],
    correct: "The standard and quality of the physical installation work carried out, which must be in accordance with recognised good practice",
    explanation: "BS 7671 requires good workmanship as well as good design and correctly selected materials — a well-designed circuit installed poorly can still be unsafe or non-compliant.",
    topic: "Quality & Workmanship"
  },
  {
    text: "Why should cable runs be kept neat, well supported, and free from unnecessary strain?",
    options: [
      "Neatness has no bearing on safety or reliability",
      "Poorly supported or strained cables are more prone to damage, disconnection, and premature failure",
      "Only appearance is affected, never safety",
      "Cable support requirements only apply to commercial installations"
    ],
    correct: "Poorly supported or strained cables are more prone to damage, disconnection, and premature failure",
    explanation: "Properly supported, neatly routed cabling reduces mechanical strain and the risk of damage, disconnection or premature failure over the installation's lifetime.",
    topic: "Quality & Workmanship"
  },
  {
    text: "What is the value of taking photographs of concealed cable routes before covering them (e.g. before plastering)?",
    options: [
      "It has no practical value",
      "It provides a valuable record of cable positions for future reference, reducing the risk of accidental damage later",
      "Photographs are only useful for marketing purposes",
      "It is required only for commercial premises"
    ],
    correct: "It provides a valuable record of cable positions for future reference, reducing the risk of accidental damage later",
    explanation: "Photographing concealed cable routes before they are covered creates a useful record, helping future workers (or the same electrician) avoid accidentally damaging buried cables.",
    topic: "Quality & Workmanship"
  },
  {
    text: "Why is it important to leave adequate cable at terminations rather than cutting it too short?",
    options: [
      "Cable length at terminations has no practical importance",
      "Extra length allows for re-termination if needed and avoids excessive strain on the connection",
      "Longer cable ends always increase resistance significantly",
      "It only matters for aesthetic reasons"
    ],
    correct: "Extra length allows for re-termination if needed and avoids excessive strain on the connection",
    explanation: "Leaving sufficient cable length at terminations avoids unnecessary strain on the connection and allows for re-termination or fault finding in the future without needing to extend the cable.",
    topic: "Quality & Workmanship"
  },
  {
    text: "What is the main advantage of using PVC conduit over steel conduit in certain environments?",
    options: [
      "PVC conduit is resistant to corrosion, lighter, and does not require earthing itself, unlike metal conduit",
      "PVC conduit has no practical advantages",
      "PVC conduit provides better mechanical protection than steel",
      "PVC conduit is always required by BS 7671"
    ],
    correct: "PVC conduit is resistant to corrosion, lighter, and does not require earthing itself, unlike metal conduit",
    explanation: "PVC (plastic) conduit resists corrosion and does not need to be earthed as a conductive part, unlike steel conduit, though steel offers greater mechanical protection in some environments.",
    topic: "Wiring Systems Types"
  },
  {
    text: "Why must steel conduit used as part of the circuit protective conductor arrangement be properly bonded and continuous?",
    options: [
      "It has no relevance to earthing",
      "If relied upon as a CPC, it must provide a continuous, low-resistance earth path to allow protective devices to operate correctly",
      "Steel conduit is never used for earthing purposes",
      "Continuity of steel conduit only affects mechanical strength"
    ],
    correct: "If relied upon as a CPC, it must provide a continuous, low-resistance earth path to allow protective devices to operate correctly",
    explanation: "Where steel conduit is used as part of the earth fault path, it must remain electrically continuous and properly bonded to reliably carry fault current and allow protective devices to operate.",
    topic: "Wiring Systems Types"
  },
  {
    text: "What is the purpose of galvanising on steel conduit or trunking?",
    options: [
      "To provide corrosion resistance by coating the steel with zinc",
      "To increase current-carrying capacity",
      "To improve appearance only, with no functional benefit",
      "To reduce the weight of the conduit"
    ],
    correct: "To provide corrosion resistance by coating the steel with zinc",
    explanation: "Galvanising applies a protective zinc coating to steel conduit/trunking, helping resist corrosion, particularly important for longevity in damp or exposed environments.",
    topic: "Wiring Systems Types"
  },
  {
    text: "What is 'basket tray' or 'cable basket' commonly used for?",
    options: [
      "Supporting and organising multiple cables along a route, especially in commercial/industrial settings",
      "Providing earthing for the whole installation",
      "Storing tools",
      "It has no functional application in electrical installation"
    ],
    correct: "Supporting and organising multiple cables along a route, especially in commercial/industrial settings",
    explanation: "Cable basket tray provides an open, lightweight support system for organising and running multiple cables, commonly used in commercial and industrial cable management.",
    topic: "Wiring Systems Types"
  },
  {
    text: "What is a key advantage of surface-mounted PVC mini-trunking for a domestic rewire or extension in a finished room?",
    options: [
      "It allows cables to be run neatly on the surface without significant disruption to existing decoration",
      "It requires chasing deep into the wall",
      "It cannot accommodate more than one cable",
      "It is only suitable for outdoor use"
    ],
    correct: "It allows cables to be run neatly on the surface without significant disruption to existing decoration",
    explanation: "Mini-trunking provides a neat, surface-mounted route for cables, useful where chasing into walls would cause unnecessary disruption to existing finishes.",
    topic: "Wiring Systems Types"
  },
  {
    text: "Why might flexible conduit be used for the final connection to a motor or vibrating equipment?",
    options: [
      "To allow for movement/vibration without stressing or damaging the cable connection",
      "Flexible conduit is never used for such connections",
      "It reduces the equipment's power consumption",
      "It has no relevance to motor connections"
    ],
    correct: "To allow for movement/vibration without stressing or damaging the cable connection",
    explanation: "Flexible conduit accommodates movement or vibration at the final connection to equipment such as motors, protecting the cable from repeated mechanical stress that could cause failure.",
    topic: "Wiring Systems Types"
  },
  {
    text: "What is a common electrical requirement for a fixed electric cooker circuit in a domestic property?",
    options: [
      "A dedicated circuit sized for the cooker's load, typically terminated at a cooker control unit or cooker switch",
      "Cookers can always share a standard 13A socket circuit",
      "No dedicated circuit is required for any cooker",
      "Cookers are always connected via a plug and socket only"
    ],
    correct: "A dedicated circuit sized for the cooker's load, typically terminated at a cooker control unit or cooker switch",
    explanation: "Electric cookers typically require a dedicated circuit sized for their load, usually terminating at a cooker control unit or switch positioned within reach but away from immediate heat/splash zones.",
    topic: "Domestic Appliances Wiring"
  },
  {
    text: "Why is a cooker switch/control unit typically positioned to one side of the cooker, rather than directly above it?",
    options: [
      "Positioning has no safety relevance",
      "To avoid the user having to reach over hot hobs/pans to operate the switch, reducing burn risk",
      "It is only a matter of appearance",
      "Regulations require it to be behind the cooker"
    ],
    correct: "To avoid the user having to reach over hot hobs/pans to operate the switch, reducing burn risk",
    explanation: "Positioning the cooker switch to the side avoids the user needing to reach across a hot hob, reducing the risk of burns or spills.",
    topic: "Domestic Appliances Wiring"
  },
  {
    text: "What electrical consideration applies to an electric shower installation?",
    options: [
      "No special considerations, a shower can use any existing socket",
      "A dedicated circuit sized for the shower's high current demand, appropriately protected and often routed to avoid bathroom zones where restricted",
      "Showers never require RCD protection",
      "Showers are always low current devices requiring only a standard lighting circuit"
    ],
    correct: "A dedicated circuit sized for the shower's high current demand, appropriately protected and often routed to avoid bathroom zones where restricted",
    explanation: "Electric showers draw significant current and require a dedicated, correctly rated circuit, with due consideration of bathroom zone requirements and appropriate protection, typically including RCD protection.",
    topic: "Domestic Appliances Wiring"
  },
  {
    text: "Why should a dishwasher or washing machine typically be connected via a fused connection unit or dedicated switched spur rather than a standard plug hidden behind the appliance?",
    options: [
      "It has no practical benefit over a standard plug",
      "It provides accessible isolation without needing to pull the appliance out, useful in an emergency or for maintenance",
      "Standard plugs are never used for such appliances under any circumstances",
      "It reduces the appliance's power consumption"
    ],
    correct: "It provides accessible isolation without needing to pull the appliance out, useful in an emergency or for maintenance",
    explanation: "A switched fused connection unit provides convenient, accessible isolation for appliances that might otherwise have their plug hidden behind furniture, useful in an emergency such as a leak or fire.",
    topic: "Domestic Appliances Wiring"
  },
  {
    text: "What is a common consideration when wiring an integrated (built-in) kitchen appliance?",
    options: [
      "Providing accessible isolation (e.g. via an FCU) even though the appliance itself may be concealed within cabinetry",
      "No isolation is ever required for built-in appliances",
      "Integrated appliances never need a dedicated connection point",
      "Only the appliance's colour needs to be considered"
    ],
    correct: "Providing accessible isolation (e.g. via an FCU) even though the appliance itself may be concealed within cabinetry",
    explanation: "Even though a built-in appliance may be hidden within cabinetry, an accessible means of isolation, such as a nearby FCU, should be provided for safety and maintenance purposes.",
    topic: "Domestic Appliances Wiring"
  },
  {
    text: "What is the purpose of a plug-in RCD adaptor for older sockets not otherwise RCD protected?",
    options: [
      "It provides no meaningful protection",
      "It provides additional shock protection for equipment plugged into it, particularly useful with older wiring lacking RCD protection at the board",
      "It replaces the need for correct earthing entirely",
      "It only works with three-phase equipment"
    ],
    correct: "It provides additional shock protection for equipment plugged into it, particularly useful with older wiring lacking RCD protection at the board",
    explanation: "A plug-in RCD adaptor provides supplementary shock protection for whatever is plugged into it, useful as an interim measure in older installations lacking RCD protection at the consumer unit.",
    topic: "Domestic Appliances Wiring"
  },
  {
    text: "What is generally considered the boundary between low voltage (LV) and high voltage (HV) in UK electrical systems?",
    options: [
      "Around 1000V AC; above this is generally considered high voltage",
      "50V",
      "12V",
      "There is no distinction between LV and HV"
    ],
    correct: "Around 1000V AC; above this is generally considered high voltage",
    explanation: "In the UK, systems operating above approximately 1000V AC (1500V DC) are generally classified as high voltage, distinct from the low voltage systems used in most domestic/commercial wiring.",
    topic: "HV Awareness Basics"
  },
  {
    text: "Why is HV switchgear typically operated only by specifically trained and authorised HV-competent personnel?",
    options: [
      "There is no additional risk with HV switchgear",
      "The much higher energy levels present significantly greater danger, including arc flash risk, requiring specialist competence",
      "HV switchgear is identical in operation to LV switchgear",
      "Any general electrician can safely operate HV switchgear"
    ],
    correct: "The much higher energy levels present significantly greater danger, including arc flash risk, requiring specialist competence",
    explanation: "HV systems carry much greater energy and risk (including severe arc flash hazards), so specific specialist training and authorisation is required before anyone operates HV switchgear.",
    topic: "HV Awareness Basics"
  },
  {
    text: "Why should an electrician without specific HV authorisation never attempt to work on or near HV equipment?",
    options: [
      "There is no risk difference between LV and HV competence",
      "HV systems present a much greater risk of fatal injury and require specific specialist training beyond standard LV competence",
      "HV equipment is always clearly de-energised and safe to touch",
      "HV work is identical to LV work"
    ],
    correct: "HV systems present a much greater risk of fatal injury and require specific specialist training beyond standard LV competence",
    explanation: "Working near HV equipment without appropriate specialist training and authorisation is extremely dangerous; competence for LV work does not extend to HV systems.",
    topic: "HV Awareness Basics"
  },
  {
    text: "What is the purpose of clearly marked HV warning signage around substations and HV equipment?",
    options: [
      "It has no real purpose",
      "To warn unauthorised persons of the serious danger present and deter unauthorised access",
      "Only to indicate the equipment's manufacturer",
      "Signage is not required around HV equipment"
    ],
    correct: "To warn unauthorised persons of the serious danger present and deter unauthorised access",
    explanation: "HV warning signage clearly communicates the serious danger present, helping deter unauthorised access to areas containing high voltage equipment.",
    topic: "HV Awareness Basics"
  },
  {
    text: "What should a general electrician do if they discover unlabelled or damaged HV equipment during a job?",
    options: [
      "Attempt to investigate the equipment personally",
      "Avoid the equipment, report it to the responsible person/authority, and not attempt to interfere with it",
      "Ignore it if it is not part of their task",
      "Touch it carefully to check if it is live"
    ],
    correct: "Avoid the equipment, report it to the responsible person/authority, and not attempt to interfere with it",
    explanation: "Unlabelled or damaged HV equipment should never be approached or interfered with by unauthorised personnel; it should be reported to the responsible authority for proper investigation.",
    topic: "HV Awareness Basics"
  },
  {
    text: "What is generally good practice when approaching a multiple-choice exam question you are unsure about?",
    options: [
      "Skip it and never return to it",
      "Eliminate clearly incorrect options first, then choose the most likely correct answer from what remains",
      "Always choose the first option listed",
      "Guess randomly without reading the options"
    ],
    correct: "Eliminate clearly incorrect options first, then choose the most likely correct answer from what remains",
    explanation: "Eliminating obviously wrong answers first improves the odds of selecting the correct answer from the remaining options, a useful technique when unsure of the exact answer.",
    topic: "Apprenticeship & Exam Technique"
  },
  {
    text: "Why is it useful to read the whole question carefully before looking at the answer options?",
    options: [
      "It is not useful, options should be read first",
      "To avoid missing key details or qualifying words (e.g. 'not', 'except') that change the meaning of the question",
      "Reading the question has no bearing on selecting the correct answer",
      "It only matters for very long questions"
    ],
    correct: "To avoid missing key details or qualifying words (e.g. 'not', 'except') that change the meaning of the question",
    explanation: "Careful reading helps catch important qualifying words such as 'not' or 'except', which can completely change what the question is actually asking.",
    topic: "Apprenticeship & Exam Technique"
  },
  {
    text: "Why is regular, spaced-out revision generally more effective than cramming shortly before an exam?",
    options: [
      "Cramming is always more effective",
      "Spaced repetition helps improve long-term retention and understanding, rather than short-term memorisation alone",
      "There is no established difference between the two approaches",
      "Revision timing has no effect on exam performance"
    ],
    correct: "Spaced repetition helps improve long-term retention and understanding, rather than short-term memorisation alone",
    explanation: "Research on learning generally shows spaced repetition over time improves long-term retention and understanding compared with last-minute cramming.",
    topic: "Apprenticeship & Exam Technique"
  },
  {
    text: "Why is practising past or sample questions a useful part of exam preparation?",
    options: [
      "It has no real benefit",
      "It helps familiarise the candidate with question style/format and highlights areas needing further study",
      "Practice questions are always identical to the real exam",
      "It replaces the need for underlying technical knowledge"
    ],
    correct: "It helps familiarise the candidate with question style/format and highlights areas needing further study",
    explanation: "Practising sample questions helps candidates become familiar with the exam's format and style, while also revealing which topics need further revision.",
    topic: "Apprenticeship & Exam Technique"
  },
  {
    text: "Why is it important to manage time carefully during a timed multiple-choice assessment?",
    options: [
      "Time management has no bearing on exam performance",
      "To ensure there is enough time to attempt every question, rather than running out of time partway through",
      "It is better to spend all available time on the first few questions",
      "Timed assessments never have a meaningful time limit"
    ],
    correct: "To ensure there is enough time to attempt every question, rather than running out of time partway through",
    explanation: "Pacing helps ensure candidates can attempt every question in the time available, rather than spending too long on difficult questions and running out of time for others.",
    topic: "Apprenticeship & Exam Technique"
  },
  {
    text: "What is a sensible strategy if you are unsure about a question but the exam does not penalise incorrect answers?",
    options: [
      "Leave it blank, as guessing has no value",
      "Make your best educated guess rather than leaving it unanswered",
      "Always choose 'none of the above' if available",
      "Skip the question and inform the invigilator"
    ],
    correct: "Make your best educated guess rather than leaving it unanswered",
    explanation: "Where there is no penalty for an incorrect answer, an educated guess gives at least a chance of being correct, whereas leaving a question blank guarantees no marks for it.",
    topic: "Apprenticeship & Exam Technique"
  },
  {
    text: "What is an IT earthing system, as defined in relevant standards?",
    options: [
      "A system with all live parts isolated from earth (or connected via high impedance), with exposed-conductive-parts earthed individually or collectively",
      "A system used exclusively for computer networks",
      "A standard domestic TN-C-S system",
      "A system with no earthing arrangement at all"
    ],
    correct: "A system with all live parts isolated from earth (or connected via high impedance), with exposed-conductive-parts earthed individually or collectively",
    explanation: "In an IT system, the supply is isolated from earth (or earthed through a high impedance), and exposed-conductive-parts of the installation are earthed, often used where continuity of supply during a first fault is critical.",
    topic: "Advanced Earthing Systems"
  },
  {
    text: "Why might an IT earthing system be used in certain critical applications, such as some hospital operating theatres?",
    options: [
      "IT systems have no particular advantage in critical environments",
      "A first earth fault does not automatically cause disconnection, maintaining continuity of supply to critical equipment while the fault is investigated",
      "IT systems are always cheaper to install",
      "IT systems eliminate the need for any earthing"
    ],
    correct: "A first earth fault does not automatically cause disconnection, maintaining continuity of supply to critical equipment while the fault is investigated",
    explanation: "IT systems are designed so a single earth fault does not immediately trip the supply, which is valuable in critical applications like operating theatres where continuity of power is essential, though the fault must be located and cleared promptly.",
    topic: "Advanced Earthing Systems"
  },
  {
    text: "What is the purpose of an insulation monitoring device (IMD) in an IT earthing system?",
    options: [
      "To continuously monitor insulation resistance and alert staff to the presence of a first fault before it becomes dangerous",
      "To generate electricity",
      "To provide lighting control",
      "It has no functional role in an IT system"
    ],
    correct: "To continuously monitor insulation resistance and alert staff to the presence of a first fault before it becomes dangerous",
    explanation: "An IMD continuously monitors the insulation resistance of an IT system, providing an alarm if a first fault occurs, allowing it to be located and rectified before a second fault could create a dangerous condition.",
    topic: "Advanced Earthing Systems"
  },
  {
    text: "What is the general concern if a second earth fault occurs on an IT system while a first fault remains uncleared?",
    options: [
      "There is no additional risk from a second fault",
      "A second fault on a different phase could create a dangerous fault current path via the two faults and the earth connections",
      "A second fault always automatically corrects the first fault",
      "IT systems cannot experience a second fault"
    ],
    correct: "A second fault on a different phase could create a dangerous fault current path via the two faults and the earth connections",
    explanation: "While a single fault on an IT system may not be immediately dangerous, a second fault (typically on a different phase) can create a genuine fault current path, posing a real danger — reinforcing the importance of prompt first-fault detection and clearance.",
    topic: "Advanced Earthing Systems"
  },
  {
    text: "What is functional earthing, as distinct from protective earthing?",
    options: [
      "An earth connection required for the correct functional operation of equipment, rather than purely for shock protection",
      "There is no such distinction; all earthing is protective",
      "A term with no established meaning",
      "Functional earthing always replaces the need for protective earthing"
    ],
    correct: "An earth connection required for the correct functional operation of equipment, rather than purely for shock protection",
    explanation: "Functional earthing provides a reference or return path needed for equipment to operate correctly (e.g. certain electronic or IT equipment), distinct from protective earthing, whose primary purpose is shock protection.",
    topic: "Advanced Earthing Systems"
  },
  {
    text: "What is a logical first step when fault-finding on a circuit that has tripped its protective device?",
    options: [
      "Immediately replace the protective device with a higher-rated one",
      "Gather information about the fault (when it occurred, what was happening) before attempting to reset or investigate further",
      "Ignore the trip and reset repeatedly until it stays on",
      "Assume the device itself is always faulty"
    ],
    correct: "Gather information about the fault (when it occurred, what was happening) before attempting to reset or investigate further",
    explanation: "Good fault-finding starts with gathering information — what happened, when, and any recent changes — before further investigation, rather than jumping straight to repeated resets or component replacement.",
    topic: "Fault Finding"
  },
  {
    text: "Why is repeatedly resetting a tripped RCD/RCBO without investigating the cause considered poor practice?",
    options: [
      "It has no downside, resetting is always safe",
      "It risks re-energising a genuinely faulty circuit, potentially causing further damage or danger",
      "Repeated resetting always fixes the underlying fault",
      "RCDs cannot be damaged by repeated resetting"
    ],
    correct: "It risks re-energising a genuinely faulty circuit, potentially causing further damage or danger",
    explanation: "Simply resetting a tripped device without understanding why it tripped risks re-energising a genuine fault, which could cause further damage, fire risk or danger.",
    topic: "Fault Finding"
  },
  {
    text: "What is a systematic approach commonly used for electrical fault-finding?",
    options: [
      "Randomly replacing components until the fault disappears",
      "Gather information, identify symptoms, analyse possible causes, test methodically, and confirm the fault has been rectified",
      "Immediately dismantle the entire installation",
      "Fault-finding has no recognised systematic approach"
    ],
    correct: "Gather information, identify symptoms, analyse possible causes, test methodically, and confirm the fault has been rectified",
    explanation: "A logical, systematic approach — gathering information, analysing likely causes, testing methodically, then confirming rectification — is far more effective and safer than random trial and error.",
    topic: "Fault Finding"
  },
  {
    text: "What is a common cause of an intermittent electrical fault?",
    options: [
      "Intermittent faults are always caused by a single, easily identified issue",
      "A loose connection, damaged insulation, or a component affected by vibration/temperature changes",
      "Intermittent faults never have an identifiable cause",
      "Only new installations can develop intermittent faults"
    ],
    correct: "A loose connection, damaged insulation, or a component affected by vibration/temperature changes",
    explanation: "Intermittent faults are often caused by loose connections, marginal insulation damage, or components affected by vibration or temperature that only cause a fault under certain conditions.",
    topic: "Fault Finding"
  },
  {
    text: "Why is it useful to isolate sections of a circuit systematically (e.g. disconnecting loads one at a time) when fault-finding an insulation resistance fault?",
    options: [
      "It has no diagnostic value",
      "It helps narrow down which section or component is causing the low insulation resistance reading",
      "It only works for lighting circuits",
      "Sections should never be isolated during fault-finding"
    ],
    correct: "It helps narrow down which section or component is causing the low insulation resistance reading",
    explanation: "Systematically isolating parts of a circuit and re-testing helps narrow down which section, cable or connected equipment is responsible for a low insulation resistance reading.",
    topic: "Fault Finding"
  },
  {
    text: "What should be recorded after a fault has been identified and rectified?",
    options: [
      "Nothing needs to be recorded once the fault is fixed",
      "Details of the fault, its cause, and the remedial action taken, for future reference and evidence of correct rectification",
      "Only the time taken to fix the fault",
      "Only the cost of replacement parts"
    ],
    correct: "Details of the fault, its cause, and the remedial action taken, for future reference and evidence of correct rectification",
    explanation: "Recording fault details, cause and remedial action provides a useful reference for future maintenance and evidence that the fault was properly diagnosed and corrected.",
    topic: "Fault Finding"
  },
  {
    text: "What does PLC stand for in an industrial control context?",
    options: [
      "Programmable Logic Controller",
      "Power Line Circuit",
      "Protective Level Contactor",
      "Panel Load Cell"
    ],
    correct: "Programmable Logic Controller",
    explanation: "A PLC is an industrial digital computer used to control machinery and processes, programmed with logic to respond to inputs (e.g. sensors) and control outputs (e.g. motors, valves).",
    topic: "Industrial Control Systems"
  },
  {
    text: "What is a basic function of a PLC's inputs?",
    options: [
      "To receive signals from field devices such as sensors, switches or push buttons",
      "To generate the PLC's power supply",
      "To provide lighting for the control panel",
      "Inputs have no functional role in a PLC"
    ],
    correct: "To receive signals from field devices such as sensors, switches or push buttons",
    explanation: "PLC inputs receive signals from field devices, such as limit switches, sensors and push buttons, providing the information the PLC's programme acts upon.",
    topic: "Industrial Control Systems"
  },
  {
    text: "What is a basic function of a PLC's outputs?",
    options: [
      "To control field devices such as motors, solenoids, contactors or indicator lamps, based on the programme logic",
      "To measure supply voltage only",
      "To provide isolation for the entire installation",
      "Outputs have no functional role in a PLC"
    ],
    correct: "To control field devices such as motors, solenoids, contactors or indicator lamps, based on the programme logic",
    explanation: "PLC outputs energise or de-energise connected field devices (motors, solenoids, contactors, lamps) according to the logic programmed into the controller.",
    topic: "Industrial Control Systems"
  },
  {
    text: "Why is safety-rated hardware (e.g. safety relays, safety PLCs) sometimes used in addition to standard control logic for machine safety functions?",
    options: [
      "Standard PLCs are always sufficient for every safety function",
      "Safety-rated systems are specifically designed and certified to reliably perform critical safety functions, such as emergency stops, with a higher level of assurance",
      "Safety hardware has no practical benefit",
      "Safety relays are never used in industrial control"
    ],
    correct: "Safety-rated systems are specifically designed and certified to reliably perform critical safety functions, such as emergency stops, with a higher level of assurance",
    explanation: "Critical safety functions like emergency stops often require certified, safety-rated hardware, designed to fail safely and provide a higher level of reliability than standard control logic.",
    topic: "Industrial Control Systems"
  },
  {
    text: "What is a common reason for isolating and locking off a PLC-controlled machine before carrying out electrical maintenance?",
    options: [
      "PLCs cannot unexpectedly energise outputs",
      "A PLC could unexpectedly activate an output (e.g. start a motor) if not properly isolated, presenting a danger to anyone working on the machine",
      "Isolation is never required for PLC-controlled equipment",
      "PLCs automatically isolate themselves during maintenance"
    ],
    correct: "A PLC could unexpectedly activate an output (e.g. start a motor) if not properly isolated, presenting a danger to anyone working on the machine",
    explanation: "Even with control logic in place, a PLC could unexpectedly activate an output (due to a programme change, sensor input, or remote command), so proper isolation and lock-off remains essential before maintenance.",
    topic: "Industrial Control Systems"
  },
  {
    text: "What is the basic purpose of a lightning protection system (LPS) on a building?",
    options: [
      "To prevent lightning strikes from ever occurring",
      "To provide a preferred low-impedance path for lightning current to reach earth safely, reducing damage and fire/injury risk",
      "To generate electricity from lightning",
      "It has no practical safety purpose"
    ],
    correct: "To provide a preferred low-impedance path for lightning current to reach earth safely, reducing damage and fire/injury risk",
    explanation: "A lightning protection system provides a designed, low-impedance path (air terminals, down conductors, earth termination) intended to safely conduct lightning current to earth, reducing the risk of fire, structural damage or injury.",
    topic: "Lightning Protection"
  },
  {
    text: "What is an 'air termination' (air terminal) in a lightning protection system?",
    options: [
      "A device used to ventilate a building",
      "A conductor or rod positioned to intercept a lightning strike before it hits a vulnerable part of the structure",
      "A type of fire detector",
      "It has no relevance to lightning protection"
    ],
    correct: "A conductor or rod positioned to intercept a lightning strike before it hits a vulnerable part of the structure",
    explanation: "Air terminations (rods, conductors or meshes) are positioned to intercept a lightning strike, directing the current safely into the down conductor system rather than a vulnerable part of the building.",
    topic: "Lightning Protection"
  },
  {
    text: "What is the purpose of 'down conductors' in a lightning protection system?",
    options: [
      "To carry the intercepted lightning current from the air termination down to the earth termination system",
      "To generate electricity",
      "To provide normal building power",
      "They have no functional purpose"
    ],
    correct: "To carry the intercepted lightning current from the air termination down to the earth termination system",
    explanation: "Down conductors provide the path for lightning current captured by air terminations to travel safely down to the earth termination network.",
    topic: "Lightning Protection"
  },
  {
    text: "Why must a building's lightning protection system be bonded to the main electrical earthing system?",
    options: [
      "Bonding is not required between these systems",
      "To prevent dangerous potential differences between the two systems during a lightning strike, reducing the risk of side-flashing",
      "It only affects the appearance of the installation",
      "Lightning protection systems never interact with electrical earthing"
    ],
    correct: "To prevent dangerous potential differences between the two systems during a lightning strike, reducing the risk of side-flashing",
    explanation: "Bonding the lightning protection earth to the main electrical earthing system helps equalise potential during a strike, reducing the risk of dangerous side-flashing between separate systems.",
    topic: "Lightning Protection"
  },
  {
    text: "What relevant standard commonly guides the design of lightning protection systems in the UK?",
    options: [
      "BS EN 62305",
      "BS 7671 exclusively",
      "There is no relevant standard",
      "Building Regulations Part L"
    ],
    correct: "BS EN 62305",
    explanation: "BS EN 62305 is the standard commonly used for the design, installation and maintenance of lightning protection systems, though it works alongside BS 7671 for the electrical installation overall.",
    topic: "Lightning Protection"
  },
  {
    text: "What is a common power feeding arrangement for a street lighting network?",
    options: [
      "A radial or looped underground cable network supplying multiple lighting columns from a feeder pillar",
      "Each lamp column has its own independent generator",
      "Street lighting is never electrically powered",
      "Street lighting always uses overhead cabling only"
    ],
    correct: "A radial or looped underground cable network supplying multiple lighting columns from a feeder pillar",
    explanation: "Street lighting is commonly supplied via underground cable networks, feeding multiple columns in a radial or looped arrangement from a local feeder pillar.",
    topic: "Street & Public Lighting"
  },
  {
    text: "What is the purpose of a photocell (light-sensitive switch) commonly used on street lighting columns?",
    options: [
      "To automatically switch the lighting on at dusk and off at dawn based on ambient light levels",
      "To measure current draw",
      "To generate additional electricity",
      "It has no functional purpose"
    ],
    correct: "To automatically switch the lighting on at dusk and off at dawn based on ambient light levels",
    explanation: "A photocell senses ambient light levels and automatically switches street lighting on as it gets dark and off again at dawn, without manual intervention.",
    topic: "Street & Public Lighting"
  },
  {
    text: "Why is it particularly important for a street lighting column to be correctly earthed?",
    options: [
      "Earthing has no relevance to a metal lighting column",
      "A metal column could become dangerously live in the event of an internal fault if not properly earthed, presenting a public shock risk",
      "Columns are always made from non-conductive materials",
      "Only wooden columns require earthing"
    ],
    correct: "A metal column could become dangerously live in the event of an internal fault if not properly earthed, presenting a public shock risk",
    explanation: "Metal street lighting columns present a public shock risk if a fault occurs and the column is not correctly earthed, potentially making an accessible metal structure dangerously live.",
    topic: "Street & Public Lighting"
  },
  {
    text: "What is a 'door' or access panel typically fitted near the base of a street lighting column used for?",
    options: [
      "Decoration only",
      "To provide access to the internal cut-out, fuse and wiring for maintenance and testing",
      "To provide a mounting point for advertising",
      "It has no functional purpose"
    ],
    correct: "To provide access to the internal cut-out, fuse and wiring for maintenance and testing",
    explanation: "The access door at the base of a lighting column allows maintenance personnel to reach the internal fuse, cut-out and wiring safely for testing and repair.",
    topic: "Street & Public Lighting"
  },
  {
    text: "Why should the public generally never attempt to access or interfere with street lighting equipment?",
    options: [
      "It presents no danger to members of the public",
      "The equipment can be live and presents a serious shock risk to anyone without appropriate training and authorisation",
      "Street lighting equipment is never electrically powered",
      "Members of the public are authorised to carry out minor repairs"
    ],
    correct: "The equipment can be live and presents a serious shock risk to anyone without appropriate training and authorisation",
    explanation: "Street lighting equipment can remain live and presents a genuine shock risk; only trained, authorised personnel should access or work on it.",
    topic: "Street & Public Lighting"
  },
  {
    text: "Why must electrical equipment installed in damp or outdoor locations have an appropriate IP rating?",
    options: [
      "IP rating has no bearing on outdoor equipment",
      "To prevent moisture ingress that could cause corrosion, short circuits, or a shock hazard",
      "IP rating only affects equipment appearance",
      "Outdoor equipment never requires additional protection"
    ],
    correct: "To prevent moisture ingress that could cause corrosion, short circuits, or a shock hazard",
    explanation: "Adequate IP-rated enclosures prevent moisture ingress, protecting against corrosion, short circuits and shock hazards that could result from water reaching live parts.",
    topic: "Damp & Outdoor Environments"
  },
  {
    text: "What is a common risk of installing standard indoor-rated equipment in an outdoor or damp location?",
    options: [
      "There is no additional risk",
      "Increased risk of corrosion, insulation breakdown and equipment failure due to inadequate protection against moisture",
      "Indoor equipment always performs better outdoors",
      "It only affects the equipment's appearance"
    ],
    correct: "Increased risk of corrosion, insulation breakdown and equipment failure due to inadequate protection against moisture",
    explanation: "Equipment not designed for damp/outdoor use lacks adequate sealing, increasing the risk of corrosion, insulation breakdown and premature failure.",
    topic: "Damp & Outdoor Environments"
  },
  {
    text: "Why might cable glands be used at cable entries into outdoor enclosures?",
    options: [
      "To provide a secure, weatherproof, strain-relieved entry point for the cable into the enclosure",
      "Glands are purely decorative",
      "Glands increase the cable's current rating",
      "Glands are only used indoors"
    ],
    correct: "To provide a secure, weatherproof, strain-relieved entry point for the cable into the enclosure",
    explanation: "Cable glands provide a sealed, mechanically secure entry point for cables into an enclosure, maintaining the enclosure's IP rating and providing strain relief.",
    topic: "Damp & Outdoor Environments"
  },
  {
    text: "Why should outdoor electrical enclosures be mounted with cable entries facing downward where practical?",
    options: [
      "It has no practical benefit",
      "To reduce the risk of water tracking down the cable and entering the enclosure",
      "Orientation only affects appearance",
      "Downward entries always reduce IP rating"
    ],
    correct: "To reduce the risk of water tracking down the cable and entering the enclosure",
    explanation: "Positioning cable entries to face downward helps water run off the cable rather than tracking along it into the enclosure, reducing moisture ingress risk.",
    topic: "Damp & Outdoor Environments"
  },
  {
    text: "What is a corrosion risk consideration for metal enclosures/fixings used in coastal or industrial (chemically aggressive) environments?",
    options: [
      "Corrosion is not a concern in these environments",
      "Salt-laden air or chemical exposure can accelerate corrosion, so appropriately resistant materials/coatings should be selected",
      "Standard mild steel is always suitable regardless of environment",
      "Only plastic enclosures are affected by these conditions"
    ],
    correct: "Salt-laden air or chemical exposure can accelerate corrosion, so appropriately resistant materials/coatings should be selected",
    explanation: "Coastal or chemically aggressive environments can significantly accelerate corrosion of unsuitable materials, so corrosion-resistant materials or coatings should be selected for durability and safety.",
    topic: "Damp & Outdoor Environments"
  },
  {
    text: "What is a common cause of audible 'humming' from a transformer or ballast?",
    options: [
      "Magnetostriction — small physical vibrations in the core caused by the alternating magnetic field",
      "It always indicates a dangerous fault requiring immediate replacement",
      "Humming only occurs in faulty equipment",
      "It has no technical explanation"
    ],
    correct: "Magnetostriction — small physical vibrations in the core caused by the alternating magnetic field",
    explanation: "A degree of humming in transformers and magnetic ballasts is normal, caused by magnetostriction — tiny vibrations in the core material as the magnetic field alternates.",
    topic: "Noise & Vibration"
  },
  {
    text: "Why might excessive vibration in rotating machinery (e.g. a motor) be a cause for concern?",
    options: [
      "Vibration has no bearing on machinery health",
      "It can indicate mechanical issues such as imbalance, misalignment or bearing wear, which could lead to failure if not addressed",
      "Vibration always improves motor efficiency",
      "It is purely a cosmetic issue"
    ],
    correct: "It can indicate mechanical issues such as imbalance, misalignment or bearing wear, which could lead to failure if not addressed",
    explanation: "Excessive vibration often signals mechanical problems like imbalance, misalignment or worn bearings, which can worsen over time and lead to equipment failure if not investigated.",
    topic: "Noise & Vibration"
  },
  {
    text: "What might an unusual electrical buzzing or crackling sound from a distribution board indicate?",
    options: [
      "It is always completely normal and can be ignored",
      "A possible loose connection or arcing fault, which should be investigated promptly",
      "It only indicates the board needs cleaning",
      "It has no significance"
    ],
    correct: "A possible loose connection or arcing fault, which should be investigated promptly",
    explanation: "Unusual buzzing or crackling from electrical equipment can indicate a loose connection or arcing, both of which pose a fire risk and should be investigated promptly.",
    topic: "Noise & Vibration"
  },
  {
    text: "Why might anti-vibration mounts be used when installing certain motors or plant equipment?",
    options: [
      "To reduce transmission of vibration to the supporting structure and connected pipework/cabling",
      "They have no practical function",
      "To increase the equipment's electrical rating",
      "Anti-vibration mounts are only decorative"
    ],
    correct: "To reduce transmission of vibration to the supporting structure and connected pipework/cabling",
    explanation: "Anti-vibration mounts absorb and reduce the transmission of vibration from rotating equipment to the building structure and connected services, reducing wear and noise.",
    topic: "Noise & Vibration"
  },
  {
    text: "Why is public liability insurance important for a self-employed electrician?",
    options: [
      "It is not necessary if the electrician is experienced",
      "It provides financial protection in the event of accidental damage or injury to third parties caused by the work",
      "It replaces the need for competence or qualifications",
      "It only benefits large companies"
    ],
    correct: "It provides financial protection in the event of accidental damage or injury to third parties caused by the work",
    explanation: "Public liability insurance protects an electrician (and their clients) financially if their work accidentally causes injury to someone or damage to property.",
    topic: "Insurance & Liability"
  },
  {
    text: "What is professional indemnity insurance typically intended to cover?",
    options: [
      "Claims arising from professional advice, design errors or negligence in the service provided",
      "Only physical damage to tools",
      "Only vehicle accidents",
      "It has no relevance to electrical work"
    ],
    correct: "Claims arising from professional advice, design errors or negligence in the service provided",
    explanation: "Professional indemnity insurance covers claims relating to professional errors, such as design mistakes or negligent advice, rather than physical damage or injury covered by other policies.",
    topic: "Insurance & Liability"
  },
  {
    text: "Why might a client request evidence of an electrician's insurance before work begins?",
    options: [
      "To confirm they are protected in case something goes wrong during the work",
      "Insurance evidence has no practical relevance to clients",
      "Only commercial clients ever ask for insurance evidence",
      "It is purely a formality with no real significance"
    ],
    correct: "To confirm they are protected in case something goes wrong during the work",
    explanation: "Clients often check for appropriate insurance to reassure themselves they would be financially protected if an issue arose during the work.",
    topic: "Insurance & Liability"
  },
  {
    text: "Why is it important for an electrician to maintain accurate certification and test records for completed work?",
    options: [
      "Records have no bearing on liability",
      "They provide evidence the work was completed correctly and to standard, which can be important in the event of a future dispute or claim",
      "Only large companies need to keep such records",
      "Records are only relevant for accounting purposes"
    ],
    correct: "They provide evidence the work was completed correctly and to standard, which can be important in the event of a future dispute or claim",
    explanation: "Accurate certification and test records provide important evidence of compliant work, which can be valuable in defending against a future dispute or insurance claim.",
    topic: "Insurance & Liability"
  },
  {
    text: "Why might membership of a competent person / registration scheme (e.g. NICEIC, NAPIT) provide added client reassurance?",
    options: [
      "It has no real value to clients",
      "It indicates the electrician has been independently assessed against recognised industry standards and is regularly monitored",
      "It guarantees the electrician will never make a mistake",
      "Registration schemes are purely a marketing exercise with no assessment involved"
    ],
    correct: "It indicates the electrician has been independently assessed against recognised industry standards and is regularly monitored",
    explanation: "Registration with a recognised competent person scheme typically involves independent assessment and ongoing monitoring, giving clients added reassurance of the electrician's competence.",
    topic: "Insurance & Liability"
  },
  {
    text: "Why might specifying energy-efficient transformers or motors contribute to a more sustainable electrical design?",
    options: [
      "Efficiency has no bearing on sustainability",
      "Lower energy losses reduce overall electricity consumption and associated carbon emissions over the equipment's lifetime",
      "Efficient equipment always costs less to purchase upfront",
      "Sustainability is unrelated to equipment selection"
    ],
    correct: "Lower energy losses reduce overall electricity consumption and associated carbon emissions over the equipment's lifetime",
    explanation: "Choosing more efficient equipment reduces ongoing energy losses, lowering both running costs and the associated carbon footprint over the equipment's operational life.",
    topic: "Sustainability in Electrical Work"
  },
  {
    text: "How can good lighting design contribute to a building's overall sustainability?",
    options: [
      "By selecting efficient light sources, appropriate controls (e.g. daylight/occupancy sensing), and avoiding over-lighting spaces",
      "Sustainability is unrelated to lighting design",
      "By always installing the maximum possible number of fittings",
      "By avoiding the use of any lighting controls"
    ],
    correct: "By selecting efficient light sources, appropriate controls (e.g. daylight/occupancy sensing), and avoiding over-lighting spaces",
    explanation: "Sustainable lighting design combines efficient light sources with smart controls (daylight linking, occupancy sensing) and appropriate lighting levels, reducing unnecessary energy consumption.",
    topic: "Sustainability in Electrical Work"
  },
  {
    text: "Why might specifying local, low-impact materials be considered as part of a sustainable installation approach?",
    options: [
      "Material sourcing has no relevance to sustainability",
      "It can help reduce the carbon footprint associated with transport and the environmental impact of extraction/manufacture",
      "Sustainability is only concerned with energy use in operation, not materials",
      "Local materials are always of lower quality"
    ],
    correct: "It can help reduce the carbon footprint associated with transport and the environmental impact of extraction/manufacture",
    explanation: "Considering the sourcing and environmental impact of materials, not just operational energy use, is part of a broader sustainable approach to installation design.",
    topic: "Sustainability in Electrical Work"
  },
  {
    text: "Why is designing for future adaptability (e.g. spare capacity in a consumer unit or distribution board) considered good sustainable design practice?",
    options: [
      "Future adaptability has no relevance to sustainability",
      "It reduces the need for premature replacement or major rework as future demands (e.g. EV charging, renewables) increase",
      "Spare capacity always increases installation cost with no benefit",
      "Future-proofing is only relevant to very large commercial buildings"
    ],
    correct: "It reduces the need for premature replacement or major rework as future demands (e.g. EV charging, renewables) increase",
    explanation: "Designing in reasonable spare capacity can reduce the need for disruptive and resource-intensive rework later, as demands increase from technologies such as EV charging or renewables.",
    topic: "Sustainability in Electrical Work"
  },
  {
    text: "What does a standard symbol showing a circle with a cross inside typically represent on an electrical drawing?",
    options: [
      "A ceiling-mounted light fitting",
      "A socket outlet",
      "A distribution board",
      "A fire alarm call point"
    ],
    correct: "A ceiling-mounted light fitting",
    explanation: "A circle with a cross (or similar simple circle symbol) is a widely used convention to represent a ceiling-mounted luminaire on electrical layout drawings.",
    topic: "Electrical Symbols & Drawings"
  },
  {
    text: "Why is it important to check a drawing's legend/key before interpreting its symbols?",
    options: [
      "Symbols are universally identical across every drawing, so a legend is unnecessary",
      "Symbol conventions can vary between designers/companies, so the legend confirms exactly what each symbol represents on that specific drawing",
      "The legend only lists the drawing's title",
      "Legends have no practical use"
    ],
    correct: "Symbol conventions can vary between designers/companies, so the legend confirms exactly what each symbol represents on that specific drawing",
    explanation: "While many symbols are broadly standardised, conventions can vary, so checking the specific drawing's legend ensures symbols are correctly interpreted for that project.",
    topic: "Electrical Symbols & Drawings"
  },
  {
    text: "What is the purpose of a single-line diagram (SLD) for an electrical distribution system?",
    options: [
      "To show a simplified overview of the distribution system's main components and how they connect, without full wiring detail",
      "To provide detailed room-by-room lighting layouts",
      "To replace the need for any other drawing",
      "It has no practical purpose"
    ],
    correct: "To show a simplified overview of the distribution system's main components and how they connect, without full wiring detail",
    explanation: "A single-line diagram gives a simplified overview of a distribution system (main switch, distribution boards, key protective devices) without showing every individual conductor, useful for understanding overall system structure.",
    topic: "Electrical Symbols & Drawings"
  },
  {
    text: "What does a dashed line typically represent on many electrical layout drawings?",
    options: [
      "A cable route concealed within the structure (e.g. below floor or within a wall)",
      "A cable route always on the surface",
      "A route that does not need cable at all",
      "Dashed lines have no specific meaning in any drawing convention"
    ],
    correct: "A cable route concealed within the structure (e.g. below floor or within a wall)",
    explanation: "Dashed lines are commonly used to represent concealed cable routes (e.g. below floor level or within a wall/ceiling void), as distinct from surface-run cabling, though conventions should always be confirmed against the drawing's legend.",
    topic: "Electrical Symbols & Drawings"
  },
  {
    text: "Why is it useful to cross-reference a specification document with the drawings during a project?",
    options: [
      "Specifications and drawings never need to be checked against each other",
      "To ensure consistency between what is shown visually and what is described in detail, avoiding conflicting information",
      "Only the drawing needs to be followed, regardless of the specification",
      "Specifications override drawings and vice versa with no need for cross-checking"
    ],
    correct: "To ensure consistency between what is shown visually and what is described in detail, avoiding conflicting information",
    explanation: "Cross-referencing drawings and specifications helps identify and resolve any inconsistencies before work begins, avoiding confusion or errors during installation.",
    topic: "Electrical Symbols & Drawings"
  },
  {
    text: "What is a common characteristic of old 'rubber insulated' or 'VIR' (vulcanised india rubber) cable, sometimes still found in very old properties?",
    options: [
      "It remains as flexible and safe as modern cable indefinitely",
      "It commonly degrades and becomes brittle with age, posing an increased risk of insulation failure",
      "It is unaffected by age or heat",
      "It is still commonly installed in new work today"
    ],
    correct: "It commonly degrades and becomes brittle with age, posing an increased risk of insulation failure",
    explanation: "Old rubber-insulated cables tend to become brittle and can crack or crumble with age, significantly increasing the risk of exposed conductors and insulation failure.",
    topic: "Historic Wiring Systems"
  },
  {
    text: "What was 'lead sheathed' cable, sometimes found in older properties, typically used for?",
    options: [
      "An older method of cable protection using a lead outer sheath, now superseded by modern materials",
      "A modern cable type still commonly installed today",
      "A type of cable used only for data",
      "It has no historical relevance to electrical installations"
    ],
    correct: "An older method of cable protection using a lead outer sheath, now superseded by modern materials",
    explanation: "Lead-sheathed cable was an older cable protection method, now obsolete, that may still be found in some very old installations and often warrants particular caution and likely replacement.",
    topic: "Historic Wiring Systems"
  },
  {
    text: "Why should older 'round pin' sockets and associated wiring found in a historic property be treated with particular caution?",
    options: [
      "They present no additional risk compared with modern accessories",
      "They may be part of an older, potentially non-compliant installation lacking modern protective measures such as RCDs",
      "Round pin sockets are always safer than modern accessories",
      "They are still the current standard for new installations"
    ],
    correct: "They may be part of an older, potentially non-compliant installation lacking modern protective measures such as RCDs",
    explanation: "Older socket types often indicate an aged installation that may lack modern protective measures, so such findings warrant thorough inspection and likely upgrading.",
    topic: "Historic Wiring Systems"
  },
  {
    text: "Why might older properties have circuits without any earth conductor present at all?",
    options: [
      "All properties, regardless of age, have always had earth conductors",
      "Some very old wiring systems pre-date modern earthing requirements and were installed before current safety standards existed",
      "Earth conductors are optional in all installations, regardless of age",
      "Older wiring is always safer without an earth conductor"
    ],
    correct: "Some very old wiring systems pre-date modern earthing requirements and were installed before current safety standards existed",
    explanation: "Very old electrical installations may pre-date modern earthing and protective requirements, meaning some circuits may lack an earth conductor entirely, presenting a significant shock risk that needs remedial work.",
    topic: "Historic Wiring Systems"
  },
  {
    text: "What is generally the safest approach when working on a very old, poorly documented installation of unknown history?",
    options: [
      "Assume it is safe and proceed as normal",
      "Treat with extra caution, carry out thorough inspection and testing, and do not assume standard modern safety features are present",
      "Ignore any unusual findings and continue with the planned work regardless",
      "Only inspect the areas directly related to the current job, ignoring the rest of the installation"
    ],
    correct: "Treat with extra caution, carry out thorough inspection and testing, and do not assume standard modern safety features are present",
    explanation: "Old, poorly documented installations should be approached with extra caution, thoroughly inspected and tested, without assuming modern safety features such as RCDs or correct earthing are present.",
    topic: "Historic Wiring Systems"
  },
  {
    text: "What is a 'voltage sag' (dip) in relation to power quality?",
    options: [
      "A brief drop in supply voltage below its normal level, often caused by a fault or heavy load switching",
      "A permanent increase in supply voltage",
      "A complete loss of supply lasting several hours",
      "A change in supply frequency only"
    ],
    correct: "A brief drop in supply voltage below its normal level, often caused by a fault or heavy load switching",
    explanation: "A voltage sag is a short-duration reduction in supply voltage, often caused by faults elsewhere on the network or the starting of large loads such as motors.",
    topic: "Power Quality"
  },
  {
    text: "What is 'harmonic distortion' in an electrical supply?",
    options: [
      "Unwanted waveform distortion caused by non-linear loads, which can affect equipment performance and increase losses",
      "A term unrelated to electrical supplies",
      "A deliberate feature of all modern equipment",
      "A type of physical cable damage"
    ],
    correct: "Unwanted waveform distortion caused by non-linear loads, which can affect equipment performance and increase losses",
    explanation: "Harmonics are distortions of the ideal sinusoidal waveform, typically caused by non-linear loads such as switch-mode power supplies and variable speed drives, which can cause overheating, equipment malfunction and increased losses if not managed.",
    topic: "Power Quality"
  },
  {
    text: "What is a common source of harmonic distortion in a modern commercial building?",
    options: [
      "Purely resistive heating elements",
      "Non-linear loads such as computer power supplies, LED drivers and variable speed drives",
      "Standard incandescent lamps",
      "Simple switches"
    ],
    correct: "Non-linear loads such as computer power supplies, LED drivers and variable speed drives",
    explanation: "Non-linear loads, including computer/IT equipment power supplies, LED drivers and variable speed drives, are common sources of harmonic distortion in modern buildings.",
    topic: "Power Quality"
  },
  {
    text: "Why might excessive harmonic currents in the neutral conductor of a three-phase system be a particular concern?",
    options: [
      "Triplen harmonics from single-phase non-linear loads can add together in the neutral rather than cancelling, potentially overloading it",
      "Harmonics always cancel out completely, so the neutral requires no special consideration",
      "Neutral conductors are never affected by harmonics",
      "This issue only applies to single-phase installations"
    ],
    correct: "Triplen harmonics from single-phase non-linear loads can add together in the neutral rather than cancelling, potentially overloading it",
    explanation: "Certain harmonic currents (triplen harmonics) generated by single-phase non-linear loads can add together in the shared neutral of a three-phase system rather than cancelling, potentially overloading a neutral sized only for balanced loads.",
    topic: "Power Quality"
  },
  {
    text: "What is a possible design response to significant harmonic loading in a commercial installation?",
    options: [
      "Ignore harmonics entirely, as they have no practical impact",
      "Consider oversizing the neutral conductor or using harmonic filters/K-rated transformers where appropriate",
      "Reduce the number of circuits regardless of load",
      "Harmonics can only be addressed by the equipment manufacturer, never the installation design"
    ],
    correct: "Consider oversizing the neutral conductor or using harmonic filters/K-rated transformers where appropriate",
    explanation: "Where significant harmonic loading is expected, designers may specify an oversized neutral conductor, harmonic filters, or K-rated transformers designed to handle the additional heating effects of harmonic currents.",
    topic: "Power Quality"
  },
  {
    text: "What is the purpose of fire stopping around a cable penetration through a fire-rated wall or floor?",
    options: [
      "To improve the appearance of the penetration",
      "To restore the fire resistance of the wall/floor at the point where the cable passes through, preventing fire and smoke spread",
      "To increase the cable's current rating",
      "Fire stopping has no functional purpose"
    ],
    correct: "To restore the fire resistance of the wall/floor at the point where the cable passes through, preventing fire and smoke spread",
    explanation: "Fire stopping materials seal cable penetrations through fire-rated compartments, restoring the wall or floor's fire resistance and helping prevent the spread of fire and smoke between compartments.",
    topic: "Cable Fire Stopping"
  },
  {
    text: "Why is it important to use a fire stopping product that is compatible with the specific cable and construction type used?",
    options: [
      "Any fire stopping product will work equally well regardless of application",
      "Manufacturer-tested combinations ensure the fire stopping performs as intended and achieves its rated fire resistance",
      "Compatibility has no bearing on fire stopping performance",
      "Fire stopping products are universally interchangeable with no testing required"
    ],
    correct: "Manufacturer-tested combinations ensure the fire stopping performs as intended and achieves its rated fire resistance",
    explanation: "Fire stopping systems are tested in specific configurations; using an untested combination of cable, penetration and sealing product could compromise the intended fire resistance rating.",
    topic: "Cable Fire Stopping"
  },
  {
    text: "What should be done if additional cables are added through an existing fire-stopped penetration at a later date?",
    options: [
      "No action is needed, existing fire stopping always accommodates future changes",
      "The fire stopping should be reinstated correctly to maintain the required fire resistance",
      "The fire stopping can simply be left open around the new cables",
      "New cables should never be routed through existing fire-stopped penetrations"
    ],
    correct: "The fire stopping should be reinstated correctly to maintain the required fire resistance",
    explanation: "Any alteration to a fire-stopped penetration, such as adding cables, must be followed by correctly reinstating the fire stopping to maintain the wall or floor's required fire resistance.",
    topic: "Cable Fire Stopping"
  },
  {
    text: "Why is unsealed cable trunking or conduit passing through a fire compartment wall a fire safety concern?",
    options: [
      "It presents no fire safety concern if the cable itself is fire-rated",
      "An unsealed penetration can allow fire and smoke to spread between compartments, defeating the purpose of the fire-rated wall",
      "Fire compartmentation only applies to doors, never to cable routes",
      "Trunking is always inherently fire-resistant with no need for additional sealing"
    ],
    correct: "An unsealed penetration can allow fire and smoke to spread between compartments, defeating the purpose of the fire-rated wall",
    explanation: "Any unsealed opening in a fire compartment wall, including for cable trunking or conduit, can allow fire and smoke to bypass the compartmentation, undermining the building's overall fire strategy.",
    topic: "Cable Fire Stopping"
  },
  {
    text: "What is 'intumescent' fire stopping material, and how does it work?",
    options: [
      "A material that expands significantly when exposed to heat, sealing gaps and preventing fire/smoke spread",
      "A material that contracts when heated, opening up gaps",
      "A decorative coating with no fire-related function",
      "A type of cable insulation, unrelated to fire stopping"
    ],
    correct: "A material that expands significantly when exposed to heat, sealing gaps and preventing fire/smoke spread",
    explanation: "Intumescent materials expand considerably when exposed to heat, sealing gaps left as combustible materials (such as cable insulation) burn away, helping maintain the fire barrier's integrity.",
    topic: "Cable Fire Stopping"
  },
  {
    text: "What is 'smart charging' in relation to EV charge points?",
    options: [
      "Charging that adjusts timing/rate based on factors like tariff, grid demand or renewable generation availability",
      "A charge point with no communication capability",
      "Charging that always occurs at maximum rate regardless of conditions",
      "A term unrelated to EV charging"
    ],
    correct: "Charging that adjusts timing/rate based on factors like tariff, grid demand or renewable generation availability",
    explanation: "Smart EV charging can adjust charging schedules or rates based on factors such as off-peak tariffs, grid demand, or available renewable generation, improving efficiency and potentially reducing costs.",
    topic: "EV Charging Extended"
  },
  {
    text: "Why do UK regulations increasingly require most new domestic EV charge points to have smart charging capability?",
    options: [
      "Smart functionality is purely optional with no regulatory driver",
      "To support grid management and allow charging to be shifted to off-peak or lower-carbon periods where practical",
      "Smart charge points are always cheaper to manufacture",
      "It has no relation to grid or environmental considerations"
    ],
    correct: "To support grid management and allow charging to be shifted to off-peak or lower-carbon periods where practical",
    explanation: "Smart charging requirements support wider grid management goals, helping shift demand to off-peak times and periods of greater renewable generation, reducing strain on the network.",
    topic: "EV Charging Extended"
  },
  {
    text: "What load management technique might be used when installing multiple EV charge points at one property or site?",
    options: [
      "Dynamic load management, which adjusts charging current to each point based on overall available supply capacity",
      "Always installing enough capacity for every charger to run at maximum simultaneously, regardless of cost",
      "Load management has no relevance to multiple EV charge points",
      "Disconnecting all but one charger permanently"
    ],
    correct: "Dynamic load management, which adjusts charging current to each point based on overall available supply capacity",
    explanation: "Dynamic load management systems monitor overall demand and adjust the charging current delivered to each connected vehicle, allowing multiple chargers to share available capacity without exceeding the supply limit.",
    topic: "EV Charging Extended"
  },
  {
    text: "Why might a dedicated circuit for an EV charge point typically require RCD protection with a specific type suited to potential DC fault currents?",
    options: [
      "EV charging never involves any DC component",
      "Some EV charging equipment can introduce DC fault currents which a standard AC-only RCD may not reliably detect, requiring a Type A or Type B RCD as appropriate",
      "Any standard RCD type is always suitable for EV charging",
      "RCD protection is never required for EV charge points"
    ],
    correct: "Some EV charging equipment can introduce DC fault currents which a standard AC-only RCD may not reliably detect, requiring a Type A or Type B RCD as appropriate",
    explanation: "Certain EV charging equipment can introduce smooth DC fault currents that a basic AC-only RCD may not detect; BS 7671 and manufacturer guidance specify appropriate RCD types (or built-in DC fault detection) to address this.",
    topic: "EV Charging Extended"
  },
  {
    text: "Why should an EV charge point installer consider the vehicle manufacturer's charging requirements alongside BS 7671?",
    options: [
      "Vehicle manufacturer requirements are irrelevant to a compliant electrical installation",
      "To ensure compatibility and correct operation of the charging equipment with the specific vehicles likely to use it",
      "BS 7671 always overrides any vehicle-specific consideration with no need for cross-checking",
      "All EVs have identical charging requirements"
    ],
    correct: "To ensure compatibility and correct operation of the charging equipment with the specific vehicles likely to use it",
    explanation: "While BS 7671 sets the electrical installation requirements, checking vehicle manufacturer guidance helps ensure the charge point will operate correctly and compatibly with the vehicles expected to use it.",
    topic: "EV Charging Extended"
  },
  {
    text: "What is the purpose of mandatory signage (blue circular signs) on a construction site?",
    options: [
      "To instruct that a specific action must be taken, such as wearing specified PPE",
      "To warn of a general hazard only, with no required action",
      "To prohibit an action",
      "Mandatory signs have no defined meaning"
    ],
    correct: "To instruct that a specific action must be taken, such as wearing specified PPE",
    explanation: "Blue circular signs are mandatory signs, instructing that a specific action must be taken, such as wearing a hard hat or high-visibility clothing in the area.",
    topic: "Public Awareness & Signage"
  },
  {
    text: "What is the purpose of prohibition signage (red circular signs with a diagonal line)?",
    options: [
      "To indicate an action is forbidden, such as 'no smoking' or 'no unauthorised access'",
      "To indicate a mandatory action",
      "To provide general safety information only",
      "Prohibition signs have no defined meaning"
    ],
    correct: "To indicate an action is forbidden, such as 'no smoking' or 'no unauthorised access'",
    explanation: "Red circular signs with a diagonal bar indicate prohibition — that a specific action, such as smoking or unauthorised entry, is forbidden.",
    topic: "Public Awareness & Signage"
  },
  {
    text: "What is the purpose of warning signage (yellow triangular signs)?",
    options: [
      "To alert people to a specific hazard present in the area, such as electricity or falling objects",
      "To indicate a mandatory action that must be taken",
      "To indicate a prohibited action",
      "Warning signs have no defined meaning"
    ],
    correct: "To alert people to a specific hazard present in the area, such as electricity or falling objects",
    explanation: "Yellow triangular signs are warning signs, alerting people to a specific hazard present, such as the risk of electric shock, so they can take appropriate precautions.",
    topic: "Public Awareness & Signage"
  },
  {
    text: "Why should signage warning of electrical danger be positioned clearly and be easily visible?",
    options: [
      "Signage placement has no bearing on its effectiveness",
      "To ensure anyone approaching the hazard area is warned in good time, reducing the risk of accidental contact or entry",
      "Only large commercial sites need visible signage",
      "Signage is purely a legal formality with no practical safety value"
    ],
    correct: "To ensure anyone approaching the hazard area is warned in good time, reducing the risk of accidental contact or entry",
    explanation: "Clear, visible positioning of warning signage ensures people are alerted to the danger before they get close enough to be at risk, supporting effective hazard communication.",
    topic: "Public Awareness & Signage"
  },
  {
    text: "Why should the public be kept away from areas where electrical maintenance or testing is being carried out, using barriers and signage?",
    options: [
      "The public presents no additional risk during electrical work",
      "To prevent accidental contact with exposed equipment, tools, or temporary hazards created by the work",
      "Barriers are only used to protect the workers' tools",
      "It is purely a matter of appearance, not safety"
    ],
    correct: "To prevent accidental contact with exposed equipment, tools, or temporary hazards created by the work",
    explanation: "Barriers and signage protect members of the public from accidentally coming into contact with exposed equipment, tools, or other temporary hazards created while electrical work is in progress.",
    topic: "Public Awareness & Signage"
  },
  {
    text: "What is meant by 'maximum demand' for an electrical installation?",
    options: [
      "The theoretical current if every piece of equipment operated simultaneously at full rated load, before diversity is applied",
      "The current drawn by the lighting circuit alone",
      "The rated current of the main switch only",
      "A term with no defined meaning in electrical design"
    ],
    correct: "The theoretical current if every piece of equipment operated simultaneously at full rated load, before diversity is applied",
    explanation: "Maximum demand (before diversity) represents the theoretical total current if all connected loads operated simultaneously at full rated capacity, which is then adjusted using diversity factors for practical design.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "Why is the position of a consumer unit important within a domestic property?",
    options: [
      "Position has no practical relevance",
      "It should be readily accessible for operation and maintenance, and positioned to reduce risk in an emergency, such as away from areas prone to flooding",
      "It must always be positioned in the loft",
      "It should be hidden and inaccessible for security"
    ],
    correct: "It should be readily accessible for operation and maintenance, and positioned to reduce risk in an emergency, such as away from areas prone to flooding",
    explanation: "Good practice positions the consumer unit for easy, safe access for operation and maintenance, while also considering risks such as flood-prone areas which could compromise safety.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "What is the purpose of a 'notice of periodic inspection' fixed near a consumer unit?",
    options: [
      "To recommend the date by which the installation should next be inspected and tested",
      "To display the installer's marketing information",
      "It has no defined purpose",
      "To record the date the consumer unit was manufactured"
    ],
    correct: "To recommend the date by which the installation should next be inspected and tested",
    explanation: "This notice records the date of the last inspection and recommends when the next periodic inspection and test should be carried out, helping maintain ongoing safety.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "Why must all persons working on an electrical installation be aware of any existing hazards, such as asbestos, identified before work begins?",
    options: [
      "Awareness of existing hazards has no bearing on safety",
      "To ensure appropriate precautions are taken and the hazard is not inadvertently disturbed or worsened during the work",
      "Only the site manager needs to be aware of such hazards",
      "Existing hazards are always someone else's responsibility"
    ],
    correct: "To ensure appropriate precautions are taken and the hazard is not inadvertently disturbed or worsened during the work",
    explanation: "Sharing information about known hazards, such as asbestos, ensures everyone working nearby takes appropriate precautions and avoids inadvertently disturbing or worsening the hazard.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "What is the purpose of a 'pre-start' or 'toolbox' briefing at the start of a working day on a construction site?",
    options: [
      "To brief the workforce on the day's tasks, hazards and any specific precautions before work begins",
      "It has no practical safety value",
      "Only required once at the start of a project",
      "To assign parking spaces for the day"
    ],
    correct: "To brief the workforce on the day's tasks, hazards and any specific precautions before work begins",
    explanation: "A pre-start briefing ensures the workforce understands the planned tasks, associated hazards, and any specific precautions needed before work begins that day.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "Why should tools and equipment be matched to the task rather than using whatever is immediately available?",
    options: [
      "Tool selection has no bearing on safety or quality",
      "Using inappropriate tools can increase the risk of injury, poor workmanship, or damage to equipment/materials",
      "Any tool can be used for any task with no downside",
      "Correct tool selection only affects speed of work"
    ],
    correct: "Using inappropriate tools can increase the risk of injury, poor workmanship, or damage to equipment/materials",
    explanation: "Selecting the correct tool for a task reduces the risk of injury, helps achieve good workmanship, and avoids damaging equipment or materials through incorrect use.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "What is a key reason for maintaining good housekeeping (keeping the work area tidy) while carrying out electrical work?",
    options: [
      "Housekeeping is purely a matter of appearance with no safety relevance",
      "It reduces trip hazards, fire risk from accumulated waste, and helps maintain an organised, safe working environment",
      "Tidiness only matters at the very end of a job",
      "Good housekeeping is the sole responsibility of site cleaning staff"
    ],
    correct: "It reduces trip hazards, fire risk from accumulated waste, and helps maintain an organised, safe working environment",
    explanation: "Good housekeeping reduces trip hazards, limits the accumulation of combustible waste (reducing fire risk), and generally supports a safer, more organised working environment throughout the job.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "Why is it good practice to double-check the identity of a circuit before starting isolation, even if it appears obvious?",
    options: [
      "Double-checking is unnecessary once you believe you know the correct circuit",
      "Mislabelled circuits or undocumented changes over time can mean the obvious answer is sometimes wrong, risking working on a live circuit",
      "Circuit identification never changes over the life of an installation",
      "Only inexperienced electricians need to double-check circuit identity"
    ],
    correct: "Mislabelled circuits or undocumented changes over time can mean the obvious answer is sometimes wrong, risking working on a live circuit",
    explanation: "Circuit labelling can become inaccurate over time due to undocumented changes, so verifying circuit identity carefully, rather than assuming, helps avoid working on a circuit that is still live.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "What is a sensible approach if, during work, you become aware you are not fully competent or confident to complete a specific task safely?",
    options: [
      "Continue regardless, to avoid appearing inexperienced",
      "Stop, seek advice or assistance from a more experienced/competent colleague, and do not proceed beyond your competence",
      "Complete the task as quickly as possible without seeking help",
      "Guess the correct approach and hope for the best"
    ],
    correct: "Stop, seek advice or assistance from a more experienced/competent colleague, and do not proceed beyond your competence",
    explanation: "Recognising the limits of your own competence and seeking appropriate help is a responsible and professional approach, helping avoid mistakes that could cause danger or poor-quality work.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "Why is ongoing awareness of updates to BS 7671 (e.g. amendments) important for a practising electrician?",
    options: [
      "BS 7671 never changes once published",
      "Amendments can introduce new requirements or clarify existing ones, and staying current helps ensure work remains compliant with the latest standard",
      "Only trainers and assessors need to be aware of amendments",
      "Amendments have no practical bearing on day-to-day work"
    ],
    correct: "Amendments can introduce new requirements or clarify existing ones, and staying current helps ensure work remains compliant with the latest standard",
    explanation: "BS 7671 is periodically updated with amendments reflecting new technology, safety learning and clarified requirements; staying informed helps ensure ongoing compliance in day-to-day practice.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "What is the value of seeking feedback from a supervisor or assessor after completing a practical task during training?",
    options: [
      "Feedback has no value once the immediate task is finished",
      "It helps identify areas for improvement and reinforces good practice, supporting ongoing skill development",
      "Feedback is only relevant for the very first task ever attempted",
      "Only negative feedback carries any value"
    ],
    correct: "It helps identify areas for improvement and reinforces good practice, supporting ongoing skill development",
    explanation: "Constructive feedback helps trainees identify areas needing improvement while reinforcing good habits already being demonstrated, supporting continued development of skill and competence.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "Why is it important to consider the needs of building users with disabilities when designing switch and socket positions?",
    options: [
      "Accessibility has no bearing on electrical design",
      "Appropriate positioning (e.g. height, reach) helps ensure controls are usable by the widest range of building occupants, supporting inclusive design",
      "Accessibility requirements only apply to public buildings, never to homes",
      "Switch and socket positions are always fixed regardless of building type"
    ],
    correct: "Appropriate positioning (e.g. height, reach) helps ensure controls are usable by the widest range of building occupants, supporting inclusive design",
    explanation: "Considering accessibility guidance (such as Part M) when positioning switches and sockets helps ensure they remain usable by the widest possible range of building occupants, including those with mobility or reach limitations.",
    topic: "General Mixed Revision Part 2"
  },
  {
    text: "What is the purpose of a 'method of isolation' being clearly identified in a Risk Assessment/Method Statement for electrical work?",
    options: [
      "To ensure everyone involved knows exactly how the circuit will be made and confirmed safe before work begins",
      "It has no practical relevance to the RAMS document",
      "Only the client needs to know the isolation method",
      "Isolation methods are always identical regardless of the task"
    ],
    correct: "To ensure everyone involved knows exactly how the circuit will be made and confirmed safe before work begins",
    explanation: "Clearly documenting the isolation method in RAMS ensures everyone involved understands exactly how the circuit will be isolated and proved dead before work starts, supporting consistent safe practice.",
    topic: "Final Mixed Top-Up"
  },
  {
    text: "Why should a newly qualified electrician continue to seek mentorship or guidance from more experienced colleagues?",
    options: [
      "Qualification alone guarantees complete competence in every situation",
      "Practical experience continues to build competence over time, and guidance helps navigate less common or complex situations safely",
      "Mentorship has no value once formal qualifications are achieved",
      "Only apprentices benefit from mentorship"
    ],
    correct: "Practical experience continues to build competence over time, and guidance helps navigate less common or complex situations safely",
    explanation: "Qualification demonstrates a baseline of competence, but experience and mentorship continue to build practical judgement, particularly for less common or more complex situations encountered in the field.",
    topic: "Final Mixed Top-Up"
  },
  {
    text: "What is the value of understanding the 'why' behind a regulation, rather than simply memorising the rule itself?",
    options: [
      "Understanding the underlying reasoning helps apply the principle correctly to new or unusual situations not explicitly covered",
      "There is no value in understanding reasoning, only memorisation matters",
      "Regulations should never be questioned or understood, only followed exactly as written",
      "Understanding reasoning is only relevant for exam purposes"
    ],
    correct: "Understanding the underlying reasoning helps apply the principle correctly to new or unusual situations not explicitly covered",
    explanation: "Understanding why a regulation exists helps an electrician apply the underlying safety principle sensibly to new or unusual situations that may not be explicitly covered by the letter of the rule.",
    topic: "Final Mixed Top-Up"
  },
  {
    text: "Why might an electrician keep a personal logbook of jobs, challenges encountered, and lessons learned?",
    options: [
      "It has no practical value beyond record-keeping",
      "It supports ongoing learning, reflection and professional development over time",
      "It is only useful for billing purposes",
      "Logbooks are only required during a formal apprenticeship"
    ],
    correct: "It supports ongoing learning, reflection and professional development over time",
    explanation: "Reflecting on past jobs and challenges through a personal logbook can reinforce learning and support ongoing professional development beyond the requirements of formal training.",
    topic: "Final Mixed Top-Up"
  },
  {
    text: "Why is a calm, methodical approach generally safer than rushing when carrying out electrical work?",
    options: [
      "Rushing has no bearing on safety outcomes",
      "Rushing increases the likelihood of skipped steps, mistakes, or overlooked hazards, all of which can lead to accidents",
      "A methodical approach always takes significantly longer with no safety benefit",
      "Speed is always the primary consideration over accuracy and safety"
    ],
    correct: "Rushing increases the likelihood of skipped steps, mistakes, or overlooked hazards, all of which can lead to accidents",
    explanation: "A calm, methodical approach reduces the risk of skipped safety steps or overlooked hazards that can occur when work is rushed, supporting safer and higher-quality outcomes.",
    topic: "Final Mixed Top-Up"
  },
  {
    text: "What is a sensible response if you notice a colleague working in a way that appears unsafe?",
    options: [
      "Ignore it, as it is not your responsibility",
      "Raise the concern with them directly (or via a supervisor if appropriate), prioritising safety over avoiding an awkward conversation",
      "Only mention it if an accident actually occurs",
      "Report it anonymously without ever speaking to the colleague"
    ],
    correct: "Raise the concern with them directly (or via a supervisor if appropriate), prioritising safety over avoiding an awkward conversation",
    explanation: "A positive safety culture involves looking out for colleagues; raising a genuine safety concern, even if it feels awkward, can prevent an accident before it happens.",
    topic: "Final Mixed Top-Up"
  },
  {
    text: "Why is it good practice to plan a task fully, including gathering all necessary tools, materials and information, before starting?",
    options: [
      "Planning ahead has no bearing on safety or efficiency",
      "It reduces the temptation to take shortcuts or work with inadequate/incorrect equipment partway through the task",
      "It is only relevant for very large or complex projects",
      "Planning should only happen after the task has already begun"
    ],
    correct: "It reduces the temptation to take shortcuts or work with inadequate/incorrect equipment partway through the task",
    explanation: "Thorough planning before starting a task reduces the likelihood of taking shortcuts or improvising with unsuitable equipment partway through, both of which can compromise safety and quality.",
    topic: "Final Mixed Top-Up"
  },
];
