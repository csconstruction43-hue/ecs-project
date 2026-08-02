// data/extraPracticeMega.js
//
// NEW, ADDITIONAL question bank (500+ original practice questions) covering
// safe isolation, testing & inspection, earthing & bonding, protective devices,
// electrical theory & calculations, cables & wiring, tools & equipment, PPE &
// manual handling, fire safety, health & hygiene/COSHH, work at height,
// legislation, first aid, site safety, motors & control, lighting, alarm
// systems, renewables, data cabling and trade knowledge.
//
// This file is separate from every existing question file in the project
// (questions.js, officialEcsHse.js, officialEcsFess.js, officialEcsNetwork.js,
// officialEcsElectricalSafety.js, am2Data.js, extraPracticeElectrical.js,
// extraPracticeSafety.js) -- none of those files are modified. Original
// practice content, clearly marked official: false.
//
// UPDATE: the original 301 questions (added first) are untouched below —
// 225 further original questions were appended afterwards, taking the bank
// to 526 questions total, without altering any of the original 301.
//
// UPDATE 2: a further 259 original questions have now been appended after
// all of the above — the existing 526 questions are completely untouched —
// taking the bank to 785 questions total.
//
// UPDATE 3: a further 264 original questions have now been appended after
// all of the above — the existing 785 questions are completely untouched —
// taking the bank to 1,049 questions total.

export const EXTRA_PRACTICE_MEGA_INFO = {
  "official": false,
  "title": "Extra Practice: 1000+ Mixed Questions (Electrical, Safety, Testing & More)",
  "officialQuestionBankPublic": false,
  "disclaimer": "These are additional, original practice questions covering a wide range of electrical installation, health & safety, testing, and trade knowledge topics. They are supplementary study material only, not official ECS/EAL exam questions, and do not replace the existing question banks already in this app."
};

export const extraPracticeMegaBank = [
  {
    "text": "What is the first step in a safe isolation procedure?",
    "options": [
      "Switch off the supply",
      "Identify the correct circuit/point of isolation",
      "Lock off the isolator",
      "Prove the tester on a known source"
    ],
    "correct": "Identify the correct circuit/point of isolation",
    "explanation": "The safe isolation procedure begins with correctly identifying the circuit or equipment to be isolated, usually from drawings, labels or schedules.",
    "topic": "Safe Isolation"
  },
  {
    "text": "After locking off an isolator, what must be done before starting work?",
    "options": [
      "Inform the client",
      "Prove your voltage indicator on a known live source, test the circuit, then re-prove on the known source",
      "Remove all fuses in the building",
      "Put up a warning sign only"
    ],
    "correct": "Prove your voltage indicator on a known live source, test the circuit, then re-prove on the known source",
    "explanation": "This 'prove-test-prove' sequence confirms the voltage indicator is working correctly before and after testing the isolated circuit is dead.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Which piece of equipment is used to physically prevent an isolator being switched back on?",
    "options": [
      "Voltage indicator",
      "Lock-off device/padlock",
      "Proving unit",
      "Insulation tester"
    ],
    "correct": "Lock-off device/padlock",
    "explanation": "A lock-off device, secured by a uniquely keyed padlock, physically prevents an isolator being operated while work is in progress.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What standard should a voltage indicator used for safe isolation comply with?",
    "options": [
      "BS EN 61243-3 (GS38)",
      "BS 1363",
      "BS 7671",
      "BS 5266"
    ],
    "correct": "BS EN 61243-3 (GS38)",
    "explanation": "HSE guidance note GS38 sets out requirements for test equipment, including voltage indicators, used on electrical systems.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is a 'proving unit' used for?",
    "options": [
      "To generate a known voltage to check a voltage indicator is functioning",
      "To measure earth loop impedance",
      "To test RCD trip times",
      "To identify cable cores"
    ],
    "correct": "To generate a known voltage to check a voltage indicator is functioning",
    "explanation": "A proving unit produces a known safe voltage so the voltage indicator's operation can be confirmed immediately before and after testing a circuit dead.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Under the Electricity at Work Regulations 1989, who has a duty to prevent danger from electrical systems?",
    "options": [
      "Only the employer",
      "Only electricians",
      "Every employer and self-employed person, and employees so far as it is within their control",
      "Only the client"
    ],
    "correct": "Every employer and self-employed person, and employees so far as it is within their control",
    "explanation": "The Regulations place duties on employers, the self-employed, and employees to the extent that they have control over the electrical systems and how they are used.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What does Regulation 4(3) of the Electricity at Work Regulations 1989 require regarding work activities?",
    "options": [
      "Work must never be carried out on or near live conductors, subject to limited exceptions where it is unreasonable to do otherwise and precautions are taken",
      "All work must be carried out live to save time",
      "Only a supervisor may isolate circuits",
      "Isolation is only needed above 230V"
    ],
    "correct": "Work must never be carried out on or near live conductors, subject to limited exceptions where it is unreasonable to do otherwise and precautions are taken",
    "explanation": "Regulation 4(3) requires that live working be avoided unless it is unreasonable for it to be dead and suitable precautions are in place.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Which of these is NOT part of the standard safe isolation procedure?",
    "options": [
      "Identifying the circuit",
      "Warning others / notifying affected persons",
      "Proving dead using an approved voltage indicator",
      "Leaving the circuit live but taped off"
    ],
    "correct": "Leaving the circuit live but taped off",
    "explanation": "Taping off a live circuit is not an acceptable substitute for isolation; the supply must be switched off, locked off and proved dead.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Why should a permit-to-work be used for complex isolations?",
    "options": [
      "It replaces the need for testing",
      "It formally documents the isolation and authorises specific work, controlling who can re-energise the system",
      "It is only needed for low voltage work",
      "It removes the need for lock-off devices"
    ],
    "correct": "It formally documents the isolation and authorises specific work, controlling who can re-energise the system",
    "explanation": "A permit-to-work is a formal system that documents what has been isolated, by whom, and controls safe reinstatement of supply.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What should be attached to a locked-off isolator to inform others?",
    "options": [
      "Nothing, the lock is enough",
      "A warning notice/caution tag stating why it is locked off and who locked it",
      "The circuit diagram",
      "A fire extinguisher"
    ],
    "correct": "A warning notice/caution tag stating why it is locked off and who locked it",
    "explanation": "A caution notice identifies who isolated the circuit and why, warning others not to re-energise it.",
    "topic": "Safe Isolation"
  },
  {
    "text": "When multiple people are working on the same isolated circuit, what device allows each person to apply their own lock?",
    "options": [
      "A single padlock shared between workers",
      "A multi-lock hasp",
      "A proving unit",
      "A voltage indicator"
    ],
    "correct": "A multi-lock hasp",
    "explanation": "A multi-lock hasp allows several workers to each fit their own padlock, so the isolation cannot be removed until everyone has removed their lock.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What voltage should a voltage indicator be capable of detecting for general electrical work in the UK?",
    "options": [
      "Only 12V",
      "From below extra-low voltage up to at least 690V AC",
      "Only 230V",
      "Only DC voltages"
    ],
    "correct": "From below extra-low voltage up to at least 690V AC",
    "explanation": "A suitable two-pole voltage indicator conforming to GS38 should be able to detect a wide voltage range likely to be encountered.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Which of the following circuits must also be considered during isolation, in addition to the obvious supply?",
    "options": [
      "Only the main switch",
      "Any alternative or back-up supplies, such as generators or UPS systems",
      "Only lighting circuits",
      "Only circuits above 1kV"
    ],
    "correct": "Any alternative or back-up supplies, such as generators or UPS systems",
    "explanation": "Standby generators, UPS systems or other alternative supplies could re-energise a circuit and must also be isolated and locked off.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is meant by 'point of isolation'?",
    "options": [
      "Any switch on the circuit",
      "The specific device that, when operated, disconnects all poles of supply to the equipment being worked on",
      "The consumer unit only",
      "The socket outlet being used"
    ],
    "correct": "The specific device that, when operated, disconnects all poles of supply to the equipment being worked on",
    "explanation": "The point of isolation is the specific switching device confirmed to disconnect all live conductors supplying the work area.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What should happen if the key to a lock-off device is lost while work is in progress?",
    "options": [
      "Force the isolator back on",
      "Follow the company's lost-key procedure, which may involve a second authorised person or cutting the lock under controlled conditions",
      "Ignore it and finish the job live",
      "Ask a member of the public for help"
    ],
    "correct": "Follow the company's lost-key procedure, which may involve a second authorised person or cutting the lock under controlled conditions",
    "explanation": "A documented lost-key procedure ensures the isolation stays secure and is only removed by an authorised, controlled method.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is the purpose of an insulation resistance test?",
    "options": [
      "To check the polarity of a circuit",
      "To verify the insulation between live conductors and earth (or between live conductors) is adequate",
      "To measure the earth fault loop impedance",
      "To check RCD operating time"
    ],
    "correct": "To verify the insulation between live conductors and earth (or between live conductors) is adequate",
    "explanation": "Insulation resistance testing confirms that the insulation around conductors is sound and will prevent leakage current or faults.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the minimum acceptable insulation resistance value for a new 230V circuit under BS 7671, using a 500V DC test?",
    "options": [
      "0.5 MΩ",
      "1.0 MΩ",
      "0.1 MΩ",
      "10 MΩ"
    ],
    "correct": "1.0 MΩ",
    "explanation": "BS 7671 specifies a minimum insulation resistance of 1.0 MΩ for circuits up to 500V, tested at 500V DC.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Which instrument is used to measure earth fault loop impedance (Zs)?",
    "options": [
      "Insulation resistance tester",
      "Loop impedance tester",
      "Multifunction tester used in loop impedance mode",
      "RCD tester only"
    ],
    "correct": "Loop impedance tester",
    "explanation": "A dedicated loop impedance tester (often part of a multifunction tester) measures the impedance of the earth fault loop path.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why is earth fault loop impedance (Zs) tested?",
    "options": [
      "To check cable colour coding",
      "To confirm the protective device will disconnect the supply within the required time in the event of a fault",
      "To measure voltage drop only",
      "To check socket polarity"
    ],
    "correct": "To confirm the protective device will disconnect the supply within the required time in the event of a fault",
    "explanation": "Zs testing ensures the fault current will be high enough to operate the protective device within the disconnection time required by BS 7671.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does a continuity test on the circuit protective conductor (R1+R2 or R2) confirm?",
    "options": [
      "The polarity of a socket outlet",
      "That there is a low-resistance, continuous earth path throughout the circuit",
      "The type of cable insulation used",
      "The RCD sensitivity"
    ],
    "correct": "That there is a low-resistance, continuous earth path throughout the circuit",
    "explanation": "Continuity testing verifies the cpc provides a sound, low-resistance path back to the earthing point for fault current to flow.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of RCD testing?",
    "options": [
      "To check cable size",
      "To confirm the RCD trips within the required time at rated and multiples of rated residual current",
      "To measure supply voltage",
      "To identify the circuit's fuse rating"
    ],
    "correct": "To confirm the RCD trips within the required time at rated and multiples of rated residual current",
    "explanation": "RCD testing checks that the device disconnects the supply within specified times at set test currents, confirming it will protect against fault/shock currents.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is a typical maximum trip time for a 30mA general-purpose RCD at rated residual current (IΔn) for additional protection?",
    "options": [
      "40ms",
      "300ms",
      "1 second",
      "5 seconds"
    ],
    "correct": "40ms",
    "explanation": "For additional protection against electric shock, a 30mA RCD must generally trip within 40ms (300ms at IΔn for standard/non-instantaneous RCDs, but for the ×5 test at 150mA the limit is 40ms).",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Which test should always be carried out FIRST, before any circuit is energised, as part of initial verification?",
    "options": [
      "Functional testing of RCDs",
      "Dead testing such as continuity and insulation resistance",
      "Earth fault loop impedance",
      "Prospective fault current measurement"
    ],
    "correct": "Dead testing such as continuity and insulation resistance",
    "explanation": "Dead tests such as continuity, polarity and insulation resistance are carried out before the installation is energised, followed by live tests.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does a polarity test confirm?",
    "options": [
      "That single-pole devices are connected in the line conductor and centre-pin lampholders are wired correctly",
      "That the earth resistance is below 1 ohm",
      "That the RCD trips correctly",
      "That the insulation resistance is adequate"
    ],
    "correct": "That single-pole devices are connected in the line conductor and centre-pin lampholders are wired correctly",
    "explanation": "Polarity testing confirms correct connection of line, neutral and earth conductors, including that switches interrupt the line conductor.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What document is issued on completion of a new electrical installation?",
    "options": [
      "Minor Works Certificate only",
      "Electrical Installation Certificate (EIC)",
      "Periodic Inspection Report only",
      "PAT test label"
    ],
    "correct": "Electrical Installation Certificate (EIC)",
    "explanation": "An Electrical Installation Certificate is issued for new installations, additions or alterations, confirming compliance with BS 7671.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is issued after a periodic inspection of an existing installation?",
    "options": [
      "Electrical Installation Certificate",
      "Electrical Installation Condition Report (EICR)",
      "Minor Works Certificate",
      "Building Regulations Certificate"
    ],
    "correct": "Electrical Installation Condition Report (EICR)",
    "explanation": "An EICR documents the condition of an existing installation following periodic inspection and testing, with observations coded by severity.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "In an EICR, what does classification code 'C1' indicate?",
    "options": [
      "Improvement recommended",
      "Danger present, risk of injury – immediate action required",
      "Further investigation required",
      "The installation fully complies"
    ],
    "correct": "Danger present, risk of injury – immediate action required",
    "explanation": "C1 indicates a danger is present and there is a risk of injury; immediate remedial action is required.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "In an EICR, what does classification code 'C2' indicate?",
    "options": [
      "The installation is satisfactory",
      "Potentially dangerous – urgent remedial action required",
      "Improvement recommended but not dangerous",
      "No further action needed"
    ],
    "correct": "Potentially dangerous – urgent remedial action required",
    "explanation": "C2 identifies a potentially dangerous situation requiring urgent remedial action, though not posing immediate danger.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "In an EICR, what does classification code 'C3' indicate?",
    "options": [
      "Danger present",
      "Improvement recommended",
      "Immediate danger",
      "Non-compliance requiring instant disconnection"
    ],
    "correct": "Improvement recommended",
    "explanation": "C3 indicates an improvement is recommended, but the item does not present a danger and is not classed as a defect requiring urgent action.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of measuring prospective fault current (PFC)?",
    "options": [
      "To size the cable insulation colour",
      "To ensure protective devices have adequate breaking capacity for the maximum fault current that could occur",
      "To check the RCD sensitivity",
      "To measure voltage drop"
    ],
    "correct": "To ensure protective devices have adequate breaking capacity for the maximum fault current that could occur",
    "explanation": "PFC measurement confirms that circuit breakers or fuses can safely interrupt the maximum fault current without failing.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Which test is used to check that conductors are not excessively long, causing voltage drop beyond BS 7671 limits?",
    "options": [
      "Insulation resistance test",
      "Voltage drop calculation/measurement",
      "RCD test",
      "Polarity test"
    ],
    "correct": "Voltage drop calculation/measurement",
    "explanation": "Voltage drop must be calculated or measured to ensure it stays within the limits given in BS 7671 (typically 3% for lighting, 5% for other uses).",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the recommended maximum interval between periodic inspections for a typical domestic installation?",
    "options": [
      "1 year",
      "10 years, or on change of occupancy",
      "50 years",
      "Never required"
    ],
    "correct": "10 years, or on change of occupancy",
    "explanation": "BS 7671 guidance recommends domestic EICRs at intervals of up to 10 years, or sooner on change of occupancy.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of an earthing system in an electrical installation?",
    "options": [
      "To reduce the cost of cabling",
      "To provide a low-resistance path for fault current so protective devices operate and reduce shock risk",
      "To improve lighting brightness",
      "To increase voltage drop"
    ],
    "correct": "To provide a low-resistance path for fault current so protective devices operate and reduce shock risk",
    "explanation": "Earthing provides a path for fault current to return to the source, allowing protective devices to operate quickly and reducing the risk of electric shock.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is main protective bonding intended to do?",
    "options": [
      "Connect extraneous-conductive-parts (e.g. gas and water pipes) to the main earthing terminal to minimise touch voltage during a fault",
      "Provide power to outdoor lighting",
      "Reduce the size of cables needed",
      "Increase circuit resistance"
    ],
    "correct": "Connect extraneous-conductive-parts (e.g. gas and water pipes) to the main earthing terminal to minimise touch voltage during a fault",
    "explanation": "Main bonding connects services such as gas and water pipes to the main earthing terminal so they cannot become live relative to earth during a fault.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is supplementary bonding used for?",
    "options": [
      "Connecting the neutral to earth at the origin",
      "Connecting exposed and/or extraneous-conductive-parts together in locations of increased shock risk, such as bathrooms",
      "Connecting lighting circuits together",
      "Reducing voltage drop in long cable runs"
    ],
    "correct": "Connecting exposed and/or extraneous-conductive-parts together in locations of increased shock risk, such as bathrooms",
    "explanation": "Supplementary bonding reduces touch voltage between simultaneously accessible conductive parts in higher-risk locations.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "In a TN-S earthing system, where does the earth path return to the source?",
    "options": [
      "Via a separate metallic earth conductor, often the cable sheath, back to the supply transformer",
      "Via the general mass of earth only",
      "Via the neutral conductor combined with earth",
      "There is no earth path"
    ],
    "correct": "Via a separate metallic earth conductor, often the cable sheath, back to the supply transformer",
    "explanation": "In TN-S systems the earth (protective) conductor is separate from the neutral for its entire length back to the source.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "In a TN-C-S (PME) earthing system, what is combined for part of the distribution?",
    "options": [
      "Line and neutral",
      "Neutral and earth (combined as a PEN conductor)",
      "Two line conductors",
      "Earth and bonding only"
    ],
    "correct": "Neutral and earth (combined as a PEN conductor)",
    "explanation": "TN-C-S systems combine neutral and earth as a single PEN conductor for part of the system, then separate them at the installation.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "In a TT earthing system, how is the installation earthed?",
    "options": [
      "Via a metallic connection back to the supply transformer",
      "Via a local earth electrode installed by the customer, through the general mass of earth",
      "There is no earthing required",
      "Via the neutral conductor only"
    ],
    "correct": "Via a local earth electrode installed by the customer, through the general mass of earth",
    "explanation": "TT systems rely on a local earth electrode at the installation, with the earth fault path returning through the general mass of earth.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "Why is RCD protection typically essential on TT systems?",
    "options": [
      "Because earth loop impedance is often too high for overcurrent devices to disconnect quickly enough on an earth fault",
      "Because TT systems have no neutral",
      "Because TT systems only supply lighting",
      "RCDs are not required on TT systems"
    ],
    "correct": "Because earth loop impedance is often too high for overcurrent devices to disconnect quickly enough on an earth fault",
    "explanation": "The higher and less predictable earth loop impedance in TT systems usually means overcurrent devices alone cannot guarantee fast enough disconnection, so RCDs are essential.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is the function of the Main Earthing Terminal (MET)?",
    "options": [
      "To connect all earthing and bonding conductors together at a single accessible point",
      "To supply power to the consumer unit",
      "To act as the main switch",
      "To measure insulation resistance"
    ],
    "correct": "To connect all earthing and bonding conductors together at a single accessible point",
    "explanation": "The MET is the point where the earthing conductor, bonding conductors and circuit protective conductors are all connected together.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What minimum cross-sectional area is typically used for a main protective bonding conductor connected to a TN-C-S supply (using the standard table method)?",
    "options": [
      "1.0mm²",
      "10mm² (based on the neutral conductor size, per BS 7671 table)",
      "0.5mm²",
      "35mm² always regardless of supply"
    ],
    "correct": "10mm² (based on the neutral conductor size, per BS 7671 table)",
    "explanation": "BS 7671 gives a table linking the neutral conductor's cross-sectional area to the minimum main bonding conductor size, commonly 10mm² for typical domestic supplies.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What colour/marking identifies an earthing or bonding conductor?",
    "options": [
      "Green and yellow, or unsleeved with green/yellow sleeving at terminations",
      "Blue",
      "Brown",
      "Black"
    ],
    "correct": "Green and yellow, or unsleeved with green/yellow sleeving at terminations",
    "explanation": "Earth conductors are identified with green and yellow insulation, or bare conductors sleeved green/yellow at their ends.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is the main function of a fuse or circuit breaker?",
    "options": [
      "To provide overcurrent protection by disconnecting the circuit if current exceeds a safe level",
      "To detect earth leakage current",
      "To reduce voltage",
      "To improve power factor"
    ],
    "correct": "To provide overcurrent protection by disconnecting the circuit if current exceeds a safe level",
    "explanation": "Fuses and circuit breakers protect cables and equipment from damage due to overload or short-circuit current by disconnecting the supply.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does an RCD (Residual Current Device) primarily protect against?",
    "options": [
      "Overload current only",
      "Earth leakage/fault current, reducing risk of electric shock and fire",
      "Overvoltage",
      "Under-voltage"
    ],
    "correct": "Earth leakage/fault current, reducing risk of electric shock and fire",
    "explanation": "An RCD monitors for an imbalance between line and neutral current, indicating leakage to earth, and disconnects quickly to reduce shock risk.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is the typical trip rating of an RCD used for additional protection against electric shock?",
    "options": [
      "500mA",
      "30mA or less",
      "100A",
      "1000mA"
    ],
    "correct": "30mA or less",
    "explanation": "A 30mA (or lower) RCD is generally required for additional protection against electric shock in specified circuits, such as socket outlets and bathroom circuits.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does the letter 'B' indicate on a Type B miniature circuit breaker (MCB)?",
    "options": [
      "Its breaking capacity in kA",
      "Its instantaneous tripping current is 3 to 5 times its rated current",
      "It is only for lighting circuits",
      "It has RCD protection built in"
    ],
    "correct": "Its instantaneous tripping current is 3 to 5 times its rated current",
    "explanation": "Type B MCBs trip instantaneously between 3 and 5 times their rated current, suited to circuits with low inrush current such as domestic sockets and lighting.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does the letter 'C' indicate on a Type C MCB?",
    "options": [
      "It trips instantaneously between 5 and 10 times rated current, suiting circuits with higher inrush currents",
      "It only protects against earth faults",
      "It is used only in extra-low voltage circuits",
      "It never trips"
    ],
    "correct": "It trips instantaneously between 5 and 10 times rated current, suiting circuits with higher inrush currents",
    "explanation": "Type C MCBs are used where higher inrush currents occur, such as motors or fluorescent lighting, tripping between 5 and 10 times rated current.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is an RCBO?",
    "options": [
      "A device combining overcurrent protection and residual current protection for a single circuit",
      "A type of cable",
      "A test instrument",
      "A type of socket outlet"
    ],
    "correct": "A device combining overcurrent protection and residual current protection for a single circuit",
    "explanation": "An RCBO (Residual Current Breaker with Overload protection) combines the functions of an MCB and an RCD in one device, protecting an individual circuit from both overload and earth faults.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why might a single RCD protecting an entire consumer unit cause unwanted (nuisance) tripping?",
    "options": [
      "Because small leakage currents from multiple circuits can add up and exceed the trip threshold",
      "Because RCDs cannot be used in consumer units",
      "Because RCDs only work on DC",
      "Because MCBs interfere with RCDs"
    ],
    "correct": "Because small leakage currents from multiple circuits can add up and exceed the trip threshold",
    "explanation": "Cumulative leakage currents from several circuits sharing one RCD can add together and cause the device to trip even without a genuine fault, hence split-load or RCBO arrangements are often preferred.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is a 'discrimination' (selectivity) issue between protective devices?",
    "options": [
      "Choosing cable colours",
      "Ensuring only the device nearest a fault operates, not the upstream device, so the rest of the installation stays live",
      "Testing insulation resistance",
      "Sizing a consumer unit"
    ],
    "correct": "Ensuring only the device nearest a fault operates, not the upstream device, so the rest of the installation stays live",
    "explanation": "Discrimination/selectivity ensures a fault trips only the local protective device, minimising disruption to unaffected parts of the installation.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does the breaking capacity (kA rating) of a protective device indicate?",
    "options": [
      "The maximum voltage it can handle",
      "The maximum fault current it can safely interrupt without damage",
      "The number of poles it has",
      "Its physical size"
    ],
    "correct": "The maximum fault current it can safely interrupt without damage",
    "explanation": "Breaking capacity is the maximum prospective fault current a device can safely interrupt without being damaged or failing dangerously.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is the purpose of a surge protection device (SPD) in an installation?",
    "options": [
      "To protect against transient overvoltages, e.g. from lightning or switching",
      "To protect against overload current",
      "To measure earth resistance",
      "To provide RCD protection"
    ],
    "correct": "To protect against transient overvoltages, e.g. from lightning or switching",
    "explanation": "SPDs limit transient overvoltages that could otherwise damage sensitive electronic equipment, and BS 7671 requires a risk assessment for their use.",
    "topic": "Protective Devices"
  },
  {
    "text": "Which type of RCD provides protection against both AC residual currents and pulsating DC residual currents?",
    "options": [
      "Type AC",
      "Type A",
      "Type S only",
      "Type F for motors only"
    ],
    "correct": "Type A",
    "explanation": "Type A RCDs detect both sinusoidal AC residual currents and pulsating DC residual currents, commonly required where equipment such as appliances with electronic components are supplied.",
    "topic": "Protective Devices"
  },
  {
    "text": "According to Ohm's Law, what is the formula for voltage?",
    "options": [
      "V = I / R",
      "V = I x R",
      "V = R / I",
      "V = I + R"
    ],
    "correct": "V = I x R",
    "explanation": "Ohm's Law states that voltage equals current multiplied by resistance (V = IR).",
    "topic": "Electrical Theory"
  },
  {
    "text": "If a circuit has a resistance of 10Ω and a current of 2A flows through it, what is the voltage?",
    "options": [
      "5V",
      "20V",
      "12V",
      "0.2V"
    ],
    "correct": "20V",
    "explanation": "Using V = I x R: V = 2A x 10Ω = 20V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the formula for electrical power in a DC circuit?",
    "options": [
      "P = V / I",
      "P = V x I",
      "P = I / V",
      "P = V - I"
    ],
    "correct": "P = V x I",
    "explanation": "Power (in watts) equals voltage multiplied by current (P = VI) in a simple DC circuit.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A 230V appliance draws a current of 4A. What is its power consumption?",
    "options": [
      "57.5W",
      "920W",
      "234W",
      "460W"
    ],
    "correct": "920W",
    "explanation": "P = V x I = 230V x 4A = 920W.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the unit of electrical resistance?",
    "options": [
      "Volt",
      "Ohm",
      "Ampere",
      "Watt"
    ],
    "correct": "Ohm",
    "explanation": "Electrical resistance is measured in ohms, symbol Ω.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the unit of electrical power?",
    "options": [
      "Volt",
      "Ampere",
      "Watt",
      "Ohm"
    ],
    "correct": "Watt",
    "explanation": "Electrical power is measured in watts (W), where 1 watt equals 1 joule per second.",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a series circuit, how does total resistance relate to individual resistances?",
    "options": [
      "Total resistance equals the sum of individual resistances",
      "Total resistance is the average of individual resistances",
      "Total resistance decreases as more resistors are added",
      "Total resistance is always zero"
    ],
    "correct": "Total resistance equals the sum of individual resistances",
    "explanation": "In a series circuit, resistances simply add together: R_total = R1 + R2 + R3...",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a parallel circuit, what happens to total resistance as more resistors are added?",
    "options": [
      "It increases",
      "It decreases",
      "It stays the same",
      "It becomes infinite"
    ],
    "correct": "It decreases",
    "explanation": "Adding more parallel paths gives current more routes to flow, which reduces the overall (total) resistance of the circuit.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the formula relating power, current and resistance?",
    "options": [
      "P = I² x R",
      "P = I / R",
      "P = R / I²",
      "P = I - R"
    ],
    "correct": "P = I² x R",
    "explanation": "Power can be calculated as P = I²R, derived by substituting V = IR into P = VI.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the formula for power in terms of voltage and resistance?",
    "options": [
      "P = V² / R",
      "P = V x R",
      "P = R / V",
      "P = V - R"
    ],
    "correct": "P = V² / R",
    "explanation": "By substituting I = V/R into P = VI, power can also be expressed as P = V²/R.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'RMS' stand for in relation to AC voltage/current?",
    "options": [
      "Root Mean Square",
      "Rated Maximum Supply",
      "Resistance Measurement System",
      "Relative Magnetic Strength"
    ],
    "correct": "Root Mean Square",
    "explanation": "RMS stands for Root Mean Square, the effective value of an alternating waveform that would produce equivalent heating to a DC value.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the approximate frequency of the UK mains electricity supply?",
    "options": [
      "25Hz",
      "50Hz",
      "100Hz",
      "60Hz"
    ],
    "correct": "50Hz",
    "explanation": "The UK mains supply operates at a nominal frequency of 50Hz.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the nominal voltage of a standard UK single-phase domestic supply?",
    "options": [
      "110V",
      "230V",
      "400V",
      "12V"
    ],
    "correct": "230V",
    "explanation": "UK single-phase domestic supplies have a nominal voltage of 230V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the nominal line voltage of a standard UK three-phase supply?",
    "options": [
      "230V",
      "400V",
      "690V",
      "110V"
    ],
    "correct": "400V",
    "explanation": "A standard UK three-phase supply has a nominal line-to-line voltage of 400V (230V line-to-neutral).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the relationship between line voltage and phase voltage in a balanced three-phase star system?",
    "options": [
      "Line voltage = phase voltage x √3",
      "Line voltage = phase voltage / √3",
      "Line voltage = phase voltage",
      "Line voltage = phase voltage x 3"
    ],
    "correct": "Line voltage = phase voltage x √3",
    "explanation": "In a star-connected three-phase system, line voltage equals phase voltage multiplied by the square root of 3 (approximately 1.732).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is capacitance measured in?",
    "options": [
      "Henries",
      "Farads",
      "Ohms",
      "Watts"
    ],
    "correct": "Farads",
    "explanation": "Capacitance is measured in farads (F), though practical values are often in microfarads (µF).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is inductance measured in?",
    "options": [
      "Farads",
      "Henries",
      "Ohms",
      "Volts"
    ],
    "correct": "Henries",
    "explanation": "Inductance is measured in henries (H).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the effect of adding a capacitor in parallel with an inductive load such as a motor?",
    "options": [
      "It increases the power factor towards unity by reducing reactive current drawn from the supply",
      "It increases resistance",
      "It reduces voltage to zero",
      "It has no electrical effect"
    ],
    "correct": "It increases the power factor towards unity by reducing reactive current drawn from the supply",
    "explanation": "Power factor correction capacitors offset the lagging reactive power of inductive loads, improving the overall power factor.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does a low power factor indicate?",
    "options": [
      "The load uses current efficiently in phase with voltage",
      "A larger phase difference between voltage and current, meaning more current is needed for the same real power",
      "The supply voltage is too high",
      "The frequency is incorrect"
    ],
    "correct": "A larger phase difference between voltage and current, meaning more current is needed for the same real power",
    "explanation": "A low power factor means voltage and current are out of phase, requiring more current (and larger cables/switchgear) to deliver the same useful power.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does Kirchhoff's Current Law state?",
    "options": [
      "The sum of currents entering a junction equals the sum of currents leaving it",
      "Voltage is always constant in a circuit",
      "Resistance never changes with temperature",
      "Current flows only in one direction"
    ],
    "correct": "The sum of currents entering a junction equals the sum of currents leaving it",
    "explanation": "Kirchhoff's Current Law is based on conservation of charge: total current into a junction equals total current out of it.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does Kirchhoff's Voltage Law state?",
    "options": [
      "The sum of all voltages around a closed loop is zero",
      "Current is constant throughout a series circuit only",
      "Resistance always increases with current",
      "Power is always positive"
    ],
    "correct": "The sum of all voltages around a closed loop is zero",
    "explanation": "Kirchhoff's Voltage Law is based on conservation of energy: the sum of EMFs equals the sum of voltage drops around any closed loop.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What effect does increasing conductor temperature typically have on its resistance (for common conductor materials like copper)?",
    "options": [
      "Resistance decreases",
      "Resistance increases",
      "Resistance stays exactly the same",
      "Resistance becomes negative"
    ],
    "correct": "Resistance increases",
    "explanation": "For most metallic conductors such as copper, resistance increases as temperature rises, due to increased atomic vibration impeding electron flow.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the correct unit for electrical charge?",
    "options": [
      "Coulomb",
      "Watt",
      "Ohm",
      "Henry"
    ],
    "correct": "Coulomb",
    "explanation": "Electrical charge is measured in coulombs (C).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What formula links charge, current and time?",
    "options": [
      "Q = I x t",
      "Q = I / t",
      "Q = t / I",
      "Q = I - t"
    ],
    "correct": "Q = I x t",
    "explanation": "Charge equals current multiplied by time (Q = It), where Q is in coulombs, I in amps, t in seconds.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the purpose of a step-down transformer?",
    "options": [
      "To increase voltage and decrease current",
      "To decrease voltage and increase current, for a given power (ignoring losses)",
      "To convert AC to DC",
      "To store electrical energy"
    ],
    "correct": "To decrease voltage and increase current, for a given power (ignoring losses)",
    "explanation": "A step-down transformer reduces voltage while increasing current proportionally, keeping power roughly constant (minus losses).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the transformer turns ratio if the primary has 1000 turns and the secondary has 100 turns?",
    "options": [
      "1:10",
      "10:1",
      "1:100",
      "100:1"
    ],
    "correct": "10:1",
    "explanation": "Turns ratio = primary turns : secondary turns = 1000:100 = 10:1, meaning the secondary voltage is one-tenth of the primary.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is meant by 'diversity' when designing an electrical installation?",
    "options": [
      "Using different cable colours",
      "Recognising that not all loads will operate at maximum demand simultaneously, allowing smaller supply/cable sizing",
      "Installing multiple RCDs",
      "Using different voltage levels"
    ],
    "correct": "Recognising that not all loads will operate at maximum demand simultaneously, allowing smaller supply/cable sizing",
    "explanation": "Diversity accounts for the fact that connected loads are rarely all used at full capacity at the same time, so the assessed maximum demand can be less than the sum of all loads.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'maximum demand' refer to in an installation?",
    "options": [
      "The highest current/load likely to be drawn after diversity has been applied",
      "The rated current of the main fuse only",
      "The total connected load with no diversity applied",
      "The peak voltage of the supply"
    ],
    "correct": "The highest current/load likely to be drawn after diversity has been applied",
    "explanation": "Maximum demand is the anticipated highest load on a system, calculated after applying diversity factors to the connected load.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is a common cause of voltage drop in a cable run?",
    "options": [
      "The resistance of the conductor over its length carrying load current",
      "The colour of the cable insulation",
      "The type of connector used at the socket",
      "The RCD rating"
    ],
    "correct": "The resistance of the conductor over its length carrying load current",
    "explanation": "Voltage drop occurs due to the conductor's resistance (and reactance) as current flows along its length, and increases with cable length and current.",
    "topic": "Electrical Theory"
  },
  {
    "text": "Which of the following would reduce voltage drop in a cable run for a given load?",
    "options": [
      "Using a smaller cross-sectional area cable",
      "Using a larger cross-sectional area cable",
      "Increasing the cable length",
      "Increasing the load current"
    ],
    "correct": "Using a larger cross-sectional area cable",
    "explanation": "A larger cross-sectional area reduces the conductor's resistance, which in turn reduces voltage drop for a given current.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'PVC/PVC twin and earth' cable typically consist of?",
    "options": [
      "Two live conductors only",
      "Line, neutral and circuit protective conductors, individually PVC insulated with an outer PVC sheath (cpc often bare, sleeved at terminations)",
      "A single conductor with steel armour",
      "A fibre optic core"
    ],
    "correct": "Line, neutral and circuit protective conductors, individually PVC insulated with an outer PVC sheath (cpc often bare, sleeved at terminations)",
    "explanation": "Twin and earth cable has insulated line and neutral conductors plus a bare (or reduced) cpc, all within an outer PVC sheath.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is Steel Wire Armoured (SWA) cable commonly used for?",
    "options": [
      "Indoor lighting circuits only",
      "Underground, external, or where mechanical protection of the cable is required",
      "Extra-low voltage doorbells only",
      "Data/telecoms only"
    ],
    "correct": "Underground, external, or where mechanical protection of the cable is required",
    "explanation": "SWA cable provides additional mechanical protection and is commonly used for underground, external or industrial installations.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the purpose of the armour in SWA cable regarding earthing?",
    "options": [
      "It has no earthing function",
      "It can be used as the circuit protective conductor if suitably sized and glanded",
      "It carries the neutral current only",
      "It insulates the cable from moisture only"
    ],
    "correct": "It can be used as the circuit protective conductor if suitably sized and glanded",
    "explanation": "The steel wire armour of SWA cable can serve as the cpc, provided it is correctly terminated with appropriate glands and its capacity is adequate.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does 'FP200' or similar fire-resistant cable typically supply?",
    "options": [
      "General power sockets",
      "Fire alarm systems, emergency lighting, and other life safety circuits that must remain operational during a fire",
      "Outdoor garden lighting only",
      "Data networking only"
    ],
    "correct": "Fire alarm systems, emergency lighting, and other life safety circuits that must remain operational during a fire",
    "explanation": "Fire-resistant cables like FP200 are used for circuits that must continue to operate during a fire, such as fire alarms and emergency lighting.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the purpose of conduit in an electrical installation?",
    "options": [
      "To carry water",
      "To provide mechanical protection and containment for cables",
      "To insulate against voltage only",
      "To replace the need for earthing"
    ],
    "correct": "To provide mechanical protection and containment for cables",
    "explanation": "Conduit systems (steel or PVC) provide mechanical protection for cables and allow for easier future cable replacement.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is trunking used for in an installation?",
    "options": [
      "Testing insulation resistance",
      "Enclosing and supporting groups of cables, often with removable lids for access",
      "Measuring earth resistance",
      "Producing electricity"
    ],
    "correct": "Enclosing and supporting groups of cables, often with removable lids for access",
    "explanation": "Trunking is a containment system, typically with a removable lid, used to support and protect groups of cables.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What derating factor consideration applies when several cables are bunched together?",
    "options": [
      "No derating is ever required",
      "Grouping factors must be applied as cables bunched together retain heat more, reducing current-carrying capacity",
      "Cables must always be run singly",
      "Grouping increases current-carrying capacity"
    ],
    "correct": "Grouping factors must be applied as cables bunched together retain heat more, reducing current-carrying capacity",
    "explanation": "When cables are grouped together, heat dissipation is reduced, so a grouping (rating) factor must be applied to reduce the tabulated current-carrying capacity.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What effect does high ambient temperature have on cable current-carrying capacity?",
    "options": [
      "It increases current-carrying capacity",
      "It reduces current-carrying capacity, requiring an ambient temperature correction factor",
      "It has no effect",
      "It only affects DC circuits"
    ],
    "correct": "It reduces current-carrying capacity, requiring an ambient temperature correction factor",
    "explanation": "Higher ambient temperatures reduce a cable's ability to dissipate heat, so its rated current-carrying capacity must be reduced using correction factors.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the purpose of cable colour coding for line conductors in a three-phase system (post-2004 harmonisation)?",
    "options": [
      "Brown, black, grey for L1, L2, L3",
      "All conductors are the same colour",
      "Red, yellow, blue for L1, L2, L3",
      "Green for all phases"
    ],
    "correct": "Brown, black, grey for L1, L2, L3",
    "explanation": "Under the harmonised colour code, three-phase line conductors are identified as L1 brown, L2 black, L3 grey.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What was the pre-2004 (old) UK colour for the line conductor in single-phase cable?",
    "options": [
      "Blue",
      "Red",
      "Black",
      "Green and yellow"
    ],
    "correct": "Red",
    "explanation": "Prior to harmonisation in 2004, the line conductor in the old UK colour code was red (now brown).",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What was the pre-2004 (old) UK colour for the neutral conductor?",
    "options": [
      "Black",
      "Blue",
      "Brown",
      "Grey"
    ],
    "correct": "Black",
    "explanation": "Prior to harmonisation, the neutral conductor was coloured black in the old UK system (now blue).",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is a common maximum current rating consideration for 2.5mm² twin and earth cable clipped direct, in typical domestic ring final circuit installation conditions?",
    "options": [
      "Around 20-27A depending on installation method and correction factors",
      "1A",
      "100A",
      "500A"
    ],
    "correct": "Around 20-27A depending on installation method and correction factors",
    "explanation": "2.5mm² T&E cable typically has a current-carrying capacity in the region of the mid-20 amps range clipped direct, though this depends on installation method and correction factors — exact values are taken from BS 7671 tables.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why must cables be adequately supported at intervals along their run?",
    "options": [
      "To improve appearance only",
      "To prevent mechanical damage/strain on terminations and conductors over time",
      "To increase voltage drop",
      "It is not a requirement"
    ],
    "correct": "To prevent mechanical damage/strain on terminations and conductors over time",
    "explanation": "Adequate support prevents sagging, strain on terminations, and mechanical damage to the cable over its service life.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does the term 'IP rating' describe for enclosures and accessories?",
    "options": [
      "The current rating of an installation",
      "The degree of protection against ingress of solids and liquids",
      "The insulation resistance value",
      "The RCD sensitivity"
    ],
    "correct": "The degree of protection against ingress of solids and liquids",
    "explanation": "IP (Ingress Protection) ratings, e.g. IP65, describe an enclosure's protection level against solid objects/dust and water ingress.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does the first digit in an IP rating (e.g. the '6' in IP65) indicate?",
    "options": [
      "Protection against liquids",
      "Protection against solid objects and dust",
      "The voltage rating",
      "The current rating"
    ],
    "correct": "Protection against solid objects and dust",
    "explanation": "The first digit of an IP rating indicates protection against solid objects, with 6 meaning fully dust-tight.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does the second digit in an IP rating (e.g. the '5' in IP65) indicate?",
    "options": [
      "Protection against solids",
      "Protection against water/moisture ingress",
      "Mechanical impact resistance",
      "Fire resistance"
    ],
    "correct": "Protection against water/moisture ingress",
    "explanation": "The second digit indicates the level of protection against water ingress, with 5 meaning protected against water jets.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why are zones used when installing electrical accessories in bathrooms (BS 7671 Section 701)?",
    "options": [
      "To define permitted locations and IP rating requirements based on proximity to water sources like baths and showers",
      "To indicate decoration colour schemes",
      "To determine cable cost",
      "To set the water temperature"
    ],
    "correct": "To define permitted locations and IP rating requirements based on proximity to water sources like baths and showers",
    "explanation": "Bathroom zones classify areas by proximity to water sources, dictating which equipment can be installed and to what IP rating.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Before using a portable power tool on site, what should always be checked?",
    "options": [
      "Only that it is the right colour",
      "That it has a valid PAT test/inspection, and is visually free from damage to the case, plug and cable",
      "That it is the newest model available",
      "Nothing, tools are always safe"
    ],
    "correct": "That it has a valid PAT test/inspection, and is visually free from damage to the case, plug and cable",
    "explanation": "A visual check plus confirmation of a current PAT (portable appliance test) label helps ensure a tool is safe to use before each use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What voltage is commonly used for portable power tools on construction sites for safety, via a transformer?",
    "options": [
      "230V",
      "110V (centre-tapped to earth, giving max 55V to earth in a fault)",
      "400V",
      "12V only"
    ],
    "correct": "110V (centre-tapped to earth, giving max 55V to earth in a fault)",
    "explanation": "110V site supply, centre-tapped to earth, limits the voltage to earth to around 55V in the event of a fault, reducing shock severity.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What colour is a 110V site transformer/plug typically identified by?",
    "options": [
      "Blue",
      "Yellow",
      "Red",
      "Green"
    ],
    "correct": "Yellow",
    "explanation": "110V equipment and plugs are commonly colour-coded yellow to distinguish them from other voltage systems on site.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What colour identifies 230V site equipment plugs?",
    "options": [
      "Yellow",
      "Blue",
      "Red",
      "White"
    ],
    "correct": "Blue",
    "explanation": "230V single-phase site equipment plugs are typically colour-coded blue.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What colour identifies 400V three-phase site equipment plugs?",
    "options": [
      "Yellow",
      "Blue",
      "Red",
      "Black"
    ],
    "correct": "Red",
    "explanation": "400V three-phase site equipment plugs are typically colour-coded red.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why is a residual current device (RCD) often used with 230V portable tools on site even when using 110V is not practical?",
    "options": [
      "To improve tool speed",
      "To reduce the risk of severe electric shock from earth faults, since mains voltage carries greater shock risk than reduced voltage",
      "To increase cable length",
      "RCDs are never used with portable tools"
    ],
    "correct": "To reduce the risk of severe electric shock from earth faults, since mains voltage carries greater shock risk than reduced voltage",
    "explanation": "Where 230V tools must be used, an RCD provides additional protection against electric shock from earth faults.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What should be checked on an extension lead before use?",
    "options": [
      "Only the plug colour",
      "That it is fully unwound (to prevent overheating), and the cable, plug and socket are undamaged",
      "That it matches the wall paint",
      "Nothing needs checking"
    ],
    "correct": "That it is fully unwound (to prevent overheating), and the cable, plug and socket are undamaged",
    "explanation": "Extension leads should be fully uncoiled before use to prevent heat build-up, and inspected for damage.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is the purpose of PAT testing (Portable Appliance Testing)?",
    "options": [
      "To check the appearance of equipment",
      "To verify electrical safety of portable appliances through visual inspection and electrical tests",
      "To measure room temperature",
      "To calibrate power tools for accuracy"
    ],
    "correct": "To verify electrical safety of portable appliances through visual inspection and electrical tests",
    "explanation": "PAT testing combines a visual inspection with electrical tests (such as earth continuity and insulation resistance) to confirm an appliance is safe to use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What class of appliance relies on double or reinforced insulation rather than an earth connection for safety?",
    "options": [
      "Class I",
      "Class II",
      "Class III",
      "Class 0"
    ],
    "correct": "Class II",
    "explanation": "Class II (double insulated) appliances do not require an earth connection because they rely on double or reinforced insulation, and are marked with a double square symbol.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What class of appliance relies on an earth connection as part of its protection against electric shock?",
    "options": [
      "Class I",
      "Class II",
      "Class III",
      "Class IV"
    ],
    "correct": "Class I",
    "explanation": "Class I appliances have basic insulation plus a protective earth connection to the exposed metal parts, providing a path for fault current.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is Class III equipment designed to operate at?",
    "options": [
      "Mains voltage 230V",
      "Safety extra-low voltage (SELV), typically 50V AC or less",
      "400V three-phase",
      "There is no defined voltage limit"
    ],
    "correct": "Safety extra-low voltage (SELV), typically 50V AC or less",
    "explanation": "Class III equipment is designed to be supplied from a SELV source, reducing shock risk due to the low voltage involved.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why should hand tools with damaged or missing insulated handles be taken out of use?",
    "options": [
      "They look untidy",
      "Damaged insulation increases the risk of electric shock when working near live parts",
      "They will rust faster",
      "There is no safety concern"
    ],
    "correct": "Damaged insulation increases the risk of electric shock when working near live parts",
    "explanation": "Insulated handles on tools such as screwdrivers help protect against shock; damage compromises this protection.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What should be done with a faulty power tool found on site?",
    "options": [
      "Continue using it carefully",
      "Take it out of service immediately, label it as faulty, and report it",
      "Hide it so others do not use it without reporting",
      "Try to fix it yourself if untrained"
    ],
    "correct": "Take it out of service immediately, label it as faulty, and report it",
    "explanation": "Faulty equipment should be removed from use, clearly labelled, and reported so it can be repaired or replaced safely.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Under PPE regulations, who is generally responsible for providing PPE required for work?",
    "options": [
      "The employee, at their own cost",
      "The employer, free of charge, where risks cannot be adequately controlled by other means",
      "The client only",
      "PPE is optional and not required by law"
    ],
    "correct": "The employer, free of charge, where risks cannot be adequately controlled by other means",
    "explanation": "The Personal Protective Equipment at Work Regulations require employers to provide suitable PPE free of charge where risks cannot be adequately controlled by other means.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the correct order of control measures in the hierarchy of risk control (before PPE)?",
    "options": [
      "PPE first, then everything else",
      "Eliminate, substitute, engineering controls, administrative controls, then PPE as a last resort",
      "PPE is always the first choice",
      "There is no defined hierarchy"
    ],
    "correct": "Eliminate, substitute, engineering controls, administrative controls, then PPE as a last resort",
    "explanation": "The hierarchy of control places PPE as the last resort, after attempts to eliminate, substitute, or control the hazard by other means.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What should be checked before manually lifting a heavy load?",
    "options": [
      "Only the destination point",
      "The weight, size, shape of the load, the route, and your own capability, using a risk assessment (e.g. TILE)",
      "Nothing, just lift it",
      "Only whether gloves are being worn"
    ],
    "correct": "The weight, size, shape of the load, the route, and your own capability, using a risk assessment (e.g. TILE)",
    "explanation": "A manual handling assessment (often remembered as TILE: Task, Individual, Load, Environment) should be considered before lifting.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What does the acronym TILE stand for in manual handling risk assessment?",
    "options": [
      "Task, Individual, Load, Environment",
      "Time, Injury, Location, Equipment",
      "Training, Inspection, Lifting, Evaluation",
      "Tools, Instruction, Labour, Ergonomics"
    ],
    "correct": "Task, Individual, Load, Environment",
    "explanation": "TILE is a common framework for assessing manual handling risks: the Task, the Individual, the Load, and the Environment.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the correct basic technique when lifting a load from the ground?",
    "options": [
      "Bend at the waist with straight legs",
      "Keep the back straight, bend the knees, keep the load close to the body, and lift smoothly",
      "Twist the body while lifting",
      "Lift as fast as possible"
    ],
    "correct": "Keep the back straight, bend the knees, keep the load close to the body, and lift smoothly",
    "explanation": "Good lifting technique involves bending the knees (not the back), keeping the load close to the body, and avoiding twisting while lifting.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why should twisting the body while carrying a load be avoided?",
    "options": [
      "It looks unprofessional",
      "It significantly increases the risk of back injury",
      "It slows down the task unnecessarily",
      "It has no effect on injury risk"
    ],
    "correct": "It significantly increases the risk of back injury",
    "explanation": "Twisting while lifting or carrying puts uneven strain on the spine and greatly increases the risk of back injury.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What type of PPE would typically be required when using an angle grinder to cut metal?",
    "options": [
      "No PPE is required",
      "Eye protection, hearing protection, and possibly gloves/protective clothing depending on the risk assessment",
      "Only a hard hat",
      "Only steel toe boots"
    ],
    "correct": "Eye protection, hearing protection, and possibly gloves/protective clothing depending on the risk assessment",
    "explanation": "Angle grinding produces sparks, debris and noise, so appropriate eye and hearing protection (and other PPE per the risk assessment) is required.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the purpose of safety footwear with a steel/composite toe cap on a construction site?",
    "options": [
      "To look professional",
      "To protect the feet from impact and compression injuries, e.g. from falling objects",
      "To increase height",
      "To improve grip only, with no protective function"
    ],
    "correct": "To protect the feet from impact and compression injuries, e.g. from falling objects",
    "explanation": "Protective footwear with reinforced toe caps guards against crush and impact injuries common on construction sites.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "When should high-visibility clothing typically be worn on a construction site?",
    "options": [
      "Only at night",
      "Whenever moving vehicles or plant are present, or as specified by the site rules",
      "Never, it is optional everywhere",
      "Only by supervisors"
    ],
    "correct": "Whenever moving vehicles or plant are present, or as specified by the site rules",
    "explanation": "Hi-vis clothing makes workers visible to plant operators and drivers and is typically required across most active construction sites.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What should be done if PPE provided does not fit properly?",
    "options": [
      "Wear it anyway as it is better than nothing",
      "Report it and request a correctly fitting replacement, since ill-fitting PPE may not provide adequate protection",
      "Modify it yourself with tools",
      "Stop wearing PPE altogether"
    ],
    "correct": "Report it and request a correctly fitting replacement, since ill-fitting PPE may not provide adequate protection",
    "explanation": "PPE must fit the wearer correctly to be effective; ill-fitting equipment should be reported and replaced.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is a mechanical aid that can reduce manual handling risk when moving heavy materials around a site?",
    "options": [
      "Ignoring the load",
      "A sack truck, trolley or hoist",
      "Wearing thinner gloves",
      "Working alone"
    ],
    "correct": "A sack truck, trolley or hoist",
    "explanation": "Mechanical aids such as sack trucks, trolleys, or hoists reduce the physical strain and risk associated with manual handling.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What colour band identifies a water fire extinguisher?",
    "options": [
      "Red (whole body)",
      "Blue",
      "Black",
      "Cream"
    ],
    "correct": "Red (whole body)",
    "explanation": "Water fire extinguishers are identified by an all-red body, suitable for Class A (solid material) fires.",
    "topic": "Fire Safety"
  },
  {
    "text": "What colour band identifies a CO2 fire extinguisher?",
    "options": [
      "Black",
      "Blue",
      "Cream",
      "Green"
    ],
    "correct": "Black",
    "explanation": "CO2 extinguishers have a black colour band and are suitable for electrical fires as they leave no residue.",
    "topic": "Fire Safety"
  },
  {
    "text": "What colour band identifies a foam fire extinguisher?",
    "options": [
      "Cream",
      "Yellow",
      "Black",
      "Green"
    ],
    "correct": "Cream",
    "explanation": "Foam extinguishers have a cream colour band and are suitable for Class A and Class B (flammable liquid) fires.",
    "topic": "Fire Safety"
  },
  {
    "text": "What colour band identifies a dry powder fire extinguisher?",
    "options": [
      "Blue",
      "Black",
      "Red",
      "Cream"
    ],
    "correct": "Blue",
    "explanation": "Dry powder extinguishers have a blue colour band and can be used on multiple fire classes including some electrical fires.",
    "topic": "Fire Safety"
  },
  {
    "text": "Which type of fire extinguisher should NOT be used on an electrical fire due to conductivity risk?",
    "options": [
      "CO2",
      "Dry powder (ABC type, with caution)",
      "Water",
      "All are equally safe on electrical fires"
    ],
    "correct": "Water",
    "explanation": "Water conducts electricity, so water extinguishers must never be used on live electrical fires due to the risk of electric shock.",
    "topic": "Fire Safety"
  },
  {
    "text": "What class of fire involves flammable gases such as methane or propane?",
    "options": [
      "Class A",
      "Class C",
      "Class B",
      "Class D"
    ],
    "correct": "Class C",
    "explanation": "Class C fires involve flammable gases; special precautions and appropriate extinguishing methods are required.",
    "topic": "Fire Safety"
  },
  {
    "text": "What class of fire involves flammable metals such as magnesium?",
    "options": [
      "Class A",
      "Class B",
      "Class D",
      "Class F"
    ],
    "correct": "Class D",
    "explanation": "Class D fires involve combustible metals and require specialist dry powder extinguishing agents, not water.",
    "topic": "Fire Safety"
  },
  {
    "text": "What class of fire involves cooking oils and fats?",
    "options": [
      "Class A",
      "Class F",
      "Class C",
      "Class D"
    ],
    "correct": "Class F",
    "explanation": "Class F fires involve cooking oils and fats and require a specialist fire blanket or wet chemical extinguisher.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is the correct action on discovering a fire on site?",
    "options": [
      "Try to fight it regardless of size or training",
      "Raise the alarm, evacuate if necessary following site procedures, and call emergency services",
      "Ignore it if it looks small",
      "Continue working nearby"
    ],
    "correct": "Raise the alarm, evacuate if necessary following site procedures, and call emergency services",
    "explanation": "The standard response to discovering a fire is to raise the alarm immediately and follow the site's emergency evacuation procedure, calling the fire service.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is the purpose of a fire assembly point?",
    "options": [
      "A place to store fire extinguishers",
      "A designated safe location where evacuated personnel gather so a headcount can confirm everyone is accounted for",
      "The location of the fire itself",
      "A storage area for flammable materials"
    ],
    "correct": "A designated safe location where evacuated personnel gather so a headcount can confirm everyone is accounted for",
    "explanation": "The fire assembly point allows a roll call/headcount to ensure everyone has safely evacuated the building or site.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is the 'fire triangle' made up of?",
    "options": [
      "Heat, fuel, oxygen",
      "Water, air, earth",
      "Smoke, flame, ash",
      "Voltage, current, resistance"
    ],
    "correct": "Heat, fuel, oxygen",
    "explanation": "The fire triangle represents the three elements needed for combustion: heat, fuel and oxygen; removing any one extinguishes the fire.",
    "topic": "Fire Safety"
  },
  {
    "text": "What should you do before opening a closed door during a fire evacuation?",
    "options": [
      "Open it quickly without checking",
      "Feel the door/handle for heat; if hot, do not open it and find an alternative route",
      "Kick it down immediately",
      "Always assume it is safe"
    ],
    "correct": "Feel the door/handle for heat; if hot, do not open it and find an alternative route",
    "explanation": "Checking a door for heat before opening it helps avoid releasing a fire or hot gases into an escape route.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is a 'hot work permit' typically required for?",
    "options": [
      "Routine desk-based tasks",
      "Activities such as welding, grinding or soldering that could create a fire risk",
      "Cleaning tasks only",
      "Office admin work"
    ],
    "correct": "Activities such as welding, grinding or soldering that could create a fire risk",
    "explanation": "A hot works permit ensures that fire risks from activities like welding, cutting or soldering are controlled, e.g. via fire watches and clearing combustibles.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why is it important to keep fire exits and escape routes clear at all times?",
    "options": [
      "It looks tidy",
      "To ensure people can evacuate quickly and safely in an emergency",
      "It is only relevant to health and safety inspectors",
      "Fire exits do not need to be kept clear"
    ],
    "correct": "To ensure people can evacuate quickly and safely in an emergency",
    "explanation": "Blocked fire exits or escape routes can seriously delay evacuation and put lives at risk during an emergency.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is a fire blanket typically used for?",
    "options": [
      "Smothering small fires, such as pan fires, by excluding oxygen",
      "Cleaning up spills",
      "Wrapping cables",
      "Insulating walls"
    ],
    "correct": "Smothering small fires, such as pan fires, by excluding oxygen",
    "explanation": "A fire blanket smothers a fire by cutting off its oxygen supply, and is commonly used for small pan/clothing fires.",
    "topic": "Fire Safety"
  },
  {
    "text": "Before using a hazardous substance at work, what should be consulted?",
    "options": [
      "Nothing, just use it",
      "The COSHH data sheet/risk assessment for that substance",
      "Only the price label",
      "The delivery note"
    ],
    "correct": "The COSHH data sheet/risk assessment for that substance",
    "explanation": "A COSHH assessment/safety data sheet identifies the hazards of a substance and the precautions needed before use.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What can prolonged exposure to solvents and certain fumes on site cause?",
    "options": [
      "Improved health",
      "Respiratory problems, skin conditions, or other long-term health effects",
      "No effect whatsoever",
      "Only minor cosmetic issues"
    ],
    "correct": "Respiratory problems, skin conditions, or other long-term health effects",
    "explanation": "Many solvents, dusts and fumes encountered on site can cause serious short and long-term health effects if exposure is not controlled.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is the purpose of local exhaust ventilation (LEV) in relation to hazardous substances?",
    "options": [
      "To heat the work area",
      "To capture and remove hazardous fumes, dust or vapour at source before they are inhaled",
      "To increase noise levels",
      "To store chemicals safely"
    ],
    "correct": "To capture and remove hazardous fumes, dust or vapour at source before they are inhaled",
    "explanation": "LEV systems extract contaminants close to the source of generation, reducing worker exposure to hazardous substances.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is the main health risk associated with exposure to asbestos fibres?",
    "options": [
      "Minor skin irritation only",
      "Serious lung diseases including asbestosis, mesothelioma and lung cancer, often with a long latency period",
      "No health risk if inhaled briefly",
      "Only affects eyesight"
    ],
    "correct": "Serious lung diseases including asbestosis, mesothelioma and lung cancer, often with a long latency period",
    "explanation": "Inhaling asbestos fibres can cause serious, often fatal, lung diseases that may not appear until decades after exposure.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What should you do if you suspect you have discovered asbestos-containing material during work?",
    "options": [
      "Continue working and disturb it as needed",
      "Stop work immediately, avoid disturbing it, and report it following site procedures",
      "Remove it yourself immediately",
      "Sweep it up with a dry brush"
    ],
    "correct": "Stop work immediately, avoid disturbing it, and report it following site procedures",
    "explanation": "Suspected asbestos should not be disturbed; work should stop and the material reported so it can be properly assessed by a competent person.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why is good welfare provision (toilets, washing facilities, rest areas) important on a construction site?",
    "options": [
      "It is not a legal requirement",
      "It supports workers' health, hygiene and wellbeing, and is a legal requirement under welfare regulations",
      "It only benefits visitors",
      "It is purely a decorative feature"
    ],
    "correct": "It supports workers' health, hygiene and wellbeing, and is a legal requirement under welfare regulations",
    "explanation": "Adequate welfare facilities are a legal requirement and support the health, hygiene and general wellbeing of the workforce.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is Hand-Arm Vibration Syndrome (HAVS) caused by?",
    "options": [
      "Prolonged exposure to noise",
      "Prolonged use of vibrating tools such as drills, breakers or grinders",
      "Poor lighting",
      "Manual lifting"
    ],
    "correct": "Prolonged use of vibrating tools such as drills, breakers or grinders",
    "explanation": "HAVS is caused by regular, prolonged exposure to hand-transmitted vibration from tools and equipment, potentially causing permanent nerve and blood vessel damage.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is noise-induced hearing loss primarily caused by?",
    "options": [
      "Exposure to excessive noise levels over time without adequate hearing protection",
      "Poor diet",
      "Standing for long periods",
      "Using computers"
    ],
    "correct": "Exposure to excessive noise levels over time without adequate hearing protection",
    "explanation": "Repeated or prolonged exposure to high noise levels can cause permanent hearing damage if adequate hearing protection is not used.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What does the Control of Noise at Work Regulations set out?",
    "options": [
      "Exposure action and limit values requiring employers to assess and control noise risks",
      "Only guidance for office workers",
      "Rules about music played on site radios",
      "Nothing relevant to construction"
    ],
    "correct": "Exposure action and limit values requiring employers to assess and control noise risks",
    "explanation": "The Regulations set daily/weekly noise exposure limits and require employers to assess and reduce risks from noise at work.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Under the Work at Height Regulations 2005, what is the first principle to consider?",
    "options": [
      "Always use a ladder",
      "Avoid work at height where possible; if not, prevent falls; if risk remains, minimise the distance/consequences of a fall",
      "PPE is the only requirement",
      "Height regulations only apply above 10 metres"
    ],
    "correct": "Avoid work at height where possible; if not, prevent falls; if risk remains, minimise the distance/consequences of a fall",
    "explanation": "The hierarchy under the Work at Height Regulations is to avoid, then prevent, then mitigate the consequences of a fall.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be checked before using a ladder?",
    "options": [
      "Only that it is the right colour",
      "That it is in good condition, correctly rated, on firm level ground, and secured/footed appropriately",
      "Nothing, ladders are always safe",
      "Only the brand name"
    ],
    "correct": "That it is in good condition, correctly rated, on firm level ground, and secured/footed appropriately",
    "explanation": "A pre-use ladder check should cover its condition, suitability for the task, and that it will be used on stable ground and properly secured.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the recommended angle for setting up a leaning ladder (commonly the 1-in-4 rule)?",
    "options": [
      "1 unit out for every 4 units of height",
      "45 degrees always",
      "Vertical, with no lean",
      "It does not matter"
    ],
    "correct": "1 unit out for every 4 units of height",
    "explanation": "The 1-in-4 rule means the base of the ladder should be positioned 1 unit away from the wall for every 4 units of working height, giving a safe climbing angle.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a common minimum extension a leaning ladder should have above the landing point?",
    "options": [
      "No extension needed",
      "About 1 metre (approximately 5 rungs) above the step-off point",
      "10 metres",
      "Ladders should never extend above the landing"
    ],
    "correct": "About 1 metre (approximately 5 rungs) above the step-off point",
    "explanation": "A ladder should extend roughly 1 metre or 5 rungs above the landing point to provide a secure handhold when stepping off.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a scaffold tower's outrigger/stabiliser used for?",
    "options": [
      "Decoration",
      "Increasing the base area to improve stability and prevent tipping",
      "Carrying tools",
      "Providing electrical power"
    ],
    "correct": "Increasing the base area to improve stability and prevent tipping",
    "explanation": "Outriggers widen the effective base of a tower scaffold, improving stability and reducing the risk of it toppling.",
    "topic": "Work at Height"
  },
  {
    "text": "Who should erect, alter or dismantle a mobile tower scaffold?",
    "options": [
      "Anyone available on site",
      "A person trained and competent in tower scaffold assembly (e.g. PASMA trained)",
      "Only the site manager, regardless of training",
      "It requires no particular training"
    ],
    "correct": "A person trained and competent in tower scaffold assembly (e.g. PASMA trained)",
    "explanation": "Tower scaffolds should only be erected, altered or dismantled by someone with appropriate training and competence, such as a PASMA course.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the purpose of a guard rail on a working platform?",
    "options": [
      "Decoration",
      "To prevent people or materials falling from an edge",
      "To hold tools only",
      "To provide electrical earthing"
    ],
    "correct": "To prevent people or materials falling from an edge",
    "explanation": "Guard rails act as edge protection, helping prevent falls from height from open platform edges.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a typical minimum height requirement for the top guard rail on a working platform under UK regulations?",
    "options": [
      "950mm",
      "300mm",
      "2 metres",
      "There is no minimum"
    ],
    "correct": "950mm",
    "explanation": "UK regulations typically require a minimum top guard rail height of 950mm on a working platform, with intermediate protection so no unprotected gap exceeds 470mm.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a 'toe board' used for on a scaffold platform?",
    "options": [
      "Decoration",
      "To prevent tools or materials from being kicked or rolling off the edge of the platform",
      "To provide seating",
      "To measure height"
    ],
    "correct": "To prevent tools or materials from being kicked or rolling off the edge of the platform",
    "explanation": "Toe boards form a barrier at floor level on a platform to stop tools, materials or debris falling and striking people below.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be inspected regularly on a scaffold that is in continuous use?",
    "options": [
      "Nothing, once erected it never needs checking",
      "The scaffold should be formally inspected at set intervals (e.g. every 7 days) and after any event that could affect its safety",
      "Only the base plates, once a year",
      "Only the guard rails, once a month"
    ],
    "correct": "The scaffold should be formally inspected at set intervals (e.g. every 7 days) and after any event that could affect its safety",
    "explanation": "Scaffolds in use should be formally inspected at regular intervals (commonly every 7 days) and after adverse weather or other events that could compromise safety.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a fall arrest system designed to do?",
    "options": [
      "Prevent any possibility of falling",
      "Safely arrest (stop) a fall that has already begun, minimising injury",
      "Increase working speed",
      "Provide electrical insulation"
    ],
    "correct": "Safely arrest (stop) a fall that has already begun, minimising injury",
    "explanation": "A fall arrest system, such as a harness and lanyard with shock absorber, is designed to safely stop a fall that has already occurred and limit the forces on the body.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be checked on a safety harness before use?",
    "options": [
      "Only the colour",
      "Webbing for cuts/fraying, stitching, buckles, and the D-ring for damage or corrosion",
      "Nothing, harnesses do not need checking",
      "Only that it fits in the bag"
    ],
    "correct": "Webbing for cuts/fraying, stitching, buckles, and the D-ring for damage or corrosion",
    "explanation": "A pre-use harness inspection covers webbing condition, stitching, buckles and the D-ring, checking for any damage that could compromise safety.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the primary purpose of the Health and Safety at Work etc. Act 1974?",
    "options": [
      "To regulate food hygiene",
      "To set out the general duties of employers, employees and others to ensure health, safety and welfare at work",
      "To govern planning permission",
      "To regulate financial reporting"
    ],
    "correct": "To set out the general duties of employers, employees and others to ensure health, safety and welfare at work",
    "explanation": "HASAWA 1974 is the primary piece of UK legislation establishing general duties for employers, employees, and others regarding workplace health and safety.",
    "topic": "Legislation"
  },
  {
    "text": "Under HASAWA 1974, what is an employee's general duty?",
    "options": [
      "No duties apply to employees",
      "To take reasonable care of their own health and safety and that of others affected by their actions, and to cooperate with their employer",
      "Only to follow instructions from clients",
      "To carry out risk assessments for the whole company"
    ],
    "correct": "To take reasonable care of their own health and safety and that of others affected by their actions, and to cooperate with their employer",
    "explanation": "Employees have a duty under HASAWA to take reasonable care of themselves and others, and to cooperate with employer health and safety arrangements.",
    "topic": "Legislation"
  },
  {
    "text": "What does RIDDOR require employers to do?",
    "options": [
      "Nothing, it is voluntary",
      "Report certain workplace injuries, diseases and dangerous occurrences to the relevant authority (e.g. HSE)",
      "Only report incidents involving members of the public",
      "Report incidents only if requested by police"
    ],
    "correct": "Report certain workplace injuries, diseases and dangerous occurrences to the relevant authority (e.g. HSE)",
    "explanation": "RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations) requires certain incidents to be formally reported to the enforcing authority.",
    "topic": "Legislation"
  },
  {
    "text": "Under RIDDOR, what is generally classed as a 'specified injury' requiring immediate reporting?",
    "options": [
      "A minor cut requiring a plaster",
      "Fractures (other than to fingers, thumbs and toes), amputations, and certain other serious injuries",
      "A headache",
      "Feeling tired after a shift"
    ],
    "correct": "Fractures (other than to fingers, thumbs and toes), amputations, and certain other serious injuries",
    "explanation": "RIDDOR lists specified injuries requiring immediate reporting, including most fractures, amputations, and loss of sight, among others.",
    "topic": "Legislation"
  },
  {
    "text": "What does PUWER stand for?",
    "options": [
      "Provision and Use of Work Equipment Regulations",
      "Personal Use of Work Electrical Regulations",
      "Portable Use of Work Equipment Rules",
      "Planning, Utility and Water Equipment Regulations"
    ],
    "correct": "Provision and Use of Work Equipment Regulations",
    "explanation": "PUWER (Provision and Use of Work Equipment Regulations 1998) requires equipment used at work to be suitable, maintained and used by trained persons.",
    "topic": "Legislation"
  },
  {
    "text": "What does LOLER stand for and cover?",
    "options": [
      "Lifting Operations and Lifting Equipment Regulations, covering safe use and thorough examination of lifting equipment",
      "Local Ordinance for Lighting Emergency Routes",
      "Low Level Electrical Regulations",
      "Loading Operations for Large Excavations Regulations"
    ],
    "correct": "Lifting Operations and Lifting Equipment Regulations, covering safe use and thorough examination of lifting equipment",
    "explanation": "LOLER 1998 covers the safe use, inspection and thorough examination of lifting equipment such as hoists, cranes and lifting accessories.",
    "topic": "Legislation"
  },
  {
    "text": "What does the Management of Health and Safety at Work Regulations 1999 primarily require?",
    "options": [
      "Employers to carry out suitable and sufficient risk assessments and implement necessary control measures",
      "Only large companies to have a safety officer",
      "Nothing relevant to construction",
      "Employees to carry out their own risk assessments only"
    ],
    "correct": "Employers to carry out suitable and sufficient risk assessments and implement necessary control measures",
    "explanation": "These Regulations require employers to assess risks to health and safety and put in place appropriate preventive and protective measures.",
    "topic": "Legislation"
  },
  {
    "text": "What is the Construction (Design and Management) Regulations 2015 (CDM 2015) primarily concerned with?",
    "options": [
      "Only the final building design colours",
      "Managing health, safety and welfare risks throughout construction projects, including design and planning stages",
      "Only financial budgeting for projects",
      "Marketing of construction companies"
    ],
    "correct": "Managing health, safety and welfare risks throughout construction projects, including design and planning stages",
    "explanation": "CDM 2015 places duties on clients, designers and contractors to manage health and safety risks through all stages of a construction project.",
    "topic": "Legislation"
  },
  {
    "text": "Under CDM 2015, who is generally responsible for preparing a Construction Phase Plan?",
    "options": [
      "The client only",
      "The principal contractor",
      "Any worker on site",
      "It is not required"
    ],
    "correct": "The principal contractor",
    "explanation": "The principal contractor is typically responsible for developing and maintaining the Construction Phase Plan under CDM 2015.",
    "topic": "Legislation"
  },
  {
    "text": "What is a 'competent person' as referred to in health and safety legislation?",
    "options": [
      "Anyone available at the time",
      "Someone with sufficient training, knowledge and experience to carry out a specific task safely",
      "Only a qualified solicitor",
      "A person over the age of 18, regardless of training"
    ],
    "correct": "Someone with sufficient training, knowledge and experience to carry out a specific task safely",
    "explanation": "A competent person has the necessary skills, knowledge, training and experience to properly carry out a given task or assessment.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of a risk assessment?",
    "options": [
      "To assign blame after an accident",
      "To identify hazards, evaluate the risks they pose, and determine suitable control measures",
      "To increase paperwork with no practical benefit",
      "To replace the need for training"
    ],
    "correct": "To identify hazards, evaluate the risks they pose, and determine suitable control measures",
    "explanation": "A risk assessment systematically identifies hazards, assesses who might be harmed and how, and determines appropriate control measures to reduce risk.",
    "topic": "Legislation"
  },
  {
    "text": "What is a 'method statement' typically used for on site?",
    "options": [
      "To record weather conditions",
      "To describe how a task will be carried out safely, step by step, including control measures",
      "To record staff wages",
      "To advertise the project"
    ],
    "correct": "To describe how a task will be carried out safely, step by step, including control measures",
    "explanation": "A method statement sets out the safe sequence of work and the specific control measures to be followed for a task.",
    "topic": "Legislation"
  },
  {
    "text": "What is the first step when you find a casualty who appears unresponsive?",
    "options": [
      "Start chest compressions immediately without any checks",
      "Check for danger to yourself and the casualty, then check responsiveness",
      "Move them immediately regardless of injury",
      "Give them water"
    ],
    "correct": "Check for danger to yourself and the casualty, then check responsiveness",
    "explanation": "The primary survey begins with checking for danger, then assessing the casualty's response, following the DR ABC approach.",
    "topic": "First Aid"
  },
  {
    "text": "What does the acronym DRABC stand for in first aid?",
    "options": [
      "Danger, Response, Airway, Breathing, Circulation",
      "Direct, Rescue, Assist, Bandage, Call",
      "Danger, Report, Assess, Bleed, Contact",
      "Discover, React, Analyse, Breathe, Care"
    ],
    "correct": "Danger, Response, Airway, Breathing, Circulation",
    "explanation": "DRABC is a systematic approach to assessing an unresponsive casualty: Danger, Response, Airway, Breathing, Circulation.",
    "topic": "First Aid"
  },
  {
    "text": "What should you do if someone has received an electric shock and is still in contact with the source?",
    "options": [
      "Touch them to pull them away immediately",
      "Isolate the supply first (or use a non-conductive item to break contact) before approaching, then assess and treat",
      "Pour water on them",
      "Ignore it and wait for them to move"
    ],
    "correct": "Isolate the supply first (or use a non-conductive item to break contact) before approaching, then assess and treat",
    "explanation": "Never touch a casualty still in contact with a live source; isolate the supply first, or use a non-conductive object to separate them, to avoid becoming a casualty yourself.",
    "topic": "First Aid"
  },
  {
    "text": "What is the correct compression rate for adult CPR (chest compressions) per current UK guidance?",
    "options": [
      "Around 100-120 compressions per minute",
      "10 compressions per minute",
      "300 compressions per minute",
      "There is no set rate"
    ],
    "correct": "Around 100-120 compressions per minute",
    "explanation": "Current CPR guidance recommends a compression rate of approximately 100-120 per minute for adults.",
    "topic": "First Aid"
  },
  {
    "text": "What is the recommended compression to rescue breath ratio for adult CPR (standard technique)?",
    "options": [
      "30 compressions to 2 breaths",
      "5 compressions to 5 breaths",
      "1 compression to 1 breath",
      "100 compressions to 1 breath"
    ],
    "correct": "30 compressions to 2 breaths",
    "explanation": "Standard adult CPR guidance uses a ratio of 30 chest compressions to 2 rescue breaths, repeated in cycles.",
    "topic": "First Aid"
  },
  {
    "text": "What should be used first to treat a minor bleeding wound?",
    "options": [
      "Apply direct pressure with a clean dressing and, if possible, elevate the injured area",
      "Apply a tourniquet immediately for any bleeding",
      "Ignore it",
      "Rub the wound vigorously"
    ],
    "correct": "Apply direct pressure with a clean dressing and, if possible, elevate the injured area",
    "explanation": "For most bleeding, applying firm direct pressure and elevating the area (where practical) helps control blood loss until further treatment.",
    "topic": "First Aid"
  },
  {
    "text": "What is the purpose of the recovery position?",
    "options": [
      "To restrain a casualty",
      "To keep an unresponsive but breathing casualty's airway clear and prevent choking on fluids",
      "To warm the casualty up faster",
      "To measure blood pressure"
    ],
    "correct": "To keep an unresponsive but breathing casualty's airway clear and prevent choking on fluids",
    "explanation": "The recovery position helps maintain an open airway in an unresponsive but breathing casualty and reduces the risk of choking on vomit or fluids.",
    "topic": "First Aid"
  },
  {
    "text": "What should you do first if you discover a colleague has suffered a burn from contact with electrical equipment?",
    "options": [
      "Apply butter or oil to the burn",
      "Ensure the area is safe (isolate the supply if needed), then cool the burn with cool running water and seek medical help",
      "Pop any blisters immediately",
      "Ignore minor burns"
    ],
    "correct": "Ensure the area is safe (isolate the supply if needed), then cool the burn with cool running water and seek medical help",
    "explanation": "After ensuring safety, cooling a burn with cool running water for an appropriate period and seeking medical attention is standard first aid practice.",
    "topic": "First Aid"
  },
  {
    "text": "Who is legally required to be appointed under first aid regulations in most workplaces?",
    "options": [
      "No one, first aid is entirely optional",
      "At least a suitable appointed person or trained first aider, based on a first aid needs assessment",
      "Only a fully qualified paramedic",
      "Only the site manager, with no training"
    ],
    "correct": "At least a suitable appointed person or trained first aider, based on a first aid needs assessment",
    "explanation": "The Health and Safety (First-Aid) Regulations require employers to provide adequate first aid arrangements, typically including an appointed person or trained first aider, based on a needs assessment.",
    "topic": "First Aid"
  },
  {
    "text": "What information is important to give when calling emergency services following a serious accident on site?",
    "options": [
      "Only your name",
      "The exact location, nature of the injury/incident, number of casualties, and any hazards present",
      "Nothing, just hang up after dialling",
      "Only the time of day"
    ],
    "correct": "The exact location, nature of the injury/incident, number of casualties, and any hazards present",
    "explanation": "Providing clear details of the location, nature of the emergency, casualties and hazards helps emergency services respond quickly and appropriately.",
    "topic": "First Aid"
  },
  {
    "text": "What is a 'permit to dig' typically required for?",
    "options": [
      "Any general site walking",
      "Excavation work, to check for buried services such as gas, water or electricity cables before digging",
      "Painting walls",
      "Office administration"
    ],
    "correct": "Excavation work, to check for buried services such as gas, water or electricity cables before digging",
    "explanation": "A permit to dig ensures excavation work is properly planned, checking for buried services to prevent striking cables, pipes or other hazards.",
    "topic": "Site Safety"
  },
  {
    "text": "What is a cable avoidance tool (CAT) used for?",
    "options": [
      "Detecting buried cables and pipes before excavation work",
      "Cutting cables safely",
      "Testing insulation resistance",
      "Measuring earth resistance"
    ],
    "correct": "Detecting buried cables and pipes before excavation work",
    "explanation": "A CAT scanner helps locate buried services such as cables and metallic pipes before digging, reducing the risk of striking them.",
    "topic": "Site Safety"
  },
  {
    "text": "What should be done if you accidentally strike an unknown underground cable while excavating?",
    "options": [
      "Continue digging to see what it is",
      "Stop work immediately, do not touch the cable, and report it following site procedures",
      "Pull the cable out of the ground",
      "Cover it with soil and continue elsewhere"
    ],
    "correct": "Stop work immediately, do not touch the cable, and report it following site procedures",
    "explanation": "If a buried cable is struck, work should stop immediately, the area secured, and the incident reported without touching or attempting to move the cable.",
    "topic": "Site Safety"
  },
  {
    "text": "What is a 'toolbox talk'?",
    "options": [
      "A meeting about purchasing new tools",
      "A short, informal briefing on a specific health and safety topic relevant to the current work",
      "A formal disciplinary hearing",
      "A test of tool functionality"
    ],
    "correct": "A short, informal briefing on a specific health and safety topic relevant to the current work",
    "explanation": "Toolbox talks are brief, focused briefings used to communicate specific safety information or reminders relevant to ongoing work.",
    "topic": "Site Safety"
  },
  {
    "text": "What should be done with waste materials such as cable offcuts and packaging on a work site?",
    "options": [
      "Leave them scattered around",
      "Dispose of them properly, keeping the work area tidy to reduce trip hazards and following waste regulations",
      "Burn them on site regardless of rules",
      "Bury them in the ground"
    ],
    "correct": "Dispose of them properly, keeping the work area tidy to reduce trip hazards and following waste regulations",
    "explanation": "Good housekeeping, including proper disposal of waste, reduces trip hazards and ensures compliance with waste regulations.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the main hazard associated with poor housekeeping on a construction site?",
    "options": [
      "Improved efficiency",
      "Increased risk of trips, slips and falls, and fire hazards from accumulated waste",
      "No real hazard exists",
      "Reduced noise levels"
    ],
    "correct": "Increased risk of trips, slips and falls, and fire hazards from accumulated waste",
    "explanation": "Poor housekeeping, such as clutter, spillages and waste build-up, significantly increases risks of trips, slips, falls and fire.",
    "topic": "Site Safety"
  },
  {
    "text": "Why should trailing cables across walkways be avoided or properly managed?",
    "options": [
      "They improve visibility",
      "They present a significant trip hazard and potential cable damage risk",
      "They have no associated risk",
      "They are required by regulations to be left trailing"
    ],
    "correct": "They present a significant trip hazard and potential cable damage risk",
    "explanation": "Trailing cables across walkways can cause trips and may also be damaged by foot traffic or equipment, creating further hazards.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of barriers or exclusion zones around excavations or overhead work?",
    "options": [
      "Decoration",
      "To prevent unauthorised access and protect people from falling into excavations or from falling objects",
      "To reduce noise",
      "To store materials"
    ],
    "correct": "To prevent unauthorised access and protect people from falling into excavations or from falling objects",
    "explanation": "Barriers and exclusion zones keep people away from hazardous areas such as open excavations or zones where objects could fall from height.",
    "topic": "Site Safety"
  },
  {
    "text": "What should be considered before working near overhead power lines?",
    "options": [
      "Nothing special is required",
      "Safe clearance distances, and whether the supply can be isolated or the lines protected/marked, following HSE guidance",
      "Only the weather conditions",
      "Only whether it is a weekday"
    ],
    "correct": "Safe clearance distances, and whether the supply can be isolated or the lines protected/marked, following HSE guidance",
    "explanation": "Working near overhead lines requires careful planning, including maintaining safe clearance distances and considering isolation or protective measures per HSE guidance (e.g. GS6).",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of signage warning of electrical hazards, such as 'Danger - Live Apparatus'?",
    "options": [
      "Decoration",
      "To warn people of specific electrical risks in an area and reduce the chance of accidental contact",
      "To indicate parking restrictions",
      "To show fire exit routes only"
    ],
    "correct": "To warn people of specific electrical risks in an area and reduce the chance of accidental contact",
    "explanation": "Warning signs alert people to specific hazards, such as live electrical apparatus, helping prevent accidental contact or unsafe behaviour.",
    "topic": "Site Safety"
  },
  {
    "text": "What should be done before working on or near an underground service that has been identified but not yet exposed?",
    "options": [
      "Assume its exact position and dig freely",
      "Hand dig or use safe digging practices (e.g. trial holes) to expose it carefully, following safe digging guidance",
      "Use a mechanical excavator at full power near the marked line",
      "Ignore the marking and continue as planned"
    ],
    "correct": "Hand dig or use safe digging practices (e.g. trial holes) to expose it carefully, following safe digging guidance",
    "explanation": "Once a service is identified, safe digging practices such as hand digging or trial holes should be used to carefully expose it without damage.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the main purpose of a permit-to-work system generally?",
    "options": [
      "To slow down work unnecessarily",
      "To formally control high-risk activities, ensuring precautions are checked and authorised before work starts",
      "To replace risk assessments entirely",
      "To record staff attendance only"
    ],
    "correct": "To formally control high-risk activities, ensuring precautions are checked and authorised before work starts",
    "explanation": "Permit-to-work systems provide formal control over higher-risk activities, ensuring necessary precautions are verified and authorised before work begins.",
    "topic": "Site Safety"
  },
  {
    "text": "A circuit has two resistors in series, 4Ω and 6Ω, connected to a 20V supply. What is the total current flowing?",
    "options": [
      "1A",
      "2A",
      "5A",
      "0.5A"
    ],
    "correct": "2A",
    "explanation": "Total resistance = 4+6 = 10Ω. Current = V/R = 20/10 = 2A.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A 3kW immersion heater operates on a 230V supply. What current does it draw (approximately)?",
    "options": [
      "6.5A",
      "13A",
      "26A",
      "3A"
    ],
    "correct": "13A",
    "explanation": "I = P/V = 3000/230 ≈ 13A.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the resistance of a 230V, 2kW electric heater element under normal operation?",
    "options": [
      "Approximately 26.5Ω",
      "230Ω",
      "2Ω",
      "1Ω"
    ],
    "correct": "Approximately 26.5Ω",
    "explanation": "R = V²/P = 230² / 2000 = 52900/2000 ≈ 26.5Ω.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What current flows through a 100Ω resistor connected across a 230V supply?",
    "options": [
      "2.3A",
      "23A",
      "0.23A",
      "230A"
    ],
    "correct": "2.3A",
    "explanation": "I = V/R = 230/100 = 2.3A.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A load draws 10A from a 230V single-phase supply at unity power factor. What is the power consumed?",
    "options": [
      "23W",
      "2300W",
      "230W",
      "10W"
    ],
    "correct": "2300W",
    "explanation": "P = V x I = 230 x 10 = 2300W at unity (1.0) power factor.",
    "topic": "Electrical Theory"
  },
  {
    "text": "If a motor has an efficiency of 80% and consumes 1000W of electrical input power, what is its mechanical output power?",
    "options": [
      "1250W",
      "800W",
      "200W",
      "80W"
    ],
    "correct": "800W",
    "explanation": "Output power = input power x efficiency = 1000W x 0.80 = 800W.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A three-phase balanced load draws 10A per phase from a 400V line supply at unity power factor. What is the approximate total power (P = √3 x VL x IL)?",
    "options": [
      "4000W",
      "6928W",
      "2309W",
      "40000W"
    ],
    "correct": "6928W",
    "explanation": "P = √3 x VL x IL x cosφ = 1.732 x 400 x 10 x 1 ≈ 6928W.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'apparent power' (measured in VA) represent, as opposed to 'true power' (W)?",
    "options": [
      "The total power including both real and reactive components (S = V x I)",
      "Only the resistive component of power",
      "The power lost as heat only",
      "The power factor itself"
    ],
    "correct": "The total power including both real and reactive components (S = V x I)",
    "explanation": "Apparent power (VA) is the product of RMS voltage and current, including both the real (working) power and reactive power components.",
    "topic": "Electrical Theory"
  },
  {
    "text": "If true power is 800W and apparent power is 1000VA, what is the power factor?",
    "options": [
      "0.8",
      "1.25",
      "8",
      "0.08"
    ],
    "correct": "0.8",
    "explanation": "Power factor = true power / apparent power = 800/1000 = 0.8.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is reactive power measured in?",
    "options": [
      "Watts",
      "VAr (volt-amps reactive)",
      "Volts",
      "Ohms"
    ],
    "correct": "VAr (volt-amps reactive)",
    "explanation": "Reactive power, associated with inductive or capacitive loads, is measured in volt-amps reactive (VAr).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the formula for calculating the total resistance of three equal resistors, each 12Ω, connected in parallel?",
    "options": [
      "4Ω",
      "36Ω",
      "12Ω",
      "24Ω"
    ],
    "correct": "4Ω",
    "explanation": "For equal parallel resistors: Rt = R/n = 12/3 = 4Ω.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A cable has a resistance of 0.5Ω and carries a current of 20A. What is the voltage drop along the cable?",
    "options": [
      "10V",
      "0.025V",
      "20.5V",
      "40V"
    ],
    "correct": "10V",
    "explanation": "Voltage drop = I x R = 20A x 0.5Ω = 10V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A circuit is protected by a 32A MCB. If a fault causes 160A to flow, what multiple of rated current is this?",
    "options": [
      "2 times",
      "5 times",
      "10 times",
      "0.5 times"
    ],
    "correct": "5 times",
    "explanation": "160A ÷ 32A = 5 times the rated current of the device.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the approximate energy consumption (in kWh) of a 2kW heater used continuously for 3 hours?",
    "options": [
      "2kWh",
      "6kWh",
      "0.67kWh",
      "60kWh"
    ],
    "correct": "6kWh",
    "explanation": "Energy (kWh) = power (kW) x time (h) = 2kW x 3h = 6kWh.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A 9kWh energy usage over 3 hours corresponds to what average power?",
    "options": [
      "3kW",
      "27kW",
      "0.33kW",
      "12kW"
    ],
    "correct": "3kW",
    "explanation": "Power = Energy / time = 9kWh / 3h = 3kW.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does the term 'impedance' refer to in an AC circuit?",
    "options": [
      "The total opposition to current flow, combining resistance and reactance",
      "Only the resistive opposition",
      "The voltage supplied",
      "The frequency of the supply"
    ],
    "correct": "The total opposition to current flow, combining resistance and reactance",
    "explanation": "Impedance (Z) is the combined opposition to AC current flow, incorporating both resistance and reactance (inductive and/or capacitive).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the symbol and unit typically used for impedance?",
    "options": [
      "Z, measured in ohms",
      "I, measured in amps",
      "R, measured in watts",
      "P, measured in volts"
    ],
    "correct": "Z, measured in ohms",
    "explanation": "Impedance is represented by the symbol Z and, like resistance, is measured in ohms.",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a purely resistive AC circuit, what is the phase relationship between voltage and current?",
    "options": [
      "They are in phase with each other",
      "Current leads voltage by 90 degrees",
      "Voltage leads current by 90 degrees",
      "They are always 180 degrees out of phase"
    ],
    "correct": "They are in phase with each other",
    "explanation": "In a purely resistive circuit, voltage and current reach their peaks and zero points together, i.e. they are in phase.",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a purely inductive AC circuit, what is the phase relationship between voltage and current?",
    "options": [
      "Voltage leads current by 90 degrees",
      "Current leads voltage by 90 degrees",
      "They are in phase",
      "They are 45 degrees apart"
    ],
    "correct": "Voltage leads current by 90 degrees",
    "explanation": "In a purely inductive circuit, voltage leads current by 90 degrees (or current lags voltage by 90 degrees).",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a purely capacitive AC circuit, what is the phase relationship between voltage and current?",
    "options": [
      "Current leads voltage by 90 degrees",
      "Voltage leads current by 90 degrees",
      "They are always in phase",
      "There is no phase relationship in capacitive circuits"
    ],
    "correct": "Current leads voltage by 90 degrees",
    "explanation": "In a purely capacitive circuit, current leads voltage by 90 degrees.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the purpose of a consumer unit (distribution board) in a domestic installation?",
    "options": [
      "To generate electricity",
      "To distribute the incoming supply to individual final circuits, each with its own protective device",
      "To store energy for later use",
      "To measure gas usage"
    ],
    "correct": "To distribute the incoming supply to individual final circuits, each with its own protective device",
    "explanation": "The consumer unit splits the incoming supply into separate final circuits, each protected by its own fuse, MCB or RCBO.",
    "topic": "Consumer Units"
  },
  {
    "text": "What does BS 7671 (18th Edition, as amended) generally require regarding metal consumer units in domestic premises?",
    "options": [
      "They must be made of metal or a material meeting an equivalent fire-resistance standard, to reduce the risk of fire spread",
      "They must always be plastic",
      "There is no requirement on enclosure material",
      "They must be located outdoors only"
    ],
    "correct": "They must be made of metal or a material meeting an equivalent fire-resistance standard, to reduce the risk of fire spread",
    "explanation": "Amendments to BS 7671 introduced a requirement for consumer units in domestic premises to be non-combustible or enclosed in material providing equivalent fire resistance.",
    "topic": "Consumer Units"
  },
  {
    "text": "What is typically used to provide RCD protection to a group of circuits within a split-load consumer unit?",
    "options": [
      "A single main switch only",
      "An RCD (or RCBOs on individual ways) dividing circuits so a fault on one does not disconnect the whole board",
      "A fuse carrier",
      "A voltage indicator"
    ],
    "correct": "An RCD (or RCBOs on individual ways) dividing circuits so a fault on one does not disconnect the whole board",
    "explanation": "Split-load boards use one or more RCDs (or individual RCBOs) so that not all circuits are lost simultaneously if one develops a fault.",
    "topic": "Consumer Units"
  },
  {
    "text": "What is a 'main switch' in a consumer unit used for?",
    "options": [
      "To isolate the entire installation from the incoming supply",
      "To control a single lighting circuit only",
      "To measure current draw",
      "To provide surge protection"
    ],
    "correct": "To isolate the entire installation from the incoming supply",
    "explanation": "The main switch allows the whole installation to be isolated from the incoming supply, typically used before carrying out work on the consumer unit.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why should circuits in a consumer unit be clearly labelled?",
    "options": [
      "It is not necessary",
      "So that circuits can be correctly identified for isolation, maintenance, or in an emergency",
      "Only for aesthetic reasons",
      "Labels are only needed for three-phase boards"
    ],
    "correct": "So that circuits can be correctly identified for isolation, maintenance, or in an emergency",
    "explanation": "Clear circuit labelling (a circuit chart/schedule) allows anyone working on or using the installation to correctly identify and isolate specific circuits.",
    "topic": "Consumer Units"
  },
  {
    "text": "What does a photovoltaic (PV) solar panel primarily convert?",
    "options": [
      "Wind energy into electrical energy",
      "Sunlight (solar energy) directly into DC electrical energy",
      "Heat into mechanical energy",
      "Water pressure into electricity"
    ],
    "correct": "Sunlight (solar energy) directly into DC electrical energy",
    "explanation": "Photovoltaic cells convert sunlight directly into direct current (DC) electrical energy through the photovoltaic effect.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the purpose of an inverter in a domestic solar PV system?",
    "options": [
      "To store energy",
      "To convert the DC output of the panels into AC suitable for use in the home or export to the grid",
      "To increase panel efficiency directly",
      "To provide earthing"
    ],
    "correct": "To convert the DC output of the panels into AC suitable for use in the home or export to the grid",
    "explanation": "An inverter converts the DC electricity generated by PV panels into AC electricity compatible with the domestic supply and grid.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the main function of an air source heat pump?",
    "options": [
      "To burn fossil fuels for heating",
      "To extract heat from outside air and transfer it indoors (or reverse for cooling) using a refrigeration cycle",
      "To generate electricity from wind",
      "To store solar energy directly as heat"
    ],
    "correct": "To extract heat from outside air and transfer it indoors (or reverse for cooling) using a refrigeration cycle",
    "explanation": "Air source heat pumps use a refrigerant cycle to extract heat energy from outside air, even at low temperatures, and transfer it into the building.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What does 'G99' relate to in relation to connecting generation equipment (such as solar PV) to the electricity network?",
    "options": [
      "A cable colour standard",
      "An engineering recommendation governing the connection of generating plant to the public distribution network",
      "A type of consumer unit",
      "A brand of inverter"
    ],
    "correct": "An engineering recommendation governing the connection of generating plant to the public distribution network",
    "explanation": "G99 (and G98 for smaller installations) sets out requirements for connecting generating equipment such as solar PV systems to the UK distribution network.",
    "topic": "Renewable Technology"
  },
  {
    "text": "Why is anti-islanding protection important in a grid-connected PV inverter?",
    "options": [
      "To increase panel output",
      "To automatically disconnect the inverter from the grid if the grid supply fails, protecting engineers working on the network",
      "To reduce installation cost",
      "It has no safety purpose"
    ],
    "correct": "To automatically disconnect the inverter from the grid if the grid supply fails, protecting engineers working on the network",
    "explanation": "Anti-islanding protection prevents an inverter from continuing to energise the grid during a supply outage, protecting network engineers carrying out repairs.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is a key safety consideration when working on or near solar PV panels?",
    "options": [
      "PV panels are always safe and de-energised in daylight",
      "PV panels can still generate a DC voltage whenever exposed to light, even if isolated from the AC side",
      "PV systems never require isolation",
      "There is no DC shock risk from PV panels"
    ],
    "correct": "PV panels can still generate a DC voltage whenever exposed to light, even if isolated from the AC side",
    "explanation": "Solar PV panels generate DC voltage whenever exposed to light, meaning the DC side can remain live even when the AC/inverter side is isolated.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What type of battery technology is commonly used in modern domestic energy storage systems?",
    "options": [
      "Lead-acid only, exclusively",
      "Lithium-ion",
      "Zinc-carbon",
      "Alkaline"
    ],
    "correct": "Lithium-ion",
    "explanation": "Lithium-ion batteries are widely used in modern domestic energy storage systems due to their energy density and cycle life, though other chemistries exist.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the main purpose of an Electric Vehicle (EV) charge point's built-in protection, often including a form of DC fault detection?",
    "options": [
      "To increase charging speed only",
      "To detect DC leakage current that a standard Type A RCD might not reliably detect, protecting against shock risk",
      "To measure tyre pressure",
      "To communicate with the vehicle's entertainment system"
    ],
    "correct": "To detect DC leakage current that a standard Type A RCD might not reliably detect, protecting against shock risk",
    "explanation": "EV charging can produce DC fault currents; charge points often include Type B RCD protection or equivalent DC fault detection to ensure protection is maintained.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What does 'smart charging' for an EV charge point generally allow?",
    "options": [
      "No practical benefit",
      "Charging to be scheduled or managed, e.g. to use off-peak electricity or balance grid demand",
      "The vehicle to charge itself without any cable",
      "Only fast charging is possible"
    ],
    "correct": "Charging to be scheduled or managed, e.g. to use off-peak electricity or balance grid demand",
    "explanation": "Smart EV charge points can schedule or modulate charging, often to take advantage of off-peak tariffs or to support grid balancing.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the primary environmental benefit typically associated with correctly installed renewable technologies like solar PV or heat pumps?",
    "options": [
      "Guaranteed reduction to zero energy use",
      "Reduced reliance on fossil fuels and lower associated carbon emissions over the system's life",
      "No environmental benefit exists",
      "Increased water consumption"
    ],
    "correct": "Reduced reliance on fossil fuels and lower associated carbon emissions over the system's life",
    "explanation": "Renewable technologies generally reduce reliance on fossil fuel generation, lowering associated carbon emissions compared with conventional alternatives.",
    "topic": "Renewable Technology"
  },
  {
    "text": "Why is correct disposal of waste electrical items (WEEE) important?",
    "options": [
      "It is not important",
      "To prevent environmental harm and recover valuable materials, as required under WEEE regulations",
      "It only applies to industrial equipment",
      "Waste electrical items can be disposed of with general household waste freely"
    ],
    "correct": "To prevent environmental harm and recover valuable materials, as required under WEEE regulations",
    "explanation": "The Waste Electrical and Electronic Equipment (WEEE) Regulations require proper recycling/disposal of electrical waste to reduce environmental harm and recover materials.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is a simple way an electrician can help reduce a client's energy consumption when replacing lighting?",
    "options": [
      "Always fit the highest wattage lamps available",
      "Recommend energy-efficient LED lighting in place of older, less efficient lamp types",
      "Remove all lighting controls",
      "Avoid discussing energy efficiency with clients"
    ],
    "correct": "Recommend energy-efficient LED lighting in place of older, less efficient lamp types",
    "explanation": "LED lighting generally uses significantly less energy than older incandescent or halogen lamps for equivalent light output, reducing energy consumption.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why might an electrician recommend fitting a smart thermostat or timer as part of an installation?",
    "options": [
      "It has no benefit to the client",
      "It can help optimise heating use and reduce unnecessary energy consumption",
      "It is required for all installations by law",
      "It replaces the need for insulation"
    ],
    "correct": "It can help optimise heating use and reduce unnecessary energy consumption",
    "explanation": "Smart controls allow heating to be scheduled and adjusted more precisely, helping reduce wasted energy and lower running costs.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is meant by the 'carbon footprint' of an activity or product?",
    "options": [
      "The physical size of an item",
      "The total amount of greenhouse gases produced directly and indirectly by that activity or product",
      "The number of workers involved",
      "The cost of the item"
    ],
    "correct": "The total amount of greenhouse gases produced directly and indirectly by that activity or product",
    "explanation": "A carbon footprint measures the total greenhouse gas emissions caused directly or indirectly by an activity, product, or organisation.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why should packaging and offcut waste be segregated for recycling on site where possible?",
    "options": [
      "It slows down work unnecessarily with no benefit",
      "It reduces the amount of waste sent to landfill and supports material recovery",
      "It is purely a legal formality with no environmental effect",
      "Segregation is never required"
    ],
    "correct": "It reduces the amount of waste sent to landfill and supports material recovery",
    "explanation": "Segregating recyclable waste, such as cable offcuts, cardboard and metal, reduces landfill use and allows materials to be recovered and reused.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What type of cable is commonly used for structured data networking in buildings (e.g. Cat5e, Cat6)?",
    "options": [
      "Steel wire armoured cable",
      "Twisted pair copper cable",
      "Single core PVC cable",
      "Mineral insulated cable"
    ],
    "correct": "Twisted pair copper cable",
    "explanation": "Structured data cabling commonly uses twisted pair copper cable (e.g. Cat5e, Cat6), where pairs are twisted to reduce interference.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why are the pairs of conductors twisted together in structured data cabling?",
    "options": [
      "For appearance only",
      "To reduce electromagnetic interference (crosstalk) between pairs",
      "To increase cable weight",
      "To make installation harder deliberately"
    ],
    "correct": "To reduce electromagnetic interference (crosstalk) between pairs",
    "explanation": "Twisting conductor pairs together helps cancel out electromagnetic interference and reduces crosstalk between pairs.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why should data cables generally be kept separated from power cables where practical?",
    "options": [
      "To reduce electromagnetic interference affecting the data signal",
      "To save cable costs",
      "There is no reason, it makes no difference",
      "To allow them to share the same connector"
    ],
    "correct": "To reduce electromagnetic interference affecting the data signal",
    "explanation": "Running data and power cables too close together, or in parallel over long distances, can induce interference into the data cable, degrading signal quality.",
    "topic": "Data Cabling"
  },
  {
    "text": "What does 'PoE' (Power over Ethernet) allow?",
    "options": [
      "Data cables to carry both data and low-voltage DC power to devices such as IP cameras or access points",
      "Mains voltage to be sent over data cables directly",
      "Fibre optic cables to carry power",
      "Wireless devices to be hardwired accidentally"
    ],
    "correct": "Data cables to carry both data and low-voltage DC power to devices such as IP cameras or access points",
    "explanation": "PoE allows compatible network cables to supply both data and low-voltage DC power to devices, avoiding the need for a separate power supply at the device.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is a key advantage of fibre optic cable over copper cable for data transmission?",
    "options": [
      "It is immune to electromagnetic interference and can carry signals over much longer distances",
      "It is always cheaper than copper cable",
      "It requires no special termination skills",
      "It can conduct mains electricity safely"
    ],
    "correct": "It is immune to electromagnetic interference and can carry signals over much longer distances",
    "explanation": "Fibre optic cable transmits data as light, making it immune to electromagnetic interference and capable of much longer transmission distances than copper.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is the primary purpose of emergency lighting in a building?",
    "options": [
      "To decorate the building",
      "To illuminate escape routes and provide adequate light for safe evacuation if the normal supply fails",
      "To reduce energy costs",
      "To provide advertising light"
    ],
    "correct": "To illuminate escape routes and provide adequate light for safe evacuation if the normal supply fails",
    "explanation": "Emergency lighting automatically activates on mains failure to illuminate escape routes, helping ensure safe evacuation.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is a 'maintained' emergency luminaire?",
    "options": [
      "A luminaire that only operates in emergency mode, never normally lit",
      "A luminaire that is lit continuously, both under normal supply and during an emergency",
      "A luminaire that is always off",
      "A decorative light fitting only"
    ],
    "correct": "A luminaire that is lit continuously, both under normal supply and during an emergency",
    "explanation": "A maintained emergency luminaire is on continuously, whether the mains supply is present or not, useful in areas like cinemas that may be in low ambient light normally.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is a 'non-maintained' emergency luminaire?",
    "options": [
      "A luminaire that is normally off and only illuminates automatically upon mains failure",
      "A luminaire that is always on",
      "A luminaire with no battery backup",
      "A decorative fitting only"
    ],
    "correct": "A luminaire that is normally off and only illuminates automatically upon mains failure",
    "explanation": "Non-maintained emergency luminaires remain off under normal conditions and switch on automatically if the mains supply fails.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is a typical minimum duration emergency lighting must operate for after a mains failure, per common standards?",
    "options": [
      "1 minute",
      "3 hours (or 1 hour in some premises, per a fire risk assessment)",
      "24 hours always",
      "There is no minimum duration"
    ],
    "correct": "3 hours (or 1 hour in some premises, per a fire risk assessment)",
    "explanation": "Emergency lighting duration requirements depend on the fire risk assessment and building use, with 3 hours (or sometimes 1 hour) being common minimum durations.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What should fire safety signage generally comply with regarding colour and symbol standards?",
    "options": [
      "No particular standard",
      "Recognised standards such as BS 5499/ISO 7010, using consistent colours (e.g. green for escape routes)",
      "Any colour the installer prefers",
      "Only text, no symbols"
    ],
    "correct": "Recognised standards such as BS 5499/ISO 7010, using consistent colours (e.g. green for escape routes)",
    "explanation": "Fire safety signs follow recognised standards to ensure consistent, easily understood colours and symbols, such as green for escape route signage.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is a step ladder generally more suitable for compared to a leaning ladder?",
    "options": [
      "Long-duration work far from the ground with heavy tools",
      "Short-duration, light work where a stable, self-supporting platform is useful and no wall is available to lean against",
      "Underground excavation work",
      "Overhead crane operations"
    ],
    "correct": "Short-duration, light work where a stable, self-supporting platform is useful and no wall is available to lean against",
    "explanation": "Step ladders are self-supporting and often suitable for short-duration, light tasks where a wall is not available to lean a ladder against.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a MEWP (Mobile Elevating Work Platform) commonly used for?",
    "options": [
      "Underground drainage work",
      "Providing a safe platform to carry out tasks at height, such as a scissor lift or cherry picker",
      "Testing electrical insulation",
      "Lifting heavy loads horizontally only"
    ],
    "correct": "Providing a safe platform to carry out tasks at height, such as a scissor lift or cherry picker",
    "explanation": "MEWPs, including scissor lifts and boom-type cherry pickers, provide an elevated working platform for tasks that cannot easily be done from a ladder.",
    "topic": "Work at Height"
  },
  {
    "text": "What training is generally expected before operating a MEWP?",
    "options": [
      "No training is required",
      "Specific operator training and familiarisation (e.g. IPAF training) appropriate to the type of MEWP",
      "Only a driving licence",
      "General site induction only, with no specific training"
    ],
    "correct": "Specific operator training and familiarisation (e.g. IPAF training) appropriate to the type of MEWP",
    "explanation": "Operating a MEWP safely requires specific training (such as IPAF) and machine familiarisation, given the risks associated with working at height on such equipment.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be worn when working in the basket of a boom-type MEWP, in addition to other PPE?",
    "options": [
      "No harness is required",
      "A safety harness with a lanyard attached to the designated anchor point, to prevent ejection from the basket",
      "Only a hard hat, nothing else",
      "Steel toe boots only"
    ],
    "correct": "A safety harness with a lanyard attached to the designated anchor point, to prevent ejection from the basket",
    "explanation": "A harness and lanyard are typically required in boom-type MEWPs to prevent the operator being thrown from the basket during sudden movement.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a common cause of MEWP overturning incidents?",
    "options": [
      "Operating strictly within the manufacturer's rated capacity and ground conditions",
      "Exceeding rated load capacity, using on unsuitable/unstable ground, or exceeding permitted wind speed",
      "Wearing a harness correctly",
      "Conducting a pre-use inspection"
    ],
    "correct": "Exceeding rated load capacity, using on unsuitable/unstable ground, or exceeding permitted wind speed",
    "explanation": "MEWP overturns are commonly linked to exceeding load capacity, unstable or sloped ground, or operating in excessive wind conditions beyond manufacturer limits.",
    "topic": "Work at Height"
  },
  {
    "text": "What does a single line (schematic) diagram typically show in an electrical installation?",
    "options": [
      "Exact physical cable routes only",
      "A simplified representation of circuits and their relationship, often without physical routing detail",
      "Only the building's floor plan",
      "Plumbing layout"
    ],
    "correct": "A simplified representation of circuits and their relationship, often without physical routing detail",
    "explanation": "Single line diagrams show the electrical relationship between circuits and equipment in simplified form, rather than exact physical cable routes.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the purpose of a wiring/circuit diagram, as opposed to a block diagram?",
    "options": [
      "To show decorative colours only",
      "To show the detailed connections between components within a circuit",
      "To show only the outside of a building",
      "To record staff attendance"
    ],
    "correct": "To show the detailed connections between components within a circuit",
    "explanation": "A wiring diagram shows the detailed interconnections between individual components, useful for installation and fault-finding.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What might a 'schedule of circuit details' typically record for each final circuit?",
    "options": [
      "Only the client's address",
      "Details such as cable type/size, protective device rating, and the points served by that circuit",
      "Nothing of practical use",
      "Only the colour of the paint in the room"
    ],
    "correct": "Details such as cable type/size, protective device rating, and the points served by that circuit",
    "explanation": "A circuit schedule (often part of the certification paperwork) records key details about each circuit, including conductor sizes, protective device ratings and points served.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why is it important to read manufacturer's instructions before installing new electrical equipment?",
    "options": [
      "Instructions are never relevant to installation",
      "To ensure the equipment is installed correctly, safely, and within its design parameters",
      "Only to find the warranty period",
      "Manufacturer instructions replace the need for BS 7671 compliance"
    ],
    "correct": "To ensure the equipment is installed correctly, safely, and within its design parameters",
    "explanation": "Manufacturer instructions provide specific installation requirements that, combined with BS 7671 and good practice, ensure equipment is fitted safely and correctly.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the purpose of keeping accurate records/certificates for completed electrical work?",
    "options": [
      "They serve no practical purpose",
      "To provide evidence of compliance, support future maintenance/inspection, and meet legal/contractual obligations",
      "Only to satisfy personal preference",
      "Records are only needed for commercial premises, never domestic"
    ],
    "correct": "To provide evidence of compliance, support future maintenance/inspection, and meet legal/contractual obligations",
    "explanation": "Accurate certification and records provide evidence of compliance with standards, assist future maintenance, and may be legally or contractually required.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the general purpose of a Building Regulations Part P notification in England for certain domestic electrical work?",
    "options": [
      "To notify the relevant body that certain notifiable electrical work has been carried out, ensuring compliance is checked",
      "It relates only to plumbing work",
      "It replaces the need for an EIC",
      "It is only relevant to commercial premises"
    ],
    "correct": "To notify the relevant body that certain notifiable electrical work has been carried out, ensuring compliance is checked",
    "explanation": "Part P of the Building Regulations requires certain domestic electrical work to be notified to a building control body or carried out by a registered competent person scheme member.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is a common reason for using a competent person self-certification scheme for domestic electrical work?",
    "options": [
      "It avoids the need for the work to comply with any standards",
      "It allows a registered electrician to self-certify notifiable work as compliant without a separate building control inspection",
      "It is only relevant to gas work",
      "It has no relationship to Part P"
    ],
    "correct": "It allows a registered electrician to self-certify notifiable work as compliant without a separate building control inspection",
    "explanation": "Competent person schemes allow registered electricians to self-certify notifiable domestic electrical work, satisfying Part P requirements without a separate building control application.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why might an electrician need to liaise with other trades on a construction site, such as when first fixing?",
    "options": [
      "There is no need to communicate with others",
      "To coordinate work and avoid conflicts, such as cables clashing with pipework or structural elements",
      "Only to discuss unrelated topics",
      "To avoid completing the work on schedule"
    ],
    "correct": "To coordinate work and avoid conflicts, such as cables clashing with pipework or structural elements",
    "explanation": "Coordinating with other trades helps avoid clashes between services (e.g. electrical, plumbing, structural) and supports efficient, safe completion of work.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the purpose of a snagging list at the end of a project?",
    "options": [
      "To record staff holiday requests",
      "To identify and track any outstanding defects or incomplete items that need to be resolved before final handover",
      "To advertise the completed project",
      "To record material delivery times only"
    ],
    "correct": "To identify and track any outstanding defects or incomplete items that need to be resolved before final handover",
    "explanation": "A snagging list records outstanding defects or unfinished items so they can be tracked and resolved before the project is formally handed over.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why is good communication with a client important when carrying out domestic electrical work?",
    "options": [
      "It is not necessary, the work speaks for itself",
      "To manage expectations, explain necessary disruption, and ensure the work meets their needs safely and to standard",
      "Only to increase the invoice amount",
      "Communication with clients should be avoided"
    ],
    "correct": "To manage expectations, explain necessary disruption, and ensure the work meets their needs safely and to standard",
    "explanation": "Clear communication helps manage client expectations, explain any disruption, and confirm the work carried out meets their needs while remaining safe and compliant.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What information would you expect to find on a COSHH safety data sheet for a hazardous substance?",
    "options": [
      "Only the purchase price",
      "Hazard information, first aid measures, safe handling and storage requirements, and PPE recommendations",
      "Only the manufacturer's logo",
      "Nothing useful for site work"
    ],
    "correct": "Hazard information, first aid measures, safe handling and storage requirements, and PPE recommendations",
    "explanation": "A safety data sheet provides key information including hazards, first aid measures, handling/storage guidance and recommended PPE for a substance.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What should you do if a hazardous substance is accidentally splashed into your eyes?",
    "options": [
      "Rub your eyes vigorously",
      "Irrigate the eyes with clean water immediately for a sustained period and seek medical attention if needed",
      "Wait and see if it clears up on its own",
      "Apply a dry dressing directly to the eye"
    ],
    "correct": "Irrigate the eyes with clean water immediately for a sustained period and seek medical attention if needed",
    "explanation": "Immediate and thorough irrigation with clean water helps dilute and remove a hazardous substance from the eye, followed by medical attention if needed.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is a safe practice regarding lifting loads as a two-person team?",
    "options": [
      "Lift without any communication or coordination",
      "Communicate clearly, coordinate the lift, and move in a synchronised manner",
      "Have one person lift the entire weight while the other watches",
      "Lift at different times without coordination"
    ],
    "correct": "Communicate clearly, coordinate the lift, and move in a synchronised manner",
    "explanation": "Team lifting requires clear communication and synchronised movement to avoid uneven loading and reduce injury risk to either person.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is a reasonable step to reduce manual handling risk when planning a job in advance?",
    "options": [
      "Ignore the load until the day of the task",
      "Assess whether the load can be broken down into smaller parts, or if mechanical aids can be used",
      "Always use the heaviest single load possible for efficiency",
      "Avoid any planning at all"
    ],
    "correct": "Assess whether the load can be broken down into smaller parts, or if mechanical aids can be used",
    "explanation": "Planning ahead allows loads to be broken down or mechanical aids arranged, reducing the physical demand and injury risk of manual handling.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What might repeated poor manual handling practice over time lead to?",
    "options": [
      "No long-term effect",
      "Musculoskeletal disorders, such as chronic back pain or joint problems",
      "Improved physical fitness automatically",
      "Better job performance with no downside"
    ],
    "correct": "Musculoskeletal disorders, such as chronic back pain or joint problems",
    "explanation": "Poor manual handling technique repeated over time is a leading cause of musculoskeletal disorders among workers, including chronic back and joint problems.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the purpose of a Direct-On-Line (DOL) starter?",
    "options": [
      "To gradually ramp up motor speed only",
      "To connect a motor directly to full supply voltage to start it",
      "To reverse the direction of a motor only",
      "To measure motor efficiency"
    ],
    "correct": "To connect a motor directly to full supply voltage to start it",
    "explanation": "A DOL starter connects the motor directly across the supply, giving full starting torque but also drawing a high inrush current.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why might a star-delta starter be used instead of DOL for larger motors?",
    "options": [
      "To increase starting current further",
      "To reduce the high starting current drawn compared with DOL, by initially connecting windings in star before switching to delta",
      "To reverse motor rotation only",
      "It has no advantage over DOL"
    ],
    "correct": "To reduce the high starting current drawn compared with DOL, by initially connecting windings in star before switching to delta",
    "explanation": "Star-delta starting reduces the initial voltage (and hence current) applied to motor windings by starting in star configuration before switching to delta for full running conditions.",
    "topic": "Motors and Control"
  },
  {
    "text": "What does an overload relay in a motor starter protect against?",
    "options": [
      "Overvoltage only",
      "Sustained excessive current that could overheat and damage the motor windings",
      "Under-voltage only",
      "Radio interference"
    ],
    "correct": "Sustained excessive current that could overheat and damage the motor windings",
    "explanation": "Overload relays monitor motor current and disconnect the supply if sustained excessive current (e.g. from mechanical overload) risks overheating the windings.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the purpose of a contactor in a motor control circuit?",
    "options": [
      "To provide overcurrent protection only",
      "To electrically switch the motor's supply on and off, often controlled by a lower-power control circuit",
      "To measure motor speed",
      "To convert AC to DC"
    ],
    "correct": "To electrically switch the motor's supply on and off, often controlled by a lower-power control circuit",
    "explanation": "A contactor is an electrically operated switch used to make/break the main power circuit to a motor, typically controlled by a separate low-power control circuit.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the function of a variable frequency drive (VFD) / inverter drive on a motor?",
    "options": [
      "To vary the motor's speed by controlling the frequency (and voltage) supplied to it",
      "To provide only fixed-speed operation",
      "To disconnect the motor permanently",
      "To measure ambient temperature"
    ],
    "correct": "To vary the motor's speed by controlling the frequency (and voltage) supplied to it",
    "explanation": "A VFD controls motor speed by varying the frequency and voltage of the AC supply to the motor, allowing more efficient and flexible operation.",
    "topic": "Motors and Control"
  },
  {
    "text": "What safety consideration is important when working on motor control circuits?",
    "options": [
      "Assume all control circuits are automatically isolated with the main supply",
      "Confirm isolation of both the main power circuit and any separate control voltage supply before working",
      "No isolation procedure is needed for control circuits",
      "Only the contactor needs to be checked"
    ],
    "correct": "Confirm isolation of both the main power circuit and any separate control voltage supply before working",
    "explanation": "Motor control panels can have separate control voltage supplies in addition to the main power circuit, both of which must be confirmed isolated before work.",
    "topic": "Motors and Control"
  },
  {
    "text": "What unit is used to measure illuminance (the amount of light falling on a surface)?",
    "options": [
      "Lumen",
      "Lux",
      "Candela",
      "Watt"
    ],
    "correct": "Lux",
    "explanation": "Illuminance is measured in lux, representing the amount of luminous flux falling on a given surface area.",
    "topic": "Lighting"
  },
  {
    "text": "What unit is used to measure the total light output of a lamp?",
    "options": [
      "Lux",
      "Lumen",
      "Watt",
      "Candela"
    ],
    "correct": "Lumen",
    "explanation": "A lamp's total light output is measured in lumens, describing the total quantity of visible light emitted.",
    "topic": "Lighting"
  },
  {
    "text": "What does a lamp's 'colour temperature' (measured in Kelvin) describe?",
    "options": [
      "Its physical operating temperature",
      "Whether the light appears warm (yellowish) or cool (bluish) in tone",
      "Its energy efficiency",
      "Its lifespan in hours"
    ],
    "correct": "Whether the light appears warm (yellowish) or cool (bluish) in tone",
    "explanation": "Colour temperature, measured in Kelvin, describes the visual warmth or coolness of a light source's appearance, e.g. warm white (~2700K) versus cool white (~6500K).",
    "topic": "Lighting"
  },
  {
    "text": "Why might emergency/task lighting design specify a minimum lux level for a workspace?",
    "options": [
      "To increase energy bills unnecessarily",
      "To ensure sufficient light for people to work safely and see clearly",
      "Lux levels are irrelevant to workplace design",
      "To reduce visibility deliberately"
    ],
    "correct": "To ensure sufficient light for people to work safely and see clearly",
    "explanation": "Minimum lux levels are specified in workplace lighting design to ensure adequate visibility for safe and comfortable working conditions.",
    "topic": "Lighting"
  },
  {
    "text": "What is the main benefit of using occupancy/PIR sensors to control lighting in low-use areas?",
    "options": [
      "Increased energy consumption",
      "Energy savings, by only switching lights on when the area is occupied",
      "Reduced light output regardless of use",
      "No practical benefit"
    ],
    "correct": "Energy savings, by only switching lights on when the area is occupied",
    "explanation": "PIR occupancy sensors switch lighting on only when movement is detected, reducing unnecessary energy use in low-occupancy areas such as corridors or stores.",
    "topic": "Lighting"
  },
  {
    "text": "What is the basic function of an intruder alarm's PIR (passive infrared) detector?",
    "options": [
      "To detect changes in infrared radiation caused by movement, such as a person entering a protected area",
      "To measure smoke density",
      "To detect gas leaks",
      "To measure electrical voltage"
    ],
    "correct": "To detect changes in infrared radiation caused by movement, such as a person entering a protected area",
    "explanation": "PIR detectors sense changes in infrared radiation caused by movement of a warm body, triggering the alarm system if unauthorised movement is detected.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the purpose of a control panel in an intruder alarm system?",
    "options": [
      "To generate light output",
      "To process signals from detectors and control the alarm's response (e.g. sounding sirens, notifying a monitoring centre)",
      "To supply mains power to the whole building",
      "To measure earth resistance"
    ],
    "correct": "To process signals from detectors and control the alarm's response (e.g. sounding sirens, notifying a monitoring centre)",
    "explanation": "The control panel is the central hub of an alarm system, receiving detector signals and initiating the appropriate response such as sounding sirens or sending alerts.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why do many alarm systems include a battery backup?",
    "options": [
      "To increase installation cost with no benefit",
      "So the system continues to operate during a mains power failure",
      "To power lighting circuits",
      "Backup batteries are not used in alarm systems"
    ],
    "correct": "So the system continues to operate during a mains power failure",
    "explanation": "A backup battery ensures the alarm system remains operational and can still detect and report intrusions even if the mains supply fails.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the general principle behind a smoke detector triggering a fire alarm system?",
    "options": [
      "It detects a rise in humidity only",
      "It senses smoke particles in the air, indicating a possible fire, and signals the fire alarm panel",
      "It measures the outside temperature",
      "It relies on a person manually reporting the fire first"
    ],
    "correct": "It senses smoke particles in the air, indicating a possible fire, and signals the fire alarm panel",
    "explanation": "Smoke detectors sense smoke particles using optical or ionisation methods and signal the fire alarm control panel to raise an alarm.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why might CCTV cabling need to be run separately from mains power cabling in some installations?",
    "options": [
      "To reduce interference and maintain good quality video/data signal",
      "There is no benefit to separating them",
      "To reduce cable cost only",
      "CCTV cabling must always share the same conduit as power cabling"
    ],
    "correct": "To reduce interference and maintain good quality video/data signal",
    "explanation": "Keeping CCTV signal cabling away from mains power cabling helps reduce the risk of interference affecting picture or data quality.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the general purpose of the ECS (Electrotechnical Certification Scheme) card?",
    "options": [
      "To provide proof of an individual's occupational competence and qualifications for site access in the electrotechnical industry",
      "To act as a form of payment on site",
      "To replace the need for any training",
      "To identify vehicle parking permissions only"
    ],
    "correct": "To provide proof of an individual's occupational competence and qualifications for site access in the electrotechnical industry",
    "explanation": "The ECS card scheme provides evidence of an individual's qualifications, training and competence, commonly required for access to construction sites in the electrotechnical sector.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why might a principal contractor require all operatives, including electricians, to hold a valid CSCS-recognised card before site access?",
    "options": [
      "To confirm relevant training/competence and support a consistently high standard of health and safety across the site",
      "It is purely a formality with no safety purpose",
      "Only visitors need cards, not workers",
      "It replaces the need for site induction"
    ],
    "correct": "To confirm relevant training/competence and support a consistently high standard of health and safety across the site",
    "explanation": "CSCS-recognised cards (including ECS for electrotechnical workers) help principal contractors confirm that individuals have appropriate training and qualifications before allowing site access.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the general purpose of an apprenticeship in the electrotechnical industry?",
    "options": [
      "To provide a structured combination of on-the-job experience and formal qualification towards becoming a competent electrician",
      "To avoid the need for any assessment",
      "It only involves classroom learning with no practical experience",
      "It has no defined qualification outcome"
    ],
    "correct": "To provide a structured combination of on-the-job experience and formal qualification towards becoming a competent electrician",
    "explanation": "An electrotechnical apprenticeship combines supervised practical experience with formal study, leading to recognised qualifications and competence as an electrician.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why is continuing professional development (CPD) important for a qualified electrician?",
    "options": [
      "Standards, regulations and technology do not change, so CPD has no value",
      "To keep knowledge and skills up to date with changes in standards, regulations, and new technology",
      "It is only relevant to management roles",
      "CPD is optional and provides no professional benefit"
    ],
    "correct": "To keep knowledge and skills up to date with changes in standards, regulations, and new technology",
    "explanation": "CPD helps electricians stay current with evolving regulations (such as BS 7671 amendments), new technologies, and best practice throughout their career.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the purpose of professional body membership, such as with a recognised electrical trade organisation?",
    "options": [
      "It guarantees free tools",
      "It can provide access to technical support, updates on regulations, and demonstrate a commitment to professional standards",
      "It replaces the need for qualifications",
      "It has no relevance to the electrotechnical trade"
    ],
    "correct": "It can provide access to technical support, updates on regulations, and demonstrate a commitment to professional standards",
    "explanation": "Membership of a recognised professional body often provides technical support, regulatory updates, and can help demonstrate a commitment to maintaining professional standards.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the purpose of a functional test on an installation's switches and controls after completion?",
    "options": [
      "To check colour scheme only",
      "To confirm all switches, controls and interlocks operate correctly as intended",
      "To measure cable length",
      "It is not part of initial verification"
    ],
    "correct": "To confirm all switches, controls and interlocks operate correctly as intended",
    "explanation": "Functional testing checks that switches, controls, and interlocks operate correctly, forming part of the initial verification process alongside dead and live testing.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of an Electrical Installation Certificate's 'Schedule of Inspections'?",
    "options": [
      "To record decorative finishes",
      "To confirm specific compliance checks (e.g. correct conductor identification, presence of RCDs) have been carried out",
      "To list staff holiday dates",
      "To record invoice totals"
    ],
    "correct": "To confirm specific compliance checks (e.g. correct conductor identification, presence of RCDs) have been carried out",
    "explanation": "The Schedule of Inspections is a checklist confirming that key compliance items have been verified during the initial verification of an installation.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why must test instruments used for electrical testing be regularly calibrated?",
    "options": [
      "Calibration is not necessary once purchased",
      "To ensure test results remain accurate and reliable",
      "To make the instrument look new",
      "Only new instruments need calibration, forever after that no checks are needed"
    ],
    "correct": "To ensure test results remain accurate and reliable",
    "explanation": "Regular calibration ensures test instruments continue to give accurate readings, which is essential for reliable and safe test results.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What might cause an unexpectedly high insulation resistance reading to be a concern rather than reassuring?",
    "options": [
      "High readings are never a concern",
      "An open circuit or disconnected conductor could also give a very high (infinite) reading, masking a wiring fault",
      "It always indicates a short circuit",
      "It indicates the test instrument is broken"
    ],
    "correct": "An open circuit or disconnected conductor could also give a very high (infinite) reading, masking a wiring fault",
    "explanation": "A very high or infinite insulation resistance reading could also result from an open circuit or disconnection rather than genuinely good insulation, so results should be interpreted carefully.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of an earth electrode resistance test on a TT system?",
    "options": [
      "To measure the resistance of the local earth electrode, ensuring it is low enough to allow protective devices (usually RCDs) to operate correctly",
      "To test cable insulation",
      "To measure supply frequency",
      "To check the colour of bonding conductors"
    ],
    "correct": "To measure the resistance of the local earth electrode, ensuring it is low enough to allow protective devices (usually RCDs) to operate correctly",
    "explanation": "Earth electrode resistance testing on a TT system confirms the electrode provides a sufficiently low resistance path to allow correct operation of RCD protection.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is a common cause of nuisance tripping on an RCD that is otherwise functioning correctly?",
    "options": [
      "Cumulative leakage current from multiple appliances/circuits, or a faulty appliance connected to the circuit",
      "The RCD is too sensitive by design and cannot be fixed",
      "RCDs never trip without a genuine fault",
      "The supply voltage is too low"
    ],
    "correct": "Cumulative leakage current from multiple appliances/circuits, or a faulty appliance connected to the circuit",
    "explanation": "Nuisance tripping can often be traced to cumulative leakage currents from several loads, or a specific faulty appliance causing excess leakage.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is meant by 'discrimination' failing between an upstream MCB and a downstream fuse?",
    "options": [
      "Both devices operate exactly as designed with no issue",
      "The upstream device operates before or at the same time as the downstream device for a fault that should only affect the downstream circuit",
      "It refers to a colour mismatch between devices",
      "It has no practical significance"
    ],
    "correct": "The upstream device operates before or at the same time as the downstream device for a fault that should only affect the downstream circuit",
    "explanation": "A discrimination failure means a fault on a sub-circuit could disconnect a wider part of the installation than necessary, because the upstream device operates too readily.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why is it important to record 'as fitted' information (e.g. actual cable routes, sizes) after completing an installation?",
    "options": [
      "It is not important once work is finished",
      "To assist future maintenance, alterations, or fault-finding by accurately reflecting what was actually installed",
      "Only to satisfy the client's curiosity",
      "As-fitted information is the same as the original design in every case"
    ],
    "correct": "To assist future maintenance, alterations, or fault-finding by accurately reflecting what was actually installed",
    "explanation": "As-fitted records help anyone working on the installation in future understand exactly what was installed, supporting safe maintenance and fault-finding.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is a key reason for carrying out a visual inspection before dead testing an installation?",
    "options": [
      "Visual inspection is not required",
      "To identify obvious defects, damage, or non-compliance that should be addressed before testing, and to confirm the installation is safe to test",
      "To check the colour of the paint on walls",
      "To save time by skipping testing altogether"
    ],
    "correct": "To identify obvious defects, damage, or non-compliance that should be addressed before testing, and to confirm the installation is safe to test",
    "explanation": "A visual inspection identifies visible defects, incorrect connections or non-compliant installation methods that should be addressed before testing proceeds.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of labelling an RCD-protected socket outlet in an older installation with an informative label, per BS 7671 requirements?",
    "options": [
      "To indicate decoration only",
      "To inform users that the socket is protected by an RCD, particularly relevant where not all sockets in an installation are protected",
      "It has no defined purpose",
      "To indicate the socket carries three-phase supply"
    ],
    "correct": "To inform users that the socket is protected by an RCD, particularly relevant where not all sockets in an installation are protected",
    "explanation": "Labelling helps users understand which outlets have additional RCD protection, which is particularly relevant in older installations where RCD protection may not be provided throughout.",
    "topic": "Protective Devices"
  },
  {
    "text": "What might repeated exposure to excessive noise without hearing protection eventually cause?",
    "options": [
      "Improved hearing sensitivity",
      "Permanent, irreversible hearing damage or loss",
      "No lasting effect at all",
      "Only temporary discomfort with guaranteed full recovery"
    ],
    "correct": "Permanent, irreversible hearing damage or loss",
    "explanation": "Repeated exposure to high noise levels without adequate protection can cause permanent, irreversible hearing damage over time.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why should damaged or worn PPE be replaced rather than continued to be used?",
    "options": [
      "Worn PPE still offers full protection",
      "Damaged or worn PPE may no longer provide adequate protection against the hazard it was designed for",
      "Cost is the only consideration",
      "PPE never degrades with use"
    ],
    "correct": "Damaged or worn PPE may no longer provide adequate protection against the hazard it was designed for",
    "explanation": "PPE that is damaged or worn can lose its protective properties, so it should be inspected regularly and replaced when no longer fit for purpose.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the benefit of pre-planning delivery and storage of materials on a construction site?",
    "options": [
      "It has no safety benefit",
      "It reduces manual handling risk, congestion, and potential trip/damage hazards associated with poorly stored materials",
      "It only benefits the site manager's paperwork",
      "Materials should always be stored wherever convenient with no planning"
    ],
    "correct": "It reduces manual handling risk, congestion, and potential trip/damage hazards associated with poorly stored materials",
    "explanation": "Careful planning of material delivery and storage reduces unnecessary manual handling, site congestion, and hazards from poorly stacked or stored materials.",
    "topic": "Site Safety"
  },
  {
    "text": "A component with a resistance of 5.5 Ω carries a current of 3.2 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "26.4",
      "17.6",
      "11.73",
      "23.1"
    ],
    "correct": "17.6",
    "explanation": "V = I × R = 3.2 × 5.5 = 17.6 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A component with a resistance of 70 Ω carries a current of 0.6 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "28",
      "112",
      "63",
      "42"
    ],
    "correct": "42",
    "explanation": "V = I × R = 0.6 × 70 = 42 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A component with a resistance of 9 Ω carries a current of 14 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "84",
      "189",
      "135",
      "126"
    ],
    "correct": "126",
    "explanation": "V = I × R = 14 × 9 = 126 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A component with a resistance of 3.5 Ω carries a current of 7 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "16.33",
      "28",
      "24.5",
      "36.75"
    ],
    "correct": "24.5",
    "explanation": "V = I × R = 7 × 3.5 = 24.5 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A component with a resistance of 90 Ω carries a current of 0.4 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "54",
      "24",
      "126",
      "36"
    ],
    "correct": "36",
    "explanation": "V = I × R = 0.4 × 90 = 36 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A component with a resistance of 90 Ω carries a current of 18 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "2430",
      "1080",
      "1620",
      "1710"
    ],
    "correct": "1620",
    "explanation": "V = I × R = 18 × 90 = 1620 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A component with a resistance of 70 Ω carries a current of 0.4 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "28",
      "18.67",
      "98",
      "42"
    ],
    "correct": "28",
    "explanation": "V = I × R = 0.4 × 70 = 28 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A component with a resistance of 70 Ω carries a current of 1.2 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "154",
      "126",
      "56",
      "84"
    ],
    "correct": "84",
    "explanation": "V = I × R = 1.2 × 70 = 84 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A component with a resistance of 7 Ω carries a current of 16 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "168",
      "119",
      "74.67",
      "112"
    ],
    "correct": "112",
    "explanation": "V = I × R = 16 × 7 = 112 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A component with a resistance of 4.5 Ω carries a current of 3.6 A. What voltage is dropped across it (V = I × R)?",
    "options": [
      "24.3",
      "20.7",
      "10.8",
      "16.2"
    ],
    "correct": "16.2",
    "explanation": "V = I × R = 3.6 × 4.5 = 16.2 V.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the unit of electrical charge?",
    "options": [
      "Coulomb (C)",
      "Watt (W)",
      "Hertz (Hz)",
      "Ohm (Ω)"
    ],
    "correct": "Coulomb (C)",
    "explanation": "Electrical charge is measured in coulombs (C).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'conductance' measure, and what is its unit?",
    "options": [
      "The ease with which current flows, measured in siemens (S)",
      "Charge, measured in coulombs",
      "Resistance, measured in ohms",
      "Power, measured in watts"
    ],
    "correct": "The ease with which current flows, measured in siemens (S)",
    "explanation": "Conductance is the reciprocal of resistance and is measured in siemens (S).",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a purely inductive AC circuit, how does current relate to voltage?",
    "options": [
      "Current leads voltage by 180°",
      "Current lags voltage by 90°",
      "They are in phase",
      "Current leads voltage by 90°"
    ],
    "correct": "Current lags voltage by 90°",
    "explanation": "In a purely inductive circuit, current lags behind the applied voltage by 90°.",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a purely capacitive AC circuit, how does current relate to voltage?",
    "options": [
      "Current lags voltage by 180°",
      "Current lags voltage by 90°",
      "They are always in phase",
      "Current leads voltage by 90°"
    ],
    "correct": "Current leads voltage by 90°",
    "explanation": "In a purely capacitive circuit, current leads the applied voltage by 90°.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is 'impedance' in an AC circuit?",
    "options": [
      "The total opposition to current flow, combining resistance and reactance",
      "Only the capacitive opposition to current",
      "Only the resistive opposition to current",
      "The voltage drop across a resistor only"
    ],
    "correct": "The total opposition to current flow, combining resistance and reactance",
    "explanation": "Impedance (Z) is the combined opposition to current flow from both resistance and reactance in an AC circuit.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'power factor' describe in an AC circuit?",
    "options": [
      "The ratio of voltage to current only",
      "The ratio of real (useful) power to apparent power",
      "The frequency of the supply",
      "The total resistance in a circuit"
    ],
    "correct": "The ratio of real (useful) power to apparent power",
    "explanation": "Power factor is the ratio of real power (kW) to apparent power (kVA), indicating how effectively current is being converted into useful work.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A power factor of 1 (unity) indicates what?",
    "options": [
      "The load is purely inductive",
      "The circuit has no current flowing",
      "The circuit is completely open",
      "Voltage and current are perfectly in phase, so all supplied power is used effectively"
    ],
    "correct": "Voltage and current are perfectly in phase, so all supplied power is used effectively",
    "explanation": "A unity power factor means voltage and current are in phase, so apparent power equals real power.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the difference between 'real power' (kW) and 'apparent power' (kVA)?",
    "options": [
      "Real power is always greater than apparent power",
      "Real power is the power actually doing useful work; apparent power is the total power supplied, including reactive power",
      "Apparent power only applies to DC circuits",
      "There is no difference"
    ],
    "correct": "Real power is the power actually doing useful work; apparent power is the total power supplied, including reactive power",
    "explanation": "Apparent power (kVA) includes both real power (kW, doing useful work) and reactive power (kVAr, exchanged with inductive/capacitive loads).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is 'reactive power' associated with?",
    "options": [
      "Power used exclusively by lighting circuits",
      "Energy stored and released by inductive or capacitive components, not converted to useful work",
      "Only resistive heating effects",
      "DC circuits only"
    ],
    "correct": "Energy stored and released by inductive or capacitive components, not converted to useful work",
    "explanation": "Reactive power (kVAr) is associated with energy exchanged by inductors and capacitors, and does no real work but still loads the supply.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does a low power factor typically indicate about an installation?",
    "options": [
      "There is a fault on every circuit",
      "The installation is using power very efficiently",
      "The supply voltage is too high",
      "Inefficient use of supplied power, often due to inductive loads such as motors"
    ],
    "correct": "Inefficient use of supplied power, often due to inductive loads such as motors",
    "explanation": "A low power factor means a larger proportion of supplied power is reactive rather than doing useful work, which is generally inefficient.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is 'power factor correction' typically used to achieve?",
    "options": [
      "Improving the power factor closer to unity, often using capacitors to offset inductive loads",
      "Increasing the supply voltage",
      "Eliminating the need for earthing",
      "Reducing the number of circuits"
    ],
    "correct": "Improving the power factor closer to unity, often using capacitors to offset inductive loads",
    "explanation": "Power factor correction equipment (often capacitor banks) offsets inductive reactance to bring the power factor closer to 1, improving efficiency.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is Kirchhoff's Current Law (KCL)?",
    "options": [
      "The total current flowing into a junction equals the total current flowing out",
      "Voltage around a loop always sums to zero",
      "Current is always constant regardless of resistance",
      "Power is always conserved in a resistor"
    ],
    "correct": "The total current flowing into a junction equals the total current flowing out",
    "explanation": "KCL states that the sum of currents entering a junction equals the sum of currents leaving it (conservation of charge).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is Kirchhoff's Voltage Law (KVL)?",
    "options": [
      "Voltage is always zero in a series circuit",
      "Current is always equal in every branch",
      "Resistance is always constant with temperature",
      "The sum of voltage drops around any closed loop equals the supply voltage (net EMF)"
    ],
    "correct": "The sum of voltage drops around any closed loop equals the supply voltage (net EMF)",
    "explanation": "KVL states that around any closed loop, the sum of the voltage drops equals the sum of the EMFs (conservation of energy).",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a series circuit, how does current behave through each component?",
    "options": [
      "The current divides between components",
      "The current is the same through every component",
      "The current is always zero",
      "The current only flows through the largest resistor"
    ],
    "correct": "The current is the same through every component",
    "explanation": "In a series circuit there is only one path for current, so the same current flows through every component.",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a parallel circuit, how does voltage behave across each branch?",
    "options": [
      "Only the branch with least resistance has voltage",
      "The voltage divides between branches",
      "Voltage is always zero across parallel branches",
      "The voltage across each parallel branch is the same"
    ],
    "correct": "The voltage across each parallel branch is the same",
    "explanation": "In a parallel circuit, each branch is connected across the same two points, so the voltage across each branch is equal.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What happens to total resistance when more resistors are added in parallel?",
    "options": [
      "Total resistance decreases",
      "Total resistance stays the same",
      "Total resistance increases",
      "Total resistance becomes infinite"
    ],
    "correct": "Total resistance decreases",
    "explanation": "Adding resistors in parallel provides additional paths for current, which reduces the overall (total) resistance of the combination.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What happens to total resistance when more resistors are added in series?",
    "options": [
      "Total resistance becomes zero",
      "Total resistance decreases",
      "Total resistance increases",
      "Total resistance stays the same"
    ],
    "correct": "Total resistance increases",
    "explanation": "In series, resistances simply add together, so adding more resistors increases the total resistance.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'magnetic flux' relate to?",
    "options": [
      "The resistance of a magnetic material",
      "The voltage across a capacitor",
      "The total magnetic field passing through a given area",
      "The current in a purely resistive circuit"
    ],
    "correct": "The total magnetic field passing through a given area",
    "explanation": "Magnetic flux describes the quantity of magnetic field lines passing through a defined area, measured in webers (Wb).",
    "topic": "Electrical Theory"
  },
  {
    "text": "What principle explains how a generator produces electricity?",
    "options": [
      "Ohm's Law",
      "Kirchhoff's Current Law",
      "Electromagnetic induction — a changing magnetic field induces an EMF in a conductor",
      "The photoelectric effect"
    ],
    "correct": "Electromagnetic induction — a changing magnetic field induces an EMF in a conductor",
    "explanation": "Generators work on the principle of electromagnetic induction (Faraday's Law): moving a conductor through a magnetic field, or vice versa, induces an EMF.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'back EMF' refer to in a motor?",
    "options": [
      "The starting current of the motor",
      "The frequency of the supply",
      "An induced voltage opposing the applied supply voltage as the motor's armature rotates",
      "The resistance of the motor windings"
    ],
    "correct": "An induced voltage opposing the applied supply voltage as the motor's armature rotates",
    "explanation": "As a motor's armature rotates in the magnetic field, it generates a back EMF that opposes the applied supply voltage, limiting the current drawn once running.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the approximate speed of an AC induction motor most influenced by (ignoring slip)?",
    "options": [
      "The supply frequency and the number of motor poles",
      "The length of the supply cable only",
      "The colour of the motor casing",
      "The ambient temperature alone"
    ],
    "correct": "The supply frequency and the number of motor poles",
    "explanation": "The synchronous speed of an AC induction motor is determined mainly by the supply frequency and the number of poles in the motor.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the purpose of a periodic inspection and test (EICR)?",
    "options": [
      "To calculate the cost of a project",
      "To design a brand new installation",
      "To replace the need for any future maintenance",
      "To assess the ongoing safety and condition of an existing electrical installation"
    ],
    "correct": "To assess the ongoing safety and condition of an existing electrical installation",
    "explanation": "An Electrical Installation Condition Report (EICR) assesses whether an existing installation remains safe to continue in use, identifying any deterioration, defects or non-compliances.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does a 'C1' classification code on an EICR indicate?",
    "options": [
      "Danger present — risk of injury; immediate remedial action required",
      "A recommendation for future improvement",
      "Full compliance with no issues",
      "A minor cosmetic observation only"
    ],
    "correct": "Danger present — risk of injury; immediate remedial action required",
    "explanation": "C1 indicates a danger is present, requiring immediate action to remove the risk of injury.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does a 'C2' classification code on an EICR indicate?",
    "options": [
      "Potentially dangerous — urgent remedial action required",
      "Improvement recommended",
      "No action needed",
      "Danger present, immediate action required"
    ],
    "correct": "Potentially dangerous — urgent remedial action required",
    "explanation": "C2 indicates a potentially dangerous condition that requires urgent (though not necessarily immediate) remedial action.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does a 'C3' classification code on an EICR indicate?",
    "options": [
      "Improvement recommended, though not a safety non-compliance requiring immediate action",
      "Potentially dangerous, urgent action required",
      "Danger present, immediate action required",
      "The installation cannot be used at all"
    ],
    "correct": "Improvement recommended, though not a safety non-compliance requiring immediate action",
    "explanation": "C3 is a recommendation for improvement, generally referring to something that does not comply with current regulations but is not a direct danger.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of a continuity test on protective conductors?",
    "options": [
      "To test the strength of the consumer unit casing",
      "To check the colour of the cable insulation",
      "To confirm a low-resistance, continuous protective earth path exists throughout the installation",
      "To measure supply voltage only"
    ],
    "correct": "To confirm a low-resistance, continuous protective earth path exists throughout the installation",
    "explanation": "Continuity testing of the circuit protective conductor (CPC) confirms an unbroken, low-resistance earth path, essential for fault protection.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is checked during a Prospective Fault Current (PFC) test?",
    "options": [
      "The total floor area of the building",
      "The number of sockets on a circuit",
      "The maximum current that could flow during a short-circuit or earth fault, to confirm protective devices can safely interrupt it",
      "The colour of the cable sheath"
    ],
    "correct": "The maximum current that could flow during a short-circuit or earth fault, to confirm protective devices can safely interrupt it",
    "explanation": "PFC testing confirms that the fault current a protective device may have to interrupt does not exceed its rated breaking capacity.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why is functional testing carried out on RCDs as part of an inspection?",
    "options": [
      "To confirm the RCD operates (trips) correctly using its integral test button, as part of overall verification",
      "To check the RCD's colour coding",
      "To confirm the size of the consumer unit",
      "To measure the exact voltage of the supply"
    ],
    "correct": "To confirm the RCD operates (trips) correctly using its integral test button, as part of overall verification",
    "explanation": "Functional testing (pressing the test button) confirms the mechanical tripping operation of an RCD works, in addition to instrument-based trip time/current testing.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does the term 'verification' cover, in relation to a new electrical installation?",
    "options": [
      "Only testing, without any visual inspection",
      "Only a visual check with no testing",
      "Simply switching the installation on",
      "Both inspection and testing, to confirm the installation complies with the design and BS 7671"
    ],
    "correct": "Both inspection and testing, to confirm the installation complies with the design and BS 7671",
    "explanation": "Verification comprises both inspection (visual checks) and testing (e.g. continuity, insulation resistance, polarity) to confirm compliance with BS 7671.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What should be checked visually before any test instrument is connected to a circuit?",
    "options": [
      "That the circuit is correctly identified and, where required, safely isolated",
      "Only that the test instrument battery is charged",
      "The brand of test equipment being used",
      "Only the weather conditions"
    ],
    "correct": "That the circuit is correctly identified and, where required, safely isolated",
    "explanation": "Before connecting test equipment, the circuit should be correctly identified, and isolated where the test requires a dead circuit, to avoid danger and inaccurate results.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is an Electrical Installation Certificate (EIC) used for?",
    "options": [
      "To log material costs only",
      "To certify that new electrical installation work has been designed, constructed, inspected and tested to BS 7671",
      "To register a company with Companies House",
      "To record staff training hours"
    ],
    "correct": "To certify that new electrical installation work has been designed, constructed, inspected and tested to BS 7671",
    "explanation": "An EIC is issued for new installation work (or major alterations) to confirm it has been carried out and verified in accordance with BS 7671.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is a Minor Electrical Installation Works Certificate (MEIWC) used for?",
    "options": [
      "To certify minor work that does not include a new circuit, such as adding a socket to an existing circuit",
      "To certify an entire new-build installation",
      "To certify periodic inspection of an existing installation",
      "To certify work on gas appliances"
    ],
    "correct": "To certify minor work that does not include a new circuit, such as adding a socket to an existing circuit",
    "explanation": "An MEIWC is used for minor additions or alterations that do not involve a new circuit, distinct from a full EIC or an EICR.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does a 'zero ohms' reading on a continuity test between line and CPC generally indicate at a socket, when testing correctly (R1+R2 method), before adjustment for cable resistance?",
    "options": [
      "A very low resistance reading confirming a sound, low-impedance protective conductor path",
      "The circuit has no earth connected",
      "The circuit is definitely faulty",
      "There is a short circuit fault present"
    ],
    "correct": "A very low resistance reading confirming a sound, low-impedance protective conductor path",
    "explanation": "A low resistance reading (approaching the calculated design value) on an R1+R2 test indicates a sound, continuous protective conductor path.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why must dead testing (e.g. insulation resistance) always be carried out before live testing on a new circuit?",
    "options": [
      "Dead testing is optional if the installer is experienced",
      "There is no required order for testing",
      "Live testing gives more accurate readings so should always come first",
      "To ensure the circuit is safe to energise, avoiding damage to equipment or danger to the tester"
    ],
    "correct": "To ensure the circuit is safe to energise, avoiding damage to equipment or danger to the tester",
    "explanation": "Dead tests (continuity, insulation resistance, polarity) must be completed and satisfactory before a circuit is energised for live tests, to avoid danger or equipment damage.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What could cause an unexpectedly low insulation resistance reading on a circuit?",
    "options": [
      "A perfectly sound and dry installation",
      "Using the wrong colour of test leads",
      "Testing during daylight hours",
      "Damp conditions, damaged cable insulation, or connected equipment/appliances still in circuit"
    ],
    "correct": "Damp conditions, damaged cable insulation, or connected equipment/appliances still in circuit",
    "explanation": "Low insulation resistance can result from damp, damaged insulation, or loads/equipment left connected during the test, which should normally be disconnected first.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of recording test results on an appropriate schedule (e.g. within an EIC or EICR)?",
    "options": [
      "Test results never need to be recorded",
      "To provide a documented record of the installation's condition/compliance for future reference",
      "Only required for commercial installations, never domestic",
      "To make the paperwork look more official with no real value"
    ],
    "correct": "To provide a documented record of the installation's condition/compliance for future reference",
    "explanation": "Recording test results provides a clear, traceable record of an installation's condition, supporting future maintenance, fault-finding and compliance checks.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is 'derating' of a cable, and why might it be needed?",
    "options": [
      "Removing the cable's insulation entirely",
      "Changing the colour of a cable's outer sheath",
      "Increasing a cable's rated current for marketing purposes",
      "Reducing a cable's current-carrying capacity to account for factors like grouping, ambient temperature or thermal insulation"
    ],
    "correct": "Reducing a cable's current-carrying capacity to account for factors like grouping, ambient temperature or thermal insulation",
    "explanation": "Cables must often be derated (correction factors applied) when installed in conditions that reduce their ability to dissipate heat, such as grouping with other cables or high ambient temperatures.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does 'grouping' of cables refer to, and why does it matter?",
    "options": [
      "Cables of the same colour bundled for appearance only",
      "A method of labelling cables with numbers",
      "Cables buried at different depths",
      "Multiple cables installed close together, which reduces each cable's ability to dissipate heat and so its current rating"
    ],
    "correct": "Multiple cables installed close together, which reduces each cable's ability to dissipate heat and so its current rating",
    "explanation": "When cables are grouped (run closely together), heat dissipation is reduced, so a grouping correction factor must be applied to determine the safe current rating.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the purpose of cable containment systems such as trunking or conduit?",
    "options": [
      "To reduce the number of cables required",
      "To act as the earth conductor in every installation",
      "To increase the voltage of the circuit",
      "To provide mechanical protection and support for cables, and allow for future additions/alterations"
    ],
    "correct": "To provide mechanical protection and support for cables, and allow for future additions/alterations",
    "explanation": "Containment systems like trunking and conduit protect cables from mechanical damage and make it easier to add or replace cables in the future.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the main risk of overloading a cable beyond its rated current-carrying capacity?",
    "options": [
      "There is no risk if the cable is copper",
      "The cable will simply become more efficient",
      "The voltage will automatically reduce to compensate",
      "Overheating, which can damage insulation and create a fire risk"
    ],
    "correct": "Overheating, which can damage insulation and create a fire risk",
    "explanation": "Exceeding a cable's rated current causes it to run hotter than designed, which can degrade insulation and create a serious fire hazard over time.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does 'CSA' stand for when selecting a cable?",
    "options": [
      "Cross-Sectional Area",
      "Circuit Safety Adjustment",
      "Cable Sizing Allowance",
      "Current Safety Assessment"
    ],
    "correct": "Cross-Sectional Area",
    "explanation": "CSA (cross-sectional area) describes the size of a cable's conductor, usually given in mm², and is a key factor in determining its current-carrying capacity.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What generally happens to a cable's current-carrying capacity as its cross-sectional area increases?",
    "options": [
      "It increases, as a larger conductor can carry more current with less resistive heating",
      "It always decreases",
      "It becomes unpredictable",
      "It stays exactly the same regardless of size"
    ],
    "correct": "It increases, as a larger conductor can carry more current with less resistive heating",
    "explanation": "A larger CSA reduces resistance per metre, allowing the cable to carry more current for a given temperature rise.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is 'voltage drop' in a cable, and why is it limited by BS 7671?",
    "options": [
      "An increase in voltage caused by the cable",
      "A type of insulation fault",
      "The reduction in voltage along a cable run due to its resistance, limited to ensure equipment operates correctly at the point of use",
      "A test only relevant to three-phase circuits"
    ],
    "correct": "The reduction in voltage along a cable run due to its resistance, limited to ensure equipment operates correctly at the point of use",
    "explanation": "As current flows through a cable's resistance, voltage is lost along its length; BS 7671 sets maximum permissible voltage drop limits to ensure equipment functions properly.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is a common maximum voltage drop limit (as a guideline) for lighting circuits under BS 7671, from the origin of a single-phase supply?",
    "options": [
      "Approximately 3%",
      "Approximately 0%",
      "Approximately 25%",
      "Approximately 50%"
    ],
    "correct": "Approximately 3%",
    "explanation": "BS 7671 gives guideline voltage drop limits — commonly around 3% for lighting and 5% for other uses, from the origin of the installation, though exact limits should always be checked in the current edition.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does the term 'derating factor Ca' typically account for?",
    "options": [
      "The number of switches on a circuit",
      "Ambient temperature, when it differs from the standard reference temperature used in cable tables",
      "The colour of the cable",
      "The distance from the consumer unit"
    ],
    "correct": "Ambient temperature, when it differs from the standard reference temperature used in cable tables",
    "explanation": "The correction factor Ca adjusts a cable's tabulated current rating to account for ambient temperatures above or below the standard reference temperature.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does the term 'derating factor Cg' typically account for?",
    "options": [
      "The manufacturer of the cable",
      "The colour of the consumer unit",
      "Grouping of cables, when several cables are installed together and cannot dissipate heat as effectively",
      "The type of building the cable is installed in"
    ],
    "correct": "Grouping of cables, when several cables are installed together and cannot dissipate heat as effectively",
    "explanation": "The correction factor Cg accounts for the reduced heat dissipation when cables are grouped together, reducing their combined current-carrying capacity.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is an installation method reference (e.g. 'Method A', 'Method C') used for when selecting cables?",
    "options": [
      "To indicate the length of a circuit only",
      "To identify how a cable is installed (e.g. in conduit, clipped direct), which affects its current rating",
      "To identify the manufacturer of the cable",
      "To describe the colour of the cable insulation"
    ],
    "correct": "To identify how a cable is installed (e.g. in conduit, clipped direct), which affects its current rating",
    "explanation": "BS 7671 categorises installation methods (in insulation, in conduit, clipped direct etc.) because this affects how well a cable can dissipate heat, and therefore its rated capacity.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why might a cable need to be de-rated when installed within thermal insulation?",
    "options": [
      "It only affects the cable's outer colour",
      "Thermal insulation always improves a cable's rating",
      "It has no effect on current rating",
      "Thermal insulation significantly restricts a cable's ability to dissipate heat, requiring a lower current rating or larger cable"
    ],
    "correct": "Thermal insulation significantly restricts a cable's ability to dissipate heat, requiring a lower current rating or larger cable",
    "explanation": "Cables run within or in contact with thermal insulation cannot dissipate heat as effectively, so BS 7671 requires a reduced current rating or an appropriately larger cable.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Who is responsible for ensuring work at height is properly planned, under the Work at Height Regulations 2005?",
    "options": [
      "No one; it is not a legal requirement",
      "The employer (or person in control of the work)",
      "Only the equipment manufacturer",
      "Only the individual worker"
    ],
    "correct": "The employer (or person in control of the work)",
    "explanation": "Employers (and those in control of work at height) are legally responsible for ensuring the work is properly planned, supervised and carried out safely.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be considered when selecting the most appropriate work equipment for a task at height?",
    "options": [
      "Only the cheapest option available",
      "The nature of the task, duration, frequency, and the level of risk involved",
      "Only the colour of the equipment",
      "Only what is already on the van"
    ],
    "correct": "The nature of the task, duration, frequency, and the level of risk involved",
    "explanation": "Selecting suitable equipment for work at height should take account of the specific task, how long/often it will be carried out, and the risks involved.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a key hazard of using a stepladder incorrectly (e.g. standing on the top platform/cap)?",
    "options": [
      "Loss of balance and increased risk of falling, as the top step is often not designed to be stood on",
      "No hazard, as stepladders are always fully safe at any height",
      "It only affects the warranty",
      "It will damage the ladder's paint only"
    ],
    "correct": "Loss of balance and increased risk of falling, as the top step is often not designed to be stood on",
    "explanation": "Manufacturer instructions typically prohibit standing on the very top of a stepladder, as it significantly reduces stability and increases the risk of a fall.",
    "topic": "Work at Height"
  },
  {
    "text": "What does 'existing place of work' generally refer to, in the context of the Work at Height hierarchy?",
    "options": [
      "A place that has never been inspected",
      "A location already safe to work at height without needing additional access equipment, such as a permanent, protected roof edge",
      "Ground-level work only",
      "Any location a worker chooses to stand"
    ],
    "correct": "A location already safe to work at height without needing additional access equipment, such as a permanent, protected roof edge",
    "explanation": "Where a place already provides safe access/egress and protection (e.g. a permanently guarded flat roof), it may be used without additional temporary equipment, following the hierarchy of controls.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the purpose of edge protection on a flat roof being worked on?",
    "options": [
      "To improve the roof's appearance",
      "To prevent workers (and materials) from falling from the roof edge",
      "It is optional and rarely provided in practice",
      "To act as a walking surface only"
    ],
    "correct": "To prevent workers (and materials) from falling from the roof edge",
    "explanation": "Edge protection (guard rails etc.) is a key control measure preventing falls from height when working near an unprotected roof edge.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be checked about the ground/surface before positioning a ladder or stepladder?",
    "options": [
      "Nothing needs to be checked",
      "Only that it is indoors",
      "That it is firm, level and stable, free from hazards that could cause it to slip or tip",
      "Only that it is a convenient distance from the van"
    ],
    "correct": "That it is firm, level and stable, free from hazards that could cause it to slip or tip",
    "explanation": "A ladder must be placed on a firm, level and stable surface to prevent it slipping or tipping during use.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a 'tower scaffold' (mobile access tower) typically used for?",
    "options": [
      "Digging foundations",
      "Storing waste materials only",
      "Providing a safe temporary working platform that can be relocated, for short/medium duration work at height",
      "Permanently supporting a building's structure"
    ],
    "correct": "Providing a safe temporary working platform that can be relocated, for short/medium duration work at height",
    "explanation": "Mobile access towers provide a stable, guarded platform for work at height and can be moved between locations, typically assembled and dismantled following the manufacturer's instructions (e.g. PASMA guidance).",
    "topic": "Work at Height"
  },
  {
    "text": "Why should a mobile tower scaffold never be moved while someone remains on the platform?",
    "options": [
      "It is perfectly safe and commonly recommended",
      "It creates a serious risk of the tower toppling or the person falling",
      "Only relevant for towers above 10 metres",
      "It saves time with no real risk"
    ],
    "correct": "It creates a serious risk of the tower toppling or the person falling",
    "explanation": "Moving a tower scaffold with a person still on the platform significantly increases the risk of instability and falls, and is against standard safe practice (e.g. PASMA guidance).",
    "topic": "Work at Height"
  },
  {
    "text": "What training/certification is commonly associated with the safe use of mobile access towers in the UK?",
    "options": [
      "A driving licence",
      "A first aid certificate",
      "CSCS card only, with no additional training",
      "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) training"
    ],
    "correct": "PASMA (Prefabricated Access Suppliers' and Manufacturers' Association) training",
    "explanation": "PASMA training is widely recognised in the UK for the safe assembly, use, and dismantling of mobile access towers.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be done if weather conditions (e.g. high winds) could affect the safety of work at height?",
    "options": [
      "Weather has no bearing on work at height safety",
      "Work should always continue regardless of conditions",
      "The work should be reviewed/stopped if conditions make it unsafe to continue",
      "Only strong workers should continue in bad weather"
    ],
    "correct": "The work should be reviewed/stopped if conditions make it unsafe to continue",
    "explanation": "Weather conditions such as high wind, rain, or poor visibility can significantly increase the risk of work at height and should be assessed, with work stopped if unsafe.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be used to physically prevent an isolator being switched back on during safe isolation?",
    "options": [
      "A suitable lock (e.g. a unique padlock) fitted to the isolator",
      "Sticky tape only",
      "A verbal warning to colleagues only",
      "Nothing is needed if a sign is displayed"
    ],
    "correct": "A suitable lock (e.g. a unique padlock) fitted to the isolator",
    "explanation": "A physical lock (multi-lock hasp if more than one person is working) should be fitted to the isolator to prevent it being switched back on, in addition to warning signage.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is the purpose of a warning notice/label at the point of isolation?",
    "options": [
      "To advertise the electrician's services",
      "To indicate the circuit's voltage rating only",
      "To inform others that the circuit is isolated and must not be switched back on",
      "To record the date of the last inspection only"
    ],
    "correct": "To inform others that the circuit is isolated and must not be switched back on",
    "explanation": "A warning label communicates to anyone else nearby that the circuit has been deliberately isolated and must not be reconnected.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Why should you identify a circuit using an approved method (e.g. circuit charts, labelling) rather than assumption before isolating it?",
    "options": [
      "Assumption is always accurate enough",
      "It is not important, any nearby switch can be used",
      "Only relevant on very large installations",
      "To ensure the correct circuit is isolated and avoid inadvertently leaving other circuits live or isolating the wrong one"
    ],
    "correct": "To ensure the correct circuit is isolated and avoid inadvertently leaving other circuits live or isolating the wrong one",
    "explanation": "Correct identification avoids isolating the wrong circuit (leaving the intended one live) or unnecessarily isolating unrelated circuits.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What should be done if a circuit cannot be positively identified before isolation?",
    "options": [
      "Proceed on the assumption it is probably correct",
      "Investigate further (e.g. using safe test methods) before proceeding, rather than guessing",
      "Ignore the issue and begin work",
      "Isolate the whole building's supply just in case, without further thought"
    ],
    "correct": "Investigate further (e.g. using safe test methods) before proceeding, rather than guessing",
    "explanation": "If a circuit cannot be confidently identified, further safe investigation is needed rather than guessing, to avoid working on the wrong (potentially live) circuit.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is a 'permit to work' sometimes used for in relation to isolation on complex or multi-occupancy sites?",
    "options": [
      "To grant general access to a building",
      "To formally document and control isolation where multiple people/parties may be affected",
      "To replace the need for a voltage indicator",
      "It is never used in relation to isolation"
    ],
    "correct": "To formally document and control isolation where multiple people/parties may be affected",
    "explanation": "On more complex sites, a permit-to-work system can help formally control and communicate isolation, especially where several people or contractors may be affected.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Why should a voltage indicator used for proving dead comply with GS38 guidance?",
    "options": [
      "GS38 sets out safety requirements for test equipment (e.g. fused leads, finger guards) to protect the user",
      "GS38 only applies to test equipment used in schools",
      "It has no relevance to electrical test equipment",
      "GS38 only applies to test equipment made outside the UK"
    ],
    "correct": "GS38 sets out safety requirements for test equipment (e.g. fused leads, finger guards) to protect the user",
    "explanation": "HSE guidance note GS38 sets out recommendations for the safe design and use of electrical test equipment, including voltage indicators, to protect the user from injury.",
    "topic": "Safe Isolation"
  },
  {
    "text": "If more than one person is working on an isolated circuit, what is commonly used to secure the isolator?",
    "options": [
      "A single shared padlock with one key passed between workers",
      "Only the supervisor needs to apply a lock",
      "No lock is needed if everyone agrees verbally",
      "A multi-lock hasp allowing each individual to fit their own padlock"
    ],
    "correct": "A multi-lock hasp allowing each individual to fit their own padlock",
    "explanation": "A multi-lock hasp allows each person working on the circuit to apply their own individual padlock, ensuring the circuit cannot be reconnected until everyone has removed their lock.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What should happen to isolation locks/labels once work is complete and it is safe to re-energise?",
    "options": [
      "Removed immediately by anyone nearby",
      "They should only be removed by the person(s) who applied them, once work is confirmed complete and safe",
      "Left in place permanently",
      "Removed before the work has actually finished"
    ],
    "correct": "They should only be removed by the person(s) who applied them, once work is confirmed complete and safe",
    "explanation": "Isolation locks and labels should only be removed by the person who fitted them (or with their explicit agreement), once they have confirmed it is safe to restore the supply.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What should you do if you arrive at an isolator that is already locked off by someone else?",
    "options": [
      "Assume it was left on by mistake and proceed",
      "Remove it immediately to continue your own work",
      "Do not remove the lock or attempt to restore the supply; establish who applied it and why",
      "Cut the lock off without checking"
    ],
    "correct": "Do not remove the lock or attempt to restore the supply; establish who applied it and why",
    "explanation": "A lock left by another person indicates work may still be in progress; it should never be removed without confirming with that person that it is safe to do so.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Besides the main isolator, what else should be checked for during safe isolation on some installations?",
    "options": [
      "Only the age of the installation",
      "Nothing else is ever relevant",
      "Alternative or additional sources of supply, such as generators, UPS systems, or other circuits feeding back into the point of work",
      "Only the colour of the consumer unit"
    ],
    "correct": "Alternative or additional sources of supply, such as generators, UPS systems, or other circuits feeding back into the point of work",
    "explanation": "Some installations have alternative supplies (e.g. standby generators, UPS, PV systems) that could still energise a circuit even after the main isolator is off, so these must also be considered and isolated.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What class of hazard do safety boots with a steel/composite toe cap and midsole primarily protect against?",
    "options": [
      "Airborne dust inhalation",
      "Impact and penetration hazards to the foot",
      "Chemical splashes to the face",
      "Electric shock from overhead cables"
    ],
    "correct": "Impact and penetration hazards to the foot",
    "explanation": "Safety boots with reinforced toe caps and midsoles protect against impact (falling objects) and penetration (sharp objects underfoot).",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why might anti-static or ESD-safe footwear be required in certain work environments?",
    "options": [
      "It has no functional purpose",
      "It is purely a fashion requirement",
      "To reduce the build-up of static electricity that could damage sensitive electronic equipment or ignite flammable atmospheres",
      "To make the wearer walk faster"
    ],
    "correct": "To reduce the build-up of static electricity that could damage sensitive electronic equipment or ignite flammable atmospheres",
    "explanation": "Anti-static footwear helps control static build-up in environments where this could damage electronics or pose an ignition risk around flammable substances.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the main purpose of cut-resistant gloves?",
    "options": [
      "To provide protection from electric shock",
      "To improve grip on wet surfaces only",
      "To keep hands warm in cold weather only",
      "To reduce the risk of hand injury when handling sharp materials, blades or edges"
    ],
    "correct": "To reduce the risk of hand injury when handling sharp materials, blades or edges",
    "explanation": "Cut-resistant gloves are designed to reduce the severity of injury from contact with sharp edges, blades, or materials with sharp surfaces.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why is it important that PPE fits the individual correctly?",
    "options": [
      "Ill-fitting PPE may fail to provide adequate protection, or create additional hazards (e.g. reduced dexterity or snagging)",
      "PPE is designed to fit everyone identically",
      "Only helmet size matters; other PPE fit is unimportant",
      "Fit has no bearing on how well PPE protects the wearer"
    ],
    "correct": "Ill-fitting PPE may fail to provide adequate protection, or create additional hazards (e.g. reduced dexterity or snagging)",
    "explanation": "PPE must be suitable for the individual wearer; poor fit can compromise protection or introduce new hazards such as reduced grip, vision, or entanglement risk.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What responsibility does an employer generally have regarding PPE under the PPE at Work Regulations?",
    "options": [
      "To only provide PPE if requested by the worker",
      "PPE provision is entirely optional for employers",
      "To provide suitable PPE free of charge where risks cannot be adequately controlled by other means, and ensure it is maintained",
      "To charge workers for any PPE provided"
    ],
    "correct": "To provide suitable PPE free of charge where risks cannot be adequately controlled by other means, and ensure it is maintained",
    "explanation": "Employers must provide suitable PPE free of charge where other control measures cannot adequately reduce risk, and ensure it is properly maintained, stored and replaced when necessary.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What responsibility does a worker generally have regarding PPE provided to them?",
    "options": [
      "No responsibility at all once it has been issued",
      "Only wear it when a supervisor is watching",
      "Sell or give it away if not needed that day",
      "To use it correctly, look after it, and report any defects or loss"
    ],
    "correct": "To use it correctly, look after it, and report any defects or loss",
    "explanation": "Workers are generally required to use provided PPE correctly, take reasonable care of it, and report any damage, loss, or defects so it can be repaired or replaced.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is a common maximum safe lifting weight guideline (not a legal limit) often referenced for a man lifting close to the body at waist height, straight in front?",
    "options": [
      "Around 100kg",
      "Around 25kg",
      "There is no useful guideline figure at all",
      "Around 5kg"
    ],
    "correct": "Around 25kg",
    "explanation": "HSE manual handling guidance provides indicative weight/posture guideline figures (e.g. around 25kg for a man lifting close to the body at waist height) — these are not strict legal limits but help highlight increasing risk.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why do HSE manual handling guideline weights differ between men and women?",
    "options": [
      "There is no difference in the guideline figures",
      "Guideline figures are based on age only, never gender",
      "The guidance reflects general population data on lifting capability, while individual assessment always remains essential",
      "Women are legally prohibited from lifting any weight"
    ],
    "correct": "The guidance reflects general population data on lifting capability, while individual assessment always remains essential",
    "explanation": "HSE guideline figures reflect general differences in population lifting capability data, but individual capability varies, so a proper task-specific risk assessment is always needed.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is a 'kinetic lift'?",
    "options": [
      "Lifting with straight legs and a bent back",
      "A lifting technique using the legs, with a straight back and the load kept close to the body",
      "A method only used for very light loads",
      "Lifting quickly to reduce time spent bending"
    ],
    "correct": "A lifting technique using the legs, with a straight back and the load kept close to the body",
    "explanation": "The kinetic lift technique uses bent knees, a straight back, and keeps the load close to the body, transferring effort to the stronger leg muscles.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why should twisting the spine while carrying a load be avoided?",
    "options": [
      "Twisting under load significantly increases the risk of back injury",
      "It only affects the shoulders, not the back",
      "Twisting has no effect on injury risk",
      "It only matters for loads over 50kg"
    ],
    "correct": "Twisting under load significantly increases the risk of back injury",
    "explanation": "Twisting the spine while under load places uneven, high stress on the back, significantly increasing the risk of musculoskeletal injury.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What are the three elements commonly described as the 'fire triangle'?",
    "options": [
      "Fuel, smoke and light",
      "Oxygen, water and pressure",
      "Heat, fuel and oxygen",
      "Heat, water and smoke"
    ],
    "correct": "Heat, fuel and oxygen",
    "explanation": "The fire triangle represents the three elements needed for a fire: heat (ignition source), fuel, and oxygen; removing any one can extinguish or prevent a fire.",
    "topic": "Fire Safety"
  },
  {
    "text": "How does a foam fire extinguisher generally work to put out a fire?",
    "options": [
      "It smothers the fire, cutting off the oxygen supply and cooling the fuel",
      "It adds extra oxygen to speed up combustion",
      "It only works by making the area colder, with no smothering effect",
      "It works purely by chemical reaction with the fuel, unrelated to oxygen"
    ],
    "correct": "It smothers the fire, cutting off the oxygen supply and cooling the fuel",
    "explanation": "Foam extinguishers form a blanket over the fuel surface, cutting off the oxygen supply and helping to cool the fire, particularly effective on flammable liquids.",
    "topic": "Fire Safety"
  },
  {
    "text": "What does a fire's 'Class A' classification refer to?",
    "options": [
      "Fires involving electrical equipment",
      "Fires involving ordinary combustible materials, such as wood, paper, and textiles",
      "Fires involving flammable gases",
      "Fires involving flammable liquids"
    ],
    "correct": "Fires involving ordinary combustible materials, such as wood, paper, and textiles",
    "explanation": "Class A fires involve ordinary combustible solids like wood, paper, cloth, and similar materials.",
    "topic": "Fire Safety"
  },
  {
    "text": "What does a fire's 'Class B' classification refer to?",
    "options": [
      "Fires involving cooking oils specifically",
      "Fires involving electrical equipment specifically",
      "Fires involving ordinary combustibles like wood",
      "Fires involving flammable liquids, such as petrol or solvents"
    ],
    "correct": "Fires involving flammable liquids, such as petrol or solvents",
    "explanation": "Class B fires involve flammable liquids, such as petrol, oils (excluding cooking oil, which is Class F), paints and solvents.",
    "topic": "Fire Safety"
  },
  {
    "text": "What does a fire's 'Class C' classification refer to?",
    "options": [
      "Fires involving metals",
      "Fires involving cooking oils",
      "Fires involving electrical equipment specifically",
      "Fires involving flammable gases"
    ],
    "correct": "Fires involving flammable gases",
    "explanation": "Class C fires involve flammable gases such as propane, butane, or methane.",
    "topic": "Fire Safety"
  },
  {
    "text": "What does a fire's 'Class F' classification refer to?",
    "options": [
      "Fires involving electrical equipment",
      "Fires involving cooking oils and fats",
      "Fires involving ordinary combustibles",
      "Fires involving flammable gases"
    ],
    "correct": "Fires involving cooking oils and fats",
    "explanation": "Class F fires specifically involve cooking oils and fats, requiring a wet chemical extinguisher due to the risk of reignition and violent reaction with water.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why is there no official 'Class D' extinguisher rating shown on most standard fire extinguishers in general use?",
    "options": [
      "Class D fires never require an extinguisher of any kind",
      "Class D is simply an outdated classification no longer used",
      "Class D fires cannot occur in the UK",
      "Class D relates to burning metals, which require specialist extinguishing agents not typically found on general-purpose extinguishers"
    ],
    "correct": "Class D relates to burning metals, which require specialist extinguishing agents not typically found on general-purpose extinguishers",
    "explanation": "Class D fires (involving combustible metals such as magnesium) require specialist dry powder extinguishing agents, and are not covered by standard general-purpose extinguishers.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why should you never use a water extinguisher on a fire involving live electrical equipment?",
    "options": [
      "Water has no effect on electrical fires either way",
      "It is only a concern above 1000V",
      "Water extinguishers work best on electrical fires",
      "Water conducts electricity and could cause a serious electric shock to the user"
    ],
    "correct": "Water conducts electricity and could cause a serious electric shock to the user",
    "explanation": "Water is an electrical conductor, so using a water extinguisher on live electrical equipment creates a serious risk of electric shock to the person using it.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is the purpose of a fire evacuation assembly point?",
    "options": [
      "The starting point for a fire drill briefing only, not used in a real fire",
      "A location where the fire brigade parks their vehicles",
      "A safe, designated location away from the building where evacuated people gather so they can be accounted for",
      "A location to store fire extinguishers"
    ],
    "correct": "A safe, designated location away from the building where evacuated people gather so they can be accounted for",
    "explanation": "The assembly point is a pre-agreed safe location where evacuated occupants gather, allowing headcounts to confirm everyone is accounted for.",
    "topic": "Fire Safety"
  },
  {
    "text": "What does 'means of escape' refer to in fire safety?",
    "options": [
      "The building's main entrance used for deliveries",
      "The location of the nearest fire extinguisher only",
      "A synonym for the fire alarm system",
      "The route(s) by which people can safely leave a building in the event of a fire"
    ],
    "correct": "The route(s) by which people can safely leave a building in the event of a fire",
    "explanation": "Means of escape describes the protected route(s) that allow occupants to travel safely from any point in a building to a place of safety in the event of fire.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is the main function of a fuse in a circuit?",
    "options": [
      "To store electrical energy",
      "To increase the voltage of a circuit",
      "To provide earthing for the installation",
      "To melt and break the circuit if current exceeds a safe level, protecting the cable/equipment"
    ],
    "correct": "To melt and break the circuit if current exceeds a safe level, protecting the cable/equipment",
    "explanation": "A fuse contains an element designed to melt and open the circuit if the current exceeds its rated value, protecting cables and equipment from overcurrent.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is a key advantage of an MCB (Miniature Circuit Breaker) over a rewireable fuse?",
    "options": [
      "It cannot protect against overload at all",
      "It can be reset (switched back on) after tripping, rather than needing a replacement fuse wire",
      "It never needs to be replaced under any circumstances",
      "It is always cheaper to manufacture"
    ],
    "correct": "It can be reset (switched back on) after tripping, rather than needing a replacement fuse wire",
    "explanation": "Unlike a rewireable fuse, an MCB can simply be reset after tripping due to overload or short circuit, without needing to fit new fuse wire.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does the 'B', 'C' or 'D' rating on an MCB indicate?",
    "options": [
      "The instantaneous tripping characteristic (multiple of rated current needed to trip quickly, e.g. for short circuits)",
      "The physical size of the MCB only",
      "The colour of the MCB casing",
      "The manufacturer's brand code"
    ],
    "correct": "The instantaneous tripping characteristic (multiple of rated current needed to trip quickly, e.g. for short circuits)",
    "explanation": "MCB type letters (B, C, D) indicate the current multiplier at which the magnetic (instantaneous) trip operates, matched to the type of load — e.g. Type B for general/domestic use, Type C or D for higher inrush current loads.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why might a Type C MCB be selected over a Type B for certain circuits?",
    "options": [
      "Type C tolerates higher inrush/starting currents (e.g. some motors, fluorescent lighting) without nuisance tripping",
      "Type C is only used for lighting circuits under all circumstances",
      "Type C provides no overcurrent protection at all",
      "Type C is always cheaper regardless of application"
    ],
    "correct": "Type C tolerates higher inrush/starting currents (e.g. some motors, fluorescent lighting) without nuisance tripping",
    "explanation": "Type C MCBs have a higher instantaneous trip threshold than Type B, making them more suitable for loads with higher inrush currents that might otherwise cause nuisance tripping.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is the main function of an RCD (Residual Current Device)?",
    "options": [
      "To increase the supply voltage during a fault",
      "To provide overload protection for cables",
      "To rapidly disconnect the supply if it detects an imbalance between line and neutral current, indicating an earth fault",
      "To store energy for backup power"
    ],
    "correct": "To rapidly disconnect the supply if it detects an imbalance between line and neutral current, indicating an earth fault",
    "explanation": "An RCD monitors for a difference between line and neutral current (which indicates current leaking to earth, e.g. through a person) and rapidly disconnects the supply to reduce shock risk.",
    "topic": "Protective Devices"
  },
  {
    "text": "What residual current rating is commonly used for additional protection against electric shock in domestic socket circuits?",
    "options": [
      "3A",
      "30mA",
      "300mA",
      "3mA"
    ],
    "correct": "30mA",
    "explanation": "A 30mA RCD is widely used to provide additional protection against electric shock, as it is generally considered fast/sensitive enough to prevent serious harm from a fault current through a person.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is the purpose of a discrimination (selectivity) between protective devices in a distribution system?",
    "options": [
      "To allow devices to be installed in any random order",
      "To ensure only the device nearest the fault operates, minimising disruption to the rest of the installation",
      "It has no real safety or operational purpose",
      "To ensure every device trips simultaneously during any fault"
    ],
    "correct": "To ensure only the device nearest the fault operates, minimising disruption to the rest of the installation",
    "explanation": "Discrimination ensures that when a fault occurs, only the protective device closest to the fault operates, avoiding unnecessary loss of supply to unaffected parts of the installation.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does 'breaking capacity' of a protective device refer to?",
    "options": [
      "The maximum fault current the device can safely interrupt without being damaged or failing dangerously",
      "The voltage rating printed on the device only",
      "The physical size of the device",
      "The maximum number of times it can be switched on and off"
    ],
    "correct": "The maximum fault current the device can safely interrupt without being damaged or failing dangerously",
    "explanation": "Breaking capacity is the maximum prospective fault current a protective device is rated to safely interrupt, ensuring it can clear even a severe short circuit fault.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why should a protective device never be replaced with one of a higher rating than designed for the circuit?",
    "options": [
      "It has no effect on the circuit's safety",
      "A higher rating always makes the circuit safer",
      "Higher-rated devices are always interchangeable with any circuit",
      "It could allow dangerous overcurrent to flow without tripping, risking cable overheating and fire"
    ],
    "correct": "It could allow dangerous overcurrent to flow without tripping, risking cable overheating and fire",
    "explanation": "Fitting an oversized protective device can allow the cable to be overloaded without the device tripping, risking overheating and potential fire.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why should visitors and new starters always sign in/out on a construction site?",
    "options": [
      "It has no real safety purpose",
      "So that in an emergency, everyone present can be accounted for at the assembly point",
      "Only required for deliveries, not people",
      "It is only used for wage calculations"
    ],
    "correct": "So that in an emergency, everyone present can be accounted for at the assembly point",
    "explanation": "A sign-in/out system helps ensure an accurate headcount of everyone on site, which is essential for confirming everyone is safely accounted for during an emergency evacuation.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of traffic management plans on a construction site?",
    "options": [
      "To decide which contractor parks closest to the site office",
      "To determine delivery invoice amounts",
      "To safely separate vehicles, plant and pedestrians, reducing the risk of collision",
      "They are purely a marketing exercise"
    ],
    "correct": "To safely separate vehicles, plant and pedestrians, reducing the risk of collision",
    "explanation": "Traffic management plans control the movement of vehicles and plant relative to pedestrians on site, reducing the risk of people being struck.",
    "topic": "Site Safety"
  },
  {
    "text": "What should be done before excavation work begins, in relation to underground services?",
    "options": [
      "Only the weather needs to be checked first",
      "Service drawings/records should be checked and, where needed, services located (e.g. using a cable avoidance tool) before digging",
      "Excavation can begin immediately with no checks",
      "Service checks are only needed for excavations over 10 metres deep"
    ],
    "correct": "Service drawings/records should be checked and, where needed, services located (e.g. using a cable avoidance tool) before digging",
    "explanation": "Before digging, existing service records should be reviewed and underground services located using suitable detection equipment, to avoid striking gas, electricity, water or other services.",
    "topic": "Site Safety"
  },
  {
    "text": "What is a common hazard associated with striking a buried electrical cable during excavation?",
    "options": [
      "Only a risk of minor cosmetic damage to tools",
      "Only relevant for cables buried deeper than 5 metres",
      "Risk of serious electric shock, burns, or arc flash to the person operating the excavation equipment or nearby",
      "No real hazard if the cable is old"
    ],
    "correct": "Risk of serious electric shock, burns, or arc flash to the person operating the excavation equipment or nearby",
    "explanation": "Striking a live buried cable can cause severe electric shock, burns, or arc flash injuries, making service location and safe digging practices essential.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of a banksman when reversing vehicles or plant on site?",
    "options": [
      "To guide the vehicle/plant operator safely, watching for pedestrians or obstructions the operator cannot see",
      "To carry out unrelated administrative tasks",
      "To operate the vehicle themselves at all times",
      "It is a purely ceremonial role with no safety function"
    ],
    "correct": "To guide the vehicle/plant operator safely, watching for pedestrians or obstructions the operator cannot see",
    "explanation": "A banksman helps guide vehicle or plant movements, particularly reversing, by watching for hazards or people in blind spots that the operator cannot see.",
    "topic": "Site Safety"
  },
  {
    "text": "Why is site segregation between pedestrians and moving plant important?",
    "options": [
      "It reduces the risk of pedestrians being struck by moving vehicles or machinery",
      "It has no bearing on worker safety",
      "Segregation is only needed at night",
      "It is only relevant to protect the plant from damage"
    ],
    "correct": "It reduces the risk of pedestrians being struck by moving vehicles or machinery",
    "explanation": "Physically separating pedestrian routes from vehicle/plant movement areas significantly reduces the risk of collisions and being struck by moving machinery.",
    "topic": "Site Safety"
  },
  {
    "text": "What should you do if you find broken glass, sharp debris, or other trip hazards in a walkway on site?",
    "options": [
      "Only report it at the end of the week",
      "Step over it and continue, leaving it for others",
      "Ignore it as it is not part of your job role",
      "Report/remove it promptly, or otherwise make the area safe, rather than leaving it for someone else to deal with"
    ],
    "correct": "Report/remove it promptly, or otherwise make the area safe, rather than leaving it for someone else to deal with",
    "explanation": "Anyone who spots a hazard such as debris or a trip risk should act promptly — either removing it if safe to do so, or reporting it so it is dealt with quickly.",
    "topic": "Site Safety"
  },
  {
    "text": "What is a common purpose of site security fencing and hoarding?",
    "options": [
      "To improve site drainage",
      "Only required to block noise",
      "Purely decorative, with no safety benefit",
      "To prevent unauthorised public access to a hazardous construction site"
    ],
    "correct": "To prevent unauthorised public access to a hazardous construction site",
    "explanation": "Site fencing/hoarding restricts unauthorised access by members of the public, protecting them from the hazards present on an active construction site.",
    "topic": "Site Safety"
  },
  {
    "text": "What should be considered when planning deliveries to a busy construction site?",
    "options": [
      "Deliveries can be accepted at any point on site with no planning",
      "Suitable, safe unloading areas and timing to reduce conflict with other site activities and pedestrians",
      "Only the cost of the materials matters",
      "Delivery drivers are solely responsible for all on-site safety"
    ],
    "correct": "Suitable, safe unloading areas and timing to reduce conflict with other site activities and pedestrians",
    "explanation": "Careful planning of delivery times/locations reduces congestion, manual handling risk, and potential conflict between delivery vehicles, plant and pedestrians.",
    "topic": "Site Safety"
  },
  {
    "text": "Why is it important to report defective plant or equipment immediately rather than continuing to use it?",
    "options": [
      "Continuing to use defective plant/equipment increases the risk of an accident or equipment failure",
      "Defective equipment usually becomes safer with continued use",
      "Reporting defects only slows down the job with no real benefit",
      "Only supervisors are allowed to notice defects"
    ],
    "correct": "Continuing to use defective plant/equipment increases the risk of an accident or equipment failure",
    "explanation": "Prompt reporting of defective plant or equipment allows it to be taken out of use and repaired before it causes an accident or fails during use.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of a guard on a bench grinder?",
    "options": [
      "To make the grinder look more professional",
      "To slow the grinding wheel down",
      "Guards are optional accessories with no safety function",
      "To protect the operator from contact with the rotating wheel and from flying debris/sparks"
    ],
    "correct": "To protect the operator from contact with the rotating wheel and from flying debris/sparks",
    "explanation": "Guards on bench grinders protect the operator from accidental contact with the rotating abrasive wheel and from sparks or fragments thrown off during use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why should a cordless power tool's battery be inspected before use?",
    "options": [
      "Only the tool body needs to be checked, never the battery",
      "Battery condition never affects tool safety",
      "Batteries cannot be damaged in normal use",
      "Damaged batteries can pose a fire or explosion risk, and may affect tool performance"
    ],
    "correct": "Damaged batteries can pose a fire or explosion risk, and may affect tool performance",
    "explanation": "Damaged or swollen batteries can present a fire risk and should be checked before use; damaged batteries should be taken out of service.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is the purpose of a torque setting on some power drivers/drills?",
    "options": [
      "To increase the drill's maximum speed only",
      "Torque settings have no functional purpose",
      "To limit the amount of turning force applied, helping prevent over-tightening or damage to fixings/material",
      "To change the colour of the LED work light"
    ],
    "correct": "To limit the amount of turning force applied, helping prevent over-tightening or damage to fixings/material",
    "explanation": "A torque setting allows the clutch to slip once a set turning force is reached, helping avoid over-driving screws or damaging fixings and material.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why should hand tools be regularly inspected for wear, such as worn spanner jaws?",
    "options": [
      "Only power tools need to be inspected, not hand tools",
      "Wear has no effect on how safely a tool can be used",
      "Worn tools are more likely to slip off a fixing, increasing the risk of injury or rounding off the fixing",
      "Worn tools are always more efficient to use"
    ],
    "correct": "Worn tools are more likely to slip off a fixing, increasing the risk of injury or rounding off the fixing",
    "explanation": "Worn hand tools (e.g. spanners with rounded jaws) are more likely to slip during use, increasing the risk of injury to the user and damage to the fixing.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What should be checked on an extension lead/reel before use on site?",
    "options": [
      "Only whether it is long enough for the task",
      "That the cable, plug and socket outlets are undamaged, and that the lead is fully unwound if carrying significant current",
      "Only the colour of the plastic reel",
      "Nothing needs to be checked before use"
    ],
    "correct": "That the cable, plug and socket outlets are undamaged, and that the lead is fully unwound if carrying significant current",
    "explanation": "Extension leads should be visually checked for damage, and should be fully unwound when in use for anything but light, short-duration loads, as a coiled cable can overheat.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why is it important to use the correct drill bit or blade for the material being worked?",
    "options": [
      "The wrong type can cause the tool to bind, kick back, or produce a poor/unsafe result",
      "Any drill bit or blade will work equally well on any material",
      "It only affects the finish, never safety",
      "Only relevant for very hard materials like steel"
    ],
    "correct": "The wrong type can cause the tool to bind, kick back, or produce a poor/unsafe result",
    "explanation": "Using the correct bit or blade for the material reduces the risk of the tool binding, kicking back, or breaking, and gives a safer, more controlled result.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is 'kickback' commonly associated with, in relation to power tools such as circular saws?",
    "options": [
      "A normal, harmless part of routine cutting operations",
      "Only a risk with hand tools, never power tools",
      "A tool feature that improves cutting speed",
      "A sudden, violent movement of the tool/workpiece, often caused by the blade binding or an incorrect cutting technique"
    ],
    "correct": "A sudden, violent movement of the tool/workpiece, often caused by the blade binding or an incorrect cutting technique",
    "explanation": "Kickback is a sudden, forceful reaction (e.g. the saw jumping back towards the operator) usually caused by the blade binding in the material, and is a significant safety hazard.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why should trailing cables from power tools be kept tidy and off walkways where possible?",
    "options": [
      "It only matters for cosmetic reasons",
      "Trailing cables are a trip hazard and can also be damaged by foot traffic or being run over",
      "Cables are always routed automatically by the tool",
      "Cable position has no effect on safety"
    ],
    "correct": "Trailing cables are a trip hazard and can also be damaged by foot traffic or being run over",
    "explanation": "Trailing cables left across walkways create a trip hazard and are also more likely to be damaged, which can create an electrical safety risk.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What should be done with a tool that has failed a pre-use inspection?",
    "options": [
      "Used carefully anyway, as most faults are minor",
      "Left as-is until the next scheduled inspection",
      "It should be taken out of use, clearly labelled as faulty, and reported for repair or replacement",
      "Passed on to a colleague without mentioning the fault"
    ],
    "correct": "It should be taken out of use, clearly labelled as faulty, and reported for repair or replacement",
    "explanation": "A tool that fails inspection should be immediately removed from use and clearly identified as faulty, so it cannot be used again until repaired or replaced.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why might a specific type of PPE (e.g. face shield in addition to safety glasses) be required for certain tool operations, such as using an angle grinder?",
    "options": [
      "Extra PPE is never required for tool use",
      "Only relevant for tools used outdoors",
      "Some tasks create a higher risk of flying debris/sparks that basic eye protection alone may not fully guard against",
      "It is purely a matter of personal preference"
    ],
    "correct": "Some tasks create a higher risk of flying debris/sparks that basic eye protection alone may not fully guard against",
    "explanation": "Higher-risk operations, such as grinding or cutting, can throw off debris and sparks that may not be fully contained by safety glasses alone, so additional face protection may be required by the risk assessment.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is the purpose of welfare facilities such as handwashing stations on a construction site?",
    "options": [
      "Purely a legal formality with no practical use",
      "Only required for office-based staff",
      "They have no real health benefit",
      "To allow workers to maintain good hygiene, reducing the risk of illness or contamination (e.g. before eating)"
    ],
    "correct": "To allow workers to maintain good hygiene, reducing the risk of illness or contamination (e.g. before eating)",
    "explanation": "Handwashing and welfare facilities help prevent the spread of illness and contamination, particularly important before eating or after handling hazardous substances.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is 'Weil's disease' (leptospirosis) associated with, and why might it be relevant on some sites?",
    "options": [
      "It has no connection to construction work",
      "A disease only spread through airborne dust",
      "A disease that can be contracted through contact with water or soil contaminated by rat urine, relevant where rodents may be present",
      "It is only a risk in extremely cold climates"
    ],
    "correct": "A disease that can be contracted through contact with water or soil contaminated by rat urine, relevant where rodents may be present",
    "explanation": "Weil's disease can be contracted through contact with water/soil contaminated by infected rat urine, so awareness and hygiene precautions are important on sites with potential rodent activity, such as sewers or waterways.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What general precaution helps reduce the risk of Weil's disease on relevant sites?",
    "options": [
      "Only wearing a hard hat",
      "Covering cuts/grazes, washing hands before eating, and avoiding contact with potentially contaminated water where possible",
      "No precautions are considered necessary",
      "Avoiding all outdoor work permanently"
    ],
    "correct": "Covering cuts/grazes, washing hands before eating, and avoiding contact with potentially contaminated water where possible",
    "explanation": "Basic hygiene precautions — covering wounds, washing hands, and avoiding unnecessary contact with contaminated water — help reduce the risk of infection.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why is skin exposure to cement or wet concrete a health concern?",
    "options": [
      "Cement has no effect on skin",
      "It is only a concern if swallowed",
      "It only affects the eyes, not the skin",
      "Wet cement is caustic and can cause skin burns or dermatitis with prolonged or repeated contact"
    ],
    "correct": "Wet cement is caustic and can cause skin burns or dermatitis with prolonged or repeated contact",
    "explanation": "Wet cement is alkaline and caustic, and can cause chemical burns or contact dermatitis, particularly with prolonged skin contact, so PPE such as gloves is important.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is 'dermatitis' commonly caused by in a construction context?",
    "options": [
      "It cannot be caused by workplace exposure",
      "Only caused by excessive sunlight exposure",
      "Only affects people who already have sensitive skin, regardless of exposure",
      "Repeated skin contact with irritant substances, such as cement, solvents, or certain oils"
    ],
    "correct": "Repeated skin contact with irritant substances, such as cement, solvents, or certain oils",
    "explanation": "Occupational dermatitis is commonly caused by repeated contact with irritant or sensitising substances found on construction sites, and can be reduced with suitable PPE and hygiene.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why should eating and drinking be avoided in areas where hazardous substances are being used?",
    "options": [
      "It has no bearing on health",
      "Only relevant to substances that smell unpleasant",
      "It is only a workplace tidiness rule",
      "To avoid accidental ingestion of hazardous substances that may have contaminated hands, surfaces, or the air"
    ],
    "correct": "To avoid accidental ingestion of hazardous substances that may have contaminated hands, surfaces, or the air",
    "explanation": "Eating or drinking near hazardous substances risks accidental ingestion via contaminated hands or surfaces, so designated clean areas should be used instead.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is the general purpose of health surveillance in relation to hazardous substances or noise/vibration exposure?",
    "options": [
      "To monitor workers' health over time and detect early signs of work-related ill health",
      "To assess a worker's general fitness for unrelated sports activities",
      "Only required for office-based roles",
      "It has no real purpose beyond record keeping"
    ],
    "correct": "To monitor workers' health over time and detect early signs of work-related ill health",
    "explanation": "Health surveillance monitors for early signs of ill health linked to specific workplace exposures (e.g. hand-arm vibration, noise, certain substances), enabling early intervention.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why might mental health and wellbeing be considered part of an employer's broader health and safety responsibilities?",
    "options": [
      "Work-related stress and poor mental health can affect a person's wellbeing and, in some cases, safety at work",
      "It is solely a personal matter with no employer relevance",
      "Only physical hazards fall under health and safety",
      "Mental health has no connection to workplace safety at all"
    ],
    "correct": "Work-related stress and poor mental health can affect a person's wellbeing and, in some cases, safety at work",
    "explanation": "Modern health and safety practice recognises that stress and poor mental health can affect both wellbeing and safe working behaviour, so many employers now include it within their overall approach.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Under the Health and Safety at Work etc. Act 1974, what must employers provide 'so far as is reasonably practicable'?",
    "options": [
      "A safe working environment, safe systems of work, and adequate information, instruction, training and supervision",
      "Unlimited paid holiday",
      "A company vehicle for every employee",
      "Free transport to and from work"
    ],
    "correct": "A safe working environment, safe systems of work, and adequate information, instruction, training and supervision",
    "explanation": "Section 2 of HASAWA 1974 requires employers to ensure, so far as reasonably practicable, the health, safety and welfare of employees, including safe systems, equipment, and adequate training/supervision.",
    "topic": "Legislation"
  },
  {
    "text": "What does 'so far as is reasonably practicable' generally mean in health and safety law?",
    "options": [
      "It means employers have no legal duty at all",
      "It only applies to risks costing less than a set amount",
      "Risk must always be reduced to zero, no matter the cost",
      "A balance between the level of risk and the cost/effort/time needed to reduce it — not requiring absolute elimination of all risk regardless of cost"
    ],
    "correct": "A balance between the level of risk and the cost/effort/time needed to reduce it — not requiring absolute elimination of all risk regardless of cost",
    "explanation": "'Reasonably practicable' involves weighing the risk against the sacrifice (time, cost, effort) needed to address it, rather than requiring risk to be eliminated entirely regardless of proportionality.",
    "topic": "Legislation"
  },
  {
    "text": "What is the role of the Health and Safety Executive (HSE) in the UK?",
    "options": [
      "A private insurance company",
      "A trade union representing construction workers",
      "A supplier of PPE only",
      "The national regulator responsible for enforcing health and safety law and promoting good practice"
    ],
    "correct": "The national regulator responsible for enforcing health and safety law and promoting good practice",
    "explanation": "The HSE is the UK's health and safety regulator, responsible for enforcing legislation, investigating incidents, and promoting good workplace practice.",
    "topic": "Legislation"
  },
  {
    "text": "What powers does an HSE inspector generally have when visiting a workplace?",
    "options": [
      "Only to fine companies without any inspection",
      "Only to give informal verbal advice with no legal power",
      "To inspect premises, examine records, and issue improvement or prohibition notices where necessary",
      "No powers beyond those of an ordinary member of the public"
    ],
    "correct": "To inspect premises, examine records, and issue improvement or prohibition notices where necessary",
    "explanation": "HSE inspectors can enter and inspect premises, examine documents, and where necessary issue enforcement notices (improvement or prohibition notices) or pursue prosecution.",
    "topic": "Legislation"
  },
  {
    "text": "What is an 'improvement notice' issued by the HSE?",
    "options": [
      "A request for additional paperwork only, with no legal weight",
      "A notice praising good safety practice",
      "A permanent ban on all site activity",
      "A notice requiring specific health and safety improvements to be made within a set timeframe"
    ],
    "correct": "A notice requiring specific health and safety improvements to be made within a set timeframe",
    "explanation": "An improvement notice requires the recipient to remedy a specified contravention of health and safety law within a set period, or face further enforcement action.",
    "topic": "Legislation"
  },
  {
    "text": "What is a 'prohibition notice' issued by the HSE?",
    "options": [
      "A notice stopping a specific activity immediately due to a risk of serious personal injury",
      "A minor administrative reminder",
      "A notice that only applies after 6 months' notice",
      "A notice with no legal enforceability"
    ],
    "correct": "A notice stopping a specific activity immediately due to a risk of serious personal injury",
    "explanation": "A prohibition notice requires an activity presenting a risk of serious injury to stop immediately (or from a specified date), until the risk is adequately addressed.",
    "topic": "Legislation"
  },
  {
    "text": "What does the Provision and Use of Work Equipment Regulations (PUWER) require regarding training?",
    "options": [
      "No training is required if the equipment looks simple to use",
      "That people using work equipment are provided with adequate information, instruction and training",
      "Training is only legally required for equipment over a certain price",
      "Only equipment manufacturers need training"
    ],
    "correct": "That people using work equipment are provided with adequate information, instruction and training",
    "explanation": "PUWER requires that anyone using work equipment has received suitable training, information and instruction relevant to that equipment and its risks.",
    "topic": "Legislation"
  },
  {
    "text": "What is the general purpose of the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations (RIDDOR), beyond individual reporting?",
    "options": [
      "To assign personal blame to the injured worker",
      "To help the HSE and local authorities identify where and how risks arise, informing wider enforcement and prevention efforts",
      "To calculate insurance premiums only",
      "Purely a bureaucratic exercise with no practical use"
    ],
    "correct": "To help the HSE and local authorities identify where and how risks arise, informing wider enforcement and prevention efforts",
    "explanation": "Beyond the immediate reporting duty, RIDDOR data helps regulators identify trends and target enforcement/guidance to reduce future incidents across industries.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of a single-line (schematic) diagram in electrical work?",
    "options": [
      "To show the electrical connections/relationships of a circuit or system in a simplified form, without full physical detail",
      "To record staff working hours",
      "To act as an invoice for materials used",
      "To show the exact physical layout of every cable route"
    ],
    "correct": "To show the electrical connections/relationships of a circuit or system in a simplified form, without full physical detail",
    "explanation": "A single-line diagram simplifies a circuit to show the key electrical relationships and components, useful for understanding how a system is connected without full physical layout detail.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What does a 'wiring diagram' typically show, compared to a schematic?",
    "options": [
      "Only a simplified logical representation with no physical detail",
      "The cost breakdown of the installation",
      "The site's health and safety arrangements",
      "The actual physical connections and layout of wiring between components"
    ],
    "correct": "The actual physical connections and layout of wiring between components",
    "explanation": "A wiring diagram shows the physical arrangement and connection points of components and cables, useful for installation and fault-finding.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why is it important to work from the latest revision of a drawing?",
    "options": [
      "Only the first issued drawing is ever used",
      "All revisions of a drawing are always identical",
      "Revision numbers have no practical significance",
      "Earlier revisions may be outdated and could lead to installing work incorrectly or unsafely"
    ],
    "correct": "Earlier revisions may be outdated and could lead to installing work incorrectly or unsafely",
    "explanation": "Drawings are often revised during a project; using an outdated revision could result in installing work that no longer matches the current design or has since been corrected.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is a 'symbol legend' (or key) on an electrical drawing used for?",
    "options": [
      "To list the drawing's cost",
      "To record the drawing office's opening hours",
      "To explain what each symbol used on the drawing represents",
      "It is purely decorative"
    ],
    "correct": "To explain what each symbol used on the drawing represents",
    "explanation": "A symbol legend/key explains the meaning of the various symbols used throughout a drawing, ensuring it can be correctly interpreted.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why might 'as-built' drawings be produced at the end of a project?",
    "options": [
      "They only record the project's final cost",
      "They are simply a duplicate copy of the original tender drawings",
      "As-built drawings are never required in practice",
      "To accurately record the installation as it was actually constructed, which may differ from the original design drawings"
    ],
    "correct": "To accurately record the installation as it was actually constructed, which may differ from the original design drawings",
    "explanation": "As-built drawings capture any changes made during construction, providing an accurate record of the installation as actually completed, useful for future maintenance.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the purpose of a risk assessment and method statement (RAMS) as a piece of site documentation?",
    "options": [
      "To record the number of tea breaks taken",
      "To document identified hazards, risks, and the safe method of carrying out a specific task",
      "It is only required for office-based work",
      "To act as a marketing document for clients"
    ],
    "correct": "To document identified hazards, risks, and the safe method of carrying out a specific task",
    "explanation": "RAMS documents combine a risk assessment (hazards/risks/controls) with a method statement (safe sequence of work), providing clear guidance for carrying out a task safely.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What might a 'permit to work' document typically specify?",
    "options": [
      "Staff holiday entitlement",
      "Only the name of the client",
      "The scope of work, precautions required, and time limits before it must be reviewed or renewed",
      "The weather forecast for the week"
    ],
    "correct": "The scope of work, precautions required, and time limits before it must be reviewed or renewed",
    "explanation": "A permit to work typically specifies exactly what work is authorised, what precautions must be in place, and how long the permit remains valid before review.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why should site documentation (e.g. test certificates, RAMS) be readily available and retained?",
    "options": [
      "Only required if requested by a member of the public",
      "It should be destroyed as soon as a project finishes",
      "To provide evidence of compliance, support future maintenance, and assist in any investigation if an incident occurs",
      "Documentation has no ongoing value once work is complete"
    ],
    "correct": "To provide evidence of compliance, support future maintenance, and assist in any investigation if an incident occurs",
    "explanation": "Retaining documentation such as test certificates and RAMS provides an evidential record of compliance, supports future maintenance decisions, and may be needed for investigation purposes.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the general purpose of an earthing conductor?",
    "options": [
      "To provide extra lighting circuits",
      "To carry the full load current of the installation under normal conditions",
      "To connect the main earthing terminal to the means of earthing (e.g. the earth electrode or supplier's earth)",
      "To reduce the voltage of the supply"
    ],
    "correct": "To connect the main earthing terminal to the means of earthing (e.g. the earth electrode or supplier's earth)",
    "explanation": "The earthing conductor connects the main earthing terminal to the source of earth (electrode or supply earth), forming a key part of the protective earthing arrangement.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is an 'earth electrode' typically used for?",
    "options": [
      "To provide a connection to the general mass of earth, often required in a TT earthing system",
      "To provide additional lighting",
      "To increase supply voltage",
      "To act as a spare neutral conductor"
    ],
    "correct": "To provide a connection to the general mass of earth, often required in a TT earthing system",
    "explanation": "An earth electrode (e.g. a rod driven into the ground) provides a physical connection to earth, commonly required where the supply does not provide a suitable earth terminal (TT systems).",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What factors can affect the resistance of an earth electrode?",
    "options": [
      "Only the brand of the electrode",
      "Electrode resistance is always fixed regardless of conditions",
      "Soil type/moisture content, electrode depth and length, and the condition of the connection",
      "Only the colour of the electrode"
    ],
    "correct": "Soil type/moisture content, electrode depth and length, and the condition of the connection",
    "explanation": "Earth electrode resistance is influenced by soil resistivity (affected by moisture and composition), the electrode's depth/length, and the quality of its connections.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is meant by 'exposed-conductive-parts' in relation to bonding/earthing?",
    "options": [
      "Only parts specifically painted a warning colour",
      "Conductive parts of electrical equipment that can be touched and could become live under fault conditions (e.g. a metal appliance casing)",
      "Any wooden component of an installation",
      "Any part of a cable's insulation"
    ],
    "correct": "Conductive parts of electrical equipment that can be touched and could become live under fault conditions (e.g. a metal appliance casing)",
    "explanation": "Exposed-conductive-parts are conductive parts of electrical equipment (like a metal casing) that could become live if a fault occurs, and are connected to the protective earthing system.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is meant by 'extraneous-conductive-parts' in relation to bonding?",
    "options": [
      "Cable insulation colour coding",
      "Any plastic conduit used on site",
      "Parts of the consumer unit itself",
      "Conductive parts not part of the electrical installation, but liable to introduce a potential (e.g. metal pipework), which are bonded for safety"
    ],
    "correct": "Conductive parts not part of the electrical installation, but liable to introduce a potential (e.g. metal pipework), which are bonded for safety",
    "explanation": "Extraneous-conductive-parts (e.g. metal water/gas pipework) are not part of the electrical installation but could introduce a dangerous potential, so they are typically bonded to the earthing system.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "Why is effective earthing important for automatic disconnection of supply during a fault?",
    "options": [
      "Earthing is only relevant to lighting circuits",
      "Earthing only matters for cosmetic/appearance reasons",
      "Earthing has no relationship to how quickly a device trips",
      "It provides a low-impedance path for fault current to flow, allowing the protective device to operate quickly"
    ],
    "correct": "It provides a low-impedance path for fault current to flow, allowing the protective device to operate quickly",
    "explanation": "A low-impedance earth fault loop allows sufficient fault current to flow to operate the protective device within the required disconnection time, reducing shock risk.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What might indicate that main bonding is missing or inadequate on an inspection?",
    "options": [
      "The property having new carpets",
      "The consumer unit being a modern type",
      "Metal service pipework not connected to the main earthing terminal via a bonding conductor",
      "All lights in the property working correctly"
    ],
    "correct": "Metal service pipework not connected to the main earthing terminal via a bonding conductor",
    "explanation": "During inspection, checking that incoming metallic services are properly bonded to the main earthing terminal is a key part of assessing an installation's safety.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "Why must supplementary bonding sometimes still be considered in special locations, even where other protective measures like RCDs are in place?",
    "options": [
      "Supplementary bonding replaces the need for any earthing",
      "It is only a cosmetic requirement with no safety function",
      "It is never required if an RCD is fitted",
      "As an additional layer of protection reducing touch voltage between simultaneously accessible parts, particularly in higher-risk areas"
    ],
    "correct": "As an additional layer of protection reducing touch voltage between simultaneously accessible parts, particularly in higher-risk areas",
    "explanation": "Even with RCD protection, supplementary bonding may still be specified in higher-risk locations (subject to the conditions in BS 7671) to further reduce touch voltage risk between conductive parts.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is the purpose of an Automated External Defibrillator (AED)?",
    "options": [
      "To provide oxygen therapy",
      "To analyse a casualty's heart rhythm and deliver a shock if needed, to help restore a normal heartbeat during cardiac arrest",
      "To replace the need for chest compressions entirely",
      "To measure blood pressure only"
    ],
    "correct": "To analyse a casualty's heart rhythm and deliver a shock if needed, to help restore a normal heartbeat during cardiac arrest",
    "explanation": "An AED analyses the heart's rhythm during suspected cardiac arrest and, if appropriate, delivers a controlled shock, used alongside CPR to improve the chances of survival.",
    "topic": "First Aid"
  },
  {
    "text": "What should a first aider generally do if they suspect a casualty has a spinal injury?",
    "options": [
      "Ignore the possibility unless the casualty complains of pain",
      "Move the casualty immediately regardless of injury",
      "Avoid unnecessary movement of the casualty and get expert help, unless movement is essential to protect life",
      "Only relevant for casualties over a certain age"
    ],
    "correct": "Avoid unnecessary movement of the casualty and get expert help, unless movement is essential to protect life",
    "explanation": "Suspected spinal injuries generally require minimal movement to avoid worsening the injury, with specialist medical help sought as a priority, unless there is an immediate life-threatening reason to move them.",
    "topic": "First Aid"
  },
  {
    "text": "What is the purpose of a first aid risk assessment in a workplace?",
    "options": [
      "To decide staff holiday allowances",
      "To determine what first aid provision (kits, trained personnel, facilities) is appropriate for the specific risks present",
      "It has no bearing on the level of first aid provision required",
      "To calculate insurance premiums only"
    ],
    "correct": "To determine what first aid provision (kits, trained personnel, facilities) is appropriate for the specific risks present",
    "explanation": "A first aid needs assessment considers workplace hazards, workforce size, and other factors to determine appropriate first aid equipment, facilities and trained personnel.",
    "topic": "First Aid"
  },
  {
    "text": "What should be recorded after providing first aid treatment to a casualty?",
    "options": [
      "Nothing needs to be recorded",
      "Only if the casualty specifically requests it",
      "Only the casualty's favourite colour",
      "Details of the incident and treatment given, typically in an accident/first aid record"
    ],
    "correct": "Details of the incident and treatment given, typically in an accident/first aid record",
    "explanation": "Recording details of first aid treatment provides a record that can support future reference, RIDDOR reporting where relevant, and identifying any trends in workplace injuries.",
    "topic": "First Aid"
  },
  {
    "text": "What is an important first aid consideration for a casualty who may be suffering from shock (medical shock, not electric shock)?",
    "options": [
      "Keep them warm, reassured, and lying down if possible, and seek medical help promptly",
      "Encourage them to walk around",
      "Give them a hot drink to warm them up quickly",
      "No specific action is needed"
    ],
    "correct": "Keep them warm, reassured, and lying down if possible, and seek medical help promptly",
    "explanation": "A casualty in medical shock should generally be kept warm, reassured, and positioned appropriately (often lying down with legs raised if no other injury prevents this), with prompt medical assistance sought.",
    "topic": "First Aid"
  },
  {
    "text": "Why should a first aider avoid giving an unconscious casualty anything to eat or drink?",
    "options": [
      "Unconscious casualties always need fluids immediately",
      "There is a risk of choking, as the casualty cannot safely swallow or protect their airway",
      "Only relevant if the casualty is diabetic",
      "It has no bearing on their safety"
    ],
    "correct": "There is a risk of choking, as the casualty cannot safely swallow or protect their airway",
    "explanation": "An unconscious casualty cannot safely swallow, so giving food or drink risks choking or the substance entering the airway.",
    "topic": "First Aid"
  },
  {
    "text": "What is the purpose of a first aid kit inspection/restocking routine in the workplace?",
    "options": [
      "Restocking is the sole responsibility of each individual worker",
      "First aid kits never need to be checked once provided",
      "Only required once, when the kit is first purchased",
      "To ensure the kit remains adequately stocked and items are in date and fit for use"
    ],
    "correct": "To ensure the kit remains adequately stocked and items are in date and fit for use",
    "explanation": "Regular checks ensure a first aid kit contains adequate, in-date supplies so it is ready for use when actually needed.",
    "topic": "First Aid"
  },
  {
    "text": "Under what general circumstance should emergency services (999/112) be contacted after a workplace incident?",
    "options": [
      "Only during normal office working hours",
      "Where the injury is serious, life-threatening, or beyond the scope of workplace first aid",
      "Never, as workplace first aid always fully resolves an incident",
      "Only if the site manager gives explicit permission first"
    ],
    "correct": "Where the injury is serious, life-threatening, or beyond the scope of workplace first aid",
    "explanation": "Emergency services should be contacted promptly for serious or life-threatening injuries, or where the situation is beyond what workplace first aid can safely manage.",
    "topic": "First Aid"
  },
  {
    "text": "What is the basic function of a battery energy storage system paired with a solar PV installation?",
    "options": [
      "To replace the need for an inverter entirely in all systems",
      "To convert DC directly into three-phase AC without an inverter",
      "To store surplus generated electricity for later use, e.g. when the sun isn't shining",
      "To increase the panels' electrical output beyond their rated capacity"
    ],
    "correct": "To store surplus generated electricity for later use, e.g. when the sun isn't shining",
    "explanation": "Battery storage systems store excess electricity generated during the day (e.g. from solar PV) so it can be used later, improving self-consumption of generated power.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is a 'grid-tied' (or grid-connected) renewable energy system?",
    "options": [
      "A system that only operates during a power cut",
      "A system that never connects to the public supply under any circumstances",
      "A system with no inverter of any kind",
      "A system connected to the public electricity supply, able to export surplus generation and import power when needed"
    ],
    "correct": "A system connected to the public electricity supply, able to export surplus generation and import power when needed",
    "explanation": "Grid-tied systems remain connected to the public electricity network, allowing surplus renewable generation to be exported and supply to be imported when generation is insufficient.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What does 'off-grid' mean for a renewable energy system?",
    "options": [
      "It means the system cannot use batteries at all",
      "It refers to any system installed outdoors",
      "The system is always more powerful than a grid-tied system",
      "The system operates independently of the public electricity supply, typically relying on batteries for storage"
    ],
    "correct": "The system operates independently of the public electricity supply, typically relying on batteries for storage",
    "explanation": "Off-grid systems are not connected to the public electricity network and must rely on their own generation and storage (e.g. batteries) to meet demand.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is a heat pump primarily used for?",
    "options": [
      "Generating electricity directly from sunlight",
      "Converting AC electricity to DC",
      "Storing electrical energy for later use",
      "Transferring heat from one place to another (e.g. from outside air/ground to inside a building) for space/water heating"
    ],
    "correct": "Transferring heat from one place to another (e.g. from outside air/ground to inside a building) for space/water heating",
    "explanation": "Heat pumps extract heat from a source (air, ground or water) and transfer it to where it's needed, providing an efficient method of space and water heating.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the general difference between an air source and a ground source heat pump?",
    "options": [
      "An air source heat pump extracts heat from outside air; a ground source heat pump extracts heat from the ground via buried pipework",
      "Ground source heat pumps do not require any electricity to operate",
      "Air source heat pumps can only be used for cooling, never heating",
      "There is no meaningful difference between the two"
    ],
    "correct": "An air source heat pump extracts heat from outside air; a ground source heat pump extracts heat from the ground via buried pipework",
    "explanation": "Air source heat pumps draw heat from the outside air, while ground source heat pumps use buried loops to extract heat stored in the ground, which tends to have a more stable temperature.",
    "topic": "Renewable Technology"
  },
  {
    "text": "Why is correct earthing and bonding particularly important for renewable installations such as solar PV and heat pumps?",
    "options": [
      "Only the original installation's earthing matters, not the added equipment",
      "Bonding is only relevant to fossil-fuel heating systems",
      "Renewable equipment never requires earthing",
      "They introduce additional electrical sources/equipment that must be safely integrated into the installation's protective earthing arrangements"
    ],
    "correct": "They introduce additional electrical sources/equipment that must be safely integrated into the installation's protective earthing arrangements",
    "explanation": "Renewable technologies add new electrical generation or equipment to a property, which must be correctly earthed/bonded as part of a compliant, safe overall installation.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is a common reason for carrying out a roof structural assessment before installing solar PV panels?",
    "options": [
      "Roof assessments are never required for PV installations",
      "It is purely an aesthetic consideration",
      "Only relevant for flat roofs, never pitched roofs",
      "To confirm the roof can safely support the additional weight and wind/snow loading of the panels and mounting system"
    ],
    "correct": "To confirm the roof can safely support the additional weight and wind/snow loading of the panels and mounting system",
    "explanation": "Solar PV panels and their mounting systems add extra weight and loading to a roof, so a structural assessment helps confirm the roof can safely support the installation.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is 'net metering' (or export/import metering) generally used to record, for a property with renewable generation?",
    "options": [
      "The number of appliances connected to the supply",
      "The electricity imported from and exported to the grid, to calculate net consumption or any export payments",
      "Only the total floor area of the property",
      "The colour temperature of installed lighting"
    ],
    "correct": "The electricity imported from and exported to the grid, to calculate net consumption or any export payments",
    "explanation": "Import/export metering records how much electricity is drawn from the grid versus how much surplus generation is exported, supporting billing and any export payment schemes.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the function of a contactor in a motor control circuit?",
    "options": [
      "A device that measures motor speed only",
      "A device that converts AC to DC",
      "An electrically operated switch used to make/break the power circuit to the motor, often controlled remotely",
      "A type of protective fuse"
    ],
    "correct": "An electrically operated switch used to make/break the power circuit to the motor, often controlled remotely",
    "explanation": "A contactor is an electrically operated switch that connects/disconnects the motor's power supply, commonly controlled by a separate, lower-power control circuit.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the purpose of an overload relay in a motor circuit?",
    "options": [
      "To protect the motor from sustained overcurrent (overload) conditions that could cause overheating",
      "To act as the motor's only means of isolation",
      "To provide the motor's main power supply",
      "To increase the motor's running speed"
    ],
    "correct": "To protect the motor from sustained overcurrent (overload) conditions that could cause overheating",
    "explanation": "An overload relay monitors motor current and disconnects the circuit if sustained overcurrent occurs, protecting the motor windings from overheating damage.",
    "topic": "Motors and Control"
  },
  {
    "text": "What does 'direct-on-line' (DOL) starting mean for a motor?",
    "options": [
      "The motor never draws more than its rated current at start-up",
      "The motor is connected directly to full supply voltage at start-up, without any current-limiting starting method",
      "The motor is started using a variable frequency drive only",
      "It refers to a method only used for very small fractional-horsepower motors"
    ],
    "correct": "The motor is connected directly to full supply voltage at start-up, without any current-limiting starting method",
    "explanation": "DOL starting connects the motor directly across the full supply voltage, which is simple but results in a high starting (inrush) current compared to reduced-voltage starting methods.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why might a 'star-delta' starting method be used for larger induction motors?",
    "options": [
      "To reduce the starting current/torque compared to direct-on-line starting, by initially connecting the motor windings in star before switching to delta",
      "To permanently reduce the motor's running speed",
      "To convert the motor from AC to DC operation",
      "It has no effect on starting current at all"
    ],
    "correct": "To reduce the starting current/torque compared to direct-on-line starting, by initially connecting the motor windings in star before switching to delta",
    "explanation": "Star-delta starting initially applies reduced voltage to the motor windings (star connection), lowering starting current, before switching to the full delta connection for normal running.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the purpose of a Variable Frequency Drive (VFD) in motor control?",
    "options": [
      "To provide fixed-speed operation only, with no adjustment",
      "To convert the motor to run on battery power only",
      "To act solely as an isolator with no other function",
      "To control the speed (and often torque) of an AC motor by varying the frequency and voltage supplied to it"
    ],
    "correct": "To control the speed (and often torque) of an AC motor by varying the frequency and voltage supplied to it",
    "explanation": "A VFD varies the frequency (and voltage) supplied to an AC motor, allowing its speed to be precisely controlled, which can also improve energy efficiency.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is a 'limit switch' commonly used for in a control circuit?",
    "options": [
      "To measure the ambient temperature only",
      "To act purely as a decorative indicator light",
      "To provide the main power supply to a motor",
      "To detect the position of moving machinery/equipment and signal or stop the circuit accordingly"
    ],
    "correct": "To detect the position of moving machinery/equipment and signal or stop the circuit accordingly",
    "explanation": "Limit switches detect when equipment reaches a defined position (e.g. a door fully open), providing a signal used to control or stop associated machinery.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the function of a 'hold-in' (latching) circuit in basic motor control, using a start/stop pushbutton arrangement?",
    "options": [
      "To keep the contactor energised after the start button is released, using an auxiliary contact from the contactor itself",
      "To act as the motor's overload protection",
      "To prevent the motor from ever being switched off",
      "To increase the motor's starting torque"
    ],
    "correct": "To keep the contactor energised after the start button is released, using an auxiliary contact from the contactor itself",
    "explanation": "A hold-in (latching) circuit uses an auxiliary contact on the contactor, wired in parallel with the start button, so the circuit remains energised once started, until the stop button is pressed or a protective device trips.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why is emergency stop (E-stop) provision often required on machinery with motor-driven moving parts?",
    "options": [
      "Only required on machinery used outdoors",
      "E-stops are only relevant to machines with no moving parts",
      "To allow the machine to be stopped immediately in a dangerous situation, reducing the risk of injury",
      "E-stops are purely decorative and rarely functional"
    ],
    "correct": "To allow the machine to be stopped immediately in a dangerous situation, reducing the risk of injury",
    "explanation": "An emergency stop provides a readily accessible means of immediately stopping potentially dangerous machinery, forming an important part of overall machine safety.",
    "topic": "Motors and Control"
  },
  {
    "text": "What material specification (fire resistance) is generally required for consumer unit enclosures under current UK wiring regulations?",
    "options": [
      "There is no requirement relating to enclosure material",
      "Only wood-cased consumer units are now permitted",
      "Any plastic material is acceptable with no restriction",
      "Non-combustible material, or enclosed in a non-combustible cabinet/enclosure"
    ],
    "correct": "Non-combustible material, or enclosed in a non-combustible cabinet/enclosure",
    "explanation": "Following amendments to BS 7671, consumer units in domestic (dwelling) premises are generally required to have non-combustible enclosures, or be enclosed in a cabinet/enclosure made of non-combustible material, to reduce fire risk.",
    "topic": "Consumer Units"
  },
  {
    "text": "What is the purpose of a main switch on a consumer unit?",
    "options": [
      "To control a single lighting circuit only",
      "To measure the total energy used",
      "To act as the earth connection point",
      "To allow the entire installation (or a defined part of it) to be isolated from the supply in one action"
    ],
    "correct": "To allow the entire installation (or a defined part of it) to be isolated from the supply in one action",
    "explanation": "The main switch allows rapid, single-action isolation of the whole installation (or a defined section), important for emergencies and maintenance.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why might a consumer unit use split-load (dual RCD) or individual RCBO protection, rather than one single RCD for the whole board?",
    "options": [
      "To reduce nuisance/unwanted tripping affecting the whole installation, by limiting the impact of a single earth fault to fewer circuits",
      "It is required purely to reduce the number of circuits allowed",
      "It has no practical benefit over a single whole-board RCD",
      "Individual protection always costs less to install in every case"
    ],
    "correct": "To reduce nuisance/unwanted tripping affecting the whole installation, by limiting the impact of a single earth fault to fewer circuits",
    "explanation": "Splitting circuits across multiple RCDs (or using individual RCBOs) means an earth fault on one circuit is less likely to disconnect every circuit in the installation, improving convenience and, in some cases, safety continuity.",
    "topic": "Consumer Units"
  },
  {
    "text": "What information would you typically expect to find on a consumer unit's circuit chart/directory?",
    "options": [
      "A description of what each circuit supplies, and the rating/type of its protective device",
      "The installer's personal mobile phone number only",
      "The homeowner's insurance policy number",
      "The exact purchase price of the consumer unit"
    ],
    "correct": "A description of what each circuit supplies, and the rating/type of its protective device",
    "explanation": "A circuit chart helps identify what each way in the consumer unit supplies and its protective device rating, supporting safe isolation and fault-finding.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why should spare ways in a consumer unit be suitably blanked off?",
    "options": [
      "Blanking is purely a cosmetic requirement with no safety function",
      "Only relevant in commercial installations, never domestic",
      "Spare ways never need to be covered",
      "To maintain the enclosure's protection against contact with live parts and ingress of foreign objects"
    ],
    "correct": "To maintain the enclosure's protection against contact with live parts and ingress of foreign objects",
    "explanation": "Blanking plates over unused ways help maintain the enclosure's IP rating and prevent accidental contact with live busbars or components.",
    "topic": "Consumer Units"
  },
  {
    "text": "What should be checked regarding a consumer unit's condition as part of a periodic inspection?",
    "options": [
      "Only the colour of the cover",
      "Only whether the consumer unit is a popular brand",
      "Signs of overheating (e.g. discolouration), physical damage, correct labelling, and appropriate enclosure material",
      "The consumer unit's resale value"
    ],
    "correct": "Signs of overheating (e.g. discolouration), physical damage, correct labelling, and appropriate enclosure material",
    "explanation": "A periodic inspection should assess the consumer unit's physical condition (including signs of overheating/damage), correct labelling of circuits, and compliance with current requirements such as enclosure material.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why is reducing energy consumption in a building considered an environmental benefit?",
    "options": [
      "Only relevant to buildings using fossil fuel heating",
      "It only affects the building owner's finances, with no environmental effect",
      "Energy consumption has no link to environmental impact",
      "It reduces the demand for electricity generation, which can lower associated carbon emissions"
    ],
    "correct": "It reduces the demand for electricity generation, which can lower associated carbon emissions",
    "explanation": "Reducing energy consumption reduces demand on the wider electricity grid, which can lower the associated carbon emissions from generation, particularly where fossil fuels are used.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is a general benefit of specifying energy-efficient lighting (e.g. LED) over older, less efficient types?",
    "options": [
      "Energy-efficient lighting cannot be dimmed under any circumstances",
      "LED lighting always produces less light than older technology",
      "There is no meaningful efficiency difference between lighting types",
      "Lower energy consumption for a similar light output, reducing running costs and associated emissions"
    ],
    "correct": "Lower energy consumption for a similar light output, reducing running costs and associated emissions",
    "explanation": "LED lighting typically uses significantly less energy than older lighting technologies for a comparable light output, reducing both running costs and associated carbon emissions.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why should waste materials on site be segregated for recycling where possible?",
    "options": [
      "Recycling is never possible for construction materials",
      "It supports material recovery and reduces the volume of waste sent to landfill",
      "Segregation has no environmental benefit",
      "It is only done to reduce skip hire costs, with no environmental link"
    ],
    "correct": "It supports material recovery and reduces the volume of waste sent to landfill",
    "explanation": "Segregating waste allows suitable materials to be recycled or recovered rather than sent to landfill, reducing environmental impact.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is a general principle behind specifying materials with lower embodied carbon in construction?",
    "options": [
      "Lower embodied carbon materials are always more expensive with no other benefit",
      "It only relates to the material's final colour",
      "Reducing the overall carbon footprint associated with producing, transporting and installing the material",
      "Embodied carbon has no connection to material choice"
    ],
    "correct": "Reducing the overall carbon footprint associated with producing, transporting and installing the material",
    "explanation": "Embodied carbon reflects the emissions associated with a material's full lifecycle up to installation; choosing lower embodied carbon materials can reduce a project's overall environmental impact.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why might a business seek to reduce water usage as part of its environmental responsibilities?",
    "options": [
      "To conserve a limited natural resource and reduce the environmental impact of water treatment/supply",
      "Reducing water usage always increases energy consumption",
      "It is only relevant to businesses located near rivers",
      "Water usage has no environmental relevance"
    ],
    "correct": "To conserve a limited natural resource and reduce the environmental impact of water treatment/supply",
    "explanation": "Water is a valuable, finite resource, and reducing unnecessary usage helps lower the environmental impact associated with its treatment, supply and disposal.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is the general purpose of an Environmental Management System (e.g. aligned with ISO 14001) within a construction business?",
    "options": [
      "It only applies to businesses working exclusively overseas",
      "It is purely a marketing certificate with no practical function",
      "To provide a structured approach to identifying, controlling and improving the business's environmental impacts",
      "It replaces the need for any waste management practices"
    ],
    "correct": "To provide a structured approach to identifying, controlling and improving the business's environmental impacts",
    "explanation": "An environmental management system provides a structured framework for identifying environmental impacts, setting objectives, and continually improving environmental performance.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What does the term 'Cat 6' refer to in structured cabling?",
    "options": [
      "A grade of fibre optic cable",
      "A type of power cable used for lighting circuits",
      "A category of fire alarm cable only",
      "A category of twisted-pair data cable, supporting higher bandwidths than earlier categories such as Cat 5e"
    ],
    "correct": "A category of twisted-pair data cable, supporting higher bandwidths than earlier categories such as Cat 5e",
    "explanation": "Cat 6 (Category 6) is a twisted-pair copper data cable standard offering improved bandwidth and performance compared to earlier categories like Cat 5e, commonly used for structured network cabling.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why is 'crosstalk' a consideration in structured data cabling installation?",
    "options": [
      "Crosstalk (signal interference between adjacent cable pairs) can degrade network performance if cables are not correctly installed/terminated",
      "It only affects fibre optic cabling, never copper",
      "Crosstalk is caused entirely by the cable's colour",
      "Crosstalk has no effect on network performance"
    ],
    "correct": "Crosstalk (signal interference between adjacent cable pairs) can degrade network performance if cables are not correctly installed/terminated",
    "explanation": "Crosstalk describes unwanted signal coupling between adjacent conductors/pairs, which can be minimised through correct cable selection, twisting, and termination practices.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is a key advantage of fibre optic cable over traditional copper data cable for certain applications?",
    "options": [
      "It is always cheaper to install in every situation",
      "It requires no special termination skills or tools",
      "It is generally unaffected by electromagnetic interference and can support longer transmission distances at high bandwidth",
      "It cannot be damaged by bending"
    ],
    "correct": "It is generally unaffected by electromagnetic interference and can support longer transmission distances at high bandwidth",
    "explanation": "Fibre optic cable transmits data as light rather than electrical signals, making it immune to electromagnetic interference and capable of longer high-bandwidth runs compared to copper.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why should data cabling generally be kept separated from power cabling where practical?",
    "options": [
      "Only relevant for cabling installed outdoors",
      "It is purely a labelling convention with no technical basis",
      "Separation has no bearing on data signal quality",
      "To reduce the risk of electromagnetic interference affecting data signal quality"
    ],
    "correct": "To reduce the risk of electromagnetic interference affecting data signal quality",
    "explanation": "Running data cabling too close to power cabling can introduce electromagnetic interference, so appropriate separation (or segregated containment) helps maintain signal integrity.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is a 'patch panel' used for in a structured cabling system?",
    "options": [
      "To act as the main internet connection point for a whole city",
      "To provide a central termination point for cabling, allowing flexible connection/reconfiguration of network points",
      "To supply mains power to network equipment",
      "To provide fire detection for a comms room"
    ],
    "correct": "To provide a central termination point for cabling, allowing flexible connection/reconfiguration of network points",
    "explanation": "A patch panel terminates the fixed cabling runs at a central point, allowing flexible patching (connecting) to active network equipment as needed.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why is correct labelling of structured cabling important?",
    "options": [
      "It allows individual cables/ports to be quickly and accurately identified for testing, patching and fault-finding",
      "It is only relevant for cabling installed by a specific manufacturer",
      "Labelling has no practical benefit once cabling is installed",
      "Labelling is purely an aesthetic requirement"
    ],
    "correct": "It allows individual cables/ports to be quickly and accurately identified for testing, patching and fault-finding",
    "explanation": "Clear, consistent labelling makes it far easier to identify, test, and manage individual cabling runs, particularly important in larger installations with many cables.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is the general purpose of emergency lighting in a building?",
    "options": [
      "To replace the need for a fire alarm system",
      "To provide additional decorative lighting",
      "To provide illumination automatically if the normal lighting supply fails, allowing safe evacuation",
      "To reduce the building's overall energy bill"
    ],
    "correct": "To provide illumination automatically if the normal lighting supply fails, allowing safe evacuation",
    "explanation": "Emergency lighting automatically activates if the normal supply fails, providing enough illumination for occupants to safely evacuate via escape routes.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is 'maintained' emergency lighting?",
    "options": [
      "A type of lighting only used outdoors",
      "Lighting that is never illuminated under normal conditions",
      "Lighting that only operates during scheduled testing",
      "Emergency lighting that is illuminated at all times, both in normal conditions and during a supply failure"
    ],
    "correct": "Emergency lighting that is illuminated at all times, both in normal conditions and during a supply failure",
    "explanation": "Maintained emergency lighting fittings are illuminated continuously, whether the normal supply is present or not, often used in locations such as cinemas or venues that may be in use with dimmed normal lighting.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is 'non-maintained' emergency lighting?",
    "options": [
      "Lighting that is always on, regardless of supply condition",
      "Lighting with no battery backup of any kind",
      "Emergency lighting that only illuminates automatically when the normal supply fails",
      "A type of lighting only used for advertising"
    ],
    "correct": "Emergency lighting that only illuminates automatically when the normal supply fails",
    "explanation": "Non-maintained emergency lighting remains off under normal conditions and only illuminates automatically if the normal lighting supply fails.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is the purpose of routine testing of emergency lighting systems?",
    "options": [
      "Testing has no bearing on the system's reliability",
      "Testing is not required once a system is installed",
      "Only required if requested by the fire brigade during an inspection",
      "To confirm the system will operate correctly and provide adequate duration/illumination if genuinely needed"
    ],
    "correct": "To confirm the system will operate correctly and provide adequate duration/illumination if genuinely needed",
    "explanation": "Regular testing (in line with the relevant standard, e.g. BS 5266) confirms emergency lighting will function correctly and for the required duration during an actual power failure.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is the purpose of photoluminescent (glow-in-the-dark) escape route signage, sometimes used alongside emergency lighting?",
    "options": [
      "It only functions in daylight conditions",
      "To remain visible for a period after light exposure, helping guide people along escape routes if lighting fails",
      "To act as decorative signage with no functional safety purpose",
      "To replace emergency lighting entirely in every building"
    ],
    "correct": "To remain visible for a period after light exposure, helping guide people along escape routes if lighting fails",
    "explanation": "Photoluminescent signage absorbs and later re-emits light, remaining visible for a period in darkness, providing an additional visual aid for escape routes alongside emergency lighting.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "Why must escape route signage be positioned so it remains visible even if smoke is present in the early stages of a fire?",
    "options": [
      "Signage is only ever required at ceiling height",
      "Smoke can obscure normal sightlines, so signage positioned lower or illuminated appropriately helps maintain visibility",
      "Smoke has no effect on how signage should be positioned",
      "It is only a consideration in single-storey buildings"
    ],
    "correct": "Smoke can obscure normal sightlines, so signage positioned lower or illuminated appropriately helps maintain visibility",
    "explanation": "Because smoke tends to rise and can obscure high-level signage, careful positioning and illumination help ensure escape route signage remains visible for as long as possible during an evacuation.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is 'lumens' a measurement of, in relation to lighting?",
    "options": [
      "The total amount of visible light emitted by a source",
      "The physical size of the light fitting",
      "The electrical power consumed by a light fitting",
      "The colour temperature of the light"
    ],
    "correct": "The total amount of visible light emitted by a source",
    "explanation": "Lumens measure the total quantity of visible light output from a source, distinct from the electrical power (watts) it consumes.",
    "topic": "Lighting"
  },
  {
    "text": "What does 'colour temperature' (measured in Kelvin) describe about a light source?",
    "options": [
      "The total light output in lumens",
      "The voltage rating of the light fitting",
      "The physical temperature of the light fitting itself",
      "Whether the light appears warm (yellowish) or cool (bluish white) to the eye"
    ],
    "correct": "Whether the light appears warm (yellowish) or cool (bluish white) to the eye",
    "explanation": "Colour temperature (in Kelvin) describes the visual warmth or coolness of a light source's appearance, not its physical temperature.",
    "topic": "Lighting"
  },
  {
    "text": "What is the general benefit of using dimmable LED drivers/lamps compatible with the installed dimmer switch?",
    "options": [
      "Dimming compatibility only affects the fitting's colour",
      "Compatibility has no bearing on dimming performance",
      "Only relevant for fluorescent lighting, never LED",
      "Ensures smooth, flicker-free dimming and reduces the risk of premature lamp failure"
    ],
    "correct": "Ensures smooth, flicker-free dimming and reduces the risk of premature lamp failure",
    "explanation": "Using LED lamps/drivers specifically designed to work with the installed dimmer helps ensure smooth control and reduces issues such as flicker, buzzing, or reduced lamp life.",
    "topic": "Lighting"
  },
  {
    "text": "What is 'lux' a measurement of?",
    "options": [
      "The electrical current drawn by a fitting",
      "The physical weight of a light fitting",
      "Illuminance — the amount of light falling on a surface, per unit area",
      "The colour of a light source"
    ],
    "correct": "Illuminance — the amount of light falling on a surface, per unit area",
    "explanation": "Lux measures illuminance, i.e. how much light is actually falling on a given surface, which depends on both the light source's output and its distance/positioning.",
    "topic": "Lighting"
  },
  {
    "text": "Why might different areas of a building have different recommended lux levels?",
    "options": [
      "Different tasks and activities require different levels of illumination for safety and comfort",
      "Lux levels are always identical throughout a building by law",
      "Lux recommendations only apply to outdoor areas",
      "It is purely a matter of personal preference with no guidance available"
    ],
    "correct": "Different tasks and activities require different levels of illumination for safety and comfort",
    "explanation": "Recommended lux levels vary by activity — for example, detailed work typically requires higher illuminance than a corridor or storage area — reflecting practical safety and comfort needs.",
    "topic": "Lighting"
  },
  {
    "text": "What is the purpose of photocell (daylight sensing) controls on external lighting?",
    "options": [
      "To automatically switch lighting on/off based on ambient light levels, saving energy",
      "To provide fire detection",
      "To dim internal lighting only",
      "To measure the voltage of the supply"
    ],
    "correct": "To automatically switch lighting on/off based on ambient light levels, saving energy",
    "explanation": "Photocell controls detect ambient light levels and automatically switch external lighting on as it gets dark and off during daylight, helping reduce unnecessary energy use.",
    "topic": "Lighting"
  },
  {
    "text": "What is the purpose of a PIR (Passive Infrared) sensor in an intruder alarm system?",
    "options": [
      "To provide audible warning sounds only",
      "To measure smoke particles in the air",
      "To detect changes in mains voltage",
      "To detect movement by sensing changes in infrared (heat) radiation within its field of view"
    ],
    "correct": "To detect movement by sensing changes in infrared (heat) radiation within its field of view",
    "explanation": "PIR sensors detect movement by sensing changes in infrared radiation (heat) as a person moves through the sensor's field of view, commonly used in intruder alarm systems.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the purpose of a door/window contact (magnetic reed switch) in an intruder alarm system?",
    "options": [
      "To act as the alarm's main siren",
      "To detect when a door or window is opened, triggering the system if armed",
      "To provide backup power to the control panel",
      "To measure the room's temperature"
    ],
    "correct": "To detect when a door or window is opened, triggering the system if armed",
    "explanation": "Reed switch contacts detect the separation of a magnet (on the moving part) from the switch (on the frame) when a door/window opens, signalling the alarm control panel.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the general purpose of a control panel in an intruder alarm system?",
    "options": [
      "To replace the need for any detectors",
      "To provide the property's main power supply",
      "To act purely as a decorative keypad with no real function",
      "To process signals from detectors, manage system arming/disarming, and trigger alarms/notifications as needed"
    ],
    "correct": "To process signals from detectors, manage system arming/disarming, and trigger alarms/notifications as needed",
    "explanation": "The control panel is the central processing unit of an alarm system, monitoring detector inputs, managing arming/disarming, and initiating alarm outputs (sirens, notifications) when triggered.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why might an alarm system be connected to a remote monitoring/receiving centre?",
    "options": [
      "Monitoring centres have no real function beyond marketing",
      "So that a genuine alarm activation can be verified and appropriate action (e.g. contacting keyholders or emergency services) taken",
      "It is only relevant for domestic properties, never commercial",
      "It replaces the need for any on-site detectors"
    ],
    "correct": "So that a genuine alarm activation can be verified and appropriate action (e.g. contacting keyholders or emergency services) taken",
    "explanation": "A monitored connection allows a remote centre to be alerted to alarm activations, supporting verification and appropriate escalation, such as contacting keyholders or the police.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is a common reason for using dual-technology detectors (e.g. combining PIR and microwave) in an intruder alarm system?",
    "options": [
      "They eliminate the need for a control panel",
      "To reduce false alarms by requiring both technologies to detect a genuine event before triggering",
      "Dual-technology detectors always have a shorter detection range",
      "They are used purely to reduce equipment cost"
    ],
    "correct": "To reduce false alarms by requiring both technologies to detect a genuine event before triggering",
    "explanation": "Dual-technology detectors combine two different sensing methods, generally reducing false/nuisance alarms since both technologies typically need to register an event simultaneously.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why is regular testing of an intruder or fire alarm system's battery backup important?",
    "options": [
      "Testing is only required if the mains supply has never failed before",
      "Backup batteries never degrade over time",
      "To ensure the system will continue to operate correctly during a mains power failure",
      "Battery backup is only relevant for systems installed outdoors"
    ],
    "correct": "To ensure the system will continue to operate correctly during a mains power failure",
    "explanation": "Backup batteries can degrade over time, so regular testing helps confirm the system will still function correctly if the mains supply is interrupted.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why is ongoing Continuing Professional Development (CPD) important for electrical/construction professionals?",
    "options": [
      "It helps professionals keep their knowledge and skills up to date with changing regulations, technology and best practice",
      "Once qualified, no further learning is ever required",
      "CPD is purely a formality with no practical benefit",
      "CPD only applies to office-based management roles"
    ],
    "correct": "It helps professionals keep their knowledge and skills up to date with changing regulations, technology and best practice",
    "explanation": "CPD helps tradespeople and professionals stay current with evolving regulations, technologies and best practices throughout their career, supporting continued competence.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the general purpose of a scheme provider (e.g. NICEIC, NAPIT) for electrical contractors in the UK?",
    "options": [
      "To assess and register competent contractors, supporting compliance with Building Regulations Part P and industry standards",
      "To manufacture electrical test equipment",
      "To directly employ every registered electrician",
      "To set national electricity prices"
    ],
    "correct": "To assess and register competent contractors, supporting compliance with Building Regulations Part P and industry standards",
    "explanation": "Competent person scheme providers assess and register electrical contractors, allowing them to self-certify certain notifiable work under Building Regulations (e.g. Part P in England and Wales).",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why might Building Regulations notification (e.g. Part P in England and Wales) be required for certain electrical work?",
    "options": [
      "Notification is required for every single piece of electrical work, however minor",
      "To ensure certain higher-risk domestic electrical work is properly checked/certified for safety compliance",
      "It only applies to commercial properties, never domestic",
      "It has been fully abolished and no longer applies anywhere in the UK"
    ],
    "correct": "To ensure certain higher-risk domestic electrical work is properly checked/certified for safety compliance",
    "explanation": "Building Regulations require notification (or self-certification via a competent person scheme) for certain higher-risk domestic electrical work, helping ensure it meets safety standards.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the general benefit of maintaining a professional, tidy appearance and clear communication when working in a client's home or premises?",
    "options": [
      "It supports client trust/confidence and reflects positively on the tradesperson and their employer",
      "Clients never form an opinion based on conduct or appearance",
      "It has no bearing on how a client perceives the work",
      "Only relevant for very large commercial contracts"
    ],
    "correct": "It supports client trust/confidence and reflects positively on the tradesperson and their employer",
    "explanation": "Professional conduct, communication and tidiness contribute significantly to client confidence and satisfaction, which can affect reputation and future work.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why is it good practice to protect a client's property (e.g. using dust sheets) while carrying out work?",
    "options": [
      "Protecting property has no real benefit",
      "It is only necessary for very expensive properties",
      "Clients are always expected to clean up after tradespeople themselves",
      "To prevent damage or unnecessary mess, maintaining a professional standard of work"
    ],
    "correct": "To prevent damage or unnecessary mess, maintaining a professional standard of work",
    "explanation": "Taking care to protect flooring, furniture and other property with dust sheets or similar reduces the risk of damage and reflects a professional standard of work.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is a general reason for keeping accurate job records and time sheets as a tradesperson?",
    "options": [
      "Only large companies need to keep any job records",
      "Job records serve no practical purpose",
      "Records are only useful for tax purposes, with no other benefit",
      "To support accurate invoicing, warranty/guarantee tracking, and evidence of work carried out if a dispute arises"
    ],
    "correct": "To support accurate invoicing, warranty/guarantee tracking, and evidence of work carried out if a dispute arises",
    "explanation": "Accurate job records support correct invoicing, help track warranties/guarantees, and can provide useful evidence of work carried out if any dispute or query arises later.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why should a padlock used for lock-off be uniquely keyed to the person carrying out the work?",
    "options": [
      "So other trades can borrow it",
      "So only that person can remove it and re-energise the circuit",
      "Because it looks more professional",
      "So it can be shared with the client"
    ],
    "correct": "So only that person can remove it and re-energise the circuit",
    "explanation": "A uniquely keyed padlock ensures only the person who applied it can remove it, preventing anyone else re-energising the circuit while work is in progress.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What should be attached to an isolator once it has been locked off?",
    "options": [
      "A warning notice/caution sign identifying who isolated it and why",
      "Nothing, the lock is enough",
      "A photograph of the circuit",
      "A copy of the test certificate"
    ],
    "correct": "A warning notice/caution sign identifying who isolated it and why",
    "explanation": "A caution notice tells others the circuit is isolated, who isolated it and why, preventing unauthorised reconnection.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Which of the following is NOT an acceptable method of proving a voltage indicator is working before use?",
    "options": [
      "Using a proprietary proving unit",
      "Testing on a known live supply",
      "Assuming it worked last time it was used",
      "Testing on a known source complying with GS38"
    ],
    "correct": "Assuming it worked last time it was used",
    "explanation": "A voltage indicator must be proved immediately before and after use; a previous successful use does not confirm it is working now.",
    "topic": "Safe Isolation"
  },
  {
    "text": "During safe isolation, what should be checked between all live conductors, including neutral to earth?",
    "options": [
      "Insulation resistance only",
      "That the circuit is dead using a proved voltage indicator",
      "Cable colour coding",
      "Loop impedance"
    ],
    "correct": "That the circuit is dead using a proved voltage indicator",
    "explanation": "Every combination of live conductors, including neutral to earth, must be tested dead as part of a thorough safe isolation procedure.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Who should normally hold the key to a lock-off device during a job?",
    "options": [
      "The site manager",
      "The person who applied the lock-off and is carrying out the work",
      "Any available electrician",
      "The client"
    ],
    "correct": "The person who applied the lock-off and is carrying out the work",
    "explanation": "The person doing the work should retain sole control of the key so isolation cannot be undone without their knowledge.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is the purpose of a multi-lock hasp during isolation?",
    "options": [
      "To allow several people working on the same circuit to each apply their own lock",
      "To make the isolator look secure",
      "To speed up reconnection",
      "To replace the need for a caution notice"
    ],
    "correct": "To allow several people working on the same circuit to each apply their own lock",
    "explanation": "A multi-lock hasp lets multiple workers each fit their own padlock, so the isolator cannot be reinstated until everyone has removed theirs.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Before isolating a circuit, what should be consulted to correctly identify it?",
    "options": [
      "Circuit charts, labelling and distribution board schedules",
      "The colour of the cable insulation only",
      "The size of the consumer unit",
      "Guesswork based on circuit location"
    ],
    "correct": "Circuit charts, labelling and distribution board schedules",
    "explanation": "Accurate identification relies on circuit charts, labels and schedules rather than assumption, reducing the risk of isolating the wrong circuit.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What risk is created if a circuit is isolated but not proved dead before work begins?",
    "options": [
      "No risk, isolation alone is sufficient",
      "The circuit may still be live due to backfeeds or wiring errors",
      "The isolator may become damaged",
      "The test instrument may be damaged"
    ],
    "correct": "The circuit may still be live due to backfeeds or wiring errors",
    "explanation": "Isolating a supply does not guarantee it is dead; backfeeds, wiring errors or parallel supplies can leave a circuit live, so proving dead is essential.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Which document should be referred to for guidance on safe isolation procedures in the UK electrical industry?",
    "options": [
      "HSE Electricity at Work Regulations guidance and industry safe isolation procedure",
      "The manufacturer's warranty card",
      "A general risk assessment for manual handling",
      "The building's fire evacuation plan"
    ],
    "correct": "HSE Electricity at Work Regulations guidance and industry safe isolation procedure",
    "explanation": "Safe isolation procedures are underpinned by the Electricity at Work Regulations 1989 and associated HSE and industry guidance.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What should be done if, after locking off, someone else attempts to remove your lock without authorisation?",
    "options": [
      "Ignore it and continue working",
      "Report it immediately as this compromises the safety of everyone on site",
      "Add a second padlock only",
      "Reconnect the supply yourself"
    ],
    "correct": "Report it immediately as this compromises the safety of everyone on site",
    "explanation": "Tampering with a lock-off device is a serious safety breach and must be reported immediately, as it could result in someone working on a live circuit.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Which of these is an example of a point of isolation for a final circuit?",
    "options": [
      "The circuit breaker or fuse for that specific circuit at the distribution board",
      "The main switch of a neighbouring property",
      "A plug socket downstream of the circuit",
      "The client's mobile phone"
    ],
    "correct": "The circuit breaker or fuse for that specific circuit at the distribution board",
    "explanation": "The correct point of isolation is the device controlling that specific circuit, typically its breaker or fuse at the distribution board.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Why is it good practice to test a socket outlet is dead using a load, such as a socket tester, in addition to a voltage indicator?",
    "options": [
      "It is not necessary if a voltage indicator has been used",
      "It gives extra confirmation, since a high-impedance fault could otherwise give a false 'dead' reading",
      "It saves time overall",
      "It replaces the need for locking off"
    ],
    "correct": "It gives extra confirmation, since a high-impedance fault could otherwise give a false 'dead' reading",
    "explanation": "A loaded test can reveal certain faults, such as a broken neutral, that a simple high-impedance voltage indicator reading might miss.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What could a low insulation resistance reading between line and earth indicate?",
    "options": [
      "Damaged or deteriorating insulation, or moisture ingress creating a leakage path",
      "That the circuit is perfectly healthy",
      "That the wrong colour cable has been used",
      "That the RCD is faulty"
    ],
    "correct": "Damaged or deteriorating insulation, or moisture ingress creating a leakage path",
    "explanation": "A low insulation resistance reading suggests the insulation has broken down or become damp, creating an unwanted leakage path to earth.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "According to BS 7671, what is the minimum acceptable insulation resistance value for a 230V circuit tested at 500V DC (new installation)?",
    "options": [
      "0.5 megohm",
      "1 megohm",
      "1 ohm",
      "10 megohm"
    ],
    "correct": "1 megohm",
    "explanation": "For low voltage circuits up to 500V, BS 7671 specifies a minimum insulation resistance of 1 megohm when tested at 500V DC.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does a continuity test of protective conductors confirm?",
    "options": [
      "That there is a low resistance, continuous protective earth path throughout the installation",
      "That the supply voltage is correct",
      "That RCDs will trip within time",
      "That cables are the correct colour"
    ],
    "correct": "That there is a low resistance, continuous protective earth path throughout the installation",
    "explanation": "Continuity testing of protective conductors ensures there is an unbroken, low-resistance path back to the earthing point, essential for fault protection.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Which test method is commonly used to verify ring final circuit continuity and correct wiring?",
    "options": [
      "The R1+R2 method only",
      "The figure-of-eight (crossover) test",
      "Insulation resistance testing only",
      "RCD trip time testing"
    ],
    "correct": "The figure-of-eight (crossover) test",
    "explanation": "The figure-of-eight test cross-connects the ends of a ring circuit to verify continuity and detect wiring faults such as interconnections or breaks.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is 'earth fault loop impedance' (Zs) a measure of?",
    "options": [
      "The total impedance of the earth fault loop, used to check protective devices will operate within required disconnection times",
      "The resistance of the neutral conductor alone",
      "The voltage drop under normal load",
      "The capacitance between line and earth"
    ],
    "correct": "The total impedance of the earth fault loop, used to check protective devices will operate within required disconnection times",
    "explanation": "Zs is the total impedance of the fault current path; a sufficiently low Zs ensures the protective device disconnects quickly enough in a fault.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What must be done to an RCD as part of periodic or initial testing?",
    "options": [
      "Visually inspect it only",
      "Functionally test it and verify its trip time at rated residual current",
      "Remove it from the consumer unit",
      "Replace it regardless of condition"
    ],
    "correct": "Functionally test it and verify its trip time at rated residual current",
    "explanation": "RCDs must be functionally tested using the integral test button and have their trip time verified with a suitable RCD tester.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why is a visual inspection carried out before any dead or live testing begins?",
    "options": [
      "To identify obvious damage, defects or non-compliance before testing, and to confirm it is safe to test",
      "It is not required if testing is being done",
      "To save time by skipping isolation",
      "To check paintwork only"
    ],
    "correct": "To identify obvious damage, defects or non-compliance before testing, and to confirm it is safe to test",
    "explanation": "Visual inspection comes first so obvious defects, damage or unsafe conditions are identified before energising or testing the installation.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What document is typically issued on completion of testing for a new electrical installation?",
    "options": [
      "An Electrical Installation Certificate (EIC)",
      "A COSHH assessment",
      "A method statement",
      "A fire risk assessment"
    ],
    "correct": "An Electrical Installation Certificate (EIC)",
    "explanation": "An EIC records the design, construction, inspection and testing of a new installation and confirms it complies with BS 7671.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of a Polarity test?",
    "options": [
      "To confirm the line, neutral and earth conductors are connected correctly throughout the installation",
      "To measure supply frequency",
      "To check cable insulation thickness",
      "To test RCD sensitivity"
    ],
    "correct": "To confirm the line, neutral and earth conductors are connected correctly throughout the installation",
    "explanation": "Polarity testing verifies that line conductors are connected to the correct terminals throughout, avoiding hazards such as reversed polarity.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does 'Zdb' or external earth fault loop impedance (Ze) represent?",
    "options": [
      "The impedance of the earth fault loop external to the installation, from the transformer to the origin",
      "The resistance of a single socket outlet",
      "The impedance of a ring final circuit only",
      "The total installation impedance including all circuits"
    ],
    "correct": "The impedance of the earth fault loop external to the installation, from the transformer to the origin",
    "explanation": "Ze is the impedance of the part of the earth fault loop external to the installation, measured at the origin before any load is connected.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is a Periodic Inspection and Testing report used for?",
    "options": [
      "To assess the condition of an existing electrical installation and identify any defects or deterioration",
      "To design a brand new installation",
      "To calculate cable sizes for a new build",
      "To replace the need for an EIC on new work"
    ],
    "correct": "To assess the condition of an existing electrical installation and identify any defects or deterioration",
    "explanation": "Periodic inspection assesses an existing installation's condition, recording findings and any defects on an Electrical Installation Condition Report (EICR).",
    "topic": "Testing and Inspection"
  },
  {
    "text": "On an EICR, what does a 'C1' classification code typically indicate?",
    "options": [
      "An observation for future improvement only",
      "Danger present, risk of injury, requiring immediate remedial action",
      "A recommendation with no urgency",
      "That the installation fully complies with current standards"
    ],
    "correct": "Danger present, risk of injury, requiring immediate remedial action",
    "explanation": "A C1 code on an EICR means there is a danger present and immediate action is required to remove the risk of injury.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is meant by 'prospective fault current' (PFC)?",
    "options": [
      "The maximum current that could flow in the event of a fault of negligible impedance",
      "The normal running current of a circuit",
      "The current drawn by a single appliance",
      "The rated current of the main switch only"
    ],
    "correct": "The maximum current that could flow in the event of a fault of negligible impedance",
    "explanation": "Prospective fault current is the highest current that would flow if a fault of negligible impedance occurred, used to check devices can safely interrupt it.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why must test instruments used for electrical testing be calibrated?",
    "options": [
      "To ensure the readings they give are accurate and can be relied upon",
      "Calibration is optional for experienced electricians",
      "To make the instrument look newer",
      "Only insulation testers require calibration"
    ],
    "correct": "To ensure the readings they give are accurate and can be relied upon",
    "explanation": "Regular calibration ensures test instruments give accurate, trustworthy readings, which is essential for safe and compliant testing.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What should be done immediately after completing dead testing and before energising the installation?",
    "options": [
      "Nothing further is needed",
      "Remove locks and warning notices only once it is confirmed safe, then carry out live tests such as polarity confirmation and functional checks",
      "Immediately hand over to the client without further checks",
      "Disconnect the earthing system"
    ],
    "correct": "Remove locks and warning notices only once it is confirmed safe, then carry out live tests such as polarity confirmation and functional checks",
    "explanation": "Once dead testing is satisfactorily complete, the installation can be safely re-energised and further live tests and functional checks carried out.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is a supplementary bonding conductor typically used for?",
    "options": [
      "Connecting exposed and extraneous-conductive-parts together in locations of increased risk, such as bathrooms",
      "Connecting the meter to the consumer unit",
      "Replacing the main earthing conductor",
      "Supplying power to a shower"
    ],
    "correct": "Connecting exposed and extraneous-conductive-parts together in locations of increased risk, such as bathrooms",
    "explanation": "Supplementary bonding equalises potential between exposed and extraneous-conductive-parts in higher-risk locations like bathrooms, where main bonding alone may not be enough.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "In a TN-S earthing system, where does the earth return path come from?",
    "options": [
      "The metallic sheath of the supply cable back to the transformer",
      "A local earth electrode driven into the ground",
      "The neutral conductor of the supply",
      "There is no earth return path in TN-S"
    ],
    "correct": "The metallic sheath of the supply cable back to the transformer",
    "explanation": "In TN-S systems, the earth path is provided by the metallic sheath/armour of the supply cable, connected back to the source's earth.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What distinguishes a TT earthing system from a TN system?",
    "options": [
      "TT relies on a local earth electrode at the installation rather than a metallic earth path back to the supply",
      "TT has no earthing at all",
      "TT is only used for three-phase supplies",
      "TT uses the neutral as the earth"
    ],
    "correct": "TT relies on a local earth electrode at the installation rather than a metallic earth path back to the supply",
    "explanation": "TT systems use a locally installed earth electrode, typically because no suitable metallic earth path is available from the supply, usually needing RCD protection.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "Why is bonding of a metal bath NOT generally required in a modern installation with correctly designed circuits?",
    "options": [
      "Because supplementary bonding may be omitted where all circuits are RCD protected and main bonding is in place and effective, per BS 7671",
      "Because baths are never metal",
      "Because bonding is illegal in bathrooms",
      "Because gas pipes cannot be bonded"
    ],
    "correct": "Because supplementary bonding may be omitted where all circuits are RCD protected and main bonding is in place and effective, per BS 7671",
    "explanation": "BS 7671 permits omission of supplementary bonding in certain rooms where all circuits are RCD protected and main protective bonding is in place and effective.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What size might a main protective bonding conductor typically need to be for a standard domestic supply, subject to calculation?",
    "options": [
      "10mm² is a common minimum for many domestic supplies, subject to calculation from the supply's conductor size",
      "1mm² in all cases",
      "It never needs calculating",
      "50mm² in all cases regardless of supply"
    ],
    "correct": "10mm² is a common minimum for many domestic supplies, subject to calculation from the supply's conductor size",
    "explanation": "Main bonding conductor size is calculated from the supply neutral conductor size per BS 7671 tables, with 10mm² being a common minimum for many domestic supplies.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is the main earthing terminal (MET)?",
    "options": [
      "The point where all the earthing and bonding conductors of the installation are connected together",
      "The main switch on the consumer unit",
      "The neutral bar in the consumer unit",
      "The RCD in the consumer unit"
    ],
    "correct": "The point where all the earthing and bonding conductors of the installation are connected together",
    "explanation": "The MET is the central connection point where the earthing conductor, bonding conductors, and circuit protective conductors all meet.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is an 'extraneous-conductive-part'?",
    "options": [
      "A conductive part not forming part of the electrical installation but liable to introduce a potential, such as a metal water pipe",
      "Any plastic component in the installation",
      "A part of the electrical installation designed to carry fault current",
      "A component only found in TT systems"
    ],
    "correct": "A conductive part not forming part of the electrical installation but liable to introduce a potential, such as a metal water pipe",
    "explanation": "Extraneous-conductive-parts, like structural steelwork or incoming service pipes, are not part of the electrical installation but can introduce an earth potential.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "Why must the earthing conductor be adequately sized and protected?",
    "options": [
      "So it can safely carry fault current without being damaged and without excessive voltage rise",
      "It has no functional requirement, it is decorative",
      "Only the neutral needs to be sized correctly",
      "Because it carries the full load current in normal operation"
    ],
    "correct": "So it can safely carry fault current without being damaged and without excessive voltage rise",
    "explanation": "The earthing conductor must carry potentially large fault currents safely, so its size and protection must be adequate under BS 7671.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What could result from a poor or missing earth connection to an installation?",
    "options": [
      "Metal enclosures and equipment could become live during a fault, increasing shock risk",
      "Nothing, earthing is not important",
      "Only lighting circuits would be affected",
      "It would only affect the appearance of the installation"
    ],
    "correct": "Metal enclosures and equipment could become live during a fault, increasing shock risk",
    "explanation": "Without effective earthing, a fault could leave exposed metalwork at a dangerous voltage, significantly increasing the risk of electric shock.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is the function of a circuit protective conductor (CPC)?",
    "options": [
      "To provide a path for fault current back to the source, enabling protective devices to operate",
      "To carry normal load current only",
      "To reduce cable heating during normal operation",
      "To replace the neutral conductor"
    ],
    "correct": "To provide a path for fault current back to the source, enabling protective devices to operate",
    "explanation": "The CPC connects exposed-conductive-parts to the earthing system, providing a low-impedance path for fault current so protective devices operate quickly.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "In a TN-C-S (PME) system, what is combined for part of the supply run?",
    "options": [
      "The neutral and earth conductors, in a combined PEN conductor",
      "The line and neutral conductors",
      "Two separate line conductors",
      "The bonding and switching conductors"
    ],
    "correct": "The neutral and earth conductors, in a combined PEN conductor",
    "explanation": "TN-C-S, commonly known as PME, combines the neutral and earth into a single protective earthed neutral (PEN) conductor for part of the distribution network.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is the typical rated residual operating current of an RCD used for additional protection against electric shock?",
    "options": [
      "30mA",
      "300mA",
      "3A",
      "30A"
    ],
    "correct": "30mA",
    "explanation": "A 30mA rating is the standard threshold for RCDs providing additional protection against electric shock in most final circuits.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is the main function of a fuse or circuit breaker in a circuit?",
    "options": [
      "To disconnect the supply automatically in the event of an overload or fault current",
      "To provide earth leakage protection only",
      "To regulate voltage",
      "To improve power factor"
    ],
    "correct": "To disconnect the supply automatically in the event of an overload or fault current",
    "explanation": "Fuses and circuit breakers are designed to interrupt the circuit automatically when current exceeds safe levels due to overload or fault.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does 'RCBO' stand for?",
    "options": [
      "Residual Current Breaker with Overload protection",
      "Rapid Circuit Breaker Operation",
      "Regulated Current Balance Output",
      "Rated Circuit Breaker Only"
    ],
    "correct": "Residual Current Breaker with Overload protection",
    "explanation": "An RCBO combines the functions of an RCD and an overcurrent circuit breaker in a single device, protecting an individual circuit against both fault types.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is the typical maximum disconnection time for a 30mA RCD at rated residual current for additional protection?",
    "options": [
      "40ms (0.04 seconds)",
      "5 seconds",
      "1 minute",
      "It never disconnects, only warns"
    ],
    "correct": "40ms (0.04 seconds)",
    "explanation": "For additional protection against electric shock, a 30mA RCD is generally required to operate within 40ms when tested at its rated residual current.",
    "topic": "Protective Devices"
  },
  {
    "text": "What type of circuit breaker curve is commonly used for general lighting and socket circuits in domestic installations?",
    "options": [
      "Type B",
      "Type D",
      "Type F",
      "Type Z"
    ],
    "correct": "Type B",
    "explanation": "Type B breakers, with a lower instantaneous trip threshold, are commonly used for general domestic lighting and socket circuits with resistive/low inrush loads.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why might a Type C circuit breaker be selected over Type B for certain circuits?",
    "options": [
      "Type C tolerates higher inrush/starting currents, suitable for loads like motors or fluorescent fittings",
      "Type C is always cheaper",
      "Type C provides earth leakage protection",
      "Type C is used only for lighting"
    ],
    "correct": "Type C tolerates higher inrush/starting currents, suitable for loads like motors or fluorescent fittings",
    "explanation": "Type C breakers have a higher magnetic trip threshold, making them better suited to circuits with higher inrush currents such as motors.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is meant by the 'discrimination' between protective devices in a distribution system?",
    "options": [
      "Ensuring only the device nearest the fault operates, so unaffected circuits remain supplied",
      "Choosing devices of the same rating throughout",
      "Selecting devices based on colour",
      "Ensuring every device trips simultaneously"
    ],
    "correct": "Ensuring only the device nearest the fault operates, so unaffected circuits remain supplied",
    "explanation": "Discrimination (selectivity) ensures that in a fault, only the protective device closest to the fault operates, minimising disruption to the rest of the installation.",
    "topic": "Protective Devices"
  },
  {
    "text": "What could cause an RCD to trip nuisance-wise even without a genuine earth fault?",
    "options": [
      "High cumulative leakage current from multiple appliances, or a faulty/aging RCD",
      "Correct wiring and healthy insulation",
      "Using an appropriately rated circuit breaker",
      "Testing the RCD test button once a year"
    ],
    "correct": "High cumulative leakage current from multiple appliances, or a faulty/aging RCD",
    "explanation": "Nuisance tripping can result from cumulative leakage across many appliances on one RCD, or from a deteriorating device, even without a true fault.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is a Surge Protective Device (SPD) designed to protect against?",
    "options": [
      "Transient overvoltages, such as those from lightning or switching events",
      "Earth leakage current",
      "Sustained overload current",
      "Reversed polarity"
    ],
    "correct": "Transient overvoltages, such as those from lightning or switching events",
    "explanation": "SPDs limit transient overvoltages caused by lightning strikes or switching surges, protecting sensitive equipment connected to the installation.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why should an RCD's test button be pressed periodically?",
    "options": [
      "To mechanically exercise the trip mechanism and confirm it operates",
      "It permanently disconnects the supply",
      "It resets the circuit breaker rating",
      "It recalibrates the device automatically"
    ],
    "correct": "To mechanically exercise the trip mechanism and confirm it operates",
    "explanation": "Regularly pressing the test button exercises the RCD's mechanism, helping confirm the device is still functioning and hasn't seized up.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does the rated current (In) of a circuit breaker indicate?",
    "options": [
      "The maximum current it can carry continuously without tripping under normal conditions",
      "The current at which it always trips instantly",
      "The voltage rating of the device",
      "The earth leakage trip threshold"
    ],
    "correct": "The maximum current it can carry continuously without tripping under normal conditions",
    "explanation": "The rated current, In, is the value of current the breaker is designed to carry continuously without operating, under specified conditions.",
    "topic": "Protective Devices"
  },
  {
    "text": "Which protective device combines overcurrent protection with a fixed, non-adjustable trip characteristic based on a metal element that melts?",
    "options": [
      "A fuse",
      "An RCD",
      "An RCBO",
      "A contactor"
    ],
    "correct": "A fuse",
    "explanation": "A fuse contains a metal element that melts and breaks the circuit when current exceeds its rating for a sufficient time, providing overcurrent protection.",
    "topic": "Protective Devices"
  },
  {
    "text": "Using Ohm's Law, what is the current flowing through a 20 ohm resistor connected to a 230V supply?",
    "options": [
      "11.5A",
      "23A",
      "4600A",
      "0.087A"
    ],
    "correct": "11.5A",
    "explanation": "Using I = V / R, 230V divided by 20 ohms gives 11.5A.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the formula for calculating power in a purely resistive DC circuit?",
    "options": [
      "P = V x I",
      "P = V / I",
      "P = I / V",
      "P = V + I"
    ],
    "correct": "P = V x I",
    "explanation": "In a resistive circuit, power in watts equals voltage in volts multiplied by current in amps.",
    "topic": "Electrical Theory"
  },
  {
    "text": "A single-phase load draws 10A at 230V. What is the approximate power consumed?",
    "options": [
      "2300W",
      "23W",
      "230W",
      "2.3W"
    ],
    "correct": "2300W",
    "explanation": "P = V x I = 230 x 10 = 2300 watts.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the unit used to measure electrical frequency?",
    "options": [
      "Hertz",
      "Ohm",
      "Watt",
      "Coulomb"
    ],
    "correct": "Hertz",
    "explanation": "Frequency, the number of complete cycles per second of an AC waveform, is measured in hertz (Hz).",
    "topic": "Electrical Theory"
  },
  {
    "text": "Two 10 ohm resistors are connected in series. What is the total resistance?",
    "options": [
      "20 ohms",
      "5 ohms",
      "10 ohms",
      "100 ohms"
    ],
    "correct": "20 ohms",
    "explanation": "In series, resistances simply add together: 10 + 10 = 20 ohms.",
    "topic": "Electrical Theory"
  },
  {
    "text": "Two 10 ohm resistors are connected in parallel. What is the total resistance?",
    "options": [
      "5 ohms",
      "20 ohms",
      "10 ohms",
      "2 ohms"
    ],
    "correct": "5 ohms",
    "explanation": "For two equal resistors in parallel, total resistance is half of one: 10/2 = 5 ohms.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'kVA' represent in an electrical supply context?",
    "options": [
      "Apparent power, in kilovolt-amps",
      "Actual power consumed, in kilowatts",
      "Reactive power only",
      "Current in kiloamps"
    ],
    "correct": "Apparent power, in kilovolt-amps",
    "explanation": "kVA is a measure of apparent power, the product of voltage and current, without accounting for power factor.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is 'power factor' a measure of?",
    "options": [
      "The ratio of real (useful) power to apparent power in an AC circuit",
      "The total resistance of a circuit",
      "The frequency of the supply",
      "The insulation resistance of cables"
    ],
    "correct": "The ratio of real (useful) power to apparent power in an AC circuit",
    "explanation": "Power factor indicates how effectively electrical power is converted into useful work output, with 1.0 being ideal (purely resistive) loads.",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a three-phase balanced system, what is the typical phase angle between each line voltage?",
    "options": [
      "120 degrees",
      "90 degrees",
      "180 degrees",
      "45 degrees"
    ],
    "correct": "120 degrees",
    "explanation": "In a balanced three-phase system, the three phases are spaced evenly, 120 degrees apart from each other.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the relationship between line voltage and phase voltage in a standard UK three-phase star (400V/230V) system?",
    "options": [
      "Line voltage is approximately root 3 (1.732) times the phase voltage",
      "Line voltage equals phase voltage",
      "Line voltage is half the phase voltage",
      "Line voltage is three times the phase voltage"
    ],
    "correct": "Line voltage is approximately root 3 (1.732) times the phase voltage",
    "explanation": "In a star-connected three-phase system, line voltage equals phase voltage multiplied by the square root of 3, giving 400V from 230V phases.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'reactance' refer to in an AC circuit?",
    "options": [
      "Opposition to current flow caused by inductance or capacitance, which varies with frequency",
      "The same as resistance in a DC circuit",
      "The insulation quality of a cable",
      "The total power consumed by a load"
    ],
    "correct": "Opposition to current flow caused by inductance or capacitance, which varies with frequency",
    "explanation": "Reactance opposes current flow in AC circuits due to inductive or capacitive effects and, unlike resistance, changes with supply frequency.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the standard frequency of the UK mains electricity supply?",
    "options": [
      "50Hz",
      "60Hz",
      "100Hz",
      "230Hz"
    ],
    "correct": "50Hz",
    "explanation": "The UK, like most of Europe, operates its mains electricity supply at a nominal frequency of 50Hz.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What causes voltage drop along a cable run?",
    "options": [
      "The resistance (and reactance) of the cable conductor opposing current flow over its length",
      "The colour of the cable insulation",
      "The type of accessory used at the end of the circuit",
      "The ambient humidity only"
    ],
    "correct": "The resistance (and reactance) of the cable conductor opposing current flow over its length",
    "explanation": "As current flows through a cable's inherent resistance/impedance, some voltage is lost along its length, known as voltage drop.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the maximum voltage drop generally permitted for lighting circuits in a typical low voltage installation, per BS 7671 guidance?",
    "options": [
      "3%",
      "10%",
      "25%",
      "50%"
    ],
    "correct": "3%",
    "explanation": "BS 7671 guidance typically limits voltage drop to 3% for lighting circuits supplied from a low voltage supply, to maintain adequate performance.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is meant by 'inductance' in an electrical circuit?",
    "options": [
      "The property of a conductor or coil to oppose a change in current, storing energy in a magnetic field",
      "The property of storing charge in an electric field",
      "The resistance of a conductor to DC current",
      "The tendency of a circuit to overheat"
    ],
    "correct": "The property of a conductor or coil to oppose a change in current, storing energy in a magnetic field",
    "explanation": "Inductance describes how a coil or conductor resists changes in current by generating a magnetic field that stores energy.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is meant by 'capacitance' in an electrical circuit?",
    "options": [
      "The ability of a component to store electrical charge in an electric field",
      "The ability to store energy in a magnetic field",
      "The resistance to current flow",
      "The rate of energy conversion to heat"
    ],
    "correct": "The ability of a component to store electrical charge in an electric field",
    "explanation": "Capacitance is the property of a component, such as a capacitor, to store electrical charge between two conductive plates separated by an insulator.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What happens to the total resistance of a circuit when an additional resistor is added in parallel?",
    "options": [
      "Total resistance decreases",
      "Total resistance increases",
      "Total resistance stays exactly the same",
      "Total resistance becomes infinite"
    ],
    "correct": "Total resistance decreases",
    "explanation": "Adding another parallel path gives current more routes to flow, always reducing the overall resistance of a parallel combination.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the correct SI unit for electrical power?",
    "options": [
      "Watt",
      "Volt",
      "Ohm",
      "Coulomb"
    ],
    "correct": "Watt",
    "explanation": "Power, the rate of energy conversion or transfer, is measured in watts (W).",
    "topic": "Electrical Theory"
  },
  {
    "text": "A kettle rated at 3kW is connected to a 230V supply. Approximately what current does it draw?",
    "options": [
      "13A",
      "3A",
      "30A",
      "1.3A"
    ],
    "correct": "13A",
    "explanation": "I = P / V = 3000 / 230 ≈ 13A, which is why kettles are typically fitted with a 13A plug and fuse.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'root mean square' (RMS) value describe for an AC supply voltage?",
    "options": [
      "An effective value equivalent to the DC value that would produce the same heating effect",
      "The peak instantaneous value of the waveform",
      "The average of only the positive half of the waveform",
      "The frequency of the waveform"
    ],
    "correct": "An effective value equivalent to the DC value that would produce the same heating effect",
    "explanation": "RMS voltage represents the equivalent steady DC value that would deliver the same average power/heating effect as the AC waveform.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does the term 'current-carrying capacity' (Iz) of a cable refer to?",
    "options": [
      "The maximum current a cable can carry continuously under specified conditions without exceeding its rated temperature",
      "The voltage rating of the cable insulation",
      "The physical diameter of the cable",
      "The colour coding used for identification"
    ],
    "correct": "The maximum current a cable can carry continuously under specified conditions without exceeding its rated temperature",
    "explanation": "Iz is the tabulated maximum current a cable can safely carry continuously, given its installation method and ambient conditions, without overheating.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why must correction factors be applied to a cable's tabulated current-carrying capacity?",
    "options": [
      "To account for real installation conditions such as grouping, ambient temperature and thermal insulation",
      "Correction factors are never required",
      "Only when using PVC cable",
      "Only for three-phase circuits"
    ],
    "correct": "To account for real installation conditions such as grouping, ambient temperature and thermal insulation",
    "explanation": "Tabulated values assume standard reference conditions, so correction factors adjust the rating for grouping, temperature and other real-world installation effects.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What colour is used to identify the protective (earth) conductor in modern UK wiring?",
    "options": [
      "Green and yellow",
      "Brown",
      "Blue",
      "Black"
    ],
    "correct": "Green and yellow",
    "explanation": "The green-and-yellow striped insulation is the standard identification for protective earth conductors under BS 7671.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "In modern single-phase UK wiring colours, what colour identifies the line conductor?",
    "options": [
      "Brown",
      "Blue",
      "Green and yellow",
      "Grey"
    ],
    "correct": "Brown",
    "explanation": "Under harmonised colours, brown identifies the line conductor in single-phase installations, replacing the older red.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the purpose of cable containment systems such as conduit or trunking?",
    "options": [
      "To protect and support cables and allow for future additions or maintenance",
      "To act as the main insulation for the conductors",
      "To carry earth fault current instead of a CPC",
      "To increase the voltage rating of a cable"
    ],
    "correct": "To protect and support cables and allow for future additions or maintenance",
    "explanation": "Containment systems physically protect and support cables while making later alterations or additions to the wiring easier.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why is it important not to exceed the maximum number of cables permitted in conduit or trunking?",
    "options": [
      "Overfilling can cause overheating and make it difficult to install or maintain cables without damage",
      "It has no effect on cable performance",
      "It only affects the appearance of the installation",
      "It only matters for data cables"
    ],
    "correct": "Overfilling can cause overheating and make it difficult to install or maintain cables without damage",
    "explanation": "Overfilled containment increases mutual heating between cables and risks damage during installation, both of which reduce safety and reliability.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is armoured cable, such as SWA (steel wire armoured) cable, typically used for?",
    "options": [
      "Underground or exposed installations requiring extra mechanical protection",
      "Internal lighting circuits only",
      "Data communication only",
      "Decorative wiring in show homes"
    ],
    "correct": "Underground or exposed installations requiring extra mechanical protection",
    "explanation": "SWA cable's steel wire armour provides mechanical protection, making it suitable for underground runs or exposed external installations.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the main reason for derating (reducing) a cable's current-carrying capacity when several cables are grouped together?",
    "options": [
      "Grouped cables mutually heat each other, reducing their ability to dissipate heat",
      "Grouping has no effect on cable temperature",
      "Grouped cables always carry less current by design",
      "It is only a requirement for cables in free air"
    ],
    "correct": "Grouped cables mutually heat each other, reducing their ability to dissipate heat",
    "explanation": "When cables are bunched together, heat generated by each cable affects its neighbours, reducing the overall ability of each to dissipate heat safely.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What type of cable is commonly used for socket outlet ring final circuits in UK domestic properties?",
    "options": [
      "Twin and earth (T&E) PVC insulated and sheathed cable",
      "Mineral insulated copper cable exclusively",
      "Category 6 data cable",
      "SY flexible control cable"
    ],
    "correct": "Twin and earth (T&E) PVC insulated and sheathed cable",
    "explanation": "Standard twin and earth (flat) PVC cable is the most common choice for domestic ring final circuits in the UK.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What precaution should be taken when running cables through joists in a domestic property?",
    "options": [
      "Route cables within permitted zones or use suitable joist protection to avoid damage from fixings such as nails or screws",
      "Cables can be run anywhere in a joist with no restriction",
      "Cables must always be run diagonally across joists",
      "Only armoured cable can be used near joists"
    ],
    "correct": "Route cables within permitted zones or use suitable joist protection to avoid damage from fixings such as nails or screws",
    "explanation": "Cables should be kept within safe zones or otherwise protected, such as with capping plates, to reduce risk of damage from future fixings.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why might mineral insulated (MI) cable be selected for certain installations?",
    "options": [
      "It offers excellent fire resistance and can maintain circuit integrity during a fire, useful for fire alarm or emergency lighting circuits",
      "It is the cheapest cable available",
      "It cannot be earthed",
      "It is only suitable for data circuits"
    ],
    "correct": "It offers excellent fire resistance and can maintain circuit integrity during a fire, useful for fire alarm or emergency lighting circuits",
    "explanation": "MI cable's construction gives it strong fire resistance, making it a common choice for circuits that must remain operational during a fire.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is 'conductor CSA' short for?",
    "options": [
      "Cross-sectional area",
      "Current safety allowance",
      "Cable strength assessment",
      "Continuous supply ampere rating"
    ],
    "correct": "Cross-sectional area",
    "explanation": "CSA stands for cross-sectional area, a key factor in determining a conductor's current-carrying capacity and resistance.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is a key reason for selecting a larger cable CSA than the strict minimum for current-carrying capacity on a long circuit run?",
    "options": [
      "To keep voltage drop within acceptable limits over the length of the run",
      "Larger cables are always cheaper",
      "It is required for all circuits regardless of length",
      "It reduces the need for a protective device"
    ],
    "correct": "To keep voltage drop within acceptable limits over the length of the run",
    "explanation": "On long cable runs, increasing the CSA helps limit voltage drop, even if the smaller size would otherwise meet current-carrying capacity requirements.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does flexible cable, such as that used to connect a portable appliance, need in terms of protection compared to fixed wiring?",
    "options": [
      "It often needs greater mechanical protection or a more robust sheath due to increased handling and movement",
      "It never needs any protection",
      "It should have no protective conductor",
      "It must always be armoured"
    ],
    "correct": "It often needs greater mechanical protection or a more robust sheath due to increased handling and movement",
    "explanation": "Flexible cables are subject to more physical movement and wear than fixed wiring, so they often need a tougher sheath or additional protection.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What should be checked on a power tool before use, as part of a pre-use inspection?",
    "options": [
      "The condition of the cable, plug, casing and guards",
      "Only the colour of the tool",
      "The tool's purchase date only",
      "Whether it matches other tools on site"
    ],
    "correct": "The condition of the cable, plug, casing and guards",
    "explanation": "A pre-use check should cover cable and plug condition, casing integrity and that guards are in place and functioning, to catch faults before use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What voltage is commonly used for portable power tools on construction sites to reduce shock risk?",
    "options": [
      "110V (centre-tapped to earth)",
      "230V",
      "400V",
      "12V only"
    ],
    "correct": "110V (centre-tapped to earth)",
    "explanation": "UK construction sites commonly use 110V tools, centre-tapped to earth, so the maximum voltage to earth in a fault is limited to around 55V.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is PAT testing?",
    "options": [
      "Portable Appliance Testing, a process of checking electrical appliances are safe to use",
      "A test only for permanent wiring installations",
      "A method of testing three-phase motors only",
      "A fire safety test for extinguishers"
    ],
    "correct": "Portable Appliance Testing, a process of checking electrical appliances are safe to use",
    "explanation": "PAT testing involves visual inspection and electrical tests on portable appliances to check they remain safe for continued use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why should power tool cables be kept away from sharp edges and heat sources on site?",
    "options": [
      "To prevent damage to the insulation, which could expose live conductors and create a shock or fire risk",
      "It only affects the appearance of the cable",
      "Cables are unaffected by heat or sharp edges",
      "It is only a concern for data cables"
    ],
    "correct": "To prevent damage to the insulation, which could expose live conductors and create a shock or fire risk",
    "explanation": "Damaged insulation from abrasion or heat can expose live conductors, creating serious shock and fire hazards.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What should be done with a power tool found to have a damaged cable or casing?",
    "options": [
      "Take it out of service, label it as faulty, and report it for repair or replacement",
      "Continue using it carefully",
      "Wrap the damage in tape and keep using it",
      "Only report it at the end of the job"
    ],
    "correct": "Take it out of service, label it as faulty, and report it for repair or replacement",
    "explanation": "A damaged tool should be immediately taken out of use, clearly labelled, and reported so it can be repaired or replaced before further use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is an abrasive wheel, such as those used in angle grinders, at risk of if not stored or handled correctly?",
    "options": [
      "Cracking or damage, which could cause it to shatter dangerously during use",
      "Becoming too sharp",
      "Losing its colour coding",
      "Becoming magnetised"
    ],
    "correct": "Cracking or damage, which could cause it to shatter dangerously during use",
    "explanation": "Abrasive wheels can develop hairline cracks from poor storage or handling, which may cause them to disintegrate violently when spun at speed.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why is training required before someone is permitted to change abrasive wheels on a grinder?",
    "options": [
      "Incorrect fitting or an unsuitable wheel can lead to serious injury from wheel failure",
      "It is a legal requirement with no safety justification",
      "Only unskilled workers need training",
      "Abrasive wheels do not require any specific competence"
    ],
    "correct": "Incorrect fitting or an unsuitable wheel can lead to serious injury from wheel failure",
    "explanation": "Fitting an incorrect or damaged wheel, or fitting it incorrectly, significantly increases the risk of the wheel shattering during use, so specific training is required.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is the purpose of a residual current device (RCD) protected socket when using a power tool outdoors?",
    "options": [
      "To provide additional protection against electric shock, especially in damp or outdoor conditions",
      "To increase the voltage supplied to the tool",
      "To make the tool run faster",
      "To eliminate the need for an earth conductor"
    ],
    "correct": "To provide additional protection against electric shock, especially in damp or outdoor conditions",
    "explanation": "RCD protection is particularly important outdoors or in damp conditions, where the risk and consequences of an earth fault are higher.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What should be checked about a step ladder or tool platform before using a power tool at height?",
    "options": [
      "That it is stable, on firm level ground, and suitable for the task and duration of use",
      "Nothing, as long as the tool works",
      "Only that it is the right colour",
      "That it has been used before without incident"
    ],
    "correct": "That it is stable, on firm level ground, and suitable for the task and duration of use",
    "explanation": "Any access equipment used with tools should be checked for stability and suitability before starting work, reducing fall risk while using the tool.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is a 'dead man's handle' or similar safety switch on power tools designed to do?",
    "options": [
      "Stop the tool immediately when the operator releases their grip",
      "Increase the tool's cutting speed",
      "Lock the tool in the 'on' position permanently",
      "Reduce the tool's noise output"
    ],
    "correct": "Stop the tool immediately when the operator releases their grip",
    "explanation": "A dead man's switch ensures the tool only runs while actively held by the operator, stopping automatically if control is lost.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is the correct order of priority in the hierarchy of risk control, with PPE placed appropriately?",
    "options": [
      "Eliminate, substitute, engineering controls, administrative controls, then PPE as a last resort",
      "PPE first, then everything else",
      "Administrative controls only",
      "PPE is always the first choice"
    ],
    "correct": "Eliminate, substitute, engineering controls, administrative controls, then PPE as a last resort",
    "explanation": "The hierarchy of control places PPE as the last line of defence, after attempts to eliminate, substitute, or control the hazard by other means.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Who is generally responsible for providing PPE required for a task under UK law?",
    "options": [
      "The employer, at no cost to the employee",
      "The employee must always buy their own",
      "The client only",
      "PPE provision is entirely optional"
    ],
    "correct": "The employer, at no cost to the employee",
    "explanation": "Under the PPE at Work Regulations, employers must provide suitable PPE free of charge where risks cannot be adequately controlled by other means.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What should be checked about safety footwear before use on site?",
    "options": [
      "That it is undamaged, appropriate for the hazards present, and correctly fitted",
      "Only that it is black in colour",
      "That it matches the hi-vis jacket",
      "Nothing, footwear does not need checking"
    ],
    "correct": "That it is undamaged, appropriate for the hazards present, and correctly fitted",
    "explanation": "Safety footwear should be inspected for damage and confirmed suitable for the specific hazards, such as impact or puncture risks, on site.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the purpose of a TILE or TILEO assessment in manual handling?",
    "options": [
      "A structured way to assess Task, Individual, Load, Environment (and Other factors) before manual handling",
      "A method of testing electrical circuits",
      "A fire risk assessment tool",
      "A type of PPE"
    ],
    "correct": "A structured way to assess Task, Individual, Load, Environment (and Other factors) before manual handling",
    "explanation": "TILE(O) is a recognised framework for assessing manual handling risk by considering the Task, Individual, Load and Environment (and Other factors).",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "When lifting a load manually, what is generally recommended regarding the position of the load relative to the body?",
    "options": [
      "Keep the load as close to the body as possible",
      "Hold the load as far from the body as possible for better balance",
      "Position is not important if you bend your knees",
      "Always lift with straight legs and a bent back"
    ],
    "correct": "Keep the load as close to the body as possible",
    "explanation": "Keeping a load close to the body reduces the strain on the back by minimising the leverage effect on the spine.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why should team lifting be considered for particularly heavy or awkward loads?",
    "options": [
      "To reduce the risk of injury by sharing the load between more than one person safely",
      "It is always slower and less safe than lifting alone",
      "It is only used for lifting very light items",
      "It removes the need for any risk assessment"
    ],
    "correct": "To reduce the risk of injury by sharing the load between more than one person safely",
    "explanation": "Team lifting can reduce the load and strain on each individual, but requires good communication and coordination to be done safely.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What class of hard hat impact protection is typically specified for UK construction and industrial use?",
    "options": [
      "EN 397",
      "IP65",
      "BS 5266",
      "EN 60529"
    ],
    "correct": "EN 397",
    "explanation": "EN 397 is the relevant European standard for industrial safety helmets, specifying requirements for impact and penetration resistance.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the purpose of ear defenders or ear plugs on a noisy site?",
    "options": [
      "To protect hearing from exposure to harmful noise levels",
      "To improve communication between workers",
      "To block out visual distractions",
      "To meet a dress code only"
    ],
    "correct": "To protect hearing from exposure to harmful noise levels",
    "explanation": "Hearing protection reduces the risk of noise-induced hearing loss where exposure exceeds safe levels defined in noise at work regulations.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What should be done if PPE provided for a task is found to be damaged or worn out?",
    "options": [
      "Report it and obtain a replacement before continuing the task",
      "Continue using it if it still fits",
      "Repair it yourself with tape",
      "Share undamaged PPE with a colleague instead"
    ],
    "correct": "Report it and obtain a replacement before continuing the task",
    "explanation": "Damaged PPE may no longer provide adequate protection, so it should be reported and replaced before the task continues.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is a common risk associated with repetitive manual handling tasks over a long period?",
    "options": [
      "Musculoskeletal disorders, such as back pain, from cumulative strain",
      "Improved fitness with no downside",
      "Reduced risk of injury over time",
      "No risk if PPE is worn"
    ],
    "correct": "Musculoskeletal disorders, such as back pain, from cumulative strain",
    "explanation": "Repeated manual handling, even of moderate loads, can lead to cumulative strain and musculoskeletal disorders over time.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why is high-visibility clothing important on many construction and industrial sites?",
    "options": [
      "It helps others, including plant/vehicle operators, see workers clearly, reducing the risk of collision",
      "It is purely a fashion requirement",
      "It replaces the need for other PPE",
      "It has no impact on site safety"
    ],
    "correct": "It helps others, including plant/vehicle operators, see workers clearly, reducing the risk of collision",
    "explanation": "Hi-vis clothing improves worker visibility to vehicle and plant operators, reducing the risk of being struck, especially in low light.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What should be considered about gloves when working with rotating machinery or power tools?",
    "options": [
      "Loose gloves can become caught in moving parts, so the right type and fit must be chosen for the task",
      "Gloves should always be worn regardless of the machinery involved",
      "Glove choice makes no difference around rotating machinery",
      "Any glove will provide the same protection"
    ],
    "correct": "Loose gloves can become caught in moving parts, so the right type and fit must be chosen for the task",
    "explanation": "Loose-fitting gloves can be drawn into rotating machinery, so glove selection must consider the specific hazards of the task, including entanglement risk.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What are the three elements that make up the 'fire triangle'?",
    "options": [
      "Heat, fuel and oxygen",
      "Heat, water and fuel",
      "Fuel, smoke and oxygen",
      "Heat, smoke and carbon dioxide"
    ],
    "correct": "Heat, fuel and oxygen",
    "explanation": "The fire triangle represents the three elements needed to sustain combustion: a source of heat, fuel to burn, and oxygen to support the reaction.",
    "topic": "Fire Safety"
  },
  {
    "text": "Which type of fire extinguisher is generally suitable for use on electrical fires?",
    "options": [
      "CO2 (carbon dioxide) extinguisher",
      "Water extinguisher",
      "Foam extinguisher",
      "Wet chemical extinguisher"
    ],
    "correct": "CO2 (carbon dioxide) extinguisher",
    "explanation": "CO2 extinguishers do not conduct electricity and leave no residue, making them suitable for fires involving live electrical equipment.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why should a water extinguisher never be used on a fire involving live electrical equipment?",
    "options": [
      "Water conducts electricity and could cause electric shock to the person using it",
      "Water extinguishers are too heavy to lift quickly",
      "Water makes electrical fires burn hotter",
      "Water extinguishers are only for Class B fires"
    ],
    "correct": "Water conducts electricity and could cause electric shock to the person using it",
    "explanation": "Because water conducts electricity, using it on live electrical equipment creates a serious risk of electric shock to the user.",
    "topic": "Fire Safety"
  },
  {
    "text": "What class of fire involves flammable liquids, such as petrol or oil?",
    "options": [
      "Class B",
      "Class A",
      "Class C",
      "Class D"
    ],
    "correct": "Class B",
    "explanation": "Class B fires involve flammable liquids, distinguishing them from Class A (solids), Class C (gases) and Class D (metals).",
    "topic": "Fire Safety"
  },
  {
    "text": "What is a fire risk assessment intended to identify?",
    "options": [
      "Potential fire hazards, people at risk, and the measures needed to reduce that risk",
      "Only the location of fire extinguishers",
      "The colour scheme of fire doors",
      "The cost of fire insurance"
    ],
    "correct": "Potential fire hazards, people at risk, and the measures needed to reduce that risk",
    "explanation": "A fire risk assessment systematically identifies hazards, people who could be harmed, and the precautions needed to reduce the risk of fire.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why should fire exit routes always be kept clear?",
    "options": [
      "To allow rapid, unobstructed evacuation in an emergency",
      "To make cleaning easier",
      "Only fire wardens need clear routes",
      "Fire exits are only used during drills"
    ],
    "correct": "To allow rapid, unobstructed evacuation in an emergency",
    "explanation": "Blocked escape routes can seriously delay evacuation and put lives at risk during a real fire emergency.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is the purpose of a fire door?",
    "options": [
      "To resist the spread of fire and smoke for a specified period, protecting escape routes",
      "To improve sound insulation only",
      "To reduce heating costs",
      "To make a room look more secure"
    ],
    "correct": "To resist the spread of fire and smoke for a specified period, protecting escape routes",
    "explanation": "Fire doors are rated to resist fire and smoke spread for a set time, helping protect escape routes and compartmentalise a building during a fire.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why must fire doors never be wedged open, unless fitted with an approved automatic release mechanism?",
    "options": [
      "Wedging them open defeats their purpose of containing fire and smoke",
      "Wedging them open makes them close faster in an emergency",
      "Fire doors are not affected by being left open",
      "It is only a concern in domestic properties"
    ],
    "correct": "Wedging them open defeats their purpose of containing fire and smoke",
    "explanation": "A wedged-open fire door cannot perform its function of slowing the spread of fire and smoke, undermining building fire safety strategy.",
    "topic": "Fire Safety"
  },
  {
    "text": "What should be done immediately upon discovering a fire on site?",
    "options": [
      "Raise the alarm, and evacuate following the site's fire procedure",
      "Try to fight the fire alone regardless of size",
      "Continue working and report it at the end of shift",
      "Wait for someone else to notice"
    ],
    "correct": "Raise the alarm, and evacuate following the site's fire procedure",
    "explanation": "The immediate priority on discovering a fire is to raise the alarm so everyone can evacuate safely, following the established fire procedure.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is a common reason a fire assembly point should be located a safe distance from the building?",
    "options": [
      "To keep evacuated persons clear of falling debris, smoke or further danger from the building",
      "To make it easier for traffic to pass",
      "To keep it hidden from view",
      "There is no reason for the distance"
    ],
    "correct": "To keep evacuated persons clear of falling debris, smoke or further danger from the building",
    "explanation": "Positioning the assembly point well clear of the building reduces the risk to evacuated persons from smoke, falling debris or an escalating fire.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why is it important that electrical equipment is properly maintained as part of fire prevention?",
    "options": [
      "Faulty electrical equipment, such as damaged cables or loose connections, is a common cause of fires",
      "Electrical equipment cannot start fires if switched off at the wall",
      "Maintenance has no link to fire risk",
      "Only gas appliances pose a fire risk"
    ],
    "correct": "Faulty electrical equipment, such as damaged cables or loose connections, is a common cause of fires",
    "explanation": "Faults such as overheating connections, damaged insulation or overloaded circuits are well-known causes of fire, making maintenance an important preventive measure.",
    "topic": "Fire Safety"
  },
  {
    "text": "What does a fire blanket work by doing?",
    "options": [
      "Smothering the fire, cutting off its oxygen supply",
      "Cooling the fire with water",
      "Chemically reacting with the fuel",
      "Extinguishing electrical fires using foam"
    ],
    "correct": "Smothering the fire, cutting off its oxygen supply",
    "explanation": "A fire blanket works by covering the fire and excluding oxygen, effectively smothering small fires, particularly useful for pan fires.",
    "topic": "Fire Safety"
  },
  {
    "text": "Under COSHH, what should be assessed before using a hazardous substance at work?",
    "options": [
      "The risk it presents and the control measures needed to reduce exposure",
      "Only the price of the substance",
      "Only how long the substance has been in stock",
      "The colour of its container"
    ],
    "correct": "The risk it presents and the control measures needed to reduce exposure",
    "explanation": "COSHH requires an assessment of the risks posed by a hazardous substance and the identification of suitable controls to reduce exposure.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Where should information about the hazards and safe handling of a chemical product typically be found?",
    "options": [
      "The Safety Data Sheet (SDS) for that product",
      "The delivery invoice",
      "The site induction poster only",
      "The manufacturer's advertising material"
    ],
    "correct": "The Safety Data Sheet (SDS) for that product",
    "explanation": "A Safety Data Sheet provides detailed information on a substance's hazards, handling, storage and emergency measures.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is the purpose of good welfare facilities on a construction site?",
    "options": [
      "To provide for workers' basic needs, such as washing, toilets and rest, supporting health and hygiene",
      "To meet aesthetic requirements only",
      "Welfare facilities are optional on all sites",
      "They are only required for sites over a certain size, with no other purpose"
    ],
    "correct": "To provide for workers' basic needs, such as washing, toilets and rest, supporting health and hygiene",
    "explanation": "Adequate welfare facilities, including washing and toilet facilities, support worker health, hygiene and wellbeing, and are a legal requirement on construction sites.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why is hand washing particularly important after handling certain building materials, such as cement?",
    "options": [
      "To remove substances that could irritate or damage the skin if left in contact",
      "Hand washing has no relevance to site hygiene",
      "It is only important before eating",
      "Cement is not hazardous to skin"
    ],
    "correct": "To remove substances that could irritate or damage the skin if left in contact",
    "explanation": "Materials like wet cement can cause skin irritation or burns, so prompt washing helps reduce the risk of skin damage.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What health condition can result from repeated, prolonged skin contact with certain irritant substances on site?",
    "options": [
      "Dermatitis",
      "Hearing loss",
      "Vibration white finger",
      "Silicosis"
    ],
    "correct": "Dermatitis",
    "explanation": "Dermatitis is a common occupational skin condition resulting from repeated contact with irritant or sensitising substances.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is silica dust, commonly produced when cutting concrete or masonry, a risk factor for?",
    "options": [
      "Silicosis and other serious lung conditions",
      "Dermatitis only",
      "Hearing loss",
      "Vibration white finger"
    ],
    "correct": "Silicosis and other serious lung conditions",
    "explanation": "Inhaling fine silica dust over time can cause silicosis and other serious, irreversible lung diseases, making dust control essential.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What control measure is commonly used to reduce exposure to dust when cutting materials on site?",
    "options": [
      "On-tool extraction or water suppression",
      "Working faster to finish sooner",
      "Wearing gloves only",
      "Opening a window if indoors"
    ],
    "correct": "On-tool extraction or water suppression",
    "explanation": "On-tool dust extraction or water suppression significantly reduces the amount of harmful dust released into the air during cutting operations.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What does 'hand-arm vibration syndrome' (HAVS) result from?",
    "options": [
      "Prolonged exposure to vibration from tools such as grinders, drills or breakers",
      "Exposure to loud noise",
      "Handling chemical substances",
      "Poor manual handling technique"
    ],
    "correct": "Prolonged exposure to vibration from tools such as grinders, drills or breakers",
    "explanation": "HAVS is caused by repeated, prolonged exposure to vibrating tools, damaging blood vessels, nerves and joints in the hands and arms.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is one way employers can help reduce the risk of hand-arm vibration syndrome?",
    "options": [
      "Limiting exposure time to vibrating tools and using lower-vibration equipment",
      "Providing tools with no maintenance schedule",
      "Increasing exposure time to build tolerance",
      "Removing all guards from tools"
    ],
    "correct": "Limiting exposure time to vibrating tools and using lower-vibration equipment",
    "explanation": "Reducing daily exposure time and using tools designed to produce lower vibration levels are key controls against HAVS.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why should hazardous substances be stored according to their Safety Data Sheet guidance?",
    "options": [
      "To prevent dangerous reactions, spillages or exposure due to incorrect storage",
      "Storage instructions are only a suggestion",
      "All substances can be stored together safely",
      "It only matters for large quantities"
    ],
    "correct": "To prevent dangerous reactions, spillages or exposure due to incorrect storage",
    "explanation": "Incorrect storage, such as mixing incompatible substances, can cause dangerous chemical reactions, spills or increased exposure risk.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What must be considered first, according to the hierarchy in the Work at Height Regulations 2005?",
    "options": [
      "Whether the work at height can be avoided altogether",
      "Which ladder to use",
      "How quickly the work can be completed",
      "Which PPE is most comfortable"
    ],
    "correct": "Whether the work at height can be avoided altogether",
    "explanation": "The Work at Height Regulations require employers to first consider whether work at height can be avoided completely before considering how to do it safely.",
    "topic": "Work at Height"
  },
  {
    "text": "If work at height cannot be avoided, what should be considered next under the regulations?",
    "options": [
      "Preventing falls using appropriate equipment or systems",
      "Choosing the cheapest access equipment available",
      "Ignoring risk assessment requirements",
      "Removing all PPE requirements"
    ],
    "correct": "Preventing falls using appropriate equipment or systems",
    "explanation": "If work at height can't be avoided, the next priority is to prevent falls using suitable equipment, such as guard rails or scaffolding.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the purpose of a guard rail system on a scaffold?",
    "options": [
      "To prevent workers from falling from the edge of the working platform",
      "To provide storage for tools only",
      "To improve the visual appearance of the scaffold",
      "To support electrical cabling"
    ],
    "correct": "To prevent workers from falling from the edge of the working platform",
    "explanation": "Guard rails act as a physical barrier along open edges of a working platform, helping prevent falls from height.",
    "topic": "Work at Height"
  },
  {
    "text": "Who is permitted to erect, alter or dismantle scaffolding?",
    "options": [
      "Only a competent person trained and qualified to do so",
      "Any worker on site",
      "Only the site manager",
      "Anyone with a valid driving licence"
    ],
    "correct": "Only a competent person trained and qualified to do so",
    "explanation": "Scaffolding work requires specific competence and training due to the significant risks involved if erected or altered incorrectly.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be checked on a scaffold before it is used for the first time each day?",
    "options": [
      "That it has a valid inspection tag/record and appears undamaged and complete",
      "Only the colour of the scaffold boards",
      "That it has been painted recently",
      "Nothing, daily checks are not required"
    ],
    "correct": "That it has a valid inspection tag/record and appears undamaged and complete",
    "explanation": "A visual check for an up-to-date inspection tag and obvious defects should be made before using scaffolding, in addition to formal periodic inspections.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a Mobile Elevating Work Platform (MEWP) commonly used for?",
    "options": [
      "Providing safe temporary access to work at height",
      "Lifting heavy loads to a specific point only",
      "Transporting materials horizontally across a site",
      "Excavating trenches"
    ],
    "correct": "Providing safe temporary access to work at height",
    "explanation": "MEWPs, such as scissor lifts and boom lifts, provide a safe, often mobile, platform for accessing work at height.",
    "topic": "Work at Height"
  },
  {
    "text": "What must an operator of a MEWP typically hold before using the equipment?",
    "options": [
      "A valid certificate of training/competence for that category of MEWP",
      "A first aid certificate only",
      "A driving licence for heavy goods vehicles",
      "No qualification is required"
    ],
    "correct": "A valid certificate of training/competence for that category of MEWP",
    "explanation": "MEWP operation requires specific training and certification appropriate to the category of platform being used.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the main hazard associated with using a ladder incorrectly for tasks that should use other access equipment?",
    "options": [
      "Increased risk of falling due to instability, especially for tasks requiring both hands free or heavy items",
      "Ladders are always the safest option for every task",
      "There is no additional risk when using ladders incorrectly",
      "Ladders eliminate all fall risks by design"
    ],
    "correct": "Increased risk of falling due to instability, especially for tasks requiring both hands free or heavy items",
    "explanation": "Ladders are only suitable for short-duration, light work; using them for unsuitable tasks significantly increases the risk of a fall.",
    "topic": "Work at Height"
  },
  {
    "text": "What angle is generally recommended when positioning a leaning ladder (the 1 in 4 rule)?",
    "options": [
      "Approximately 75 degrees from horizontal",
      "45 degrees from horizontal",
      "90 degrees, completely vertical",
      "30 degrees from horizontal"
    ],
    "correct": "Approximately 75 degrees from horizontal",
    "explanation": "The 1 in 4 rule means for every 4 units of height, the base should be 1 unit out, giving an angle of roughly 75 degrees from the ground.",
    "topic": "Work at Height"
  },
  {
    "text": "Why should tools be secured, such as with a tool lanyard, when working at height?",
    "options": [
      "To prevent them falling and striking someone or something below",
      "To make the tools easier to find",
      "It is only a requirement for electrical tools",
      "Tool security has no impact on safety at height"
    ],
    "correct": "To prevent them falling and striking someone or something below",
    "explanation": "A dropped tool from height can cause serious injury to people below, so securing tools reduces this specific hazard.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the purpose of a shock/energy absorber fitted within a fall arrest lanyard?",
    "options": [
      "To limit the forces transmitted to the body when a fall is arrested",
      "To increase the length of the fall before arrest",
      "To replace the need for an anchor point",
      "To make the lanyard lighter"
    ],
    "correct": "To limit the forces transmitted to the body when a fall is arrested",
    "explanation": "An energy absorber deploys during a fall to reduce the peak force experienced by the body when the fall is suddenly arrested.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be assessed before relying on an existing roof or fragile surface for access?",
    "options": [
      "Whether the surface is fragile and requires additional precautions, such as staging or netting",
      "Nothing, all roofs are safe to walk on",
      "Only the weather conditions",
      "The colour of the roof covering"
    ],
    "correct": "Whether the surface is fragile and requires additional precautions, such as staging or netting",
    "explanation": "Fragile roofing materials, like some rooflights or asbestos cement sheets, may not support a person's weight, requiring specific precautions before access.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the main purpose of the Health and Safety at Work etc. Act 1974?",
    "options": [
      "To establish the general legal framework for health and safety in the workplace",
      "To regulate the electrical industry specifically",
      "To set minimum wage requirements",
      "To govern only construction site noise levels"
    ],
    "correct": "To establish the general legal framework for health and safety in the workplace",
    "explanation": "HASAWA 1974 is the primary piece of UK legislation setting out general duties for employers, employees and others regarding workplace health and safety.",
    "topic": "Legislation"
  },
  {
    "text": "Under the Electricity at Work Regulations 1989, who has duties to ensure electrical systems are safe?",
    "options": [
      "Employers, employees and self-employed persons, so far as it is within their control",
      "Only qualified electricians",
      "Only building owners",
      "Only the Health and Safety Executive"
    ],
    "correct": "Employers, employees and self-employed persons, so far as it is within their control",
    "explanation": "The Electricity at Work Regulations place duties on employers, employees and the self-employed to ensure electrical systems are safe, as far as reasonably practicable.",
    "topic": "Legislation"
  },
  {
    "text": "Which of the following would typically need to be reported under RIDDOR?",
    "options": [
      "A specified major injury or a dangerous occurrence at work",
      "A worker taking planned annual leave",
      "A routine PAT test with no faults found",
      "A scheduled fire alarm test"
    ],
    "correct": "A specified major injury or a dangerous occurrence at work",
    "explanation": "RIDDOR requires reporting of specified injuries, certain occupational diseases, and dangerous occurrences, but not routine, incident-free activities.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of the Management of Health and Safety at Work Regulations 1999?",
    "options": [
      "To require employers to carry out risk assessments and put in place suitable arrangements to manage health and safety",
      "To govern only fire safety in offices",
      "To regulate construction noise limits exclusively",
      "To set out first aid kit contents"
    ],
    "correct": "To require employers to carry out risk assessments and put in place suitable arrangements to manage health and safety",
    "explanation": "These regulations set out general duties, including the requirement to assess risks and implement effective health and safety management arrangements.",
    "topic": "Legislation"
  },
  {
    "text": "What do the Personal Protective Equipment at Work Regulations require of employers?",
    "options": [
      "To provide suitable PPE free of charge where risks cannot be adequately controlled by other means",
      "To charge employees for any PPE provided",
      "To only provide PPE for office-based staff",
      "To provide PPE only on request"
    ],
    "correct": "To provide suitable PPE free of charge where risks cannot be adequately controlled by other means",
    "explanation": "These regulations require employers to supply appropriate PPE at no cost to employees when other control measures cannot sufficiently reduce risk.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of the Construction (Design and Management) Regulations (CDM)?",
    "options": [
      "To improve health, safety and welfare management throughout construction projects, from design to completion",
      "To regulate only the design phase of a project",
      "To set out minimum wages for construction workers",
      "To license electrical contractors"
    ],
    "correct": "To improve health, safety and welfare management throughout construction projects, from design to completion",
    "explanation": "CDM Regulations place duties on all parties involved in a construction project to plan, manage and monitor health, safety and welfare throughout.",
    "topic": "Legislation"
  },
  {
    "text": "What does the Manual Handling Operations Regulations 1992 primarily require?",
    "options": [
      "Employers to avoid, assess and reduce the risk of injury from manual handling",
      "Employers to ban all manual handling tasks",
      "Only heavy loads over 25kg need to be assessed",
      "Manual handling training is entirely optional"
    ],
    "correct": "Employers to avoid, assess and reduce the risk of injury from manual handling",
    "explanation": "These regulations require employers to avoid manual handling where possible, and where it cannot be avoided, to assess and reduce the risk of injury.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of the Control of Noise at Work Regulations 2005?",
    "options": [
      "To require employers to control risks to hearing from excessive noise exposure at work",
      "To ban all noisy machinery from workplaces",
      "To regulate music played in offices only",
      "To require noise-cancelling headphones for all staff"
    ],
    "correct": "To require employers to control risks to hearing from excessive noise exposure at work",
    "explanation": "These regulations set exposure limits and require control measures to protect workers' hearing from harmful noise levels.",
    "topic": "Legislation"
  },
  {
    "text": "What do the Provision and Use of Work Equipment Regulations (PUWER) require?",
    "options": [
      "That work equipment provided is suitable, maintained, and used only by trained, competent people",
      "That all equipment must be replaced annually",
      "Equipment inspections are optional if new",
      "Only electrical equipment is covered"
    ],
    "correct": "That work equipment provided is suitable, maintained, and used only by trained, competent people",
    "explanation": "PUWER requires equipment used at work to be suitable for its purpose, properly maintained, and used only by people who have received adequate training.",
    "topic": "Legislation"
  },
  {
    "text": "What do the Lifting Operations and Lifting Equipment Regulations (LOLER) primarily cover?",
    "options": [
      "The safe use, inspection and maintenance of lifting equipment",
      "General manual handling of light loads",
      "Fire safety equipment only",
      "Only cranes used in ports"
    ],
    "correct": "The safe use, inspection and maintenance of lifting equipment",
    "explanation": "LOLER covers lifting equipment such as cranes, hoists and lifting accessories, requiring regular thorough examination and safe use.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of the Control of Asbestos Regulations 2012?",
    "options": [
      "To control exposure to asbestos and require management of asbestos-containing materials in buildings",
      "To ban all older buildings from being occupied",
      "To regulate only the manufacture of new asbestos products",
      "To require demolition of any building containing asbestos"
    ],
    "correct": "To control exposure to asbestos and require management of asbestos-containing materials in buildings",
    "explanation": "These regulations require identification, assessment, and safe management of asbestos-containing materials to prevent harmful exposure.",
    "topic": "Legislation"
  },
  {
    "text": "Who enforces health and safety legislation in most UK workplaces?",
    "options": [
      "The Health and Safety Executive (HSE) and local authorities",
      "The police force exclusively",
      "Trade unions only",
      "Insurance companies"
    ],
    "correct": "The Health and Safety Executive (HSE) and local authorities",
    "explanation": "The HSE and local authorities are the main enforcing bodies for workplace health and safety law in the UK, depending on the type of premises.",
    "topic": "Legislation"
  },
  {
    "text": "What is a key duty of employees under the Health and Safety at Work etc. Act 1974?",
    "options": [
      "To take reasonable care of their own health and safety and that of others affected by their actions",
      "Employees have no legal duties, only employers do",
      "To carry out risk assessments for their employer",
      "To provide their own PPE"
    ],
    "correct": "To take reasonable care of their own health and safety and that of others affected by their actions",
    "explanation": "The Act places a duty on employees to take reasonable care for their own safety and that of others who might be affected by their acts or omissions.",
    "topic": "Legislation"
  },
  {
    "text": "What does 'so far as is reasonably practicable' mean in the context of health and safety law?",
    "options": [
      "Balancing the level of risk against the time, effort and cost needed to control it",
      "Doing whatever is cheapest regardless of risk",
      "Only acting when an accident has already occurred",
      "A legal requirement to eliminate all risk at any cost"
    ],
    "correct": "Balancing the level of risk against the time, effort and cost needed to control it",
    "explanation": "This well-established legal test requires weighing the risk against the practicality and cost of controlling it, rather than requiring absolute elimination of all risk regardless of cost.",
    "topic": "Legislation"
  },
  {
    "text": "What is the recommended first action when someone is found unresponsive and not breathing normally?",
    "options": [
      "Call for emergency help and begin CPR if trained to do so",
      "Wait to see if they wake up on their own",
      "Give them water to drink",
      "Move them immediately without checking anything"
    ],
    "correct": "Call for emergency help and begin CPR if trained to do so",
    "explanation": "Prompt emergency call and starting CPR significantly improves survival chances for someone who is unresponsive and not breathing normally.",
    "topic": "First Aid"
  },
  {
    "text": "What should be done first when someone has received an electric shock and is still in contact with the source?",
    "options": [
      "Isolate the supply or safely remove the source before approaching, if possible, without becoming a casualty yourself",
      "Touch them immediately to pull them away",
      "Pour water on them",
      "Wait for them to let go on their own"
    ],
    "correct": "Isolate the supply or safely remove the source before approaching, if possible, without becoming a casualty yourself",
    "explanation": "Approaching someone still in contact with a live source risks the rescuer also being shocked, so isolating the supply first is critical where possible.",
    "topic": "First Aid"
  },
  {
    "text": "What is the recommended treatment for a minor burn immediately after it occurs?",
    "options": [
      "Cool the burn under cool running water for at least 20 minutes",
      "Apply ice directly to the burn",
      "Apply butter or oil to the burn",
      "Pop any blisters immediately"
    ],
    "correct": "Cool the burn under cool running water for at least 20 minutes",
    "explanation": "Cooling a burn under cool (not ice-cold) running water for around 20 minutes helps reduce tissue damage and pain.",
    "topic": "First Aid"
  },
  {
    "text": "What is the purpose of the recovery position for an unconscious but breathing casualty?",
    "options": [
      "To keep the airway open and reduce the risk of choking on vomit or fluid",
      "To make the casualty more comfortable only",
      "To warm the casualty up",
      "To prepare them for CPR"
    ],
    "correct": "To keep the airway open and reduce the risk of choking on vomit or fluid",
    "explanation": "The recovery position helps maintain an open airway and allows fluids to drain from the mouth, reducing the risk of choking.",
    "topic": "First Aid"
  },
  {
    "text": "What should a first aider check for first when approaching a casualty at an incident scene?",
    "options": [
      "That the scene is safe to approach",
      "The casualty's name and age",
      "Whether other people are watching",
      "The time of the incident"
    ],
    "correct": "That the scene is safe to approach",
    "explanation": "A first aider should always check the scene is safe before approaching, to avoid becoming a casualty themselves.",
    "topic": "First Aid"
  },
  {
    "text": "What is the primary purpose of a first aid kit on site?",
    "options": [
      "To provide basic supplies to treat minor injuries and support further treatment for more serious injuries",
      "To replace the need for professional medical treatment",
      "To store personal medication for staff",
      "To store tools during breaks"
    ],
    "correct": "To provide basic supplies to treat minor injuries and support further treatment for more serious injuries",
    "explanation": "A first aid kit provides basic supplies for minor injuries and initial support for more serious injuries while further help is arranged.",
    "topic": "First Aid"
  },
  {
    "text": "Who on a construction site is typically responsible for administering first aid and maintaining first aid provisions?",
    "options": [
      "An appointed, appropriately trained first aider",
      "Any available worker regardless of training",
      "Only the site manager, regardless of training",
      "External emergency services exclusively, with no on-site provision"
    ],
    "correct": "An appointed, appropriately trained first aider",
    "explanation": "Sites should have appointed, trained first aiders responsible for providing first aid and maintaining first aid equipment and records.",
    "topic": "First Aid"
  },
  {
    "text": "What should be recorded after providing first aid treatment for an incident?",
    "options": [
      "Details of the incident and treatment given, typically in an accident/first aid book",
      "Nothing needs to be recorded",
      "Only the first aider's name",
      "Only serious injuries need recording"
    ],
    "correct": "Details of the incident and treatment given, typically in an accident/first aid book",
    "explanation": "Recording incident details and treatment given supports ongoing care, helps identify trends, and may be a legal requirement for certain incidents.",
    "topic": "First Aid"
  },
  {
    "text": "What is a common sign that someone may be going into shock after a significant injury?",
    "options": [
      "Pale, cold, clammy skin and a rapid pulse",
      "Warm, flushed skin and slow breathing",
      "No change in appearance at all",
      "Improved alertness and energy"
    ],
    "correct": "Pale, cold, clammy skin and a rapid pulse",
    "explanation": "Shock commonly presents with pale, cold, clammy skin, a rapid weak pulse and can be a serious, potentially life-threatening condition requiring urgent help.",
    "topic": "First Aid"
  },
  {
    "text": "Why is it important to know the location of the nearest defibrillator (AED) on or near a site?",
    "options": [
      "Rapid defibrillation significantly improves survival chances in sudden cardiac arrest",
      "Defibrillators are rarely useful in emergencies",
      "AEDs can only be used by doctors",
      "AEDs are only relevant to fire emergencies"
    ],
    "correct": "Rapid defibrillation significantly improves survival chances in sudden cardiac arrest",
    "explanation": "Using an AED as quickly as possible after cardiac arrest greatly increases the chances of survival, so knowing its location can save valuable time.",
    "topic": "First Aid"
  },
  {
    "text": "What is the purpose of a site induction for a new worker?",
    "options": [
      "To inform them of site-specific hazards, rules and emergency procedures before they start work",
      "To collect their bank details",
      "To test their electrical qualifications",
      "To assign them a permanent parking space"
    ],
    "correct": "To inform them of site-specific hazards, rules and emergency procedures before they start work",
    "explanation": "Site induction ensures new workers understand the specific hazards, rules, welfare facilities and emergency procedures relevant to that site.",
    "topic": "Site Safety"
  },
  {
    "text": "What is a permit to work system typically used for?",
    "options": [
      "Controlling high-risk activities by formally authorising and specifying precautions before work begins",
      "Allowing access to the staff canteen",
      "Recording annual leave requests",
      "Booking equipment for future projects"
    ],
    "correct": "Controlling high-risk activities by formally authorising and specifying precautions before work begins",
    "explanation": "Permit to work systems provide formal control over high-risk tasks, ensuring necessary precautions are agreed and in place before work starts.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of signage indicating a 'confined space' on site?",
    "options": [
      "To warn of the specific hazards and restricted access associated with entering that space",
      "To indicate a smoking area",
      "To show where deliveries should be made",
      "To mark a fire assembly point"
    ],
    "correct": "To warn of the specific hazards and restricted access associated with entering that space",
    "explanation": "Confined space signage warns workers of the potential hazards, such as limited oxygen or toxic gases, and that entry should follow strict controls.",
    "topic": "Site Safety"
  },
  {
    "text": "Why is a risk assessment carried out before starting a task?",
    "options": [
      "To identify hazards, evaluate the risks, and determine suitable control measures",
      "To satisfy paperwork requirements only, with no practical purpose",
      "To delay the start of work unnecessarily",
      "It is only required for office-based tasks"
    ],
    "correct": "To identify hazards, evaluate the risks, and determine suitable control measures",
    "explanation": "A risk assessment systematically identifies hazards and evaluates the level of risk, allowing suitable controls to be put in place before work begins.",
    "topic": "Site Safety"
  },
  {
    "text": "What is a Method Statement generally used for?",
    "options": [
      "Setting out the safe sequence of work and precautions for a specific task",
      "Recording weekly wages",
      "Listing suppliers of materials",
      "Advertising the project to clients"
    ],
    "correct": "Setting out the safe sequence of work and precautions for a specific task",
    "explanation": "A method statement describes how a task will be carried out safely, step by step, including the precautions and equipment needed.",
    "topic": "Site Safety"
  },
  {
    "text": "Why should walkways and access routes on site be kept free of trailing cables and debris?",
    "options": [
      "To reduce the risk of trips, slips and falls",
      "It has no impact on safety, only tidiness",
      "Only fire exits need to be kept clear",
      "Cables are never a trip hazard if taped down loosely"
    ],
    "correct": "To reduce the risk of trips, slips and falls",
    "explanation": "Trailing cables, tools and debris on walkways are a common cause of trips, slips and falls, one of the most frequent workplace accident types.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of barriers or exclusion zones around excavations on site?",
    "options": [
      "To prevent people or vehicles falling into or being harmed by the excavation",
      "To mark where materials should be delivered",
      "To indicate a smoking area",
      "To improve the appearance of the site"
    ],
    "correct": "To prevent people or vehicles falling into or being harmed by the excavation",
    "explanation": "Barriers around excavations protect workers and visitors from the risk of falling in or being struck by collapsing material.",
    "topic": "Site Safety"
  },
  {
    "text": "What should be done before entering an excavation deeper than about 1.2 metres in unstable ground?",
    "options": [
      "Ensure it has been properly supported/shored or battered back, and inspected by a competent person",
      "Simply jump in carefully",
      "Nothing extra is needed regardless of depth",
      "Wait until it rains to check stability"
    ],
    "correct": "Ensure it has been properly supported/shored or battered back, and inspected by a competent person",
    "explanation": "Deeper excavations in unstable ground need adequate support or safe sloping and should be checked by a competent person before entry, due to collapse risk.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of a 'near miss' reporting system on site?",
    "options": [
      "To capture incidents that could have caused harm, helping prevent future accidents",
      "To punish workers who report incidents",
      "Near misses do not need reporting as no one was hurt",
      "To reduce the number of official accident reports"
    ],
    "correct": "To capture incidents that could have caused harm, helping prevent future accidents",
    "explanation": "Near miss reporting captures valuable information about incidents that almost caused harm, helping identify and fix hazards before an actual accident occurs.",
    "topic": "Site Safety"
  },
  {
    "text": "What is 'good housekeeping' on a construction site primarily aimed at achieving?",
    "options": [
      "Keeping the site tidy and organised to reduce hazards such as trips, fires and manual handling issues",
      "Making the site look attractive for visitors only",
      "Reducing the need for risk assessments entirely",
      "Only relevant to office areas on site"
    ],
    "correct": "Keeping the site tidy and organised to reduce hazards such as trips, fires and manual handling issues",
    "explanation": "Good housekeeping, such as clearing waste and storing materials properly, directly reduces common hazards including trips, fire risk and handling injuries.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of traffic management plans on larger construction sites?",
    "options": [
      "To separate vehicles and pedestrians safely, reducing the risk of collision",
      "To decide staff parking allocation only",
      "To calculate fuel costs for site vehicles",
      "To schedule delivery invoicing"
    ],
    "correct": "To separate vehicles and pedestrians safely, reducing the risk of collision",
    "explanation": "Traffic management plans establish safe routes and segregation between vehicles and pedestrians, reducing the significant risk of vehicle-related accidents on site.",
    "topic": "Site Safety"
  },
  {
    "text": "Why should unauthorised persons, such as members of the public, be prevented from accessing a construction site?",
    "options": [
      "Construction sites contain hazards they may not recognise or know how to avoid",
      "The public are always aware of construction hazards",
      "It is only a concern for very large sites",
      "Public access has no bearing on safety"
    ],
    "correct": "Construction sites contain hazards they may not recognise or know how to avoid",
    "explanation": "Members of the public are unlikely to be familiar with site-specific hazards, so restricting access helps protect them from harm.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the main function of a contactor in a motor control circuit?",
    "options": [
      "To switch the motor's supply on and off, often controlled by a separate control circuit",
      "To measure motor speed",
      "To convert AC to DC",
      "To provide overload protection alone"
    ],
    "correct": "To switch the motor's supply on and off, often controlled by a separate control circuit",
    "explanation": "A contactor is an electrically operated switch used to make or break the power circuit to a motor, typically operated by a lower-power control circuit.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the purpose of an overload relay fitted alongside a motor contactor?",
    "options": [
      "To protect the motor from damage caused by sustained excess current",
      "To start the motor faster",
      "To reverse the direction of rotation",
      "To increase the motor's speed"
    ],
    "correct": "To protect the motor from damage caused by sustained excess current",
    "explanation": "Overload relays monitor motor current and disconnect the supply if sustained excess current, which could cause overheating and damage, is detected.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is a common method of starting a three-phase induction motor to reduce inrush current?",
    "options": [
      "Star-delta starting",
      "Reversing the phase rotation",
      "Removing the earth connection",
      "Increasing the supply voltage"
    ],
    "correct": "Star-delta starting",
    "explanation": "Star-delta starting initially connects motor windings in star (reducing starting current), then switches to delta for normal running, reducing inrush current.",
    "topic": "Motors and Control"
  },
  {
    "text": "What does a Variable Speed Drive (VSD) allow control of in a motor application?",
    "options": [
      "The speed of an AC motor by varying the frequency and voltage supplied to it",
      "The colour of indicator lamps only",
      "The motor's earth connection",
      "The motor's physical size"
    ],
    "correct": "The speed of an AC motor by varying the frequency and voltage supplied to it",
    "explanation": "A VSD (or inverter) controls motor speed by adjusting the frequency and voltage of the supply, allowing more efficient and flexible operation.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the purpose of a limit switch in a control circuit?",
    "options": [
      "To detect the position of a moving part and signal the control system accordingly",
      "To provide overload protection for a motor",
      "To measure ambient temperature",
      "To indicate mains voltage is present"
    ],
    "correct": "To detect the position of a moving part and signal the control system accordingly",
    "explanation": "Limit switches sense the physical position of machinery parts, such as a door or carriage, providing feedback to the control system.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is a common cause of a motor failing to start when the control circuit appears to operate correctly?",
    "options": [
      "A tripped overload, blown fuse, or a fault in the motor's connections/windings",
      "The motor casing is the wrong colour",
      "The motor is too new to fail",
      "The building's fire alarm system"
    ],
    "correct": "A tripped overload, blown fuse, or a fault in the motor's connections/windings",
    "explanation": "Common causes of a motor not starting despite an apparently correct control signal include a tripped overload, blown fuse, or an internal fault.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the purpose of a 'hold-in' or auxiliary contact on a contactor used in a latching control circuit?",
    "options": [
      "To maintain the contactor's coil energised after the start button is released",
      "To provide the main power connection to the motor",
      "To measure current draw",
      "To indicate a fault condition only"
    ],
    "correct": "To maintain the contactor's coil energised after the start button is released",
    "explanation": "An auxiliary contact wired back to the coil circuit allows the contactor to 'latch in' and remain energised after a momentary start button is released.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the function of a stop button in a typical motor control circuit?",
    "options": [
      "To break the control circuit, de-energising the contactor and stopping the motor",
      "To increase motor speed temporarily",
      "To reverse motor direction",
      "To bypass the overload protection"
    ],
    "correct": "To break the control circuit, de-energising the contactor and stopping the motor",
    "explanation": "A stop button is normally wired as a normally-closed contact that interrupts the control circuit, de-energising the contactor and stopping the motor.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why must motor control circuits often include interlocking between forward and reverse contactors?",
    "options": [
      "To prevent both contactors being energised simultaneously, which could cause a short circuit",
      "To make the motor run faster in both directions",
      "Interlocking is not required for reversing circuits",
      "To reduce the cost of wiring"
    ],
    "correct": "To prevent both contactors being energised simultaneously, which could cause a short circuit",
    "explanation": "Interlocking prevents forward and reverse contactors from both closing at the same time, which would create a direct short circuit across the supply.",
    "topic": "Motors and Control"
  },
  {
    "text": "What might cause a three-phase motor to run in the wrong direction after installation?",
    "options": [
      "Incorrect phase rotation/sequence connected to the motor terminals",
      "The motor being the wrong colour",
      "Using a plastic enclosure instead of metal",
      "The motor being too small for the load"
    ],
    "correct": "Incorrect phase rotation/sequence connected to the motor terminals",
    "explanation": "The direction of rotation of a three-phase motor depends on the phase sequence connected to it; swapping two phases reverses the direction.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the main advantage of LED lighting compared to traditional incandescent lighting?",
    "options": [
      "Significantly lower energy consumption and longer lifespan",
      "LEDs always produce more heat",
      "LEDs cannot be dimmed under any circumstances",
      "LEDs require a transformer for every application"
    ],
    "correct": "Significantly lower energy consumption and longer lifespan",
    "explanation": "LEDs convert a much higher proportion of energy into light rather than heat, and typically last far longer than incandescent lamps.",
    "topic": "Lighting"
  },
  {
    "text": "What is emergency lighting designed to provide?",
    "options": [
      "Illumination of escape routes in the event of a normal lighting failure",
      "Additional decorative lighting for events",
      "Lighting that is always brighter than normal lighting",
      "Lighting used only during daylight hours"
    ],
    "correct": "Illumination of escape routes in the event of a normal lighting failure",
    "explanation": "Emergency lighting automatically activates to illuminate escape routes and key areas if the normal mains lighting supply fails.",
    "topic": "Lighting"
  },
  {
    "text": "What is a 'maintained' emergency light fitting?",
    "options": [
      "A fitting that is illuminated at all times, whether mains power is present or not",
      "A fitting that only illuminates during a power failure",
      "A fitting requiring no maintenance ever",
      "A fitting used only outdoors"
    ],
    "correct": "A fitting that is illuminated at all times, whether mains power is present or not",
    "explanation": "Maintained emergency lighting stays lit continuously, drawing from the mains or its battery depending on supply availability.",
    "topic": "Lighting"
  },
  {
    "text": "What is a 'non-maintained' emergency light fitting?",
    "options": [
      "A fitting that only illuminates when the normal mains supply fails",
      "A fitting that is always on",
      "A fitting with no battery backup at all",
      "A decorative fitting with no safety function"
    ],
    "correct": "A fitting that only illuminates when the normal mains supply fails",
    "explanation": "Non-maintained emergency lighting remains off during normal operation and switches on automatically only when the mains supply fails.",
    "topic": "Lighting"
  },
  {
    "text": "What factor should be considered when selecting light fittings for a wet or damp location, such as a bathroom or outdoor area?",
    "options": [
      "The appropriate IP (Ingress Protection) rating for the environment",
      "The colour of the light fitting",
      "Only the wattage of the lamp",
      "The brand of the fitting"
    ],
    "correct": "The appropriate IP (Ingress Protection) rating for the environment",
    "explanation": "IP ratings indicate a fitting's resistance to dust and water ingress, and must be matched to the environment, such as bathroom zones, for safety.",
    "topic": "Lighting"
  },
  {
    "text": "What does the second digit in an IP rating, such as IP65, primarily indicate?",
    "options": [
      "The level of protection against liquids/water ingress",
      "The level of protection against solid objects/dust",
      "The wattage rating of the fitting",
      "The colour temperature of the light"
    ],
    "correct": "The level of protection against liquids/water ingress",
    "explanation": "In an IP rating, the second digit specifies protection against liquid ingress, while the first digit relates to solid objects and dust.",
    "topic": "Lighting"
  },
  {
    "text": "Why might a lighting circuit use a two-way switching arrangement?",
    "options": [
      "To allow a light to be controlled from two different locations, such as top and bottom of a staircase",
      "To reduce the wattage of the lamp",
      "To provide earth leakage protection",
      "To automatically dim the light at night"
    ],
    "correct": "To allow a light to be controlled from two different locations, such as top and bottom of a staircase",
    "explanation": "Two-way switching lets a single light fitting be switched on or off from either of two separate switch positions.",
    "topic": "Lighting"
  },
  {
    "text": "What is 'colour rendering index' (CRI) used to describe about a light source?",
    "options": [
      "How accurately it reveals the true colours of objects compared to natural light",
      "The total wattage the light consumes",
      "The lifespan of the lamp in hours",
      "The IP rating of the fitting"
    ],
    "correct": "How accurately it reveals the true colours of objects compared to natural light",
    "explanation": "CRI indicates how faithfully a light source renders colours compared to a reference (often natural) light source, important in areas needing accurate colour perception.",
    "topic": "Lighting"
  },
  {
    "text": "What is the main purpose of an intruder alarm system?",
    "options": [
      "To detect unauthorised entry and alert occupants or a monitoring centre",
      "To provide general lighting for a building",
      "To control heating and ventilation",
      "To measure electricity consumption"
    ],
    "correct": "To detect unauthorised entry and alert occupants or a monitoring centre",
    "explanation": "Intruder alarms use sensors to detect unauthorised entry and trigger an alert, either locally or to a remote monitoring station.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is a PIR (Passive Infrared) detector commonly used to detect in an alarm system?",
    "options": [
      "Movement, by sensing changes in infrared radiation (heat) within its field of view",
      "Smoke particles in the air",
      "Water leaks",
      "Changes in ambient light levels only"
    ],
    "correct": "Movement, by sensing changes in infrared radiation (heat) within its field of view",
    "explanation": "PIR detectors sense changes in infrared radiation caused by a moving warm body, such as a person, entering the detection zone.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the purpose of a fire alarm control panel?",
    "options": [
      "To monitor detectors and manual call points and activate alarm sounders/notify occupants of a fire condition",
      "To control the building's lighting circuits",
      "To act as the main electrical isolator for the building",
      "To provide backup power for computers only"
    ],
    "correct": "To monitor detectors and manual call points and activate alarm sounders/notify occupants of a fire condition",
    "explanation": "The fire alarm panel is the central point that receives signals from detectors and call points and activates alarms to warn occupants.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the function of a manual call point (break glass unit) in a fire alarm system?",
    "options": [
      "To allow a person to manually raise the fire alarm",
      "To automatically detect smoke",
      "To provide emergency lighting",
      "To control the building's ventilation"
    ],
    "correct": "To allow a person to manually raise the fire alarm",
    "explanation": "Manual call points let someone who discovers a fire raise the alarm immediately by activating the unit, typically by breaking a frangible element.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is a common reason for regularly testing a fire alarm system?",
    "options": [
      "To confirm detectors, call points and sounders are working correctly",
      "Testing is not required once installed",
      "To reduce the system's sensitivity over time",
      "Only required after a real fire has occurred"
    ],
    "correct": "To confirm detectors, call points and sounders are working correctly",
    "explanation": "Regular testing verifies that all components of a fire alarm system remain functional, which is critical for life safety.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the purpose of a CCTV system commonly installed alongside intruder alarms?",
    "options": [
      "To provide visual monitoring and recording of activity for security purposes",
      "To detect gas leaks",
      "To measure temperature in a building",
      "To control lighting automatically"
    ],
    "correct": "To provide visual monitoring and recording of activity for security purposes",
    "explanation": "CCTV provides visual surveillance and recorded footage, complementing intruder alarm detection for overall site security.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What might cause false alarms on a poorly positioned PIR detector?",
    "options": [
      "Movement from sources such as pets, draughts moving curtains, or direct sunlight",
      "Correct installation away from heat sources and moving objects",
      "Using a detector matched to the room size",
      "Regular maintenance and testing"
    ],
    "correct": "Movement from sources such as pets, draughts moving curtains, or direct sunlight",
    "explanation": "PIR detectors can be triggered by unintended movement or temperature change sources if not carefully positioned, leading to false alarms.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the purpose of a battery backup in an alarm system control panel?",
    "options": [
      "To keep the system operational during a mains power failure",
      "To increase the range of the sensors",
      "To reduce the number of sensors required",
      "To power lighting circuits in the building"
    ],
    "correct": "To keep the system operational during a mains power failure",
    "explanation": "A backup battery ensures the alarm system continues to function and can still detect and signal events even if the mains supply is lost.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the primary function of a solar PV inverter?",
    "options": [
      "To convert the DC electricity generated by solar panels into AC electricity suitable for use in the building or export to the grid",
      "To store excess solar energy for later use",
      "To clean the surface of solar panels",
      "To track the position of the sun"
    ],
    "correct": "To convert the DC electricity generated by solar panels into AC electricity suitable for use in the building or export to the grid",
    "explanation": "Solar panels generate DC electricity, which an inverter converts to AC so it can be used by standard appliances or exported to the grid.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the purpose of a battery storage system in a domestic solar PV installation?",
    "options": [
      "To store surplus generated electricity for use later, such as in the evening",
      "To increase the voltage of the solar panels",
      "To replace the need for an inverter",
      "To convert AC to DC for the grid"
    ],
    "correct": "To store surplus generated electricity for use later, such as in the evening",
    "explanation": "Battery storage allows excess electricity generated during the day, when demand may be lower, to be used later when generation has stopped.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What does an air source heat pump primarily use to generate heat for a building?",
    "options": [
      "Heat extracted from the outside air, which is upgraded using a refrigeration cycle",
      "Direct combustion of fossil fuels",
      "Heat generated from solar panels only",
      "Heat stored in an underground tank"
    ],
    "correct": "Heat extracted from the outside air, which is upgraded using a refrigeration cycle",
    "explanation": "Air source heat pumps extract heat energy from outside air, even at low temperatures, and use a refrigerant cycle to raise it to a usable temperature.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the purpose of an EV (electric vehicle) charge point's earthing arrangement, such as PEN fault detection on TN-C-S supplies?",
    "options": [
      "To protect against the risk of the vehicle becoming live in the rare event of a PEN conductor fault",
      "To increase the charging speed of the vehicle",
      "To reduce the cost of the electricity used",
      "To monitor the vehicle's battery health"
    ],
    "correct": "To protect against the risk of the vehicle becoming live in the rare event of a PEN conductor fault",
    "explanation": "Special earthing/protective measures, such as PEN fault detection, are often required for EV charge points on PME supplies to reduce shock risk to the vehicle user.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is a key consideration when connecting solar PV generation to an existing consumer unit?",
    "options": [
      "Ensuring the busbar rating and connection method comply with relevant standards to avoid overloading",
      "Solar PV can be connected to any circuit breaker regardless of rating",
      "No additional considerations are needed beyond standard wiring",
      "Solar PV must always use a completely separate property"
    ],
    "correct": "Ensuring the busbar rating and connection method comply with relevant standards to avoid overloading",
    "explanation": "Connecting generation equipment to a consumer unit requires careful consideration of busbar ratings and connection position to avoid exceeding safe limits.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What does 'G98' or 'G99' refer to in relation to connecting generation equipment, such as solar PV, to the electricity network?",
    "options": [
      "Engineering Recommendations setting out requirements for connecting generation to the distribution network",
      "A type of solar panel",
      "A type of battery chemistry",
      "A brand of inverter"
    ],
    "correct": "Engineering Recommendations setting out requirements for connecting generation to the distribution network",
    "explanation": "G98 and G99 are UK Engineering Recommendations covering the connection of small and larger scale generation, such as solar PV, to the distribution network.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the purpose of a smart meter in relation to renewable technology and energy management?",
    "options": [
      "To provide detailed, near real-time information on energy consumption and generation",
      "To generate electricity itself",
      "To replace the need for a consumer unit",
      "To store electrical energy"
    ],
    "correct": "To provide detailed, near real-time information on energy consumption and generation",
    "explanation": "Smart meters record and communicate detailed usage (and generation, where applicable) data, helping users and suppliers monitor energy more closely.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is a common benefit of a ground source heat pump compared to an air source heat pump?",
    "options": [
      "More stable ground temperatures can give more consistent efficiency across the year",
      "Ground source heat pumps require no groundworks",
      "Ground source heat pumps are always cheaper to install",
      "Ground source heat pumps do not require electricity to operate"
    ],
    "correct": "More stable ground temperatures can give more consistent efficiency across the year",
    "explanation": "Ground temperatures remain more stable than air temperatures throughout the year, which can help ground source heat pumps maintain efficiency in colder weather.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What safety consideration is particularly important for electricians working on rooftop solar PV installations?",
    "options": [
      "Both work at height risks and the presence of DC electricity that may remain live even when isolated at the inverter",
      "Solar panels contain no electrical hazards at all",
      "Only AC-side isolation needs to be considered",
      "Rooftop PV installations require no special training"
    ],
    "correct": "Both work at height risks and the presence of DC electricity that may remain live even when isolated at the inverter",
    "explanation": "Rooftop PV work combines the hazards of work at height with the risk that DC cabling between panels can remain live even when the inverter is isolated.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the purpose of an export limiter/meter in some domestic solar PV installations?",
    "options": [
      "To control or measure the amount of surplus electricity exported back to the grid",
      "To increase the panels' generation output",
      "To store energy for later use",
      "To convert DC electricity to heat"
    ],
    "correct": "To control or measure the amount of surplus electricity exported back to the grid",
    "explanation": "Export limiting or metering equipment manages and/or records how much surplus generated electricity is fed back into the grid.",
    "topic": "Renewable Technology"
  },
  {
    "text": "Why might a heat pump system require a larger radiator or underfloor heating rather than standard radiators?",
    "options": [
      "Heat pumps typically operate more efficiently at lower flow temperatures, so a larger heat emitter surface area compensates",
      "Heat pumps cannot be used with any type of radiator",
      "Larger radiators reduce the electrical load of the heat pump",
      "It has no bearing on heat pump efficiency"
    ],
    "correct": "Heat pumps typically operate more efficiently at lower flow temperatures, so a larger heat emitter surface area compensates",
    "explanation": "Because heat pumps work best at lower water temperatures than a gas boiler, a larger surface area, such as underfloor heating, helps deliver comfortable heat efficiently.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What must be checked about existing wiring and protective devices before connecting a new renewable technology system, such as an EV charger or heat pump?",
    "options": [
      "That the existing installation, including the consumer unit and supply, can safely accommodate the additional load",
      "Nothing, new technology can always be added without checks",
      "Only the colour of the existing cables",
      "Only whether the property has WiFi"
    ],
    "correct": "That the existing installation, including the consumer unit and supply, can safely accommodate the additional load",
    "explanation": "Adding significant new loads requires assessing whether the existing supply, consumer unit and wiring can safely handle the extra demand.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the main advantage of Category 6 (Cat6) cable over Category 5e (Cat5e) for data networks?",
    "options": [
      "Cat6 supports higher bandwidth and better performance for higher-speed networks",
      "Cat6 is always cheaper to install",
      "Cat6 cannot be used for gigabit networks",
      "Cat6 requires no connectors at all"
    ],
    "correct": "Cat6 supports higher bandwidth and better performance for higher-speed networks",
    "explanation": "Cat6 cable is designed to support higher bandwidths and reduced crosstalk compared to Cat5e, making it suitable for faster network speeds.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why should structured data cabling generally be kept separated from power cables?",
    "options": [
      "To reduce the risk of electromagnetic interference affecting data signals",
      "Data cables must always be a different colour",
      "It is purely for aesthetic reasons",
      "Separation has no effect on data performance"
    ],
    "correct": "To reduce the risk of electromagnetic interference affecting data signals",
    "explanation": "Running data cables too close to power cables can induce interference, degrading signal quality, so separation distances are recommended.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is the purpose of a patch panel in a structured cabling installation?",
    "options": [
      "To provide a fixed termination point that allows flexible cross-connection to network equipment via patch cables",
      "To boost the network signal strength",
      "To convert copper cabling to fibre optic",
      "To supply power to network switches"
    ],
    "correct": "To provide a fixed termination point that allows flexible cross-connection to network equipment via patch cables",
    "explanation": "A patch panel terminates the fixed cabling runs and allows flexible connections to switches and other equipment using short patch cables.",
    "topic": "Data Cabling"
  },
  {
    "text": "What advantage does fibre optic cable have over copper cable for data transmission over long distances?",
    "options": [
      "Much lower signal loss over distance and immunity to electromagnetic interference",
      "Fibre optic cable is always cheaper than copper",
      "Fibre optic cable can be easily joined using standard electrical connectors",
      "Fibre optic cable conducts electricity better than copper"
    ],
    "correct": "Much lower signal loss over distance and immunity to electromagnetic interference",
    "explanation": "Fibre optic cables transmit data as light, so they suffer far less signal loss over distance and are immune to electromagnetic interference.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is the purpose of cable testing/certification after installing a structured cabling system?",
    "options": [
      "To confirm the installed cabling meets the required performance standard for its category",
      "To check the colour of the cable jacket only",
      "Testing is not required for data cabling",
      "To measure the voltage on the cable"
    ],
    "correct": "To confirm the installed cabling meets the required performance standard for its category",
    "explanation": "Certification testing verifies parameters such as attenuation and crosstalk, confirming the installed cabling will support its intended performance category.",
    "topic": "Data Cabling"
  },
  {
    "text": "What does PoE (Power over Ethernet) allow?",
    "options": [
      "Electrical power and data to be carried over the same network cable to devices such as IP cameras or access points",
      "Only data to be transmitted, with power always supplied separately",
      "Fibre optic signals to be converted to copper",
      "Wireless devices to be hardwired"
    ],
    "correct": "Electrical power and data to be carried over the same network cable to devices such as IP cameras or access points",
    "explanation": "PoE enables devices like IP cameras, phones or wireless access points to receive both power and data through a single network cable.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why is correct termination of data cable connectors, such as RJ45 plugs, important?",
    "options": [
      "Poor termination can cause signal loss, interference or intermittent connection issues",
      "Termination has no impact on network performance",
      "Any wiring order will work equally well",
      "Only the outer jacket needs to be secured"
    ],
    "correct": "Poor termination can cause signal loss, interference or intermittent connection issues",
    "explanation": "Correctly following the wiring standard (such as T568A/B) and terminating cleanly is essential to avoid signal degradation or unreliable connections.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is a comms room typically used for in a structured cabling installation?",
    "options": [
      "Housing central network equipment such as switches, patch panels and servers",
      "Storing general office stationery",
      "Providing a rest area for staff",
      "Housing the building's main electrical intake only"
    ],
    "correct": "Housing central network equipment such as switches, patch panels and servers",
    "explanation": "A comms room centralises key network infrastructure, providing a controlled environment for switches, patch panels and related equipment.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is the purpose of a wiring diagram compared to a schematic diagram?",
    "options": [
      "A wiring diagram shows the physical layout and connections, while a schematic shows the electrical logic and function",
      "They are always identical documents",
      "A wiring diagram never shows connections",
      "A schematic diagram is only used for plumbing"
    ],
    "correct": "A wiring diagram shows the physical layout and connections, while a schematic shows the electrical logic and function",
    "explanation": "Wiring diagrams focus on physical connections and layout, while schematics represent the electrical function and logic of a circuit, often more abstractly.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is 'snagging' in the context of a construction or installation project?",
    "options": [
      "Identifying and listing minor defects or incomplete items that need to be resolved before final completion",
      "A method of joining cables together",
      "A type of cable support clip",
      "A term for switching off the electricity supply"
    ],
    "correct": "Identifying and listing minor defects or incomplete items that need to be resolved before final completion",
    "explanation": "A snagging list records minor outstanding defects or unfinished items to be addressed before a project is signed off as complete.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is a 'variation order' in a construction/electrical contracting context?",
    "options": [
      "A formal instruction to change the scope of work from what was originally agreed",
      "A type of electrical test certificate",
      "A tool used for bending conduit",
      "A legal requirement for all domestic rewires"
    ],
    "correct": "A formal instruction to change the scope of work from what was originally agreed",
    "explanation": "A variation order formally documents an agreed change to the original scope of works, often affecting cost and/or programme.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why is it good practice to label circuits clearly at the distribution board?",
    "options": [
      "To help identify which circuit breaker controls which part of the installation, aiding safe isolation and future maintenance",
      "Labelling is purely decorative",
      "Labels are only required for three-phase boards",
      "It has no impact on future maintenance work"
    ],
    "correct": "To help identify which circuit breaker controls which part of the installation, aiding safe isolation and future maintenance",
    "explanation": "Clear circuit labelling helps anyone working on the installation quickly and correctly identify circuits, supporting safe isolation and future work.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is meant by 'as-built' drawings on a completed project?",
    "options": [
      "Drawings updated to reflect the actual final installation, including any changes made during construction",
      "The original design drawings with no updates",
      "Drawings only used before construction begins",
      "Drawings that show only the building's exterior"
    ],
    "correct": "Drawings updated to reflect the actual final installation, including any changes made during construction",
    "explanation": "As-built drawings are revised to accurately show the installation as it was actually constructed, including any deviations from the original design.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the purpose of a bill of quantities in a larger electrical contracting project?",
    "options": [
      "To itemise the materials, labour and work required, supporting accurate costing and procurement",
      "To record staff holiday requests",
      "To replace the need for drawings",
      "To log daily weather conditions on site"
    ],
    "correct": "To itemise the materials, labour and work required, supporting accurate costing and procurement",
    "explanation": "A bill of quantities breaks down the materials and work needed for a project, helping with accurate pricing, procurement and cost control.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why might an electrician need to liaise with other trades, such as plumbers or joiners, during a project?",
    "options": [
      "To coordinate work and avoid conflicts, such as cables and pipework clashing in the same space",
      "Electricians never need to coordinate with other trades",
      "Only the site manager is allowed to speak with other trades",
      "Coordination is only needed on the final day of a project"
    ],
    "correct": "To coordinate work and avoid conflicts, such as cables and pipework clashing in the same space",
    "explanation": "Good coordination between trades helps avoid clashes, such as cable routes conflicting with pipework, and keeps the overall project running smoothly.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is a key benefit of maintaining accurate records and certificates for completed electrical work?",
    "options": [
      "They provide evidence of compliance and are essential for future maintenance, insurance or legal purposes",
      "Records serve no purpose once work is signed off",
      "Only new-build properties require any records",
      "Certificates are only needed if requested by a competitor"
    ],
    "correct": "They provide evidence of compliance and are essential for future maintenance, insurance or legal purposes",
    "explanation": "Accurate certification and records provide crucial evidence of compliance and support future maintenance, insurance claims, or legal requirements.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the recommended material for the enclosure of a consumer unit installed in a domestic property, per current Building Regulations guidance?",
    "options": [
      "A non-combustible material, such as metal",
      "Standard PVC plastic only",
      "Wood",
      "Cardboard-based composite"
    ],
    "correct": "A non-combustible material, such as metal",
    "explanation": "Current guidance recommends metal (non-combustible) consumer unit enclosures in domestic premises, reducing the risk of fire spread from a fault within the unit.",
    "topic": "Consumer Units"
  },
  {
    "text": "What rating is a domestic consumer unit main switch commonly required to have, subject to the installation's design current?",
    "options": [
      "At least 100A is common for many domestic supplies, subject to design",
      "Always exactly 6A",
      "Always exactly 16A",
      "There is no minimum rating requirement"
    ],
    "correct": "At least 100A is common for many domestic supplies, subject to design",
    "explanation": "Many domestic consumer units use a 100A rated main switch, though the exact requirement depends on the specific installation's design current.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why might a consumer unit use split-load RCD protection, with two RCDs each covering some circuits?",
    "options": [
      "To reduce the impact of an RCD trip, so not every circuit in the property loses power at once",
      "Split-load boards are always cheaper to buy",
      "It removes the need for individual circuit breakers",
      "It is required for lighting circuits only"
    ],
    "correct": "To reduce the impact of an RCD trip, so not every circuit in the property loses power at once",
    "explanation": "Splitting circuits across two RCDs means a fault on one RCD's circuits doesn't cut power to everything, such as the fridge or freezer, on the other RCD.",
    "topic": "Consumer Units"
  },
  {
    "text": "What is a key reason for using RCBOs on each individual circuit in a consumer unit, rather than a single RCD covering multiple circuits?",
    "options": [
      "A fault on one circuit only trips that circuit's RCBO, leaving other circuits unaffected",
      "RCBOs cannot provide any earth leakage protection",
      "RCBOs are always cheaper than a shared RCD",
      "RCBOs remove the need for a main switch"
    ],
    "correct": "A fault on one circuit only trips that circuit's RCBO, leaving other circuits unaffected",
    "explanation": "Individual RCBOs provide better discrimination, since a fault only affects the single circuit it protects rather than a whole group sharing one RCD.",
    "topic": "Consumer Units"
  },
  {
    "text": "What should be checked about the incoming supply before selecting or upgrading a consumer unit?",
    "options": [
      "The type of earthing system and the rating of the supply, to ensure compatibility and adequate capacity",
      "Only the colour of the meter",
      "Nothing, any consumer unit will work on any supply",
      "Only the manufacturer's warranty terms"
    ],
    "correct": "The type of earthing system and the rating of the supply, to ensure compatibility and adequate capacity",
    "explanation": "The earthing system type (e.g. TN-C-S, TT) and supply rating affect what protective devices and consumer unit features are appropriate.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why is it important to record circuit details on a consumer unit's circuit chart or schedule?",
    "options": [
      "To clearly identify what each breaker controls, supporting safe isolation and future maintenance",
      "Circuit charts are only decorative",
      "Only commercial installations require circuit charts",
      "It is only needed if the property is being sold"
    ],
    "correct": "To clearly identify what each breaker controls, supporting safe isolation and future maintenance",
    "explanation": "An accurate, up-to-date circuit chart helps anyone working on the installation quickly identify the correct breaker, supporting safe isolation.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why is correct disposal of waste electrical equipment, such as old consumer units or cabling, important?",
    "options": [
      "To comply with waste regulations and reduce environmental harm from hazardous materials",
      "Waste disposal has no environmental impact",
      "All electrical waste can be sent to general landfill",
      "It is only a concern for large commercial projects"
    ],
    "correct": "To comply with waste regulations and reduce environmental harm from hazardous materials",
    "explanation": "Electrical waste can contain materials that are hazardous or valuable if recycled, so correct disposal supports legal compliance and environmental protection.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What does WEEE stand for in relation to electrical waste?",
    "options": [
      "Waste Electrical and Electronic Equipment",
      "Work Environment and Electrical Efficiency",
      "Warranty for Electrical Equipment Extended",
      "Work Ethic and Energy Efficiency"
    ],
    "correct": "Waste Electrical and Electronic Equipment",
    "explanation": "WEEE regulations govern the collection, recycling and disposal of waste electrical and electronic equipment to reduce environmental impact.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why should packaging waste from materials delivered to site be segregated where possible?",
    "options": [
      "To support recycling and reduce the amount of waste sent to landfill",
      "Segregation always increases landfill waste",
      "It is only required for hazardous materials",
      "Packaging waste cannot be recycled under any circumstances"
    ],
    "correct": "To support recycling and reduce the amount of waste sent to landfill",
    "explanation": "Sorting waste such as cardboard, plastic and metal packaging supports effective recycling and reduces the overall environmental impact of a project.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is a common benefit of specifying energy-efficient electrical equipment, such as LED lighting, in a project?",
    "options": [
      "Reduced energy consumption, lowering both running costs and environmental impact",
      "Energy-efficient equipment always costs less to purchase upfront",
      "It has no effect on a building's carbon footprint",
      "It removes the need for any electrical testing"
    ],
    "correct": "Reduced energy consumption, lowering both running costs and environmental impact",
    "explanation": "Choosing energy-efficient equipment reduces ongoing electricity consumption, benefiting both the building's running costs and its overall environmental impact.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why might oils or coolants used in some electrical/mechanical equipment need special handling and disposal?",
    "options": [
      "They can be hazardous to the environment and may require specific containment and disposal methods",
      "They can always be poured down a drain safely",
      "They have no environmental impact whatsoever",
      "General waste bins are always suitable for disposal"
    ],
    "correct": "They can be hazardous to the environment and may require specific containment and disposal methods",
    "explanation": "Oils and coolants can contaminate soil and water if disposed of incorrectly, so they require careful containment and disposal via approved routes.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is a key environmental consideration when planning cable and equipment installation near watercourses or sensitive habitats?",
    "options": [
      "Minimising the risk of pollution or disturbance to the surrounding environment",
      "There are no special considerations near watercourses",
      "Only aesthetic factors need to be considered",
      "Watercourses have no relevance to construction projects"
    ],
    "correct": "Minimising the risk of pollution or disturbance to the surrounding environment",
    "explanation": "Work near watercourses or sensitive habitats requires extra care to avoid pollution incidents or disturbance to protected environments.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why is reducing unnecessary energy use, such as leaving equipment running when not needed, encouraged on site?",
    "options": [
      "It reduces both running costs and the site's overall environmental impact",
      "Energy use has no environmental cost",
      "It is only relevant to office-based businesses",
      "It always increases the risk of equipment failure"
    ],
    "correct": "It reduces both running costs and the site's overall environmental impact",
    "explanation": "Simple measures like switching off unused equipment reduce unnecessary energy consumption, benefiting both costs and the environment.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What environmental factor should be considered when choosing between different types of batteries for equipment or storage systems?",
    "options": [
      "Their environmental impact across manufacture, use and end-of-life disposal or recycling",
      "Only the colour of the battery casing",
      "Batteries have no environmental considerations",
      "Only the physical size of the battery matters"
    ],
    "correct": "Their environmental impact across manufacture, use and end-of-life disposal or recycling",
    "explanation": "Different battery chemistries have varying environmental impacts throughout their lifecycle, which is an increasingly important factor in equipment selection.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is the minimum duration emergency escape lighting is often required to operate for in many standard applications, subject to the specific risk assessment?",
    "options": [
      "3 hours",
      "10 minutes",
      "24 hours",
      "5 minutes"
    ],
    "correct": "3 hours",
    "explanation": "A commonly specified minimum duration for emergency escape lighting in many buildings is 3 hours, though this depends on the specific application and evacuation strategy.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What colour is typically used for fire safety signs indicating escape routes and exits?",
    "options": [
      "Green",
      "Red",
      "Yellow",
      "Blue"
    ],
    "correct": "Green",
    "explanation": "Green is the standard colour for safe condition signage, including fire exit and escape route signs, under UK and European signage standards.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What colour is typically used for prohibition signs, such as 'No Smoking'?",
    "options": [
      "Red",
      "Green",
      "Blue",
      "Yellow and black"
    ],
    "correct": "Red",
    "explanation": "Red is used for prohibition signs, indicating an action that must not be carried out, such as 'No Smoking' or 'No Access'.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What colour and shape combination is typically used for mandatory signs, such as 'Wear Eye Protection'?",
    "options": [
      "Blue circle",
      "Yellow triangle",
      "Green square",
      "Red circle with diagonal line"
    ],
    "correct": "Blue circle",
    "explanation": "Mandatory signs, instructing a specific action must be taken, use a blue circular design under standard safety signage conventions.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is the purpose of regularly testing emergency lighting systems?",
    "options": [
      "To confirm luminaires and batteries will function correctly if the mains supply fails",
      "Testing is not required once installed",
      "To increase the brightness of the fittings over time",
      "To reduce the battery life of the system"
    ],
    "correct": "To confirm luminaires and batteries will function correctly if the mains supply fails",
    "explanation": "Periodic testing, including simulated mains failure, ensures emergency lighting will actually operate correctly when genuinely needed.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "Why must escape route signage be positioned so it remains visible even if general lighting fails?",
    "options": [
      "To ensure people can still find their way to safety during a power failure or fire",
      "Signage visibility during a power failure is not important",
      "Signs only need to be visible during daylight hours",
      "Signage position has no bearing on evacuation safety"
    ],
    "correct": "To ensure people can still find their way to safety during a power failure or fire",
    "explanation": "Escape signage often incorporates or is illuminated by emergency lighting so it remains visible and effective even during a power failure.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is the purpose of a single line diagram in an electrical installation?",
    "options": [
      "To show the overall distribution system in simplified form, using single lines to represent circuits",
      "To show detailed physical cable routes only",
      "To replace the need for an installation certificate",
      "To record test results"
    ],
    "correct": "To show the overall distribution system in simplified form, using single lines to represent circuits",
    "explanation": "A single line diagram simplifies a distribution system, typically showing one line per circuit or group of conductors, to give an overview of the system layout.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What information would you typically expect to find on an electrical installation's distribution board schedule?",
    "options": [
      "Circuit details such as description, cable size, protective device rating and type",
      "Only the make and model of the consumer unit",
      "The weather conditions on the day of installation",
      "The names of everyone who has ever visited the property"
    ],
    "correct": "Circuit details such as description, cable size, protective device rating and type",
    "explanation": "A distribution board schedule records key details of each circuit, helping identify and understand the installation for maintenance and safety purposes.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why should test results be accurately recorded on the correct certificate, such as an EIC or EICR?",
    "options": [
      "To provide a permanent, verifiable record of the installation's condition and compliance at the time of testing",
      "Test results have no long-term value once the job is finished",
      "Only failed tests need to be recorded",
      "Certificates are optional paperwork with no legal significance"
    ],
    "correct": "To provide a permanent, verifiable record of the installation's condition and compliance at the time of testing",
    "explanation": "Accurate certification provides evidence of compliance and condition, which may be relied upon for safety, legal, or insurance purposes later.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the purpose of a minor works certificate?",
    "options": [
      "To certify smaller-scale electrical work that does not include a new circuit",
      "To certify a complete rewire of a property",
      "To replace the need for periodic inspection entirely",
      "To record staff attendance on site"
    ],
    "correct": "To certify smaller-scale electrical work that does not include a new circuit",
    "explanation": "A minor works certificate is used for smaller additions or alterations to an existing circuit, where a full Electrical Installation Certificate isn't required.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What key information should a risk assessment document typically include?",
    "options": [
      "The hazards identified, who might be harmed, and the control measures put in place",
      "Only the name of the person filling in the form",
      "The cost of materials for the job",
      "The brand of tools being used"
    ],
    "correct": "The hazards identified, who might be harmed, and the control measures put in place",
    "explanation": "A risk assessment should clearly record identified hazards, who could be affected, and the measures taken to reduce the associated risk.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why is version control important when working from design drawings on a project?",
    "options": [
      "Using an outdated drawing could lead to installing work that does not match the current, approved design",
      "Version control is not relevant to construction drawings",
      "Drawings never change once issued",
      "Only the project manager needs to check drawing versions"
    ],
    "correct": "Using an outdated drawing could lead to installing work that does not match the current, approved design",
    "explanation": "Working from an old drawing revision could result in installing incorrect or superseded work, so confirming the latest version is important.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the purpose of a legend or key on an electrical drawing?",
    "options": [
      "To explain the meaning of symbols used on the drawing",
      "To provide the client's contact details",
      "To list all tools required for the job",
      "To record the weather forecast for the project"
    ],
    "correct": "To explain the meaning of symbols used on the drawing",
    "explanation": "A legend explains what each symbol on a drawing represents, ensuring the drawing can be correctly interpreted by anyone reading it.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why is it good practice to retain copies of test certificates and reports for a property's electrical installation?",
    "options": [
      "They provide evidence of the installation's history and condition, useful for future work, sale, or insurance purposes",
      "Certificates lose all relevance the day after issue",
      "Only new-build properties benefit from retained certificates",
      "Retaining certificates is only required for commercial premises"
    ],
    "correct": "They provide evidence of the installation's history and condition, useful for future work, sale, or insurance purposes",
    "explanation": "Keeping a record of past certification helps establish an installation's history, supporting future maintenance decisions, property sales, or insurance needs.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Before carrying out a safe isolation, what should be checked about the proving unit or voltage indicator itself?",
    "options": [
      "That it is proved on a known live source (e.g. proving unit) both before and after use",
      "That it is the newest model available",
      "That it has a coloured casing",
      "That it was manufactured in the UK"
    ],
    "correct": "That it is proved on a known live source (e.g. proving unit) both before and after use",
    "explanation": "GS38 guidance requires proving a test instrument works correctly before and after checking a circuit is dead, to confirm the instrument itself hasn't failed.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Who is normally authorised to remove a lock and label placed on an isolator during a safe isolation?",
    "options": [
      "Only the person who applied it, or someone formally authorised to remove it under a documented procedure",
      "Any electrician on site",
      "The site security guard",
      "Whoever needs the circuit live next"
    ],
    "correct": "Only the person who applied it, or someone formally authorised to remove it under a documented procedure",
    "explanation": "Locks and labels should only be removed by the person who fitted them, or through a controlled handover procedure, to prevent someone being exposed to danger.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Why should a unique, multi-lock hasp be used when more than one person is working on the same isolated circuit?",
    "options": [
      "It allows each individual to fit their own padlock so the isolation cannot be removed until everyone has finished",
      "It looks more professional",
      "It reduces the cost of padlocks",
      "It speeds up the isolation process"
    ],
    "correct": "It allows each individual to fit their own padlock so the isolation cannot be removed until everyone has finished",
    "explanation": "A multi-lock hasp lets each worker apply their own lock, ensuring the supply cannot be restored until every individual has removed their own padlock.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is meant by 'safe isolation' in an electrical context?",
    "options": [
      "A formal procedure to disconnect and secure a circuit so it cannot be energised while work takes place",
      "Turning a switch off temporarily",
      "Wearing insulated gloves while working live",
      "Using an extension lead with an RCD"
    ],
    "correct": "A formal procedure to disconnect and secure a circuit so it cannot be energised while work takes place",
    "explanation": "Safe isolation is a documented sequence of steps to disconnect, lock off, and prove dead a circuit before work begins.",
    "topic": "Safe Isolation"
  },
  {
    "text": "When isolating a circuit fed from more than one source (e.g. dual supply or generator backup), what extra step is essential?",
    "options": [
      "Identifying and isolating every possible source of supply, not just the main one",
      "Isolating only the source that is currently in use",
      "Assuming a backup source will not be an issue",
      "Leaving the generator connected for convenience"
    ],
    "correct": "Identifying and isolating every possible source of supply, not just the main one",
    "explanation": "Circuits with alternative or standby supplies must have every source isolated, or the circuit could remain live from an unexpected feed.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What should be done immediately after proving a circuit dead during safe isolation, before starting work?",
    "options": [
      "Re-prove the test instrument on a known live source to confirm it is still working correctly",
      "Remove the lock straight away",
      "Inform the client the job is complete",
      "Switch the isolator back on briefly"
    ],
    "correct": "Re-prove the test instrument on a known live source to confirm it is still working correctly",
    "explanation": "The dead-test-dead sequence (prove, test, prove) confirms the voltage indicator was functioning throughout, giving confidence the dead reading was genuine.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is a common risk of isolating the wrong circuit due to poor labelling in a distribution board?",
    "options": [
      "Working on what is believed to be a dead circuit while it is actually still live",
      "The distribution board becoming damaged",
      "The job taking slightly longer",
      "The wrong circuit tripping later"
    ],
    "correct": "Working on what is believed to be a dead circuit while it is actually still live",
    "explanation": "Inaccurate or missing circuit labelling can lead to isolating the wrong way, creating a serious risk of contact with a live conductor.",
    "topic": "Safe Isolation"
  },
  {
    "text": "According to safe isolation procedure, what should be done with the isolator handle or switch after locking off?",
    "options": [
      "Attach a warning label stating who isolated it and why, alongside the lock",
      "Nothing further is required once locked",
      "Leave it unlabelled to avoid confusion",
      "Remove the isolator completely from the board"
    ],
    "correct": "Attach a warning label stating who isolated it and why, alongside the lock",
    "explanation": "A label identifies who carried out the isolation and the reason, helping prevent accidental reconnection by others.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Why is it important to test between all combinations of conductors (line-neutral, line-earth, neutral-earth) when proving dead?",
    "options": [
      "A fault or unusual wiring arrangement could leave a conductor live even if another combination reads dead",
      "It is only a formality with no real safety purpose",
      "It make the test take longer for no reason",
      "Only line-neutral needs testing in practice"
    ],
    "correct": "A fault or unusual wiring arrangement could leave a conductor live even if another combination reads dead",
    "explanation": "Testing all conductor combinations ensures no live conductor is missed, since a single test alone will not reveal every possible danger.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Which document is typically used on larger or higher-risk sites to formally record and authorise an isolation before work begins?",
    "options": [
      "A permit to work",
      "A delivery note",
      "A holiday request form",
      "A vehicle inspection sheet"
    ],
    "correct": "A permit to work",
    "explanation": "A permit to work is a formal, signed system used to control and authorise high-risk work such as isolations, ensuring the correct steps and checks are followed.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What should an electrician do if they discover another trade has removed their isolation lock without authority?",
    "options": [
      "Stop, investigate fully, and re-isolate and prove dead again before continuing any work",
      "Continue working since the circuit was previously proved dead",
      "Report it at the end of the day",
      "Ignore it if the circuit still appears dead"
    ],
    "correct": "Stop, investigate fully, and re-isolate and prove dead again before continuing any work",
    "explanation": "Once an isolation has been tampered with, its integrity can no longer be trusted, so the full safe isolation procedure must be repeated.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Why should test instrument leads used for live testing conform to GS38 guidance?",
    "options": [
      "Properly designed leads, with shrouded probes and fused connections, reduce the risk of electric shock or short circuit during testing",
      "GS38 only applies to leads used for dead testing",
      "Any set of test leads is acceptable regardless of design",
      "GS38 relates only to the colour of test leads"
    ],
    "correct": "Properly designed leads, with shrouded probes and fused connections, reduce the risk of electric shock or short circuit during testing",
    "explanation": "GS38 sets out design features, such as finger guards and fused, shrouded probes, that help keep the tester safe when carrying out live testing.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why must sensitive electronic equipment often be disconnected before an insulation resistance test?",
    "options": [
      "The high test voltage used could damage the electronics",
      "It makes the test results look better",
      "It is a legal requirement unrelated to safety",
      "It slows down the test unnecessarily"
    ],
    "correct": "The high test voltage used could damage the electronics",
    "explanation": "Insulation resistance testers apply a DC test voltage that can damage sensitive electronic components, so such equipment should be disconnected first.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does a polarity test confirm on a final circuit?",
    "options": [
      "That line, neutral, and switching conductors are correctly connected throughout the circuit",
      "That the circuit breaker is the correct size",
      "That the correct cable colour has been used",
      "That the earth bar is tight"
    ],
    "correct": "That line, neutral, and switching conductors are correctly connected throughout the circuit",
    "explanation": "A polarity test ensures single-pole devices switch the line conductor and that connections are correctly orientated, preventing reversed polarity hazards.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why is earth fault loop impedance (Zs) tested on a circuit?",
    "options": [
      "To confirm that protective devices will operate quickly enough in the event of a fault",
      "To measure the total length of cable installed",
      "To check that cable colours match the schedule",
      "To confirm the voltage of the supply only"
    ],
    "correct": "To confirm that protective devices will operate quickly enough in the event of a fault",
    "explanation": "A low enough Zs value ensures sufficient fault current flows to operate the protective device within the required disconnection time.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the correct order in which dead tests are typically carried out before energising a new installation?",
    "options": [
      "Continuity, insulation resistance, and polarity, before any live testing",
      "Only insulation resistance is required",
      "Live tests first, followed by dead tests",
      "Testing order does not matter"
    ],
    "correct": "Continuity, insulation resistance, and polarity, before any live testing",
    "explanation": "Dead tests (continuity, insulation resistance, polarity) must be completed and satisfactory before the installation is energised for live testing.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What should be done if an insulation resistance reading is lower than the minimum acceptable value?",
    "options": [
      "Investigate and rectify the fault before the circuit is put into service",
      "Record the reading and continue regardless",
      "Increase the test voltage to get a better reading",
      "Ignore it if the circuit still appears to work"
    ],
    "correct": "Investigate and rectify the fault before the circuit is put into service",
    "explanation": "A low insulation resistance reading indicates a potential fault that must be found and corrected before the circuit is considered safe to use.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of a Ring Final Circuit continuity test (r1, rn, r2 method)?",
    "options": [
      "To confirm the ring is continuous and correctly wired with no breaks or interconnections",
      "To measure the voltage drop only",
      "To test the RCD trip time",
      "To check the consumer unit is earthed"
    ],
    "correct": "To confirm the ring is continuous and correctly wired with no breaks or interconnections",
    "explanation": "This test checks the ring circuit conductors are unbroken and correctly connected, revealing faults such as broken rings or spurs wired incorrectly.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why is an RCD test button press not considered a substitute for using a proper RCD tester during periodic inspection?",
    "options": [
      "The test button only confirms the mechanism operates, not the actual trip time or sensitivity",
      "It is exactly the same as using a proper tester",
      "The button test is more accurate",
      "It tests the whole installation, not just the RCD"
    ],
    "correct": "The test button only confirms the mechanism operates, not the actual trip time or sensitivity",
    "explanation": "A dedicated RCD tester measures the actual trip current and time, giving far more detailed information than a simple push-button functional check.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What document is typically issued on completion of a new electrical installation, following satisfactory inspection and testing?",
    "options": [
      "An Electrical Installation Certificate",
      "A Method Statement",
      "A Risk Assessment",
      "A COSHH data sheet"
    ],
    "correct": "An Electrical Installation Certificate",
    "explanation": "An Electrical Installation Certificate confirms the work has been designed, constructed, inspected, and tested in accordance with BS 7671.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the main purpose of a visual inspection before any dead testing is carried out?",
    "options": [
      "To identify obvious defects, damage, or non-compliance before applying test instruments",
      "To save time by skipping electrical testing entirely",
      "To check the colour of the consumer unit",
      "To confirm the property address is correct"
    ],
    "correct": "To identify obvious defects, damage, or non-compliance before applying test instruments",
    "explanation": "A visual inspection can reveal issues such as damaged cables, incorrect accessories, or missing covers before any testing begins.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why might a periodic inspection report classify an observation as 'C1' rather than 'C2' or 'C3'?",
    "options": [
      "Because it presents danger and requires immediate remedial action",
      "Because it is purely for future improvement",
      "Because it is not important and can be left indefinitely",
      "Because the code relates only to documentation issues"
    ],
    "correct": "Because it presents danger and requires immediate remedial action",
    "explanation": "C1 (danger present) is the most urgent classification, requiring action to remove the danger without delay, unlike C2 (potentially dangerous) or C3 (improvement recommended).",
    "topic": "Testing and Inspection"
  },
  {
    "text": "Why are cables often installed within 'safe zones' when concealed in walls?",
    "options": [
      "To reduce the risk of the cable being damaged by drilling, screwing, or nailing",
      "To make the cable look neater",
      "To reduce the total length of cable used",
      "It is only a cosmetic guideline, not a safety measure"
    ],
    "correct": "To reduce the risk of the cable being damaged by drilling, screwing, or nailing",
    "explanation": "Safe zones are defined areas (e.g. near sockets or corners) where cables are expected to run, reducing the chance of accidental damage later.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the main reason for derating a cable's current-carrying capacity when it is bunched with other cables?",
    "options": [
      "Grouped cables generate more heat together, reducing their ability to dissipate it",
      "Bunched cables always carry less current by design",
      "It is a legal formality with no real thermal basis",
      "Bunching improves current capacity, so no derating is needed"
    ],
    "correct": "Grouped cables generate more heat together, reducing their ability to dissipate it",
    "explanation": "When cables are grouped, heat from each cable affects its neighbours, so a grouping (rating) factor reduces the tabulated current-carrying capacity.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What does the term 'volt drop' refer to in a cable run?",
    "options": [
      "The reduction in voltage between the origin of a circuit and the load, caused by cable resistance",
      "The voltage rating printed on the cable",
      "The drop in voltage when a switch is turned off",
      "The difference between line and neutral colours"
    ],
    "correct": "The reduction in voltage between the origin of a circuit and the load, caused by cable resistance",
    "explanation": "As current flows through a cable's resistance, some voltage is lost along the way; excessive volt drop can affect equipment performance.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why must armoured cable (SWA) glands be correctly terminated with the armour bonded to earth?",
    "options": [
      "The steel wire armour can act as a protective conductor and must be properly connected for fault protection",
      "It only affects the mechanical strength of the cable",
      "It is purely a cosmetic requirement",
      "Armour bonding is only needed on flexible cables"
    ],
    "correct": "The steel wire armour can act as a protective conductor and must be properly connected for fault protection",
    "explanation": "The armour of SWA cable often forms part of the earth fault path, so correct glanding and bonding is essential for safety.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is a key advantage of using twin and earth cable over singles drawn through conduit for many domestic circuits?",
    "options": [
      "It is quicker and simpler to install in many standard domestic situations",
      "It never needs to be protected against mechanical damage",
      "It has a higher current rating than any other cable type",
      "It does not require an earth conductor"
    ],
    "correct": "It is quicker and simpler to install in many standard domestic situations",
    "explanation": "Twin and earth is widely used in domestic wiring because it is straightforward to install, though conduit and singles offer more flexibility for future changes.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why should cable ties or clips not be over-tightened when securing cables?",
    "options": [
      "Excessive pressure can damage or deform the cable insulation over time",
      "It has no effect on the cable at all",
      "It always improves the cable's current rating",
      "Loose cables are always more dangerous than tight ones"
    ],
    "correct": "Excessive pressure can damage or deform the cable insulation over time",
    "explanation": "Over-tightened fixings can crush or nick cable insulation, potentially creating a fault or reducing the cable's service life.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the purpose of cable identification labels or ferrules at a distribution board?",
    "options": [
      "To clearly identify which circuit each cable belongs to for safe future work",
      "To make the board look tidy for photographs",
      "To indicate the manufacturer of the cable",
      "They are only required on three-phase installations"
    ],
    "correct": "To clearly identify which circuit each cable belongs to for safe future work",
    "explanation": "Clear circuit identification helps anyone working on the installation in future to isolate and work on the correct circuit safely.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why is it important to select a cable with an appropriate temperature rating for its installation method?",
    "options": [
      "Different installation methods and ambient conditions affect how much heat the cable can safely dissipate",
      "All cables have identical temperature ratings regardless of installation",
      "Temperature rating only matters for underground cables",
      "It is purely an aesthetic specification"
    ],
    "correct": "Different installation methods and ambient conditions affect how much heat the cable can safely dissipate",
    "explanation": "Cable ratings assume specific installation conditions; deviating from these (e.g. thermal insulation) can require a different cable size or rating factor.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is a common cause of a cable overheating in service?",
    "options": [
      "The cable is undersized for the current it is required to carry",
      "The cable is a different colour to nearby cables",
      "The cable was manufactured in a different country",
      "The cable has too many identification labels"
    ],
    "correct": "The cable is undersized for the current it is required to carry",
    "explanation": "If a cable's current-carrying capacity is exceeded, it can overheat, degrading insulation and creating a fire risk.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Why should flexible cords supplying portable equipment be inspected regularly?",
    "options": [
      "They are more exposed to mechanical damage, flexing, and wear than fixed wiring",
      "They never need inspection once installed",
      "They are not covered by any safety guidance",
      "Flexible cords cannot develop faults"
    ],
    "correct": "They are more exposed to mechanical damage, flexing, and wear than fixed wiring",
    "explanation": "Flexible cords are subject to repeated movement, trapping, and abrasion, making them more prone to damage than fixed cabling.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the main purpose of using conduit or trunking to enclose cables?",
    "options": [
      "To provide mechanical protection and allow for future cable additions or replacement",
      "To increase the voltage rating of the cables",
      "To reduce the number of cables required",
      "It is purely a decorative finish"
    ],
    "correct": "To provide mechanical protection and allow for future cable additions or replacement",
    "explanation": "Conduit and trunking protect cables from damage and make it easier to add, remove, or replace cables without disturbing the building fabric.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "Under the Work at Height Regulations, what is the first principle that should be considered when planning work above ground level?",
    "options": [
      "Avoid work at height where it is reasonably practicable to do so",
      "Always use the tallest ladder available",
      "Work at height is always required regardless of alternatives",
      "Only consider height once work has started"
    ],
    "correct": "Avoid work at height where it is reasonably practicable to do so",
    "explanation": "The hierarchy of control for work at height starts with avoiding it altogether if a safer alternative exists, before considering how to do it safely.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be checked on a ladder before each use?",
    "options": [
      "That it is free from damage, the feet are secure, and it is suitable for the task",
      "Only that it is the correct colour",
      "That it has been used recently by someone else",
      "That it matches the colour of the building"
    ],
    "correct": "That it is free from damage, the feet are secure, and it is suitable for the task",
    "explanation": "A pre-use ladder check helps identify damage, wear, or instability that could lead to a fall before the ladder is climbed.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the recommended angle for positioning a leaning ladder against a wall?",
    "options": [
      "Approximately 75 degrees, or a 1-in-4 ratio",
      "45 degrees",
      "90 degrees, standing vertically",
      "It does not matter as long as it reaches the top"
    ],
    "correct": "Approximately 75 degrees, or a 1-in-4 ratio",
    "explanation": "The 1-in-4 rule (one unit out for every four units up) gives roughly 75 degrees, providing a stable angle that reduces the risk of slipping or toppling.",
    "topic": "Work at Height"
  },
  {
    "text": "Why might a tower scaffold be preferred over a ladder for certain tasks?",
    "options": [
      "It provides a larger, more stable working platform for tasks of longer duration",
      "It is always quicker to set up than a ladder",
      "It requires no inspection before use",
      "It removes the need for any other safety measures"
    ],
    "correct": "It provides a larger, more stable working platform for tasks of longer duration",
    "explanation": "A tower scaffold offers a stable platform to work from, reducing fatigue and risk compared with balancing on a ladder for extended periods.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be done with tools and materials when working at height to prevent them falling?",
    "options": [
      "Secure them appropriately, such as using tool lanyards or toe boards, to prevent them dropping",
      "Leave them loose on the platform edge for convenience",
      "Throw them down when finished with them",
      "There is no need to consider falling objects"
    ],
    "correct": "Secure them appropriately, such as using tool lanyards or toe boards, to prevent them dropping",
    "explanation": "Falling tools or materials can cause serious injury to people below, so measures should be taken to prevent items from being dropped.",
    "topic": "Work at Height"
  },
  {
    "text": "Who should carry out an inspection of a scaffold before it is first used?",
    "options": [
      "A competent person, and the scaffold should be inspected again at regular intervals",
      "Anyone who happens to be passing",
      "Only the scaffold hire company, once, at delivery",
      "No inspection is needed if it looks sturdy"
    ],
    "correct": "A competent person, and the scaffold should be inspected again at regular intervals",
    "explanation": "Scaffolds should be inspected by a competent person before first use and then at least every 7 days, or after adverse weather, to ensure continued safety.",
    "topic": "Work at Height"
  },
  {
    "text": "Why is training required before someone operates a MEWP?",
    "options": [
      "Incorrect operation can lead to tipping, entrapment, or falls from height",
      "MEWPs are simple enough that no training is needed",
      "Training is only a legal formality with no safety benefit",
      "Only the site manager needs training, not the operator"
    ],
    "correct": "Incorrect operation can lead to tipping, entrapment, or falls from height",
    "explanation": "MEWPs involve specific hazards, so operators must be trained to use them safely and understand the equipment's limitations.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the purpose of guard rails on a working platform?",
    "options": [
      "To provide collective fall protection for anyone on the platform",
      "To act purely as a decorative feature",
      "To stop tools from being used on the platform",
      "To increase the height of the platform"
    ],
    "correct": "To provide collective fall protection for anyone on the platform",
    "explanation": "Guard rails are a form of collective protection, preventing falls without relying on individuals wearing specific equipment correctly.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be considered about weather conditions before working at height outdoors?",
    "options": [
      "High winds, rain, or ice can significantly increase the risk of a fall",
      "Weather has no effect on the safety of work at height",
      "Only rain needs to be considered, not wind",
      "Weather checks are only needed for roof work"
    ],
    "correct": "High winds, rain, or ice can significantly increase the risk of a fall",
    "explanation": "Adverse weather can affect grip, stability, and visibility, so work at height should be reviewed or postponed if conditions become unsafe.",
    "topic": "Work at Height"
  },
  {
    "text": "What is 'fall arrest' equipment designed to do?",
    "options": [
      "Safely stop and limit the impact on a person after a fall has begun",
      "Prevent a person from ever approaching an edge",
      "Replace the need for any other safety measures",
      "Only used for lifting heavy materials"
    ],
    "correct": "Safely stop and limit the impact on a person after a fall has begun",
    "explanation": "Fall arrest systems, such as harnesses with shock-absorbing lanyards, are designed to limit the forces on the body if a fall occurs.",
    "topic": "Work at Height"
  },
  {
    "text": "Under PPE regulations, what should an employer do if PPE alone cannot adequately control a risk?",
    "options": [
      "Consider other control measures first, using PPE as a last resort alongside them",
      "Provide only PPE and consider the risk fully controlled",
      "Ignore the risk if PPE has been issued",
      "Ask the worker to purchase their own alternative"
    ],
    "correct": "Consider other control measures first, using PPE as a last resort alongside them",
    "explanation": "The hierarchy of control places PPE at the bottom, used only after elimination, substitution, engineering, and administrative controls have been considered.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why should safety footwear with a protective toecap be worn on many construction and electrical sites?",
    "options": [
      "To protect the feet from falling objects or crushing hazards",
      "To improve the appearance of the worker",
      "It is purely optional on most sites",
      "To increase the wearer's height"
    ],
    "correct": "To protect the feet from falling objects or crushing hazards",
    "explanation": "Safety footwear reduces the risk of foot injuries from dropped tools, materials, or other crushing hazards common on site.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the main purpose of a manual handling risk assessment before lifting a heavy item?",
    "options": [
      "To identify the load, individual, task, and environment factors that could cause injury",
      "To decide who gets to carry the lightest item",
      "It is only required for loads over 50kg",
      "To determine the colour of the item being lifted"
    ],
    "correct": "To identify the load, individual, task, and environment factors that could cause injury",
    "explanation": "A manual handling assessment considers the task, individual capability, load, and environment (TILE) to reduce the risk of injury.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why should a worker avoid twisting their body while carrying a heavy load?",
    "options": [
      "Twisting under load places uneven strain on the spine and significantly increases the risk of back injury",
      "Twisting has no real effect on the risk of injury",
      "Twisting is only a concern for loads over 25kg",
      "Twisting helps distribute the load's weight more evenly"
    ],
    "correct": "Twisting under load places uneven strain on the spine and significantly increases the risk of back injury",
    "explanation": "Twisting while carrying a load puts uneven, high stress on the spine; turning the feet rather than twisting the back reduces this risk.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why should mechanical aids, such as trolleys or hoists, be considered for moving heavy materials on site?",
    "options": [
      "They reduce the physical strain and risk of injury compared with manual lifting",
      "They are always slower than manual lifting",
      "They are only used for lifting people, not materials",
      "Mechanical aids are banned on construction sites"
    ],
    "correct": "They reduce the physical strain and risk of injury compared with manual lifting",
    "explanation": "Where practical, mechanical aids reduce manual handling risks by removing or reducing the physical effort needed to move a load.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What should be considered when selecting eye protection for a task involving grinding or cutting?",
    "options": [
      "The level of impact resistance needed to protect against flying debris",
      "The colour that matches the worker's clothing",
      "Whether it is comfortable to wear on a cold day only",
      "Eye protection is not needed for grinding tasks"
    ],
    "correct": "The level of impact resistance needed to protect against flying debris",
    "explanation": "Grinding and cutting can produce high-speed particles, so eye protection must be rated appropriately for impact resistance.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is a key reason for wearing hearing protection when working with loud power tools?",
    "options": [
      "Prolonged exposure to high noise levels can cause permanent hearing damage",
      "It makes communication with colleagues easier",
      "It is purely a comfort measure with no health benefit",
      "Hearing protection is only needed outdoors"
    ],
    "correct": "Prolonged exposure to high noise levels can cause permanent hearing damage",
    "explanation": "Excessive noise exposure over time can cause irreversible hearing loss, so hearing protection should be used where noise levels are high.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What should be done with damaged or worn PPE?",
    "options": [
      "It should be reported and replaced, as it may no longer provide adequate protection",
      "It can continue to be used if it still fits",
      "It should be repaired with tape and reused indefinitely",
      "Damage to PPE is not a concern if it is still wearable"
    ],
    "correct": "It should be reported and replaced, as it may no longer provide adequate protection",
    "explanation": "Damaged PPE may fail to protect the wearer as intended, so it should be reported, removed from use, and replaced.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "Why is it important that PPE fits the individual wearer correctly?",
    "options": [
      "Ill-fitting PPE may fail to provide the intended level of protection or create additional hazards",
      "PPE only needs to be the correct colour, not size",
      "One size of PPE suits all workers equally well",
      "Fit is only relevant for footwear, not other PPE"
    ],
    "correct": "Ill-fitting PPE may fail to provide the intended level of protection or create additional hazards",
    "explanation": "PPE that is too loose or too tight can reduce its protective effectiveness or create new risks, such as reduced dexterity or visibility.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the purpose of high-visibility clothing on a construction site?",
    "options": [
      "To make workers more visible to plant operators and vehicle drivers",
      "To indicate a worker's job role only",
      "It is purely a company branding requirement",
      "To keep the wearer warm in cold weather"
    ],
    "correct": "To make workers more visible to plant operators and vehicle drivers",
    "explanation": "High-visibility clothing helps ensure workers are seen by moving vehicles and machinery, reducing the risk of collision.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What should a worker do if they are unsure which PPE is required for a specific task?",
    "options": [
      "Check the risk assessment or ask a supervisor before starting the task",
      "Guess based on what others are wearing",
      "Proceed without PPE if none is immediately available",
      "Assume no PPE is needed unless told otherwise"
    ],
    "correct": "Check the risk assessment or ask a supervisor before starting the task",
    "explanation": "Risk assessments identify the specific PPE required for a task, and a supervisor can clarify requirements if there is any doubt.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What are the three elements needed to form the 'fire triangle'?",
    "options": [
      "Heat, fuel, and oxygen",
      "Heat, water, and smoke",
      "Fuel, smoke, and light",
      "Oxygen, water, and ash"
    ],
    "correct": "Heat, fuel, and oxygen",
    "explanation": "A fire requires heat, fuel, and oxygen together; removing any one of these elements will extinguish or prevent a fire.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why should electrical fires never be tackled with a water fire extinguisher?",
    "options": [
      "Water conducts electricity and could cause electric shock to the person using it",
      "Water is not effective on any type of fire",
      "It is only a matter of extinguisher cost",
      "Water extinguishers are always empty by design"
    ],
    "correct": "Water conducts electricity and could cause electric shock to the person using it",
    "explanation": "Using water on a live electrical fire creates a serious risk of electric shock, as water conducts electricity back to the user.",
    "topic": "Fire Safety"
  },
  {
    "text": "What type of fire extinguisher is generally suitable for use on electrical fires?",
    "options": [
      "CO2 (carbon dioxide) extinguisher",
      "Water extinguisher",
      "Foam extinguisher",
      "Wet chemical extinguisher"
    ],
    "correct": "CO2 (carbon dioxide) extinguisher",
    "explanation": "CO2 extinguishers do not leave a conductive residue and are designed to be safe for use on fires involving live electrical equipment.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is the purpose of a fire evacuation drill on a site or in a workplace?",
    "options": [
      "To ensure everyone knows the evacuation procedure and can leave the building safely and quickly",
      "To test how fast people can run",
      "It is only required once a year regardless of changes on site",
      "To identify who is the fastest at leaving the building"
    ],
    "correct": "To ensure everyone knows the evacuation procedure and can leave the building safely and quickly",
    "explanation": "Regular fire drills help familiarise everyone with escape routes and procedures, reducing confusion in a real emergency.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why should fire doors never be wedged open on a construction site or in a completed building?",
    "options": [
      "An open fire door can allow smoke and fire to spread more quickly through the building",
      "Wedging fire doors open improves ventilation with no downside",
      "Fire doors are not designed to be closed",
      "It only matters in residential buildings, not commercial ones"
    ],
    "correct": "An open fire door can allow smoke and fire to spread more quickly through the building",
    "explanation": "Fire doors are designed to contain fire and smoke within a compartment for a set time; wedging them open defeats this purpose.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is a common cause of electrical fires on a construction site?",
    "options": [
      "Overloaded circuits, damaged cables, or faulty equipment",
      "Using PPE correctly",
      "Following the correct isolation procedure",
      "Keeping fire exits clear"
    ],
    "correct": "Overloaded circuits, damaged cables, or faulty equipment",
    "explanation": "Electrical fires are often caused by overloading, poor connections, or damaged insulation generating excess heat.",
    "topic": "Fire Safety"
  },
  {
    "text": "What should be considered when storing flammable materials, such as solvents, on site?",
    "options": [
      "They should be stored away from ignition sources, in a suitable, well-ventilated area",
      "They can be stored anywhere convenient",
      "Flammable materials do not need special storage arrangements",
      "They should be kept next to electrical distribution boards"
    ],
    "correct": "They should be stored away from ignition sources, in a suitable, well-ventilated area",
    "explanation": "Flammable substances should be stored correctly to reduce the risk of ignition and to control the spread of fire if one occurs.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is the purpose of a fire risk assessment for a building?",
    "options": [
      "To identify fire hazards, people at risk, and the control measures needed to reduce that risk",
      "To decide the colour of fire extinguishers required",
      "It is only required for buildings over five storeys",
      "To replace the need for smoke detectors"
    ],
    "correct": "To identify fire hazards, people at risk, and the control measures needed to reduce that risk",
    "explanation": "A fire risk assessment systematically considers hazards and vulnerable people, informing what precautions and procedures are needed.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why is it important to keep escape routes and fire exits clear of obstructions on site?",
    "options": [
      "Blocked routes could prevent people from escaping quickly in an emergency",
      "It is purely a tidiness requirement",
      "Obstructions only matter during working hours",
      "Fire exits are rarely used in an emergency"
    ],
    "correct": "Blocked routes could prevent people from escaping quickly in an emergency",
    "explanation": "Clear escape routes are essential to allow rapid, safe evacuation in the event of a fire or other emergency.",
    "topic": "Fire Safety"
  },
  {
    "text": "What should a worker do first if they discover a small fire they believe they can safely extinguish?",
    "options": [
      "Raise the alarm first, then only tackle the fire if it is safe to do so with suitable equipment",
      "Try to put it out immediately without alerting anyone",
      "Leave the building without telling anyone",
      "Wait for someone else to notice it"
    ],
    "correct": "Raise the alarm first, then only tackle the fire if it is safe to do so with suitable equipment",
    "explanation": "Raising the alarm ensures others are aware and can evacuate; tackling a fire should only be attempted if it is safe and appropriate equipment is available.",
    "topic": "Fire Safety"
  },
  {
    "text": "Why might hot works (such as soldering or grinding) require a permit on some sites?",
    "options": [
      "Hot works introduce an ignition source that must be carefully controlled to prevent fire",
      "Permits are only needed for electrical isolations",
      "Hot works have no fire risk if carried out indoors",
      "It is purely an administrative requirement with no safety purpose"
    ],
    "correct": "Hot works introduce an ignition source that must be carefully controlled to prevent fire",
    "explanation": "A hot works permit ensures precautions, such as fire watches and clearing combustible materials, are in place before work involving heat or sparks begins.",
    "topic": "Fire Safety"
  },
  {
    "text": "What is the purpose of a site induction for someone new to a construction site?",
    "options": [
      "To inform them of site-specific hazards, rules, and emergency procedures",
      "To collect their personal contact details only",
      "It is only required for site visitors, not workers",
      "To assign them a specific parking space"
    ],
    "correct": "To inform them of site-specific hazards, rules, and emergency procedures",
    "explanation": "A site induction ensures everyone entering understands the hazards present and the procedures to follow, including in an emergency.",
    "topic": "Site Safety"
  },
  {
    "text": "Why should unauthorised persons be prevented from accessing an active construction site?",
    "options": [
      "They may be exposed to hazards they are unaware of and untrained to deal with",
      "It is purely to protect the contractor's tools",
      "Unauthorised access has no real safety implications",
      "It only matters for very large sites"
    ],
    "correct": "They may be exposed to hazards they are unaware of and untrained to deal with",
    "explanation": "Site security and access control protect both the public and unauthorised persons from hazards they are not equipped to manage safely.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of a permit to work system for high-risk activities on site?",
    "options": [
      "To formally control and authorise work, ensuring necessary precautions are in place before it starts",
      "To speed up work by removing the need for planning",
      "It is only used for administrative record-keeping with no safety function",
      "To replace the need for risk assessments"
    ],
    "correct": "To formally control and authorise work, ensuring necessary precautions are in place before it starts",
    "explanation": "Permit to work systems provide formal checks and authorisation before high-risk activities begin, helping ensure precautions are properly implemented.",
    "topic": "Site Safety"
  },
  {
    "text": "Why is good housekeeping, such as keeping walkways clear, important on a construction site?",
    "options": [
      "It reduces the risk of slips, trips, and falls",
      "It is purely a cosmetic consideration",
      "Housekeeping standards do not affect safety",
      "It is only relevant in office environments"
    ],
    "correct": "It reduces the risk of slips, trips, and falls",
    "explanation": "Clear walkways and tidy work areas significantly reduce common accident causes such as trips over trailing cables or debris.",
    "topic": "Site Safety"
  },
  {
    "text": "What should be done before starting excavation work where underground services may be present?",
    "options": [
      "Obtain service plans and use a cable/pipe locator to check for buried services",
      "Begin digging immediately to save time",
      "Assume no services are present unless previously told otherwise",
      "Only check for services if digging by hand"
    ],
    "correct": "Obtain service plans and use a cable/pipe locator to check for buried services",
    "explanation": "Checking service plans and using detection equipment helps prevent striking buried gas, water, or electrical services, which can be extremely dangerous.",
    "topic": "Site Safety"
  },
  {
    "text": "Why is toolbox talk useful on a construction site?",
    "options": [
      "It provides a short, focused briefing to reinforce safety awareness on a specific topic or hazard",
      "It replaces the need for a full risk assessment",
      "It is only used to discuss non-work topics",
      "Toolbox talks are a legal requirement only in certain countries"
    ],
    "correct": "It provides a short, focused briefing to reinforce safety awareness on a specific topic or hazard",
    "explanation": "Toolbox talks are brief, regular briefings that help keep workers aware of specific hazards or reminders relevant to current site activities.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of barriers and warning signs around an excavation on site?",
    "options": [
      "To prevent people from accidentally falling into the excavation",
      "To make the site look more organised for photographs",
      "Barriers are purely optional and have no safety function",
      "To indicate where materials should be delivered"
    ],
    "correct": "To prevent people from accidentally falling into the excavation",
    "explanation": "Barriers and signage warn people of the hazard and physically reduce the risk of someone falling into an open excavation.",
    "topic": "Site Safety"
  },
  {
    "text": "Why should site vehicles and pedestrians ideally be kept in separate, clearly defined routes?",
    "options": [
      "It reduces the risk of collision between vehicles and people on foot",
      "It is only relevant on very large sites",
      "Vehicle movements have no impact on pedestrian safety",
      "Separate routes are purely for traffic flow efficiency"
    ],
    "correct": "It reduces the risk of collision between vehicles and people on foot",
    "explanation": "Segregating vehicle and pedestrian routes is a key control measure to reduce the risk of workers being struck by moving plant or vehicles.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the purpose of reporting near misses on a construction site?",
    "options": [
      "To identify and address hazards before they result in an actual injury",
      "Near misses do not need to be reported since no one was hurt",
      "It is only useful for insurance claims",
      "Reporting near misses is optional and rarely beneficial"
    ],
    "correct": "To identify and address hazards before they result in an actual injury",
    "explanation": "Reporting near misses helps identify underlying hazards and trends, allowing corrective action before a similar situation causes real harm.",
    "topic": "Site Safety"
  },
  {
    "text": "Why might a site require workers to sign in and out each day?",
    "options": [
      "To maintain an accurate record of who is on site in case of an emergency evacuation",
      "It is only used for calculating wages",
      "Signing in has no relevance to site safety",
      "It is required only on sites with fewer than five workers"
    ],
    "correct": "To maintain an accurate record of who is on site in case of an emergency evacuation",
    "explanation": "An accurate sign-in record ensures that, in an emergency, it can be confirmed everyone has evacuated safely.",
    "topic": "Site Safety"
  },
  {
    "text": "What should be done if a hazard is identified that cannot be immediately fixed on site?",
    "options": [
      "Report it to a supervisor and take interim measures, such as signage or barriers, to control the risk",
      "Ignore it until the next scheduled inspection",
      "Wait for someone else to notice and report it",
      "Continue working as normal near the hazard"
    ],
    "correct": "Report it to a supervisor and take interim measures, such as signage or barriers, to control the risk",
    "explanation": "Hazards that cannot be fixed immediately should still be reported and temporarily controlled to protect people until a permanent solution is found.",
    "topic": "Site Safety"
  },
  {
    "text": "What is the main function of a circuit breaker (MCB) in a consumer unit?",
    "options": [
      "To automatically disconnect a circuit if it detects an overcurrent, such as an overload or short circuit",
      "To provide additional light in the consumer unit",
      "To measure the voltage of the supply",
      "To store energy for backup power"
    ],
    "correct": "To automatically disconnect a circuit if it detects an overcurrent, such as an overload or short circuit",
    "explanation": "An MCB is designed to trip and disconnect the circuit automatically when current exceeds a safe level, protecting cables and equipment.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is the main purpose of a Residual Current Device (RCD)?",
    "options": [
      "To disconnect the supply quickly if it detects an imbalance indicating a possible earth fault, reducing shock risk",
      "To increase the current available to a circuit",
      "To provide overload protection only",
      "To store surplus electrical energy"
    ],
    "correct": "To disconnect the supply quickly if it detects an imbalance indicating a possible earth fault, reducing shock risk",
    "explanation": "An RCD monitors for a difference between line and neutral current, disconnecting rapidly if a fault to earth is detected, helping to prevent electric shock.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does an RCBO combine into a single device?",
    "options": [
      "Overcurrent protection and residual current (earth leakage) protection",
      "Overvoltage and undervoltage protection only",
      "Lighting control and dimming functions",
      "Metering and billing functions"
    ],
    "correct": "Overcurrent protection and residual current (earth leakage) protection",
    "explanation": "An RCBO combines the functions of an MCB and an RCD in one device, providing both overcurrent and earth fault protection to an individual circuit.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why might a fuse be used instead of a circuit breaker in some older or specific installations?",
    "options": [
      "Fuses can offer certain characteristics, such as high fault current withstand, suited to particular applications",
      "Fuses are always cheaper and preferred for all new installations",
      "Fuses never need replacing once fitted",
      "Fuses provide RCD protection automatically"
    ],
    "correct": "Fuses can offer certain characteristics, such as high fault current withstand, suited to particular applications",
    "explanation": "Fuses can be selected for their specific operating characteristics, and are still used in certain applications despite being less common in modern domestic consumer units.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is meant by the 'discrimination' (or selectivity) of protective devices in a distribution system?",
    "options": [
      "Ensuring only the device closest to a fault operates, rather than a device further upstream",
      "Choosing devices based on their colour",
      "Selecting the cheapest device available",
      "Using identical devices throughout the installation regardless of load"
    ],
    "correct": "Ensuring only the device closest to a fault operates, rather than a device further upstream",
    "explanation": "Discrimination ensures that a fault causes only the relevant local device to operate, minimising disruption to the rest of the installation.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why is it important not to replace a protective device with one of a higher rating without proper assessment?",
    "options": [
      "The cable it protects may no longer be adequately protected against overload",
      "Higher-rated devices are always safer in every situation",
      "It has no effect on the safety of the circuit",
      "Protective device ratings are purely a cost consideration"
    ],
    "correct": "The cable it protects may no longer be adequately protected against overload",
    "explanation": "Protective devices are selected to match the cable's current-carrying capacity; fitting an oversized device could allow the cable to overheat before the device operates.",
    "topic": "Protective Devices"
  },
  {
    "text": "What does a Type C MCB's characteristic typically indicate, compared with a Type B?",
    "options": [
      "It has a higher instantaneous trip threshold, suited to loads with higher inrush currents",
      "It only protects against earth faults, not overcurrent",
      "It is designed exclusively for lighting circuits",
      "It cannot be used in domestic installations"
    ],
    "correct": "It has a higher instantaneous trip threshold, suited to loads with higher inrush currents",
    "explanation": "Type C MCBs trip at a higher multiple of rated current than Type B, making them more suitable for circuits with higher inrush currents, such as certain motors.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why is surge protection sometimes fitted within a consumer unit?",
    "options": [
      "To help protect connected equipment from voltage spikes, such as those caused by lightning or switching events",
      "To provide additional lighting circuits",
      "Surge protection replaces the need for RCDs",
      "It reduces the overall current rating of the installation"
    ],
    "correct": "To help protect connected equipment from voltage spikes, such as those caused by lightning or switching events",
    "explanation": "Surge Protective Devices (SPDs) help limit transient overvoltages that could otherwise damage sensitive electronic equipment connected to the installation.",
    "topic": "Protective Devices"
  },
  {
    "text": "What could cause an RCD to trip unexpectedly, even without an obvious fault present?",
    "options": [
      "Nuisance tripping caused by natural leakage current from multiple appliances or long cable runs",
      "The RCD being the wrong colour for the installation",
      "The consumer unit being too large",
      "RCDs cannot trip without a genuine dangerous fault"
    ],
    "correct": "Nuisance tripping caused by natural leakage current from multiple appliances or long cable runs",
    "explanation": "Cumulative small leakage currents from various appliances or cabling can sometimes add up and cause an RCD to trip even without a dangerous fault.",
    "topic": "Protective Devices"
  },
  {
    "text": "Why should a protective device never be bypassed or disabled to stop it from tripping repeatedly?",
    "options": [
      "Bypassing removes the protection the device provides, risking fire or electric shock if a genuine fault occurs",
      "Bypassing a device has no safety consequences if the circuit seems to work",
      "It is common, accepted practice on most installations",
      "Protective devices are only there for insurance purposes"
    ],
    "correct": "Bypassing removes the protection the device provides, risking fire or electric shock if a genuine fault occurs",
    "explanation": "Disabling a protective device removes the safety function it provides; repeated tripping should be investigated and the underlying fault fixed instead.",
    "topic": "Protective Devices"
  },
  {
    "text": "What is the purpose of coordination between overcurrent protective devices and cable sizes during design?",
    "options": [
      "To ensure the device will operate before the cable is damaged by excessive current",
      "To reduce the total number of cables required",
      "It only matters for three-phase installations",
      "To make installation quicker regardless of safety"
    ],
    "correct": "To ensure the device will operate before the cable is damaged by excessive current",
    "explanation": "Proper coordination ensures the protective device disconnects the circuit before conductor temperatures reach damaging levels under fault or overload conditions.",
    "topic": "Protective Devices"
  },
  {
    "text": "What duty does the Health and Safety at Work etc. Act 1974 place on the self-employed?",
    "options": [
      "To ensure, so far as reasonably practicable, that they do not expose themselves or others to health and safety risks",
      "Self-employed people have no duties under the Act",
      "The Act applies only to employers with more than 50 staff",
      "Self-employed workers are only covered while working on their own premises"
    ],
    "correct": "To ensure, so far as reasonably practicable, that they do not expose themselves or others to health and safety risks",
    "explanation": "The 1974 Act extends duties to the self-employed, requiring them to manage risks to themselves and to others who may be affected by their work.",
    "topic": "Legislation"
  },
  {
    "text": "Under the Health and Safety at Work etc. Act 1974, what duty do employees have?",
    "options": [
      "To take reasonable care for their own health and safety, and that of others affected by their actions",
      "No duties are placed on employees, only employers",
      "To purchase their own PPE at all times",
      "To carry out risk assessments for the whole company"
    ],
    "correct": "To take reasonable care for their own health and safety, and that of others affected by their actions",
    "explanation": "Employees have a legal duty to take reasonable care of themselves and others, and to cooperate with their employer on health and safety matters.",
    "topic": "Legislation"
  },
  {
    "text": "What do the Management of Health and Safety at Work Regulations require employers to carry out?",
    "options": [
      "Suitable and sufficient risk assessments of work activities",
      "Only fire risk assessments, not general risk assessments",
      "Annual staff appraisals",
      "Financial audits of the business"
    ],
    "correct": "Suitable and sufficient risk assessments of work activities",
    "explanation": "These regulations require employers to assess risks to employees and others, and put in place suitable control measures.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations)?",
    "options": [
      "To require certain workplace injuries, diseases, and dangerous occurrences to be reported to the enforcing authority",
      "To regulate the sale of electrical goods to the public",
      "To set out training requirements for apprentices",
      "To control the storage of flammable liquids only"
    ],
    "correct": "To require certain workplace injuries, diseases, and dangerous occurrences to be reported to the enforcing authority",
    "explanation": "RIDDOR places a legal duty on employers to report specified incidents, helping enforcing authorities identify trends and take action to prevent recurrence.",
    "topic": "Legislation"
  },
  {
    "text": "What do the Electricity at Work Regulations 1989 primarily require?",
    "options": [
      "That electrical systems are constructed, maintained, and used so as to prevent danger, so far as reasonably practicable",
      "That all electrical work must be carried out by an employee, never a contractor",
      "That electrical drawings must be updated annually regardless of changes",
      "That every electrical installation must be replaced every ten years"
    ],
    "correct": "That electrical systems are constructed, maintained, and used so as to prevent danger, so far as reasonably practicable",
    "explanation": "The Electricity at Work Regulations set out duties to prevent danger from electrical systems, covering design, construction, maintenance, and safe working practices.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of the Provision and Use of Work Equipment Regulations (PUWER)?",
    "options": [
      "To ensure work equipment provided for use at work is suitable, maintained, and used safely",
      "To regulate only vehicles used off public roads",
      "To set minimum wage requirements for equipment operators",
      "To license the sale of second-hand tools"
    ],
    "correct": "To ensure work equipment provided for use at work is suitable, maintained, and used safely",
    "explanation": "PUWER requires that equipment used at work is suitable for its purpose, properly maintained, and that people using it are appropriately trained.",
    "topic": "Legislation"
  },
  {
    "text": "What do the Control of Substances Hazardous to Health (COSHH) Regulations require employers to do?",
    "options": [
      "Assess and control the risks from hazardous substances used or created in the workplace",
      "Provide free lunches to all staff",
      "Ban the use of all chemicals on site",
      "Only apply to laboratories, not construction sites"
    ],
    "correct": "Assess and control the risks from hazardous substances used or created in the workplace",
    "explanation": "COSHH requires employers to assess exposure to hazardous substances and put suitable controls in place to protect workers' health.",
    "topic": "Legislation"
  },
  {
    "text": "Under CDM Regulations, what role is a Principal Contractor typically responsible for?",
    "options": [
      "Planning, managing, and coordinating health and safety during the construction phase of a project",
      "Only approving the final architectural design",
      "Setting the sale price of the completed building",
      "Providing legal advice to the client"
    ],
    "correct": "Planning, managing, and coordinating health and safety during the construction phase of a project",
    "explanation": "The Principal Contractor is responsible for coordinating health and safety matters during the construction phase, where there is more than one contractor involved.",
    "topic": "Legislation"
  },
  {
    "text": "Under the Personal Protective Equipment at Work Regulations, who is generally responsible for providing suitable PPE free of charge?",
    "options": [
      "The employer",
      "The employee, at their own expense",
      "The local council",
      "The equipment manufacturer only"
    ],
    "correct": "The employer",
    "explanation": "Employers must provide suitable PPE free of charge to employees where risks cannot be adequately controlled by other means.",
    "topic": "Legislation"
  },
  {
    "text": "What is a key purpose of the Manual Handling Operations Regulations?",
    "options": [
      "To reduce the risk of injury from lifting, carrying, and moving loads at work",
      "To regulate the transport of goods by road only",
      "To set minimum staffing levels on construction sites",
      "To license the sale of lifting equipment"
    ],
    "correct": "To reduce the risk of injury from lifting, carrying, and moving loads at work",
    "explanation": "These regulations require employers to avoid, assess, and reduce the risk of injury from manual handling activities so far as is reasonably practicable.",
    "topic": "Legislation"
  },
  {
    "text": "What does BS 7671 (IET Wiring Regulations) primarily set out?",
    "options": [
      "The national standard for the design, installation, and verification of electrical installations",
      "The legal minimum wage for electricians",
      "Planning permission requirements for buildings",
      "Fire evacuation procedures for offices only"
    ],
    "correct": "The national standard for the design, installation, and verification of electrical installations",
    "explanation": "BS 7671 is the UK national standard for electrical installations, covering design, selection, erection, and verification requirements.",
    "topic": "Legislation"
  },
  {
    "text": "Why should power tools be visually inspected before use?",
    "options": [
      "To check for damage to the casing, cable, or plug that could present a hazard",
      "It is only required once a year",
      "Visual inspection has no impact on tool safety",
      "Only new tools need to be inspected"
    ],
    "correct": "To check for damage to the casing, cable, or plug that could present a hazard",
    "explanation": "A pre-use check can identify damage that might expose the user to electric shock or mechanical hazards, before the tool is used.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is the advantage of using 110V power tools on a construction site, supplied via a transformer, compared with 230V?",
    "options": [
      "A lower voltage reduces the severity of injury in the event of an electric shock",
      "It makes tools run faster",
      "It removes the need for any RCD protection",
      "110V tools never require maintenance"
    ],
    "correct": "A lower voltage reduces the severity of injury in the event of an electric shock",
    "explanation": "Reduced low voltage (110V, centre-tapped to earth) limits the maximum shock voltage to around 55V to earth, reducing the severity of injury if a fault occurs.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is the purpose of Portable Appliance Testing (PAT)?",
    "options": [
      "To check that portable electrical equipment remains safe to use",
      "To measure the exact power consumption of an appliance",
      "It is a legal requirement to test equipment only once, when new",
      "To confirm the colour coding of a plug"
    ],
    "correct": "To check that portable electrical equipment remains safe to use",
    "explanation": "PAT testing combines visual inspection and electrical tests to identify faults that could make portable equipment unsafe to use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why is it important to use the correct tool for a task, rather than an improvised alternative?",
    "options": [
      "Using the wrong tool can increase the risk of injury or damage to the equipment or work",
      "Improvised tools always work just as well",
      "It has no bearing on safety or quality",
      "The correct tool is only relevant for electrical work"
    ],
    "correct": "Using the wrong tool can increase the risk of injury or damage to the equipment or work",
    "explanation": "Using tools for tasks they are not designed for can increase risk of injury and may damage the tool, equipment, or the work being carried out.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What should be checked about a drill bit or blade before starting a cutting or drilling task?",
    "options": [
      "That it is sharp, undamaged, and the correct type for the material being worked",
      "That it is the same colour as the tool",
      "Only that it fits the chuck, regardless of condition",
      "Nothing needs to be checked before use"
    ],
    "correct": "That it is sharp, undamaged, and the correct type for the material being worked",
    "explanation": "A blunt, damaged, or unsuitable bit or blade can increase the risk of the tool binding, kicking back, or breaking during use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why should trailing extension leads on site be fully unwound from their reel when in use?",
    "options": [
      "A coiled lead can overheat due to the increased electrical resistance and reduced ability to dissipate heat",
      "It has no effect on the lead's performance",
      "Unwinding is only necessary for leads longer than 50 metres",
      "Coiled leads carry more current safely than unwound ones"
    ],
    "correct": "A coiled lead can overheat due to the increased electrical resistance and reduced ability to dissipate heat",
    "explanation": "A coiled cable restricts heat dissipation and can overheat under load, so extension leads should be fully unwound when in use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is a key benefit of maintaining a tool maintenance log or register on site?",
    "options": [
      "It helps track inspection dates and identify when tools are due for testing or servicing",
      "It is only useful for accounting purposes",
      "It replaces the need for any pre-use checks",
      "Tool logs are a legal requirement only for hand tools"
    ],
    "correct": "It helps track inspection dates and identify when tools are due for testing or servicing",
    "explanation": "A maintenance log provides a record of inspections and testing, helping ensure equipment remains safe and compliant over time.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why should guards on power tools, such as circular saws, never be removed or wedged open?",
    "options": [
      "Guards are designed to protect the user from contact with moving or cutting parts",
      "Guards only affect the appearance of the tool",
      "Removing guards makes the tool cut more accurately",
      "Guards are optional accessories with no safety function"
    ],
    "correct": "Guards are designed to protect the user from contact with moving or cutting parts",
    "explanation": "Machine guards are a critical safety feature preventing accidental contact with dangerous moving parts; disabling them significantly increases injury risk.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why should hand tools, such as chisels or screwdrivers, be kept in good condition with intact handles?",
    "options": [
      "Damaged handles or worn tips can slip during use, increasing the risk of injury to the user",
      "Tool condition has no effect on the safety of its use",
      "Only power tools require regular condition checks",
      "Handle condition only affects the tool's appearance"
    ],
    "correct": "Damaged handles or worn tips can slip during use, increasing the risk of injury to the user",
    "explanation": "A damaged or worn hand tool is more likely to slip or fail during use, increasing the risk of cuts or other injuries to the user.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why might battery-powered (cordless) tools be preferred over mains-powered tools in certain situations?",
    "options": [
      "They remove the trailing cable hazard and reduce mains electrical risks in some environments",
      "They are always more powerful than mains tools",
      "They never require maintenance or charging",
      "Cordless tools eliminate all risk of injury"
    ],
    "correct": "They remove the trailing cable hazard and reduce mains electrical risks in some environments",
    "explanation": "Cordless tools reduce trip hazards from trailing cables and can reduce electrical risk in certain environments, though they still require careful use and maintenance.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is an appropriate first step before using an abrasive wheel, such as on an angle grinder?",
    "options": [
      "Check the wheel is correctly rated for the tool's speed and free from damage",
      "Assume any wheel will fit and work safely on any grinder",
      "Skip inspection if the wheel looks new",
      "Only check the wheel after the task is finished"
    ],
    "correct": "Check the wheel is correctly rated for the tool's speed and free from damage",
    "explanation": "Using an incorrectly rated or damaged abrasive wheel can cause it to shatter during use, posing a serious risk of injury.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is the purpose of a COSHH assessment before using a hazardous substance on site?",
    "options": [
      "To identify the risks of the substance and the control measures needed to protect health",
      "To decide which brand of the substance to purchase",
      "It is only required for substances used outdoors",
      "COSHH assessments are optional if the substance is in small quantities"
    ],
    "correct": "To identify the risks of the substance and the control measures needed to protect health",
    "explanation": "A COSHH assessment evaluates how a substance could cause harm and what controls, such as ventilation or PPE, are needed to reduce that risk.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why is good personal hygiene, such as washing hands before eating, important on a construction site?",
    "options": [
      "It reduces the risk of ingesting harmful substances that may be present on hands from work activities",
      "It has no real connection to workplace safety",
      "It is only relevant in food preparation industries",
      "Hand washing facilities are not usually available on site"
    ],
    "correct": "It reduces the risk of ingesting harmful substances that may be present on hands from work activities",
    "explanation": "Contaminants such as dust, chemicals, or lead can transfer from hands to food or drink if hygiene practices are poor, leading to ingestion and potential harm.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is a common health risk associated with prolonged exposure to silica dust, such as when cutting masonry?",
    "options": [
      "Serious lung disease, including silicosis, from inhaling fine dust particles",
      "Temporary skin discolouration only",
      "Silica dust has no known health effects",
      "Mild, short-term eye irritation only"
    ],
    "correct": "Serious lung disease, including silicosis, from inhaling fine dust particles",
    "explanation": "Inhaling fine silica dust over time can cause serious and irreversible lung disease, so dust suppression and respiratory protection are important controls.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why should welfare facilities, such as toilets and washing facilities, be provided on a construction site?",
    "options": [
      "To support workers' basic health and hygiene needs while on site",
      "They are purely a comfort feature with no legal requirement",
      "Only larger sites need to provide welfare facilities",
      "Welfare facilities are only needed for site visitors"
    ],
    "correct": "To support workers' basic health and hygiene needs while on site",
    "explanation": "Adequate welfare facilities are a legal requirement and support workers' health, hygiene, and general wellbeing during the working day.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is the purpose of providing hand sanitiser or washing facilities near work involving hazardous substances?",
    "options": [
      "To allow contaminants to be removed from the skin promptly after contact",
      "It is purely a comfort provision with no protective function",
      "Only relevant if the substance has a strong smell",
      "To replace the need for gloves entirely"
    ],
    "correct": "To allow contaminants to be removed from the skin promptly after contact",
    "explanation": "Prompt washing helps remove hazardous substances from the skin, reducing the risk of absorption, irritation, or further spread of contamination.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why is it important to store food and drink away from areas where hazardous substances are used?",
    "options": [
      "To prevent contamination of food or drink, which could lead to ingestion of harmful substances",
      "It is only a matter of tidiness",
      "Food storage location has no bearing on health risk",
      "Hazardous substances are always clearly labelled so contamination cannot occur"
    ],
    "correct": "To prevent contamination of food or drink, which could lead to ingestion of harmful substances",
    "explanation": "Keeping food and drink separate from hazardous substances reduces the chance of accidental contamination and subsequent ingestion.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is a potential long-term health effect of repeated exposure to vibration from power tools?",
    "options": [
      "Hand-arm vibration syndrome, affecting circulation, nerves, and joints in the hands and arms",
      "Improved grip strength over time",
      "No long-term effects are associated with vibration exposure",
      "Temporary discolouration of the eyes"
    ],
    "correct": "Hand-arm vibration syndrome, affecting circulation, nerves, and joints in the hands and arms",
    "explanation": "Prolonged exposure to vibrating tools can cause hand-arm vibration syndrome, a painful and potentially disabling condition affecting nerves, blood vessels, and joints.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why might dust extraction be fitted to a power tool used for cutting or sanding?",
    "options": [
      "To reduce the amount of harmful dust released into the air that could be inhaled",
      "It is purely to keep the work area looking tidy",
      "Dust extraction increases the noise produced by the tool",
      "It has no effect on worker exposure to dust"
    ],
    "correct": "To reduce the amount of harmful dust released into the air that could be inhaled",
    "explanation": "On-tool dust extraction captures dust at source, significantly reducing the amount released into the air and inhaled by the operator.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is a key symptom that might indicate someone is suffering from the effects of excessive noise exposure over time?",
    "options": [
      "Gradual hearing loss or ringing in the ears (tinnitus)",
      "Improved hearing sensitivity",
      "Increased appetite",
      "Better sleep quality"
    ],
    "correct": "Gradual hearing loss or ringing in the ears (tinnitus)",
    "explanation": "Long-term exposure to excessive noise can cause gradual, often permanent, hearing loss and tinnitus (ringing in the ears).",
    "topic": "Health and Hygiene"
  },
  {
    "text": "Why should workers be aware of the signs of heat stress when working in hot conditions?",
    "options": [
      "Heat stress can develop quickly and lead to serious illness if not recognised and managed early",
      "Heat stress only affects people working outdoors in winter",
      "It has no relevance to construction or trade work",
      "Heat stress symptoms are always obvious and never mild"
    ],
    "correct": "Heat stress can develop quickly and lead to serious illness if not recognised and managed early",
    "explanation": "Recognising early signs of heat stress, such as dizziness or excessive sweating, allows action to be taken before it develops into a more serious condition.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is a suitable control measure to reduce exposure to airborne contaminants when working in a confined or poorly ventilated space?",
    "options": [
      "Providing adequate ventilation or extraction, alongside suitable respiratory protection if needed",
      "Working faster to reduce time spent in the space",
      "Ignoring ventilation if the task is short",
      "Relying solely on natural draughts from doors"
    ],
    "correct": "Providing adequate ventilation or extraction, alongside suitable respiratory protection if needed",
    "explanation": "Ventilation and, where necessary, respiratory protective equipment help control exposure to airborne contaminants in confined or poorly ventilated spaces.",
    "topic": "Health and Hygiene"
  },
  {
    "text": "What is the main function of an inverter in a grid-connected solar PV system?",
    "options": [
      "To convert the DC electricity generated by the panels into AC electricity suitable for the property or grid",
      "To store excess energy generated during the day",
      "To increase the voltage output of the panels",
      "To clean the surface of the solar panels"
    ],
    "correct": "To convert the DC electricity generated by the panels into AC electricity suitable for the property or grid",
    "explanation": "Solar panels generate DC electricity, which the inverter converts to AC so it can be used by standard appliances or exported to the grid.",
    "topic": "Renewable Technology"
  },
  {
    "text": "Why is DC isolation particularly important when working on a solar PV system?",
    "options": [
      "Solar panels can still generate a dangerous voltage whenever they are exposed to light, even if the AC side is isolated",
      "DC isolation is only a formality with no practical safety benefit",
      "Solar panels stop producing electricity once covered by a small cloth",
      "DC isolation is only relevant during installation, not maintenance"
    ],
    "correct": "Solar panels can still generate a dangerous voltage whenever they are exposed to light, even if the AC side is isolated",
    "explanation": "Unlike a mains supply, PV panels generate voltage as soon as they are exposed to light, so DC isolation and careful handling remain necessary even when the AC side is off.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the general principle behind an air source heat pump's operation?",
    "options": [
      "It extracts heat energy from the outside air and transfers it indoors to provide heating",
      "It burns fuel to generate heat directly",
      "It generates electricity from wind passing over external fans",
      "It only operates using electrical resistance heating"
    ],
    "correct": "It extracts heat energy from the outside air and transfers it indoors to provide heating",
    "explanation": "Heat pumps use a refrigeration cycle to extract heat from the outside air (even in cold conditions) and transfer it into the building for heating.",
    "topic": "Renewable Technology"
  },
  {
    "text": "Why might a battery energy storage system be installed alongside a domestic solar PV array?",
    "options": [
      "To store excess electricity generated during the day for use later, such as in the evening",
      "It is required by law for every solar PV installation",
      "To increase the amount of sunlight the panels receive",
      "Batteries eliminate the need for an inverter"
    ],
    "correct": "To store excess electricity generated during the day for use later, such as in the evening",
    "explanation": "Battery storage allows surplus solar-generated electricity to be stored and used later, improving self-consumption and reducing reliance on grid electricity.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What must be considered when connecting a small-scale renewable generator to the public electricity distribution network?",
    "options": [
      "Compliance with relevant grid connection requirements and notification to the Distribution Network Operator",
      "No formal process is needed for domestic-scale installations",
      "Only the property owner's permission is required",
      "Connection requirements only apply to wind turbines, not solar"
    ],
    "correct": "Compliance with relevant grid connection requirements and notification to the Distribution Network Operator",
    "explanation": "Grid-connected generation, even small-scale, typically requires notification to or agreement with the local Distribution Network Operator to ensure safe integration.",
    "topic": "Renewable Technology"
  },
  {
    "text": "Why is anti-islanding protection important in a grid-tied inverter?",
    "options": [
      "It prevents the inverter from continuing to energise a section of the grid during a power cut, protecting engineers working on the network",
      "It increases the efficiency of the solar panels",
      "It is only relevant for large commercial solar farms",
      "Anti-islanding protection controls the colour temperature of connected lighting"
    ],
    "correct": "It prevents the inverter from continuing to energise a section of the grid during a power cut, protecting engineers working on the network",
    "explanation": "Anti-islanding protection disconnects the inverter from the grid during a supply outage, preventing it from energising a section of network that engineers may believe is dead.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is a key benefit of an electric vehicle (EV) charge point having its own dedicated circuit protection?",
    "options": [
      "It ensures the charging circuit is appropriately protected against overload and fault conditions specific to EV charging",
      "It reduces the total charging time for the vehicle",
      "It removes the need for any earthing arrangement",
      "Dedicated protection is only relevant for public charge points"
    ],
    "correct": "It ensures the charging circuit is appropriately protected against overload and fault conditions specific to EV charging",
    "explanation": "EV charging draws significant, sustained current, so a dedicated, correctly protected circuit helps ensure safe and reliable operation.",
    "topic": "Renewable Technology"
  },
  {
    "text": "Why might a Type B RCD or equivalent protection be specified for certain EV charging installations?",
    "options": [
      "Some EV charging equipment can introduce DC fault currents that a standard Type A RCD may not reliably detect",
      "Type B RCDs are always cheaper than Type A",
      "Type B protection is only needed for solar PV, not EV charging",
      "It has no relevance to EV charging safety"
    ],
    "correct": "Some EV charging equipment can introduce DC fault currents that a standard Type A RCD may not reliably detect",
    "explanation": "Certain onboard EV chargers can generate DC fault currents; guidance may require Type B RCD protection, or a charge point with equivalent built-in protection, to address this.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is a general safety consideration when working near a wind turbine's electrical generation and control equipment?",
    "options": [
      "The system may include unusual voltage sources or stored energy that require specific isolation procedures",
      "Wind turbines never generate electricity when stationary, so no isolation is needed",
      "Standard mains isolation procedures are always sufficient with no adaptation",
      "Only mechanical hazards are present, with no electrical risk"
    ],
    "correct": "The system may include unusual voltage sources or stored energy that require specific isolation procedures",
    "explanation": "Renewable generation systems can have multiple energy sources and stored energy, requiring careful, system-specific isolation procedures beyond standard mains isolation.",
    "topic": "Renewable Technology"
  },
  {
    "text": "Why is regular maintenance recommended for renewable energy systems, such as solar PV arrays?",
    "options": [
      "To ensure continued safe and efficient operation, and to identify faults such as damaged panels or connections",
      "Maintenance is only required if the system stops generating any electricity",
      "Renewable systems are maintenance-free once installed",
      "It is purely for improving the aesthetic appearance of the panels"
    ],
    "correct": "To ensure continued safe and efficient operation, and to identify faults such as damaged panels or connections",
    "explanation": "Periodic inspection and maintenance help identify developing faults early, maintaining both the safety and performance of the renewable energy system.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is a common reason for installing a diverter device alongside a solar PV system?",
    "options": [
      "To direct surplus generated electricity to another use, such as heating hot water, instead of exporting it",
      "To increase the DC voltage produced by the panels",
      "To replace the function of the main inverter",
      "Diverter devices are only used with wind turbines"
    ],
    "correct": "To direct surplus generated electricity to another use, such as heating hot water, instead of exporting it",
    "explanation": "A diverter can redirect surplus solar generation to another load, such as an immersion heater, making better use of self-generated electricity rather than exporting it.",
    "topic": "Renewable Technology"
  },
  {
    "text": "What is the general purpose of earthing in an electrical installation?",
    "options": [
      "To provide a low-resistance path for fault current to flow, allowing protective devices to operate",
      "To reduce the amount of cable needed in an installation",
      "To increase the voltage available to appliances",
      "To improve the appearance of the installation"
    ],
    "correct": "To provide a low-resistance path for fault current to flow, allowing protective devices to operate",
    "explanation": "Earthing provides a path for fault current back to the source, enabling protective devices to detect the fault and disconnect the supply quickly.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is meant by 'supplementary bonding' in certain locations, such as bathrooms?",
    "options": [
      "Additional bonding between exposed and extraneous-conductive-parts to further reduce shock risk in higher-risk areas",
      "The main earthing conductor for the whole installation",
      "A backup earthing system used only during power cuts",
      "Bonding that is applied only to lighting circuits"
    ],
    "correct": "Additional bonding between exposed and extraneous-conductive-parts to further reduce shock risk in higher-risk areas",
    "explanation": "Supplementary bonding provides extra protection in locations of increased risk, such as bathrooms, by connecting conductive parts together to minimise touch voltage.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "Why is the resistance of the earthing conductor and earth electrode (where used) an important factor in system design?",
    "options": [
      "A high resistance could prevent sufficient fault current flowing to operate protective devices quickly",
      "Resistance in the earthing system has no bearing on fault protection",
      "Higher resistance is always preferred for safety",
      "It only affects the appearance of the earthing arrangement"
    ],
    "correct": "A high resistance could prevent sufficient fault current flowing to operate protective devices quickly",
    "explanation": "A low-resistance earthing path is essential to allow enough fault current to flow so that protective devices operate within the required disconnection time.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What type of earthing system is indicated by the term 'TN-S'?",
    "options": [
      "A system where the supply has a separate neutral and earth conductor throughout",
      "A system with no earth connection provided by the supplier",
      "A system using only an earth electrode at the property, unconnected to the supply",
      "A system exclusively used for three-phase industrial supplies"
    ],
    "correct": "A system where the supply has a separate neutral and earth conductor throughout",
    "explanation": "In a TN-S system, the earth and neutral are kept separate throughout, with the earth typically provided via the cable sheath back to the source.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What type of earthing system is indicated by the term 'TT'?",
    "options": [
      "A system where the consumer provides their own earth electrode, independent of the supplier's earthing",
      "A system where earthing is combined with the neutral conductor at the property",
      "A system that never requires an RCD",
      "A system used exclusively for overhead supplies"
    ],
    "correct": "A system where the consumer provides their own earth electrode, independent of the supplier's earthing",
    "explanation": "In a TT system, no earth is provided by the supplier, so the installation relies on a local earth electrode, typically requiring RCD protection due to the higher loop impedance.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "Why might an earth electrode's resistance be tested periodically?",
    "options": [
      "Ground conditions can change over time, potentially increasing the electrode's resistance and reducing protection",
      "Earth electrodes never need retesting once installed",
      "It is only relevant for commercial installations",
      "The test is purely a visual check with no measurement involved"
    ],
    "correct": "Ground conditions can change over time, potentially increasing the electrode's resistance and reducing protection",
    "explanation": "Soil moisture and conditions can vary, so periodic testing helps confirm the earth electrode still provides an adequately low resistance path.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What could happen if the main earthing conductor in an installation became disconnected?",
    "options": [
      "Exposed metalwork could become live during a fault, with no effective path to operate protective devices",
      "The installation would simply run at a slightly reduced voltage",
      "There would be no noticeable effect on safety",
      "Only the lighting circuits would be affected"
    ],
    "correct": "Exposed metalwork could become live during a fault, with no effective path to operate protective devices",
    "explanation": "A disconnected earthing conductor removes the fault current return path, meaning metalwork could become and remain live under fault conditions, creating a serious shock risk.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "Why is it important that metallic conduit or trunking used as a circuit protective conductor is properly jointed throughout its length?",
    "options": [
      "Any break in continuity could interrupt the earth fault path, compromising protection",
      "Jointing only affects the mechanical strength of the containment",
      "Metallic containment is never used to carry earth fault current",
      "It is purely a requirement for appearance, not safety"
    ],
    "correct": "Any break in continuity could interrupt the earth fault path, compromising protection",
    "explanation": "Where metallic containment forms part of the earthing arrangement, continuity must be maintained throughout to ensure fault current can flow effectively.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is the purpose of an equipotential zone created by bonding within a location such as a bathroom?",
    "options": [
      "To minimise the voltage difference between simultaneously accessible conductive parts during a fault",
      "To increase the voltage available to appliances in that room",
      "To eliminate the need for any circuit protective devices in that room",
      "It only applies to commercial swimming pool installations"
    ],
    "correct": "To minimise the voltage difference between simultaneously accessible conductive parts during a fault",
    "explanation": "Bonding creates an equipotential zone, reducing the potential difference between accessible conductive parts, which lowers the risk of electric shock in higher-risk locations.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "Why should plastic pipework replacing metal pipework in a property prompt a review of the bonding arrangements?",
    "options": [
      "Plastic pipework does not provide a conductive path, so existing bonding may no longer be relevant or required in the same way",
      "Plastic pipework always requires additional bonding compared with metal",
      "It has no impact on the earthing and bonding arrangements",
      "Bonding requirements are unrelated to the type of pipework material"
    ],
    "correct": "Plastic pipework does not provide a conductive path, so existing bonding may no longer be relevant or required in the same way",
    "explanation": "Since plastic pipework is non-conductive, its presence changes whether bonding is required, so the installation's bonding arrangements should be reviewed accordingly.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is the purpose of an Appointed Person in a workplace first aid arrangement?",
    "options": [
      "To take charge of first aid arrangements, including calling emergency services, where a fully trained first aider is not required",
      "To carry out medical diagnoses on injured workers",
      "To replace the need for any first aid provision",
      "To manage the company's payroll"
    ],
    "correct": "To take charge of first aid arrangements, including calling emergency services, where a fully trained first aider is not required",
    "explanation": "An Appointed Person manages first aid equipment and facilities and calls for help in an emergency, in workplaces where a trained first aider may not be legally required.",
    "topic": "First Aid"
  },
  {
    "text": "What is the recommended immediate action if someone receives an electric shock and is still in contact with the source?",
    "options": [
      "Do not touch them directly; isolate the supply first, or use a non-conductive item to break contact if isolation is not possible",
      "Pull them away from the source immediately with bare hands",
      "Pour water over them to cool them down",
      "Wait for them to move away on their own before doing anything"
    ],
    "correct": "Do not touch them directly; isolate the supply first, or use a non-conductive item to break contact if isolation is not possible",
    "explanation": "Touching someone still in contact with a live source risks the rescuer also receiving a shock, so isolating the supply or using a non-conductive object is the safer first step.",
    "topic": "First Aid"
  },
  {
    "text": "What is the correct initial response to a suspected burn injury from contact with a hot surface?",
    "options": [
      "Cool the burn with cool running water for an appropriate period, then seek further medical help if needed",
      "Apply ice directly to the burn",
      "Apply butter or oil to soothe the burn",
      "Cover the burn tightly with a plaster immediately"
    ],
    "correct": "Cool the burn with cool running water for an appropriate period, then seek further medical help if needed",
    "explanation": "Cooling a burn with cool running water helps reduce tissue damage; ice, butter, and other home remedies can worsen the injury and should be avoided.",
    "topic": "First Aid"
  },
  {
    "text": "Why is it important to keep a workplace first aid kit stocked and regularly checked?",
    "options": [
      "Missing or out-of-date items could mean appropriate first aid cannot be given promptly in an emergency",
      "First aid kits do not need checking once initially stocked",
      "It is purely an administrative task with no real safety benefit",
      "Only large sites require first aid kits to be checked"
    ],
    "correct": "Missing or out-of-date items could mean appropriate first aid cannot be given promptly in an emergency",
    "explanation": "Regularly checking and restocking first aid kits ensures the correct items are available and in date when needed in an emergency.",
    "topic": "First Aid"
  },
  {
    "text": "What is the primary purpose of the recovery position for an unconscious but breathing casualty?",
    "options": [
      "To help keep the airway open and reduce the risk of choking on vomit or fluids",
      "To make the casualty more comfortable for sleeping",
      "It is only used for casualties with a suspected broken leg",
      "To reduce visible bleeding from a wound"
    ],
    "correct": "To help keep the airway open and reduce the risk of choking on vomit or fluids",
    "explanation": "The recovery position helps maintain an open airway and allows fluids to drain from the mouth, reducing the risk of choking in an unconscious casualty who is breathing.",
    "topic": "First Aid"
  },
  {
    "text": "What should be done first when approaching an incident scene as a first aider?",
    "options": [
      "Check the situation is safe before approaching, to avoid becoming a casualty yourself",
      "Approach immediately without any assessment of the scene",
      "Wait for someone else to check safety first, no matter how long it takes",
      "Move the casualty immediately regardless of injuries"
    ],
    "correct": "Check the situation is safe before approaching, to avoid becoming a casualty yourself",
    "explanation": "Assessing the scene for danger first is essential, as a first aider who becomes injured themselves cannot help the original casualty.",
    "topic": "First Aid"
  },
  {
    "text": "Why should a casualty generally not be moved unnecessarily after a fall from height, if a spinal injury is suspected?",
    "options": [
      "Unnecessary movement could worsen a potential spinal injury",
      "Moving the casualty always improves circulation",
      "It has no bearing on the casualty's condition",
      "Spinal injuries cannot be worsened by movement"
    ],
    "correct": "Unnecessary movement could worsen a potential spinal injury",
    "explanation": "If a spinal injury is suspected, unnecessary movement can cause further damage, so the casualty should generally be kept still until trained help arrives, unless there is immediate danger.",
    "topic": "First Aid"
  },
  {
    "text": "What is the purpose of an Automated External Defibrillator (AED) in an emergency?",
    "options": [
      "To deliver a controlled electric shock to help restore a normal heart rhythm in cardiac arrest",
      "To measure a casualty's blood pressure",
      "To provide oxygen to a casualty who is struggling to breathe",
      "To act as a substitute for chest compressions at all times"
    ],
    "correct": "To deliver a controlled electric shock to help restore a normal heart rhythm in cardiac arrest",
    "explanation": "An AED analyses the heart's rhythm and, if appropriate, delivers a shock to help restore a normal rhythm during cardiac arrest, used alongside CPR.",
    "topic": "First Aid"
  },
  {
    "text": "Why is it important to record details of a first aid incident, even if the injury appears minor?",
    "options": [
      "It provides a record that may be useful for future reference, trend analysis, or if symptoms develop later",
      "It is only required for injuries that result in time off work",
      "Recording incidents has no practical benefit",
      "It is solely used to determine who is at fault"
    ],
    "correct": "It provides a record that may be useful for future reference, trend analysis, or if symptoms develop later",
    "explanation": "An accident or first aid record can be valuable if a condition worsens later, and can help identify patterns that inform future risk control measures.",
    "topic": "First Aid"
  },
  {
    "text": "What is a key sign that someone may be suffering from shock (the medical condition) following an injury?",
    "options": [
      "Pale, cold, clammy skin, along with a rapid pulse and possible confusion",
      "Warm, flushed skin with a slow, strong pulse",
      "Improved alertness and energy",
      "No noticeable changes to appearance or behaviour"
    ],
    "correct": "Pale, cold, clammy skin, along with a rapid pulse and possible confusion",
    "explanation": "Medical shock often presents with pale, cold, clammy skin, a fast weak pulse, and can develop into a life-threatening condition if not managed appropriately.",
    "topic": "First Aid"
  },
  {
    "text": "Why should first aiders wear disposable gloves when treating a wound involving blood?",
    "options": [
      "To reduce the risk of cross-infection between the casualty and the first aider",
      "Gloves are purely for keeping the first aider's hands clean and tidy",
      "Gloves have no protective benefit in first aid situations",
      "It is only necessary if the casualty requests it"
    ],
    "correct": "To reduce the risk of cross-infection between the casualty and the first aider",
    "explanation": "Disposable gloves provide a barrier that reduces the risk of blood-borne infection transfer between the casualty and the person giving first aid.",
    "topic": "First Aid"
  },
  {
    "text": "What is the purpose of a single line (schematic) diagram in an electrical installation?",
    "options": [
      "To show the general arrangement of circuits and equipment in a simplified way, without full physical detail",
      "To show the exact physical position of every cable in a building",
      "To replace the need for any written specification",
      "It is only used for lighting circuits"
    ],
    "correct": "To show the general arrangement of circuits and equipment in a simplified way, without full physical detail",
    "explanation": "A schematic diagram simplifies the electrical arrangement to show how circuits and equipment are connected, without necessarily showing exact physical routing.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why should 'as-fitted' or 'as-built' drawings be produced at the end of a project?",
    "options": [
      "To accurately reflect the installation as it was actually constructed, which may differ from the original design",
      "As-built drawings are never different from the original design drawings",
      "They are purely a formality with no practical use",
      "Only large commercial projects require as-built drawings"
    ],
    "correct": "To accurately reflect the installation as it was actually constructed, which may differ from the original design",
    "explanation": "As-built drawings capture any changes made during construction, giving an accurate record of the completed installation for future reference and maintenance.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the purpose of a specification document accompanying electrical drawings?",
    "options": [
      "To provide detailed written requirements for materials, equipment, and workmanship standards",
      "To replace the need for drawings altogether",
      "It only lists the client's contact details",
      "Specifications are only used for domestic projects"
    ],
    "correct": "To provide detailed written requirements for materials, equipment, and workmanship standards",
    "explanation": "A specification supplements drawings with detailed written information about the standards, materials, and methods required for the installation.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why might a Request for Information (RFI) be raised during a construction project?",
    "options": [
      "To formally seek clarification on drawings or specifications where information is unclear or missing",
      "It is used only to request additional payment",
      "RFIs are only relevant to health and safety matters",
      "To request a change of contractor"
    ],
    "correct": "To formally seek clarification on drawings or specifications where information is unclear or missing",
    "explanation": "An RFI provides a documented way to seek clarification, ensuring the query and response are recorded and available to relevant parties.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What information would you typically expect to find in a circuit schedule for a consumer unit?",
    "options": [
      "Details of each circuit, such as its description, cable size, protective device rating, and the areas served",
      "The purchase price of the consumer unit",
      "The installer's personal contact number only",
      "The date the property was originally built"
    ],
    "correct": "Details of each circuit, such as its description, cable size, protective device rating, and the areas served",
    "explanation": "A circuit schedule records key details about each circuit, helping identify what each protective device controls and supporting future maintenance and testing.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why is it important to check the revision number of a drawing before starting work from it?",
    "options": [
      "Using an out-of-date revision could mean working to information that has since been superseded",
      "Revision numbers have no practical significance",
      "Only the most recent drawing is ever issued to site",
      "Revision numbers only apply to mechanical drawings, not electrical"
    ],
    "correct": "Using an out-of-date revision could mean working to information that has since been superseded",
    "explanation": "Checking the revision ensures work is carried out to the latest approved information, avoiding costly or unsafe errors from outdated drawings.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the purpose of an Operation and Maintenance (O&M) manual handed over at project completion?",
    "options": [
      "To provide the building owner or occupier with information needed to operate and maintain the installed systems",
      "It is only relevant to mechanical systems, not electrical",
      "To replace the need for any future testing or inspection",
      "O&M manuals are optional and rarely provided in practice"
    ],
    "correct": "To provide the building owner or occupier with information needed to operate and maintain the installed systems",
    "explanation": "An O&M manual gives the end user essential information, such as equipment details, maintenance schedules, and safety information, to safely operate and maintain the installation.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why should method statements be read and understood before starting a task, rather than after?",
    "options": [
      "They set out the safe sequence of work and precautions that should be followed from the outset",
      "Method statements are only relevant once the work is already underway",
      "They replace the need for a risk assessment",
      "Method statements are purely administrative paperwork"
    ],
    "correct": "They set out the safe sequence of work and precautions that should be followed from the outset",
    "explanation": "A method statement outlines how a task should be carried out safely, so understanding it before starting ensures the correct sequence and precautions are followed throughout.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What does a symbol key or legend usually accompany on an electrical drawing?",
    "options": [
      "An explanation of what each symbol used for switches, sockets, luminaires, and other equipment represents",
      "The client's billing address",
      "A summary of the project budget",
      "The weather conditions during the survey"
    ],
    "correct": "An explanation of what each symbol used for switches, sockets, luminaires, and other equipment represents",
    "explanation": "A symbol key allows anyone reading the drawing to correctly interpret the various electrical symbols used to represent equipment and accessories.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "Why might drawings be issued in different formats for different purposes (e.g. tender, construction, as-built)?",
    "options": [
      "Each stage of a project requires a different level of detail and accuracy appropriate to its purpose",
      "Drawing formats have no relationship to project stage",
      "Only one drawing format is ever used throughout a project",
      "Format changes are purely a matter of personal preference"
    ],
    "correct": "Each stage of a project requires a different level of detail and accuracy appropriate to its purpose",
    "explanation": "Drawings evolve through a project, from early tender-stage concepts to detailed construction information and finally accurate as-built records.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What should be done if information on a drawing appears to conflict with the written specification?",
    "options": [
      "Query the discrepancy with the relevant party before proceeding, rather than making an assumption",
      "Always follow the drawing and ignore the specification",
      "Always follow the specification and ignore the drawing",
      "Proceed with whichever is quickest to interpret"
    ],
    "correct": "Query the discrepancy with the relevant party before proceeding, rather than making an assumption",
    "explanation": "Conflicting information should always be clarified before work proceeds, to avoid errors, rework, or safety issues arising from an incorrect assumption.",
    "topic": "Drawings and Documentation"
  },
  {
    "text": "What is the general purpose of overload protection fitted to a motor circuit?",
    "options": [
      "To protect the motor from damage caused by sustained excessive current, such as from mechanical overload",
      "To increase the motor's running speed",
      "To provide lighting for the motor enclosure",
      "To reduce the motor's starting current to zero"
    ],
    "correct": "To protect the motor from damage caused by sustained excessive current, such as from mechanical overload",
    "explanation": "Motor overload protection detects sustained excess current, which could otherwise overheat and damage the motor windings, and disconnects the supply before harm occurs.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why do many three-phase motors require a higher starting current than their normal running current?",
    "options": [
      "The motor draws increased current momentarily while accelerating from standstill to full speed",
      "Three-phase motors do not experience any increase in starting current",
      "It is caused entirely by incorrect wiring",
      "Starting current is always lower than running current"
    ],
    "correct": "The motor draws increased current momentarily while accelerating from standstill to full speed",
    "explanation": "As a motor starts from rest, it typically draws a higher inrush current until it reaches full running speed, after which current settles to normal running levels.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the purpose of a star-delta starter for certain three-phase motors?",
    "options": [
      "To reduce the starting current drawn by the motor compared with a direct-on-line start",
      "To increase the motor's maximum speed beyond its rated value",
      "To reverse the direction of rotation automatically",
      "To provide overload protection only"
    ],
    "correct": "To reduce the starting current drawn by the motor compared with a direct-on-line start",
    "explanation": "A star-delta starter initially connects the motor windings in star configuration to reduce starting current, before switching to delta for normal running.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why is it important to check the correct direction of rotation when a three-phase motor is first commissioned?",
    "options": [
      "Incorrect rotation direction could damage connected equipment or create a hazard, depending on the application",
      "Direction of rotation has no practical effect on most equipment",
      "Motors cannot run in the wrong direction if wired correctly",
      "It is only relevant for single-phase motors"
    ],
    "correct": "Incorrect rotation direction could damage connected equipment or create a hazard, depending on the application",
    "explanation": "Some equipment, such as pumps or fans, depends on correct rotation direction to function safely and effectively, so this should be verified during commissioning.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why might a motor control circuit include interlocking between forward and reverse contactors?",
    "options": [
      "To prevent both contactors closing at the same time, which could cause a short circuit across the supply",
      "Interlocking increases the motor's maximum running speed",
      "It removes the need for any overload protection",
      "Interlocking is only relevant to single-phase motors"
    ],
    "correct": "To prevent both contactors closing at the same time, which could cause a short circuit across the supply",
    "explanation": "Interlocking ensures forward and reverse contactors cannot be energised simultaneously, preventing a dangerous short circuit across the supply phases.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why might a variable speed drive (VSD) be used to control a motor, rather than running it at fixed speed?",
    "options": [
      "It allows the motor's speed to be adjusted to suit varying demand, which can also improve energy efficiency",
      "VSDs are only used to reverse a motor's direction",
      "A VSD removes the need for any motor overload protection",
      "VSDs are purely a cosmetic addition to a control panel"
    ],
    "correct": "It allows the motor's speed to be adjusted to suit varying demand, which can also improve energy efficiency",
    "explanation": "VSDs allow motor speed to be varied to match actual demand, which can significantly improve energy efficiency compared with running at a constant fixed speed.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is the purpose of an emergency stop button on a piece of machinery?",
    "options": [
      "To allow the machine to be rapidly stopped in a dangerous situation",
      "To start the machine more quickly than the normal start button",
      "To adjust the machine's operating speed",
      "It is purely a decorative feature required by design standards"
    ],
    "correct": "To allow the machine to be rapidly stopped in a dangerous situation",
    "explanation": "An emergency stop provides a quick, easily accessible way to halt machinery immediately if a dangerous situation arises.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why should motor control circuits often include a 'no-volt release' or similar feature?",
    "options": [
      "To prevent the motor restarting automatically once power is restored after a supply failure, without a deliberate action",
      "To increase the motor's torque during starting",
      "It is only relevant to single-phase motors",
      "To eliminate the need for overload protection"
    ],
    "correct": "To prevent the motor restarting automatically once power is restored after a supply failure, without a deliberate action",
    "explanation": "A no-volt release ensures the motor does not restart automatically after a power interruption, requiring a deliberate action to restart it, which protects anyone working nearby.",
    "topic": "Motors and Control"
  },
  {
    "text": "What could cause a motor to trip its overload protection repeatedly?",
    "options": [
      "A mechanical fault causing the motor to work harder than intended, drawing excess current",
      "The overload device being set to the correct rating for the motor",
      "The motor running at exactly its rated load",
      "Ambient temperature having no bearing on the motor's operation"
    ],
    "correct": "A mechanical fault causing the motor to work harder than intended, drawing excess current",
    "explanation": "Mechanical issues, such as a seized bearing or excessive load, can cause a motor to draw more current than normal, resulting in repeated overload tripping.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why is a wiring diagram particularly useful when fault-finding on a motor control circuit?",
    "options": [
      "It shows how the components are electrically connected, helping to trace the fault logically",
      "Wiring diagrams are not useful for fault-finding, only for initial installation",
      "It replaces the need to test the circuit with instruments",
      "It only shows the physical layout, not the electrical connections"
    ],
    "correct": "It shows how the components are electrically connected, helping to trace the fault logically",
    "explanation": "A wiring diagram helps identify how signals and power flow through a control circuit, supporting a logical, systematic approach to fault-finding.",
    "topic": "Motors and Control"
  },
  {
    "text": "What is a key safety consideration before carrying out work on a motor control panel?",
    "options": [
      "Ensuring the panel is correctly isolated and proved dead, including any separately fed control circuits",
      "Assuming the panel is safe because the motor itself is switched off locally",
      "Only isolating the main motor supply, ignoring any control circuits",
      "Control panels never present an electric shock risk"
    ],
    "correct": "Ensuring the panel is correctly isolated and proved dead, including any separately fed control circuits",
    "explanation": "Control panels can have multiple supplies, including separate control circuits, so all relevant sources must be isolated and proved dead before work begins.",
    "topic": "Motors and Control"
  },
  {
    "text": "Why is it good practice for an electrician to keep up to date with changes to BS 7671 and industry guidance?",
    "options": [
      "Standards and best practice evolve, and staying current helps ensure work remains safe and compliant",
      "BS 7671 never changes once published",
      "Only senior electricians need to stay updated on regulations",
      "Keeping up to date is optional and has no professional benefit"
    ],
    "correct": "Standards and best practice evolve, and staying current helps ensure work remains safe and compliant",
    "explanation": "Wiring regulations and industry guidance are periodically updated, so ongoing professional development helps ensure electricians remain competent and compliant.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the benefit of being registered with a competent person scheme for domestic electrical work in England and Wales?",
    "options": [
      "It allows certain notifiable work to be self-certified without a separate application to building control",
      "It has no relevance to Building Regulations compliance",
      "Registration removes the need to follow BS 7671",
      "It is only relevant for commercial electrical work"
    ],
    "correct": "It allows certain notifiable work to be self-certified without a separate application to building control",
    "explanation": "Registered competent persons can self-certify notifiable domestic electrical work as compliant with Building Regulations, rather than needing a separate building control application.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why might an electrician need to liaise with other trades, such as plumbers or builders, during an installation?",
    "options": [
      "To coordinate work and avoid conflicts, such as cables and pipework clashing in the same space",
      "Coordination between trades is unnecessary on most projects",
      "Only the site manager ever needs to communicate with other trades",
      "Electricians work in complete isolation from other trades by design"
    ],
    "correct": "To coordinate work and avoid conflicts, such as cables and pipework clashing in the same space",
    "explanation": "Good coordination between trades helps avoid clashes, rework, and safety issues, particularly where services from different trades occupy the same space.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is a benefit of using a systematic fault-finding approach, rather than randomly replacing components?",
    "options": [
      "It is more likely to correctly identify the root cause, saving time and reducing unnecessary replacement of parts",
      "Systematic approaches always take longer than random replacement",
      "Random replacement is generally more effective for complex faults",
      "A systematic approach has no advantage over guesswork"
    ],
    "correct": "It is more likely to correctly identify the root cause, saving time and reducing unnecessary replacement of parts",
    "explanation": "A logical, systematic approach to fault-finding narrows down the actual cause of a fault, rather than wasting time and materials replacing components unnecessarily.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why is clear, professional communication with clients important for an electrician?",
    "options": [
      "It helps ensure the client understands the work being carried out and builds trust in the service provided",
      "Communication with clients is not part of an electrician's role",
      "Clients rarely need to understand the details of electrical work",
      "Professional communication is only relevant for large commercial contracts"
    ],
    "correct": "It helps ensure the client understands the work being carried out and builds trust in the service provided",
    "explanation": "Clear communication helps manage expectations, explain findings or recommendations, and supports a professional relationship with the client.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the purpose of continuing professional development (CPD) for a qualified electrician?",
    "options": [
      "To maintain and develop skills and knowledge throughout their career, keeping pace with new technology and standards",
      "CPD is only relevant to office-based professions",
      "Qualified electricians do not need to undertake any further learning",
      "CPD is purely a marketing exercise with no practical value"
    ],
    "correct": "To maintain and develop skills and knowledge throughout their career, keeping pace with new technology and standards",
    "explanation": "CPD helps electricians remain competent as technology, regulations, and best practice evolve throughout their career.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why might an electrician choose to specialise in an area such as renewable technology or fire alarm systems?",
    "options": [
      "Specialisation can develop deeper expertise and open up additional career opportunities in that area",
      "Specialising limits an electrician's ability to work in any other area permanently",
      "All electricians must specialise in exactly one area by law",
      "Specialisation has no impact on career opportunities"
    ],
    "correct": "Specialisation can develop deeper expertise and open up additional career opportunities in that area",
    "explanation": "Developing specialist knowledge in a particular field can enhance career prospects and allow an electrician to offer more specific expertise to clients.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is a key reason for maintaining accurate job records and paperwork throughout a project?",
    "options": [
      "It provides evidence of the work carried out, which can be important for compliance, warranty, and future reference",
      "Job records have no legal or practical significance",
      "Only the client needs to keep any paperwork",
      "Records are only useful if a dispute arises"
    ],
    "correct": "It provides evidence of the work carried out, which can be important for compliance, warranty, and future reference",
    "explanation": "Accurate records support compliance, provide evidence for certification and warranties, and are valuable for anyone working on the installation in future.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why is it useful for an electrician to understand basic principles of other building services, such as plumbing or HVAC?",
    "options": [
      "It supports better coordination and helps identify potential conflicts or hazards between different systems",
      "Other building services have no relevance to electrical work",
      "Understanding other trades is purely of academic interest",
      "It is only relevant to electricians working on new-build projects"
    ],
    "correct": "It supports better coordination and helps identify potential conflicts or hazards between different systems",
    "explanation": "A working knowledge of related trades helps identify where systems might interact or conflict, supporting safer and more efficient installations.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is the value of mentoring apprentices for an experienced electrician?",
    "options": [
      "It helps pass on practical skills, safe working practices, and industry knowledge to the next generation",
      "Mentoring has no benefit to either party involved",
      "Apprentices learn everything they need from college alone",
      "Mentoring is only a formal requirement, not a practical benefit"
    ],
    "correct": "It helps pass on practical skills, safe working practices, and industry knowledge to the next generation",
    "explanation": "Mentoring supports the development of apprentices' practical skills and safe working habits, helping maintain high standards across the industry.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "Why should an electrician always work within the limits of their own competence?",
    "options": [
      "Working beyond one's competence increases the risk of unsafe or non-compliant work being carried out",
      "Competence limits are purely a matter of personal preference",
      "All electricians are equally competent in every area of the trade",
      "There is no professional expectation to recognise personal limitations"
    ],
    "correct": "Working beyond one's competence increases the risk of unsafe or non-compliant work being carried out",
    "explanation": "Recognising the limits of one's own knowledge and skill, and seeking further training or support where needed, helps ensure work remains safe and compliant.",
    "topic": "Trade Knowledge"
  },
  {
    "text": "What is a key advantage of LED lighting compared with traditional incandescent lighting?",
    "options": [
      "LEDs typically use significantly less energy for a similar light output and have a longer service life",
      "LEDs always produce more heat than incandescent lamps",
      "LEDs cannot be dimmed under any circumstances",
      "LEDs require significantly more maintenance than incandescent lamps"
    ],
    "correct": "LEDs typically use significantly less energy for a similar light output and have a longer service life",
    "explanation": "LED lighting is generally far more energy-efficient and longer-lasting than traditional incandescent lamps, reducing both running costs and maintenance.",
    "topic": "Lighting"
  },
  {
    "text": "Why is it important to check that a dimmer switch is compatible with the type of lamp being installed?",
    "options": [
      "Incompatible dimmers and lamps can cause flickering, humming, or premature failure",
      "All dimmer switches work identically with every lamp type",
      "Compatibility is only relevant for fluorescent lighting",
      "Dimmer compatibility has no effect on lamp performance"
    ],
    "correct": "Incompatible dimmers and lamps can cause flickering, humming, or premature failure",
    "explanation": "Different lamp technologies, such as LED, require dimmers specifically designed to be compatible, or issues such as flickering or reduced lamp life can occur.",
    "topic": "Lighting"
  },
  {
    "text": "What is the purpose of a lighting circuit's switch line being correctly identified and connected?",
    "options": [
      "To ensure the switch interrupts the line conductor, rather than leaving the fitting live when switched off",
      "It only affects the brightness of the lamp",
      "Switch line identification is purely a labelling convenience",
      "It has no bearing on safety when the light is switched off"
    ],
    "correct": "To ensure the switch interrupts the line conductor, rather than leaving the fitting live when switched off",
    "explanation": "Correct polarity ensures the switch breaks the line conductor, so the fitting is genuinely isolated from the supply when switched off, reducing shock risk during lamp changes.",
    "topic": "Lighting"
  },
  {
    "text": "Why might occupancy or PIR sensors be used to control lighting in certain areas, such as corridors or stores?",
    "options": [
      "To automatically switch lighting off when a space is unoccupied, helping reduce unnecessary energy use",
      "PIR sensors are used only for security alarm systems",
      "Occupancy sensors always increase energy consumption",
      "They are purely a decorative addition with no functional purpose"
    ],
    "correct": "To automatically switch lighting off when a space is unoccupied, helping reduce unnecessary energy use",
    "explanation": "Occupancy sensors help save energy by ensuring lighting is only on when a space is actually in use.",
    "topic": "Lighting"
  },
  {
    "text": "What is the general purpose of emergency lighting within a building?",
    "options": [
      "To provide illumination along escape routes if the normal lighting supply fails",
      "To provide additional decorative lighting for special occasions",
      "Emergency lighting is only used in outdoor areas",
      "To increase the overall brightness of a space during normal use"
    ],
    "correct": "To provide illumination along escape routes if the normal lighting supply fails",
    "explanation": "Emergency lighting ensures people can see to safely evacuate a building along designated escape routes if the normal supply is lost.",
    "topic": "Lighting"
  },
  {
    "text": "Why should light fittings be selected with an appropriate IP (Ingress Protection) rating for their location?",
    "options": [
      "The IP rating indicates the level of protection against dust and moisture, which must suit the environment",
      "IP rating relates only to the colour of the light produced",
      "All light fittings have identical IP ratings by default",
      "IP rating is only relevant for outdoor lighting, never indoors"
    ],
    "correct": "The IP rating indicates the level of protection against dust and moisture, which must suit the environment",
    "explanation": "Selecting a fitting with a suitable IP rating helps protect the internal components from moisture or dust ingress appropriate to where it will be installed, such as a bathroom.",
    "topic": "Lighting"
  },
  {
    "text": "What is the purpose of a two-way switching arrangement for a lighting circuit?",
    "options": [
      "To allow a light to be switched on or off from two different locations, such as either end of a staircase",
      "To provide two separate lighting circuits from one switch",
      "It is only used for outdoor lighting installations",
      "Two-way switching doubles the brightness of the light"
    ],
    "correct": "To allow a light to be switched on or off from two different locations, such as either end of a staircase",
    "explanation": "Two-way switching allows control of a single lighting point from two separate switch positions, commonly used for stairs, landings, or long corridors.",
    "topic": "Lighting"
  },
  {
    "text": "Why might daylight (photocell) sensors be used to control external or certain internal lighting?",
    "options": [
      "To automatically switch lighting on or off based on the available natural light level",
      "Photocell sensors only work at night",
      "Daylight sensors have no relevance to energy efficiency",
      "They are used exclusively for decorative lighting effects"
    ],
    "correct": "To automatically switch lighting on or off based on the available natural light level",
    "explanation": "Daylight sensors help avoid lighting being left on unnecessarily when there is already sufficient natural light, supporting energy efficiency.",
    "topic": "Lighting"
  },
  {
    "text": "What should be considered when selecting the colour temperature of lighting for a workspace?",
    "options": [
      "Colour temperature affects the visual environment and can influence comfort, alertness, and task suitability",
      "Colour temperature has no effect on how a space feels or functions",
      "All lighting has an identical colour temperature by default",
      "Colour temperature only matters for outdoor lighting"
    ],
    "correct": "Colour temperature affects the visual environment and can influence comfort, alertness, and task suitability",
    "explanation": "Different colour temperatures (warm to cool white) can affect the mood and suitability of a space for particular tasks, so this is an important design consideration.",
    "topic": "Lighting"
  },
  {
    "text": "Why is regular testing of emergency lighting systems required?",
    "options": [
      "To confirm the system will function correctly and provide adequate illumination if needed in a real emergency",
      "Emergency lighting never requires testing once installed",
      "Testing is purely a formality with no functional purpose",
      "Only the fire alarm system needs regular testing, not emergency lighting"
    ],
    "correct": "To confirm the system will function correctly and provide adequate illumination if needed in a real emergency",
    "explanation": "Periodic testing verifies that batteries, lamps, and control gear are functioning correctly, ensuring the system will work as intended during a genuine power failure.",
    "topic": "Lighting"
  },
  {
    "text": "What is a benefit of using lighting control systems, such as scene-setting or zoning, in a commercial building?",
    "options": [
      "It allows lighting levels to be tailored to different areas or activities, improving both comfort and energy efficiency",
      "Lighting control systems always increase overall energy consumption",
      "Zoning removes the need for any emergency lighting",
      "Scene-setting only affects decorative lighting, not general illumination"
    ],
    "correct": "It allows lighting levels to be tailored to different areas or activities, improving both comfort and energy efficiency",
    "explanation": "Lighting control systems allow different areas or scenarios to have appropriately tailored lighting levels, supporting both user comfort and energy savings.",
    "topic": "Lighting"
  },
  {
    "text": "Why is it important to segregate different types of waste, such as metal, wood, and general waste, on a construction site?",
    "options": [
      "It supports recycling and reduces the amount of waste sent to landfill",
      "Segregating waste has no environmental benefit",
      "It is purely a cost-saving exercise with no environmental purpose",
      "All waste types must always be disposed of together by law"
    ],
    "correct": "It supports recycling and reduces the amount of waste sent to landfill",
    "explanation": "Segregating waste streams allows more materials to be recycled or reused, reducing the overall environmental impact of a project.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is a key reason for correctly disposing of old fluorescent tubes or CFL lamps rather than putting them in general waste?",
    "options": [
      "They contain small amounts of mercury, which can be harmful to the environment if not disposed of properly",
      "They have no special disposal requirements at all",
      "It is purely a matter of tidiness on site",
      "Fluorescent tubes cannot be recycled under any circumstances"
    ],
    "correct": "They contain small amounts of mercury, which can be harmful to the environment if not disposed of properly",
    "explanation": "Fluorescent and CFL lamps contain mercury, a hazardous substance, so they require specific handling and disposal to prevent environmental contamination.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why might a construction project be required to prevent silt or contaminated water from entering local watercourses?",
    "options": [
      "Uncontrolled discharge can pollute rivers or streams, harming wildlife and water quality",
      "It is purely a matter of visual appearance",
      "Watercourse protection is only relevant to projects located directly next to a river",
      "There are no environmental consequences to consider"
    ],
    "correct": "Uncontrolled discharge can pollute rivers or streams, harming wildlife and water quality",
    "explanation": "Silt and contaminated run-off from construction sites can seriously harm aquatic ecosystems, so appropriate controls are often required to prevent pollution.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is a benefit of specifying energy-efficient equipment and lighting in a new electrical installation?",
    "options": [
      "It can reduce ongoing energy consumption and the associated environmental impact over the life of the installation",
      "Energy-efficient equipment always costs the same to purchase and run as standard equipment",
      "It has no bearing on a building's overall environmental performance",
      "Energy efficiency is only relevant to industrial installations"
    ],
    "correct": "It can reduce ongoing energy consumption and the associated environmental impact over the life of the installation",
    "explanation": "Choosing energy-efficient equipment reduces electricity demand over the life of the installation, lowering both running costs and environmental impact.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why should packaging waste from new electrical materials be managed responsibly on site?",
    "options": [
      "It reduces unnecessary landfill waste and supports recycling where possible",
      "Packaging waste has no environmental impact once discarded",
      "It is only a concern for large commercial projects",
      "All packaging must be burned on site by default"
    ],
    "correct": "It reduces unnecessary landfill waste and supports recycling where possible",
    "explanation": "Responsible management of packaging waste, including recycling where possible, reduces the overall environmental footprint of a construction project.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is the purpose of the Waste Electrical and Electronic Equipment (WEEE) regulations?",
    "options": [
      "To ensure electrical and electronic equipment is collected, treated, and recycled responsibly at end of life",
      "To regulate the sale price of electrical equipment",
      "WEEE regulations only apply to industrial machinery",
      "To set installation standards for new electrical circuits"
    ],
    "correct": "To ensure electrical and electronic equipment is collected, treated, and recycled responsibly at end of life",
    "explanation": "WEEE regulations aim to reduce the environmental impact of electrical and electronic waste by promoting responsible collection, treatment, and recycling.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why might noise from construction activity need to be managed and, where necessary, restricted to certain hours?",
    "options": [
      "Excessive noise can disturb nearby residents and wildlife, and may be subject to local restrictions",
      "Noise has no impact on the surrounding environment or community",
      "Noise restrictions apply only to activities carried out at night",
      "Construction noise is never subject to any regulation"
    ],
    "correct": "Excessive noise can disturb nearby residents and wildlife, and may be subject to local restrictions",
    "explanation": "Construction noise can significantly affect nearby communities and wildlife, so many projects are subject to agreed working hours or noise limits.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is a reason for using sustainably sourced materials, where practical, on a construction project?",
    "options": [
      "It can help reduce the wider environmental impact associated with material extraction and production",
      "Sustainably sourced materials always perform worse than alternatives",
      "Sourcing has no bearing on a project's overall environmental footprint",
      "It is only relevant to materials used outdoors"
    ],
    "correct": "It can help reduce the wider environmental impact associated with material extraction and production",
    "explanation": "Choosing sustainably sourced materials can help reduce the broader environmental impact of a project, supporting more responsible resource use.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why is spill containment important when storing or using oils, fuels, or chemicals on site?",
    "options": [
      "A spill could contaminate soil or water sources if not properly contained and managed",
      "Spill containment is purely a housekeeping matter with no environmental relevance",
      "Only large spills present any risk to the environment",
      "Spill containment equipment is rarely required by good practice"
    ],
    "correct": "A spill could contaminate soil or water sources if not properly contained and managed",
    "explanation": "Spill containment measures, such as bunding, help prevent hazardous substances from reaching soil or watercourses if a leak or spill occurs.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "What is a general benefit of designing electrical installations with future adaptability in mind?",
    "options": [
      "It can extend the useful life of the installation and reduce the need for wasteful future replacement",
      "Future adaptability has no impact on environmental or economic outcomes",
      "It is only relevant to very large commercial buildings",
      "Adaptable design always increases waste generated during installation"
    ],
    "correct": "It can extend the useful life of the installation and reduce the need for wasteful future replacement",
    "explanation": "Designing with future flexibility in mind can reduce the likelihood of premature replacement, supporting more sustainable, longer-term use of resources.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why might an Environmental Management Plan be produced for a larger construction project?",
    "options": [
      "To identify environmental risks and set out how they will be controlled and monitored throughout the project",
      "It is purely a marketing document with no practical function",
      "Environmental Management Plans are only required for projects outside the UK",
      "It replaces the need for a health and safety plan"
    ],
    "correct": "To identify environmental risks and set out how they will be controlled and monitored throughout the project",
    "explanation": "An Environmental Management Plan systematically identifies environmental risks associated with a project and sets out measures to control and monitor them.",
    "topic": "Environmental Awareness"
  },
  {
    "text": "Why is it important to avoid running data cables too close to power cables where possible?",
    "options": [
      "Electromagnetic interference from power cables can degrade the data signal quality",
      "It has no effect on data transmission quality",
      "Data cables are always immune to interference from nearby power cables",
      "Proximity to power cables only affects the appearance of the installation"
    ],
    "correct": "Electromagnetic interference from power cables can degrade the data signal quality",
    "explanation": "Power cables can induce electromagnetic interference into nearby data cables, so separation distances or shielded cable are used to help maintain signal integrity.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is the general purpose of a patch panel in a structured cabling installation?",
    "options": [
      "To provide a central termination point that allows cables to be organised and easily cross-connected",
      "To boost the electrical current within data cables",
      "To provide power to network switches",
      "A patch panel is only used in fibre optic installations"
    ],
    "correct": "To provide a central termination point that allows cables to be organised and easily cross-connected",
    "explanation": "A patch panel terminates cabling in an organised way, making it easy to identify, manage, and reconfigure network connections as needed.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why might fibre optic cable be chosen over copper cabling for certain data links?",
    "options": [
      "It can support higher bandwidth over longer distances with immunity to electromagnetic interference",
      "Fibre optic cable is always cheaper to install than copper cable",
      "Fibre optic cable cannot be damaged under any circumstances",
      "Copper cable always outperforms fibre for long-distance links"
    ],
    "correct": "It can support higher bandwidth over longer distances with immunity to electromagnetic interference",
    "explanation": "Fibre optic cable can carry data over much greater distances at higher speeds than copper, and because it uses light rather than electrical signals, it is immune to electromagnetic interference.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is the purpose of cable testing and certification after installing structured data cabling?",
    "options": [
      "To confirm the installed cabling meets the required performance standard for its intended use",
      "Certification is only required for fibre optic cabling, not copper",
      "It is purely a paperwork exercise with no bearing on network performance",
      "Testing is optional if the cable appears correctly terminated"
    ],
    "correct": "To confirm the installed cabling meets the required performance standard for its intended use",
    "explanation": "Cable certification verifies that the installed cabling meets recognised performance standards, helping ensure reliable network operation.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why is correct termination important when connecting twisted pair cable to a connector, such as RJ45?",
    "options": [
      "Poor termination, such as excessive untwisting, can degrade signal performance and cause data errors",
      "Termination method has no effect on network performance",
      "Any wiring sequence will produce identical performance",
      "Only the outer jacket of the cable needs to be correctly secured"
    ],
    "correct": "Poor termination, such as excessive untwisting, can degrade signal performance and cause data errors",
    "explanation": "Twisted pair cabling relies on the twist to reduce interference; poor termination practice, such as untwisting pairs too far, can degrade performance and reliability.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is Power over Ethernet (PoE) typically used for?",
    "options": [
      "To supply electrical power to network devices, such as IP cameras or access points, over the same cable as the data",
      "To increase the maximum data transmission speed of a cable",
      "PoE is only used for fibre optic cabling",
      "To boost the range of Wi-Fi signals directly"
    ],
    "correct": "To supply electrical power to network devices, such as IP cameras or access points, over the same cable as the data",
    "explanation": "PoE allows devices to receive both data and power through a single Ethernet cable, simplifying installation for equipment such as IP cameras and wireless access points.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why should data cabling be installed following recognised bend radius limits?",
    "options": [
      "Exceeding the minimum bend radius can damage the cable and degrade signal performance",
      "Bend radius has no effect on cable performance",
      "Data cables can be bent to any radius without consequence",
      "Bend radius limits only apply to fibre optic cable, not copper"
    ],
    "correct": "Exceeding the minimum bend radius can damage the cable and degrade signal performance",
    "explanation": "Bending a cable too tightly can damage the internal conductors or fibres, affecting the transmission performance or causing complete failure.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is the purpose of a comms room or data cabinet in a building's network infrastructure?",
    "options": [
      "To provide a secure, organised, and appropriately environmentally controlled space for network equipment",
      "It is purely a storage space for general office supplies",
      "Comms rooms are only required in residential properties",
      "To provide additional office seating"
    ],
    "correct": "To provide a secure, organised, and appropriately environmentally controlled space for network equipment",
    "explanation": "A dedicated comms room helps protect sensitive network equipment, keeps cabling organised, and can help control temperature and access.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why is cable labelling particularly important in a structured cabling installation with many cable runs?",
    "options": [
      "It allows individual cables to be easily identified for testing, fault-finding, and future changes",
      "Labelling has no practical benefit once the cabling is installed",
      "Only fibre optic cables require labelling",
      "Labelling is purely a decorative requirement"
    ],
    "correct": "It allows individual cables to be easily identified for testing, fault-finding, and future changes",
    "explanation": "Clear labelling at both ends of each cable run makes it far easier to identify, test, and maintain the correct cable within a larger installation.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is a key consideration when routing data cabling near sources of heat, such as boilers or hot pipework?",
    "options": [
      "Excessive heat can degrade cable insulation and affect long-term performance",
      "Heat has no effect on data cable performance or lifespan",
      "Only power cables are affected by proximity to heat sources",
      "Data cabling should always be routed as close to heat sources as possible"
    ],
    "correct": "Excessive heat can degrade cable insulation and affect long-term performance",
    "explanation": "Sustained exposure to high temperatures can degrade cable insulation over time, so data cabling should be routed away from significant heat sources where possible.",
    "topic": "Data Cabling"
  },
  {
    "text": "Why might Category 6A (Cat6A) cabling be specified over Category 5e (Cat5e) for a new installation?",
    "options": [
      "It supports higher bandwidth and better performance over longer distances, suiting future network demands",
      "Cat6A cable is always identical in performance to Cat5e",
      "Cat5e cable always outperforms Cat6A for all applications",
      "Category rating only affects the colour of the cable jacket"
    ],
    "correct": "It supports higher bandwidth and better performance over longer distances, suiting future network demands",
    "explanation": "Higher category cabling, such as Cat6A, typically supports greater bandwidth and improved performance, helping future-proof a network installation.",
    "topic": "Data Cabling"
  },
  {
    "text": "What is the general purpose of a fire alarm system's smoke detector?",
    "options": [
      "To detect smoke particles in the air and trigger an alarm to warn occupants of a possible fire",
      "To measure the room temperature only",
      "To provide general lighting in an emergency",
      "Smoke detectors only function when manually activated"
    ],
    "correct": "To detect smoke particles in the air and trigger an alarm to warn occupants of a possible fire",
    "explanation": "Smoke detectors sense the presence of smoke and initiate an alarm signal, providing an early warning of a potential fire.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why might a heat detector be used instead of a smoke detector in certain locations, such as kitchens?",
    "options": [
      "Smoke detectors could give frequent false alarms in areas where steam or cooking fumes are common",
      "Heat detectors are always more sensitive than smoke detectors",
      "Heat detectors detect smoke more accurately than smoke detectors",
      "Heat detectors are used purely for decorative purposes"
    ],
    "correct": "Smoke detectors could give frequent false alarms in areas where steam or cooking fumes are common",
    "explanation": "Heat detectors are less prone to false alarms in environments with steam, dust, or fumes, making them more suitable for locations like kitchens.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the purpose of a break-glass call point in a fire alarm system?",
    "options": [
      "To allow a person who discovers a fire to manually raise the alarm",
      "To automatically extinguish a fire once activated",
      "It is used solely for testing the alarm system",
      "To provide a source of emergency lighting"
    ],
    "correct": "To allow a person who discovers a fire to manually raise the alarm",
    "explanation": "A break-glass call point provides a simple, manual way for someone who discovers a fire to immediately trigger the alarm system.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why is it important that a fire alarm system's sounders can be heard clearly throughout a building?",
    "options": [
      "Occupants need to be alerted promptly, wherever they are located, to begin evacuation",
      "Sounder audibility only matters in very large buildings",
      "Sounders are only required near fire exits",
      "Sound level has no bearing on evacuation effectiveness"
    ],
    "correct": "Occupants need to be alerted promptly, wherever they are located, to begin evacuation",
    "explanation": "Fire alarm sounders must be audible throughout occupied areas so that everyone is alerted promptly, wherever they happen to be in the building.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the purpose of a control and indicating panel in a fire alarm system?",
    "options": [
      "To monitor the system, indicate the location of a triggered alarm, and allow control functions such as silencing or resetting",
      "To provide backup lighting only",
      "It only displays the time and date",
      "Control panels have no functional role in a fire alarm system"
    ],
    "correct": "To monitor the system, indicate the location of a triggered alarm, and allow control functions such as silencing or resetting",
    "explanation": "The control panel is the central point of a fire alarm system, showing status information and allowing authorised personnel to manage alarms and faults.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why should intruder alarm systems typically include a means of remotely monitoring or notifying if triggered?",
    "options": [
      "It allows a faster response, such as alerting a keyholder or monitoring station, when an alarm is activated",
      "Remote monitoring has no practical benefit for security",
      "It is purely a marketing feature with no functional purpose",
      "Local sounders alone are always sufficient for effective security"
    ],
    "correct": "It allows a faster response, such as alerting a keyholder or monitoring station, when an alarm is activated",
    "explanation": "Remote notification, such as to a monitoring station or keyholder, helps ensure a prompt response when an intruder alarm is triggered.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the general purpose of Passive Infrared (PIR) detectors in a security alarm system?",
    "options": [
      "To detect movement within a protected area by sensing changes in infrared radiation",
      "To detect smoke particles in the air",
      "To provide backup power to the alarm panel",
      "PIR detectors only function in complete darkness"
    ],
    "correct": "To detect movement within a protected area by sensing changes in infrared radiation",
    "explanation": "PIR detectors sense changes in infrared radiation caused by movement, such as a person entering a protected area, triggering the alarm system.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why might a fire alarm system be zoned into different areas of a building?",
    "options": [
      "It helps identify the approximate location of a triggered alarm, supporting a faster and more targeted response",
      "Zoning has no relevance to the operation of a fire alarm system",
      "Zoning is only used to control lighting circuits",
      "Fire alarm zones are purely a cosmetic labelling convention"
    ],
    "correct": "It helps identify the approximate location of a triggered alarm, supporting a faster and more targeted response",
    "explanation": "Zoning a fire alarm system allows the control panel to indicate roughly where an alarm has been triggered, helping responders locate the source more quickly.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why is regular testing and maintenance of a fire alarm system important?",
    "options": [
      "To ensure the system remains fully functional and reliable in the event of a real fire",
      "Fire alarm systems never require maintenance once commissioned",
      "Testing is only required if a fault has already occurred",
      "Maintenance is purely an optional extra with no safety benefit"
    ],
    "correct": "To ensure the system remains fully functional and reliable in the event of a real fire",
    "explanation": "Regular testing and maintenance help identify faults or degraded components, ensuring the system continues to operate reliably when needed.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the purpose of a battery backup within a fire or intruder alarm control panel?",
    "options": [
      "To keep the system operational for a period if the mains electricity supply fails",
      "Battery backup is only used to power the panel's display lighting",
      "It has no relevance to the system's reliability",
      "Backup batteries are only required in commercial premises"
    ],
    "correct": "To keep the system operational for a period if the mains electricity supply fails",
    "explanation": "A battery backup ensures the alarm system remains functional for a defined period during a mains power failure, maintaining protection.",
    "topic": "Alarm Systems"
  },
  {
    "text": "Why should cabling for fire alarm systems often be fire-resistant or specifically rated cable?",
    "options": [
      "To help maintain circuit integrity for as long as possible in the event of a fire",
      "Fire-resistant cable is purely a cost-saving choice with no functional benefit",
      "Standard cabling always performs identically to fire-resistant cable in a fire",
      "Fire-resistant cable is only used for decorative purposes"
    ],
    "correct": "To help maintain circuit integrity for as long as possible in the event of a fire",
    "explanation": "Fire-resistant cabling helps ensure the alarm system continues to function for as long as possible during a fire, supporting continued detection and warning.",
    "topic": "Alarm Systems"
  },
  {
    "text": "What is the purpose of a maintained emergency luminaire?",
    "options": [
      "It remains illuminated at all times, both during normal supply and if the mains fails",
      "It only operates during a genuine mains failure and stays off otherwise",
      "It is only used for decorative accent lighting",
      "It functions purely as a security light triggered by movement"
    ],
    "correct": "It remains illuminated at all times, both during normal supply and if the mains fails",
    "explanation": "A maintained luminaire is lit continuously, whether on mains supply or, following a failure, on its backup source, commonly used where lighting is needed at all times, such as in cinemas.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is the purpose of a non-maintained emergency luminaire?",
    "options": [
      "It only illuminates automatically if the normal mains lighting supply fails",
      "It is permanently lit at all times, regardless of mains supply",
      "It requires manual switching on at all times",
      "It has no connection to the mains lighting circuit"
    ],
    "correct": "It only illuminates automatically if the normal mains lighting supply fails",
    "explanation": "A non-maintained luminaire stays off during normal operation and automatically switches on if the mains supply to the area fails.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "Why must fire exit signage be clearly visible and unobstructed at all times?",
    "options": [
      "It helps people quickly identify the safest route to escape during an emergency, particularly in smoke or low visibility",
      "Signage is purely a decorative requirement",
      "Fire exit signs are only relevant during a fire alarm test",
      "Obstructing signage has no effect on evacuation safety"
    ],
    "correct": "It helps people quickly identify the safest route to escape during an emergency, particularly in smoke or low visibility",
    "explanation": "Clear, unobstructed fire exit signage helps people find their way to safety quickly, which is especially critical in poor visibility caused by smoke.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is the purpose of photoluminescent signage in some escape route applications?",
    "options": [
      "It can remain visible for a period after the loss of normal lighting, by absorbing and later emitting light",
      "It only works if connected to a mains electrical supply",
      "Photoluminescent signs are purely decorative and provide no functional benefit",
      "It requires a battery to operate at all"
    ],
    "correct": "It can remain visible for a period after the loss of normal lighting, by absorbing and later emitting light",
    "explanation": "Photoluminescent materials absorb light during normal conditions and glow for a period afterwards, helping maintain visibility of signage if power is lost.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "Why is it important that emergency lighting provides sufficient illumination along the entire length of an escape route?",
    "options": [
      "Gaps in illumination could leave sections of the route too dark for people to navigate safely",
      "Only the final exit door needs to be illuminated",
      "Emergency lighting is only required in stairwells, not corridors",
      "Illumination levels have no bearing on evacuation safety"
    ],
    "correct": "Gaps in illumination could leave sections of the route too dark for people to navigate safely",
    "explanation": "Consistent illumination along the whole escape route helps ensure people can see clearly and move safely to the final exit, without dark or confusing sections.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is the purpose of periodic function and duration testing of an emergency lighting system?",
    "options": [
      "To confirm the luminaires operate correctly and the batteries can sustain the required duration if needed",
      "Testing is only required once, at the time of installation",
      "Function testing has no impact on the reliability of the system",
      "Duration testing is purely a cosmetic exercise with no safety relevance"
    ],
    "correct": "To confirm the luminaires operate correctly and the batteries can sustain the required duration if needed",
    "explanation": "Regular testing verifies both that the luminaires function correctly and that the batteries can provide illumination for the required duration during an actual mains failure.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "Why might emergency lighting be specifically required to illuminate a fire alarm call point or fire-fighting equipment?",
    "options": [
      "So the equipment can be located and used quickly, even if normal lighting has failed",
      "Fire-fighting equipment is never used during a power failure",
      "Emergency lighting has no relevance to fire-fighting equipment",
      "It is purely a decorative requirement with no safety purpose"
    ],
    "correct": "So the equipment can be located and used quickly, even if normal lighting has failed",
    "explanation": "Emergency lighting at key locations, such as fire alarm call points, ensures this equipment remains visible and usable even during a power failure.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is a common power source for a self-contained emergency luminaire?",
    "options": [
      "A rechargeable battery built into the luminaire itself",
      "A dedicated diesel generator for each individual luminaire",
      "Emergency luminaires never require any backup power source",
      "Solar panels are the only permitted power source"
    ],
    "correct": "A rechargeable battery built into the luminaire itself",
    "explanation": "Self-contained emergency luminaires typically include their own rechargeable battery, allowing them to operate independently if the mains supply fails.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "Why should emergency lighting be positioned at changes of direction along an escape route?",
    "options": [
      "To help people clearly see where the route turns, reducing the risk of confusion or becoming lost",
      "Changes of direction never require additional illumination",
      "Positioning at direction changes is purely for aesthetic reasons",
      "Emergency lighting should only be positioned at the final exit"
    ],
    "correct": "To help people clearly see where the route turns, reducing the risk of confusion or becoming lost",
    "explanation": "Illuminating changes of direction helps people follow the escape route correctly, reducing confusion or hesitation during an evacuation.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is the significance of a green background with white pictogram on a fire safety sign?",
    "options": [
      "It typically indicates safe condition information, such as the location of an escape route or exit",
      "It always indicates a prohibition, such as no smoking",
      "Green signage is used exclusively for mandatory PPE requirements",
      "It has no standardised meaning across different sites"
    ],
    "correct": "It typically indicates safe condition information, such as the location of an escape route or exit",
    "explanation": "Under standard safety sign conventions, green with a white pictogram denotes safe condition information, such as exit routes or first aid points.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "Why is it important to record the results of emergency lighting tests in a logbook?",
    "options": [
      "It provides evidence that the system has been tested and maintained in line with the required schedule",
      "Test results have no ongoing relevance once recorded",
      "Logbooks are only required for fire alarm systems, not emergency lighting",
      "Recording results is purely an optional administrative task"
    ],
    "correct": "It provides evidence that the system has been tested and maintained in line with the required schedule",
    "explanation": "A logbook provides a documented history of testing and maintenance, demonstrating compliance and helping track the ongoing condition of the system.",
    "topic": "Emergency Lighting and Signage"
  },
  {
    "text": "What is the purpose of a main switch within a consumer unit?",
    "options": [
      "To allow the entire installation to be isolated from the incoming supply in one action",
      "To control an individual lighting circuit only",
      "The main switch only isolates the socket circuits",
      "It provides overload protection for a single appliance"
    ],
    "correct": "To allow the entire installation to be isolated from the incoming supply in one action",
    "explanation": "The main switch provides a single point of isolation for the whole installation, allowing it to be safely disconnected from the supply when needed.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why are modern domestic consumer units generally required to have a non-combustible enclosure?",
    "options": [
      "To help contain and limit the spread of fire in the rare event of an internal fault causing ignition",
      "Non-combustible enclosures are purely a cosmetic preference",
      "It has no relevance to the fire safety of the installation",
      "Combustible enclosures always provide better protection"
    ],
    "correct": "To help contain and limit the spread of fire in the rare event of an internal fault causing ignition",
    "explanation": "Requiring non-combustible consumer unit enclosures in dwellings helps reduce the risk of a fault inside the unit leading to a wider fire in the property.",
    "topic": "Consumer Units"
  },
  {
    "text": "What is a good reason for splitting circuits across multiple RCDs within a consumer unit (dual RCD arrangement)?",
    "options": [
      "It reduces the impact of nuisance tripping, since not all circuits are lost if one RCD trips",
      "It has no practical benefit over a single RCD covering everything",
      "Dual RCD boards are purely a cost-saving measure for manufacturers",
      "Splitting circuits always increases the risk of electric shock"
    ],
    "correct": "It reduces the impact of nuisance tripping, since not all circuits are lost if one RCD trips",
    "explanation": "By splitting circuits across two RCDs, a fault or nuisance trip on one group does not affect the circuits protected by the other RCD, improving convenience without compromising safety.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why is it good practice to clearly label each way (circuit) in a consumer unit?",
    "options": [
      "It allows circuits to be quickly and correctly identified for isolation, maintenance, or fault-finding",
      "Labelling is purely a cosmetic requirement with no safety benefit",
      "Only the main switch needs to be labelled",
      "Circuit labelling is optional and rarely useful in practice"
    ],
    "correct": "It allows circuits to be quickly and correctly identified for isolation, maintenance, or fault-finding",
    "explanation": "Clear labelling helps anyone working on the installation correctly identify and isolate the intended circuit, reducing the risk of working on the wrong one.",
    "topic": "Consumer Units"
  },
  {
    "text": "What is the purpose of a spare way (unused ways) in a consumer unit being properly blanked off?",
    "options": [
      "To prevent accidental contact with live busbar parts through the unused opening",
      "Spare ways are purely decorative and have no safety significance",
      "Blanking is only required for aesthetic reasons",
      "Unused ways never present any risk if left open"
    ],
    "correct": "To prevent accidental contact with live busbar parts through the unused opening",
    "explanation": "Blanking off unused ways prevents accidental contact with live parts inside the consumer unit, maintaining the intended level of protection.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why might an electrician recommend upgrading an older consumer unit during a periodic inspection?",
    "options": [
      "Older units may lack modern protective features, such as RCD protection, or use outdated, less safe components",
      "Consumer units never need upgrading once installed correctly",
      "Upgrading is purely a matter of appearance, not safety",
      "Older consumer units always perform identically to modern ones"
    ],
    "correct": "Older units may lack modern protective features, such as RCD protection, or use outdated, less safe components",
    "explanation": "Older consumer units may not include modern protective devices or may use components no longer considered best practice, so an upgrade can improve overall safety.",
    "topic": "Consumer Units"
  },
  {
    "text": "What information should typically be recorded on the circuit chart fitted to a consumer unit?",
    "options": [
      "A description of what each circuit supplies, so it can be correctly identified in future",
      "The purchase date of the consumer unit only",
      "The installer's personal holiday dates",
      "The colour of the consumer unit casing"
    ],
    "correct": "A description of what each circuit supplies, so it can be correctly identified in future",
    "explanation": "A circuit chart provides a simple reference so that anyone using or working on the installation can identify what each protective device controls.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why is correct torque important when tightening terminal connections within a consumer unit?",
    "options": [
      "Under-tightened connections can overheat, while over-tightened connections can damage the terminal or conductor",
      "Torque has no bearing on the safety or reliability of the connection",
      "All terminals should always be tightened as much as physically possible",
      "Torque settings are purely a matter of manufacturer preference with no safety relevance"
    ],
    "correct": "Under-tightened connections can overheat, while over-tightened connections can damage the terminal or conductor",
    "explanation": "Correct torque ensures a secure, low-resistance connection; both under- and over-tightening can create faults, including overheating or physical damage.",
    "topic": "Consumer Units"
  },
  {
    "text": "What is a reason for segregating low-voltage extra-low-voltage wiring, such as doorbell wiring, from mains circuits within or near a consumer unit?",
    "options": [
      "To prevent the extra-low-voltage circuit from being exposed to mains voltage in the event of a fault",
      "Segregation is purely a matter of tidiness",
      "It has no bearing on the safety of either circuit",
      "Only data cabling needs to be segregated from mains wiring"
    ],
    "correct": "To prevent the extra-low-voltage circuit from being exposed to mains voltage in the event of a fault",
    "explanation": "Keeping extra-low-voltage wiring separated from mains circuits helps prevent a fault from placing dangerous mains voltage onto a circuit not designed for it.",
    "topic": "Consumer Units"
  },
  {
    "text": "Why might a consumer unit be located in a position that avoids areas such as under stairs where escape routes could be blocked in a fire?",
    "options": [
      "A fault within the consumer unit could otherwise obstruct a means of escape during an emergency",
      "Location has no bearing on the safety of the installation",
      "Consumer units should always be located in the most visually discreet position available",
      "It is purely a matter of installer convenience"
    ],
    "correct": "A fault within the consumer unit could otherwise obstruct a means of escape during an emergency",
    "explanation": "Positioning a consumer unit away from escape routes reduces the risk that a fault or fire originating there could block a means of escape.",
    "topic": "Consumer Units"
  },
  {
    "text": "What should be checked regarding the main switch rating of a consumer unit in relation to the property's supply?",
    "options": [
      "That the main switch rating is suitable for the maximum demand and fault current expected from the supply",
      "The main switch rating is irrelevant as long as the unit fits in the available space",
      "All consumer units use an identical main switch rating regardless of the property",
      "Main switch rating only matters for three-phase installations"
    ],
    "correct": "That the main switch rating is suitable for the maximum demand and fault current expected from the supply",
    "explanation": "The main switch must be correctly rated for the installation's demand and the fault levels it may need to withstand, to ensure safe and reliable operation.",
    "topic": "Consumer Units"
  },
  {
    "text": "What is Ohm's Law used to calculate?",
    "options": [
      "The relationship between voltage, current, and resistance in a circuit",
      "The total power consumed by a lighting circuit only",
      "The frequency of an AC supply",
      "The physical length of a cable required"
    ],
    "correct": "The relationship between voltage, current, and resistance in a circuit",
    "explanation": "Ohm's Law (V = I x R) describes the relationship between voltage, current, and resistance, and is fundamental to understanding electrical circuits.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What unit is used to measure electrical power?",
    "options": [
      "Watt",
      "Ohm",
      "Coulomb",
      "Hertz"
    ],
    "correct": "Watt",
    "explanation": "Electrical power, the rate at which electrical energy is transferred or converted, is measured in watts, symbol W.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does the term 'power factor' describe in an AC circuit?",
    "options": [
      "The ratio of real power used to do useful work compared with the apparent power supplied to the circuit",
      "The total voltage drop across a cable",
      "The physical size of a load connected to a circuit",
      "The colour coding used for phase conductors"
    ],
    "correct": "The ratio of real power used to do useful work compared with the apparent power supplied to the circuit",
    "explanation": "Power factor indicates how effectively electrical power is being converted into useful work, with a lower power factor indicating more reactive power in the system.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the difference between series and parallel circuits in terms of current flow?",
    "options": [
      "In a series circuit the same current flows through each component, while in a parallel circuit current can divide between branches",
      "Series and parallel circuits always carry identical current through every component",
      "Parallel circuits never allow current to divide between branches",
      "There is no practical difference between series and parallel circuits"
    ],
    "correct": "In a series circuit the same current flows through each component, while in a parallel circuit current can divide between branches",
    "explanation": "In series circuits, components share the same current path, whereas in parallel circuits, current divides among the available branches according to their resistance.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the effect of connecting resistors in parallel, compared with connecting the same resistors in series?",
    "options": [
      "The overall (total) resistance of a parallel combination is lower than that of any single resistor in the group",
      "Parallel connection always increases the total resistance",
      "Series and parallel connections always produce identical total resistance",
      "Parallel connection has no effect on total circuit resistance"
    ],
    "correct": "The overall (total) resistance of a parallel combination is lower than that of any single resistor in the group",
    "explanation": "Adding resistors in parallel provides additional paths for current to flow, which reduces the overall resistance of the combination below that of any individual resistor.",
    "topic": "Electrical Theory"
  },
  {
    "text": "Why does a capacitor block direct current (DC) once fully charged, while allowing alternating current (AC) to appear to pass?",
    "options": [
      "A capacitor stores charge and stops conducting once charged, but continuously charges and discharges in response to changing AC voltage",
      "Capacitors always allow DC to pass freely without limitation",
      "Capacitors have no effect on either AC or DC circuits",
      "Capacitors permanently block both AC and DC current"
    ],
    "correct": "A capacitor stores charge and stops conducting once charged, but continuously charges and discharges in response to changing AC voltage",
    "explanation": "A capacitor charges up and then blocks further DC current flow, but because AC voltage constantly changes direction, the capacitor continuously charges and discharges, effectively allowing AC to pass.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the purpose of a transformer in an electrical system?",
    "options": [
      "To change the voltage level of an AC supply, either stepping it up or down",
      "To convert AC supply directly into DC",
      "To store electrical energy for later use",
      "To measure the resistance of a circuit"
    ],
    "correct": "To change the voltage level of an AC supply, either stepping it up or down",
    "explanation": "Transformers use electromagnetic induction to step voltage up or down, which is fundamental to efficient electricity transmission and distribution.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'true power' (measured in watts) represent, compared with 'apparent power' (measured in volt-amperes)?",
    "options": [
      "True power is the actual power doing useful work, while apparent power is the total power supplied, including reactive components",
      "True power and apparent power are always numerically identical",
      "Apparent power only applies to DC circuits",
      "True power is always greater than apparent power"
    ],
    "correct": "True power is the actual power doing useful work, while apparent power is the total power supplied, including reactive components",
    "explanation": "In circuits with a power factor less than one, apparent power exceeds true power, as some of the supplied power is reactive and does no useful work.",
    "topic": "Electrical Theory"
  },
  {
    "text": "Why is understanding the difference between AC and DC important in electrical work?",
    "options": [
      "Different characteristics, such as how the current behaves and how it is generated and used, affect equipment selection and safety considerations",
      "AC and DC behave identically in all circuits and applications",
      "DC is never used in modern electrical systems",
      "The difference between AC and DC has no practical relevance to installation work"
    ],
    "correct": "Different characteristics, such as how the current behaves and how it is generated and used, affect equipment selection and safety considerations",
    "explanation": "AC and DC have distinct characteristics affecting how they are generated, transmitted, and used, which influences equipment design, protection, and safe working practices.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is meant by the 'frequency' of an AC supply, such as the UK's standard 50Hz?",
    "options": [
      "The number of complete cycles of the alternating waveform occurring each second",
      "The maximum voltage reached during each cycle",
      "The total resistance of the supply network",
      "The number of conductors used in the supply cable"
    ],
    "correct": "The number of complete cycles of the alternating waveform occurring each second",
    "explanation": "Frequency describes how many times the AC waveform completes a full cycle each second, measured in hertz (Hz); the UK standard supply frequency is 50Hz.",
    "topic": "Electrical Theory"
  },
  {
    "text": "Why is it useful to understand the concept of 'voltage drop' when designing a cable run for a long circuit?",
    "options": [
      "Excessive voltage drop can result in equipment receiving a lower voltage than intended, affecting its performance",
      "Voltage drop has no practical effect on connected equipment",
      "Voltage drop only matters for circuits shorter than one metre",
      "Voltage drop is purely a theoretical concept with no design relevance"
    ],
    "correct": "Excessive voltage drop can result in equipment receiving a lower voltage than intended, affecting its performance",
    "explanation": "Voltage drop over a long cable run can reduce the voltage available at the load below an acceptable level, so cable size must be selected to keep this within acceptable limits.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the correct disposal method for used fluorescent tubes on a construction site?",
    "options": [
      "Put them in the general waste skip",
      "Dispose of them as hazardous waste due to the mercury content",
      "Break them and recycle the glass only",
      "Burn them on site"
    ],
    "correct": "Dispose of them as hazardous waste due to the mercury content",
    "explanation": "Fluorescent tubes contain small amounts of mercury and must be handled and disposed of as hazardous waste, not general skip waste.",
    "topic": "Environmental"
  },
  {
    "text": "Under COSHH, what does an assessment need to identify before work with a hazardous substance begins?",
    "options": [
      "Only the cost of the substance",
      "The risks to health and the control measures needed to prevent or reduce exposure",
      "The supplier's contact details",
      "The colour of the container"
    ],
    "correct": "The risks to health and the control measures needed to prevent or reduce exposure",
    "explanation": "A COSHH assessment must identify the hazards, who could be harmed, and the precautions needed before work with a hazardous substance starts.",
    "topic": "Health & Hygiene"
  },
  {
    "text": "What is the main purpose of a permit-to-work system?",
    "options": [
      "To speed up the job by skipping paperwork",
      "To formally control high-risk work by ensuring precautions are in place before it starts",
      "To record staff holiday requests",
      "To log delivery times only"
    ],
    "correct": "To formally control high-risk work by ensuring precautions are in place before it starts",
    "explanation": "A permit-to-work is a formal system ensuring that specified precautions have been taken before high-risk work, such as hot work or confined space entry, is allowed to proceed.",
    "topic": "Site Safety"
  },
  {
    "text": "What should you do if you discover a suspected asbestos-containing material while working?",
    "options": [
      "Continue working carefully around it",
      "Stop work in the area immediately and report it without disturbing the material",
      "Remove it yourself if you have gloves",
      "Sweep the area to clear dust"
    ],
    "correct": "Stop work in the area immediately and report it without disturbing the material",
    "explanation": "Suspected asbestos-containing materials must not be disturbed. Work should stop and the find reported so a competent person can assess it.",
    "topic": "Special Site Hazards"
  },
  {
    "text": "What is the purpose of a Local Exhaust Ventilation (LEV) system?",
    "options": [
      "To heat the workplace",
      "To capture and remove hazardous dust, fumes or vapours at source before they are breathed in",
      "To provide background music extraction",
      "To cool electrical panels only"
    ],
    "correct": "To capture and remove hazardous dust, fumes or vapours at source before they are breathed in",
    "explanation": "LEV systems capture airborne contaminants close to where they are generated, reducing the amount a worker breathes in.",
    "topic": "Health & Hygiene"
  },
  {
    "text": "What does the abbreviation HAVS stand for in relation to using vibrating tools?",
    "options": [
      "Hand-Arm Vibration Syndrome",
      "Heavy Assembly Vibration Standard",
      "High Amplitude Voltage Safety",
      "Hazardous Air Ventilation System"
    ],
    "correct": "Hand-Arm Vibration Syndrome",
    "explanation": "HAVS is a condition caused by regular use of vibrating tools that can damage nerves, blood vessels and joints in the hands and arms.",
    "topic": "Health & Hygiene"
  },
  {
    "text": "What is the recommended action if noise on site regularly exceeds safe levels?",
    "options": [
      "Ignore it if only for short periods",
      "Provide suitable hearing protection and control noise at source where practicable",
      "Ask workers to shout instead of using tools",
      "Only warn new starters"
    ],
    "correct": "Provide suitable hearing protection and control noise at source where practicable",
    "explanation": "Where noise cannot be adequately reduced at source, suitable hearing protection must be provided and its use enforced in hearing protection zones.",
    "topic": "Health & Hygiene"
  },
  {
    "text": "In the hierarchy of risk control, which measure is generally considered most effective?",
    "options": [
      "Personal protective equipment",
      "Eliminating the hazard completely",
      "Administrative controls such as signage",
      "Substitution with a less hazardous alternative"
    ],
    "correct": "Eliminating the hazard completely",
    "explanation": "The hierarchy of control places elimination of the hazard at the top, since a hazard that no longer exists cannot cause harm; PPE is the last resort.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What is a 'near miss' in a health and safety context?",
    "options": [
      "An accident that results in a minor injury",
      "An unplanned event that did not result in injury or damage but had the potential to",
      "A planned inspection of the site",
      "A type of fire extinguisher"
    ],
    "correct": "An unplanned event that did not result in injury or damage but had the potential to",
    "explanation": "A near miss is an incident that could have caused harm or damage but did not on that occasion; reporting them helps prevent future accidents.",
    "topic": "General Health and Safety"
  },
  {
    "text": "Who has the primary legal duty to ensure a safe system of work is in place under UK law?",
    "options": [
      "Only the individual worker",
      "The employer",
      "The client's insurance company",
      "The local council"
    ],
    "correct": "The employer",
    "explanation": "Under the Health and Safety at Work etc. Act 1974, employers have the primary duty to ensure, so far as reasonably practicable, the health, safety and welfare of employees.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What should be done with a faulty piece of work equipment found on site?",
    "options": [
      "Use it carefully until the end of the shift",
      "Take it out of use, label it as faulty, and report it",
      "Lend it to another trade",
      "Store it with the working tools"
    ],
    "correct": "Take it out of use, label it as faulty, and report it",
    "explanation": "Faulty equipment should be immediately taken out of use and clearly labelled so nobody else uses it, then reported for repair or replacement.",
    "topic": "Work Equipment"
  },
  {
    "text": "What is the purpose of guarding on a bench grinder or similar rotating equipment?",
    "options": [
      "To make the machine look safer only",
      "To prevent contact with moving parts and contain debris such as sparks or fragments",
      "To increase the noise level as a warning",
      "To slow the machine down"
    ],
    "correct": "To prevent contact with moving parts and contain debris such as sparks or fragments",
    "explanation": "Machine guards are designed to prevent operators from making contact with dangerous moving parts and to contain flying debris.",
    "topic": "Work Equipment"
  },
  {
    "text": "Before using a power tool, what should you check as part of a pre-use inspection?",
    "options": [
      "Only that the tool is the correct colour",
      "The cable, plug, casing and guard for visible damage",
      "The manufacturer's stock price",
      "Whether other trades are also using tools"
    ],
    "correct": "The cable, plug, casing and guard for visible damage",
    "explanation": "A quick visual check of the cable, plug, casing and any guards for damage helps catch faults before they lead to an accident.",
    "topic": "Work Equipment"
  },
  {
    "text": "What is the safe working load (SWL) of lifting equipment?",
    "options": [
      "The maximum load it can lift under specified conditions without failure",
      "The weight of the equipment itself",
      "The average load lifted over a year",
      "A recommended minimum load only"
    ],
    "correct": "The maximum load it can lift under specified conditions without failure",
    "explanation": "The safe working load is the maximum load that a piece of lifting equipment is designed and rated to lift safely under the stated conditions.",
    "topic": "Work Equipment"
  },
  {
    "text": "What is the main hazard of using a cartridge-operated fixing tool (nail gun) incorrectly?",
    "options": [
      "It only causes minor bruising",
      "It can cause serious injury from projectiles or misfires",
      "It only damages the material being fixed",
      "It has no significant hazards if used indoors"
    ],
    "correct": "It can cause serious injury from projectiles or misfires",
    "explanation": "Cartridge tools fire fixings at high velocity and, if misused, can cause serious or fatal injury through ricochet, over-penetration or misfire.",
    "topic": "Work Equipment"
  },
  {
    "text": "What is the purpose of an exclusion zone around lifting operations?",
    "options": [
      "To decorate the site",
      "To keep unauthorised people away from the area where a load is being lifted or moved",
      "To mark out smoking areas",
      "To indicate parking spaces"
    ],
    "correct": "To keep unauthorised people away from the area where a load is being lifted or moved",
    "explanation": "An exclusion zone protects people from the risk of being struck by a suspended or moving load during a lifting operation.",
    "topic": "Work Equipment"
  },
  {
    "text": "When manually handling a load, what is generally the safest way to lift?",
    "options": [
      "Bend from the waist keeping legs straight",
      "Keep the back straight, bend the knees, and keep the load close to the body",
      "Twist the body while lifting to save time",
      "Lift as quickly as possible"
    ],
    "correct": "Keep the back straight, bend the knees, and keep the load close to the body",
    "explanation": "Good lifting technique keeps the natural curve of the spine, uses the leg muscles, and keeps the load close to the body's centre of gravity to reduce strain.",
    "topic": "Manual Handling"
  },
  {
    "text": "What does the 'T' in the TILE manual handling risk assessment tool stand for?",
    "options": [
      "Time",
      "Task",
      "Training only",
      "Tools"
    ],
    "correct": "Task",
    "explanation": "TILE stands for Task, Individual, Load, Environment — the four factors considered when assessing a manual handling risk.",
    "topic": "Manual Handling"
  },
  {
    "text": "Why should a heavy or awkward load be assessed before lifting, even if it looks manageable?",
    "options": [
      "To delay the job unnecessarily",
      "Because the shape, weight distribution or grip points can make it more hazardous than it first appears",
      "Because all loads must be weighed before touching them",
      "It is not necessary if the worker is experienced"
    ],
    "correct": "Because the shape, weight distribution or grip points can make it more hazardous than it first appears",
    "explanation": "An awkward shape, an off-centre weight, or poor grip points can make a load far riskier to handle than its weight alone would suggest.",
    "topic": "Manual Handling"
  },
  {
    "text": "What mechanical aid can reduce the manual handling risk of moving heavy materials around a site?",
    "options": [
      "A sack truck or trolley",
      "A larger toolbox",
      "A high-visibility vest",
      "A second pair of gloves"
    ],
    "correct": "A sack truck or trolley",
    "explanation": "Mechanical aids such as sack trucks, trolleys or pallet trucks reduce the physical load on the person handling materials, lowering injury risk.",
    "topic": "Manual Handling"
  },
  {
    "text": "What class of fire involves flammable gases such as propane or butane?",
    "options": [
      "Class A",
      "Class B",
      "Class C",
      "Class D"
    ],
    "correct": "Class C",
    "explanation": "Class C fires involve flammable gases, such as propane, butane or natural gas.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What class of fire involves burning metals such as magnesium or lithium?",
    "options": [
      "Class A",
      "Class B",
      "Class D",
      "Class F"
    ],
    "correct": "Class D",
    "explanation": "Class D fires involve combustible metals such as magnesium, lithium or aluminium swarf, and need specialist extinguishing media.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What is the main purpose of a fire evacuation drill?",
    "options": [
      "To disrupt the working day",
      "To practise and test that everyone knows how to evacuate safely and quickly",
      "To check the fire alarm volume only",
      "To identify who is late for work"
    ],
    "correct": "To practise and test that everyone knows how to evacuate safely and quickly",
    "explanation": "Fire drills test that evacuation routes, procedures and assembly points work in practice and that people know what to do in a real emergency.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "Why should fire exit routes never be obstructed with materials or equipment?",
    "options": [
      "It only affects the appearance of the site",
      "Obstructions could block or slow evacuation in an emergency, increasing risk to life",
      "It has no real safety impact",
      "Obstruction is only a problem at night"
    ],
    "correct": "Obstructions could block or slow evacuation in an emergency, increasing risk to life",
    "explanation": "Blocked escape routes can trap people or significantly slow evacuation during a fire, putting lives at serious risk.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What should you do first if you discover a fire on site?",
    "options": [
      "Try to fight it regardless of size",
      "Raise the alarm and evacuate, only tackling a small fire yourself if it is safe and you are trained to do so",
      "Take photos for the incident report",
      "Continue working until told to stop"
    ],
    "correct": "Raise the alarm and evacuate, only tackling a small fire yourself if it is safe and you are trained to do so",
    "explanation": "Raising the alarm and evacuating is the priority; only attempt to fight a small fire if it is safe to do so, you're trained, and you have a suitable extinguisher to hand.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What is the main purpose of a fire compartment in a building?",
    "options": [
      "To decorate the interior",
      "To contain fire and smoke within a defined area to slow its spread",
      "To improve acoustic insulation only",
      "To provide storage space"
    ],
    "correct": "To contain fire and smoke within a defined area to slow its spread",
    "explanation": "Fire compartmentation uses fire-resisting walls, floors and doors to contain a fire within one area for a period, slowing spread and aiding evacuation.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What should you check on a fire extinguisher before relying on it in an emergency?",
    "options": [
      "Only its colour",
      "That it is in date, undamaged, and the pressure gauge (where fitted) shows it is charged",
      "Its purchase price",
      "The manufacturer's logo"
    ],
    "correct": "That it is in date, undamaged, and the pressure gauge (where fitted) shows it is charged",
    "explanation": "A fire extinguisher should be visually checked for damage, an in-date service tag, and a charged pressure gauge to be confident it will work if needed.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What is the main hazard of working at height without adequate edge protection?",
    "options": [
      "Increased noise exposure",
      "Risk of falling from height, which can cause serious or fatal injury",
      "Risk of electric shock only",
      "Increased dust exposure"
    ],
    "correct": "Risk of falling from height, which can cause serious or fatal injury",
    "explanation": "Falls from height remain one of the most common causes of serious and fatal injury in construction, which is why edge protection is essential.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the purpose of a guard rail system on a scaffold platform?",
    "options": [
      "To provide a place to hang tools",
      "To prevent people and materials from falling off the edge of the platform",
      "To support the scaffold's weight",
      "To mark the scaffold company's branding"
    ],
    "correct": "To prevent people and materials from falling off the edge of the platform",
    "explanation": "Guard rails, along with toe boards, form the primary collective fall protection on a scaffold platform, preventing falls of people and materials.",
    "topic": "Work at Height"
  },
  {
    "text": "Before using a ladder, what should you check?",
    "options": [
      "Only that it is the right colour",
      "That it is in good condition, correctly angled, and secured or footed appropriately",
      "That it was made in the current year",
      "That it has a warranty sticker"
    ],
    "correct": "That it is in good condition, correctly angled, and secured or footed appropriately",
    "explanation": "A pre-use ladder check should cover its condition, correct 1-in-4 angle of use, and that it is properly secured, footed or otherwise stabilised.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the recommended angle for setting up a leaning ladder?",
    "options": [
      "1 unit out for every 4 units up",
      "1 unit out for every 10 units up",
      "Vertical, with no outward lean",
      "45 degrees exactly regardless of height"
    ],
    "correct": "1 unit out for every 4 units up",
    "explanation": "The standard safe ladder angle is 75 degrees, achieved by setting the base out 1 unit for every 4 units of working height (the 1-in-4 rule).",
    "topic": "Work at Height"
  },
  {
    "text": "What is a roof edge protection system primarily designed to prevent?",
    "options": [
      "Heat loss from the building",
      "People or materials falling from the roof edge",
      "Water ingress",
      "Noise transmission"
    ],
    "correct": "People or materials falling from the roof edge",
    "explanation": "Edge protection systems, such as guard rails, are installed at roof edges to prevent falls of people and materials during work at height.",
    "topic": "Work at Height"
  },
  {
    "text": "What should be considered before using a mobile scaffold tower?",
    "options": [
      "Only its colour scheme",
      "That it is on firm, level ground, correctly assembled, and the wheels are locked before use",
      "That it has been painted recently",
      "Whether it matches the site's branding"
    ],
    "correct": "That it is on firm, level ground, correctly assembled, and the wheels are locked before use",
    "explanation": "Mobile towers must stand on firm, level ground, be assembled per the manufacturer's instructions, and have their wheels locked before anyone climbs on.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the primary purpose of the Electricity at Work Regulations 1989?",
    "options": [
      "To set electricity prices",
      "To prevent death or injury from electrical hazards at work through safe systems of work",
      "To regulate the sale of electrical appliances",
      "To license electricians only"
    ],
    "correct": "To prevent death or injury from electrical hazards at work through safe systems of work",
    "explanation": "The Electricity at Work Regulations 1989 place duties on employers and employees to prevent danger from electrical systems used at work.",
    "topic": "Legislation"
  },
  {
    "text": "What must an employer do under the Personal Protective Equipment at Work Regulations?",
    "options": [
      "Charge employees for PPE",
      "Provide suitable PPE free of charge where risks cannot be adequately controlled by other means",
      "Only provide PPE to new starters",
      "Allow workers to bring their own PPE only"
    ],
    "correct": "Provide suitable PPE free of charge where risks cannot be adequately controlled by other means",
    "explanation": "Employers must provide suitable PPE at no cost to employees when risks to health and safety cannot be adequately controlled by other means.",
    "topic": "Legislation"
  },
  {
    "text": "Under RIDDOR, what type of incident must generally be reported to the enforcing authority?",
    "options": [
      "Every minor cut or graze",
      "Certain specified injuries, dangerous occurrences and work-related deaths",
      "Only incidents involving visitors",
      "Only incidents that damage equipment"
    ],
    "correct": "Certain specified injuries, dangerous occurrences and work-related deaths",
    "explanation": "RIDDOR requires the reporting of specified categories of injury, occupational disease, dangerous occurrences and deaths arising from work activities.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of the Work at Height Regulations 2005?",
    "options": [
      "To ban all work above ground level",
      "To ensure work at height is properly planned, supervised and carried out safely",
      "To set ladder manufacturing standards only",
      "To regulate scaffolding company pricing"
    ],
    "correct": "To ensure work at height is properly planned, supervised and carried out safely",
    "explanation": "The Work at Height Regulations require that work at height is properly planned, appropriately supervised, and carried out in a way that is, so far as reasonably practicable, safe.",
    "topic": "Legislation"
  },
  {
    "text": "What is the primary purpose of a first aid kit on a construction site?",
    "options": [
      "To treat serious injuries fully on site without further help",
      "To provide immediate, basic treatment for minor injuries until further help arrives if needed",
      "To store PPE",
      "To replace the need for a trained first aider"
    ],
    "correct": "To provide immediate, basic treatment for minor injuries until further help arrives if needed",
    "explanation": "A first aid kit provides supplies for immediate, basic treatment of minor injuries, and to support a casualty until professional medical help arrives if the injury is more serious.",
    "topic": "First Aid"
  },
  {
    "text": "Why is it important to know the location of the nearest first aider or first aid point when starting work on a new site?",
    "options": [
      "It is not important",
      "So help can be found quickly in the event of an injury or medical emergency",
      "To know who to ask about pay",
      "To find out where deliveries are accepted"
    ],
    "correct": "So help can be found quickly in the event of an injury or medical emergency",
    "explanation": "Knowing where the nearest first aider and first aid equipment are located means help can be summoned quickly if an accident occurs.",
    "topic": "First Aid"
  },
  {
    "text": "What is the correct first step if you find someone who appears to be unconscious and not breathing normally?",
    "options": [
      "Move them immediately regardless of injuries",
      "Check for danger, then call for help and begin CPR if trained, following your workplace emergency procedure",
      "Give them water",
      "Wait for them to wake up on their own"
    ],
    "correct": "Check for danger, then call for help and begin CPR if trained, following your workplace emergency procedure",
    "explanation": "The priority is to check the scene is safe, call for emergency help, and begin CPR if trained and the casualty is not breathing normally.",
    "topic": "First Aid"
  },
  {
    "text": "What should you do if a colleague suffers a minor cut on site?",
    "options": [
      "Ignore it if they say it's fine",
      "Encourage them to clean and dress the wound, or seek first aid support, and record it in the accident book",
      "Tell them to keep working regardless",
      "Send them home immediately without treatment"
    ],
    "correct": "Encourage them to clean and dress the wound, or seek first aid support, and record it in the accident book",
    "explanation": "Even minor injuries should be properly treated and recorded, since infection risk exists and records help identify patterns of incidents.",
    "topic": "First Aid"
  },
  {
    "text": "What is the purpose of recording accidents in an accident book?",
    "options": [
      "To assign blame to individuals",
      "To create a record that helps identify trends and prevent future incidents",
      "To satisfy a filing requirement with no other benefit",
      "To track staff attendance"
    ],
    "correct": "To create a record that helps identify trends and prevent future incidents",
    "explanation": "Accurate accident records help identify recurring hazards or trends, supporting action to prevent similar incidents in future.",
    "topic": "Reporting Accidents"
  },
  {
    "text": "Who should typically be informed as soon as possible after a workplace accident occurs?",
    "options": [
      "No one, unless asked",
      "The supervisor or site manager, so it can be recorded and investigated appropriately",
      "Only the person's family",
      "The client's marketing team"
    ],
    "correct": "The supervisor or site manager, so it can be recorded and investigated appropriately",
    "explanation": "Prompt reporting to a supervisor or manager ensures the incident is recorded, investigated, and any necessary action taken quickly.",
    "topic": "Reporting Accidents"
  },
  {
    "text": "Why might a workplace accident be investigated even if the injury was minor?",
    "options": [
      "To find someone to blame",
      "To identify the underlying cause and prevent a more serious repeat incident",
      "Investigations are only required for fatalities",
      "It is not necessary to investigate minor accidents"
    ],
    "correct": "To identify the underlying cause and prevent a more serious repeat incident",
    "explanation": "Investigating even minor incidents can reveal underlying causes that, left unaddressed, could lead to a more serious accident later.",
    "topic": "Reporting Accidents"
  },
  {
    "text": "What is the main purpose of safety signage on a construction site?",
    "options": [
      "To decorate the hoarding",
      "To warn of hazards, give instructions, or indicate mandatory actions and safe conditions",
      "To advertise the contractor's services",
      "To indicate parking availability only"
    ],
    "correct": "To warn of hazards, give instructions, or indicate mandatory actions and safe conditions",
    "explanation": "Safety signs communicate warnings, prohibitions, mandatory requirements and safe condition information using standardised colours and symbols.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What shape and colour is typically used for a mandatory safety sign, such as 'Hard hats must be worn'?",
    "options": [
      "Red triangle",
      "Blue circle with white symbol",
      "Green square",
      "Yellow diamond"
    ],
    "correct": "Blue circle with white symbol",
    "explanation": "Mandatory signs are blue circles with a white symbol or text, indicating an action that must be taken, such as wearing specific PPE.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What does a yellow triangular sign with a black border typically indicate?",
    "options": [
      "A mandatory instruction",
      "A warning of a hazard",
      "A safe condition, such as a first aid point",
      "A prohibition"
    ],
    "correct": "A warning of a hazard",
    "explanation": "Yellow triangular signs with a black border and symbol are warning signs, alerting people to a specific hazard such as a slip risk or overhead danger.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What does a red circular sign with a diagonal line typically indicate?",
    "options": [
      "An instruction that must be followed",
      "A prohibition — an action that must not be done",
      "A safe route",
      "Information only"
    ],
    "correct": "A prohibition — an action that must not be done",
    "explanation": "Red circular signs with a diagonal bar indicate a prohibition, showing an action that is forbidden, such as 'No smoking'.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What is the purpose of a green sign showing a running figure toward a door?",
    "options": [
      "A prohibition sign",
      "A safe condition sign indicating a fire exit or escape route",
      "A mandatory PPE sign",
      "A hazard warning"
    ],
    "correct": "A safe condition sign indicating a fire exit or escape route",
    "explanation": "Green signs indicate safe conditions, such as the direction of a fire exit, first aid point or emergency escape route.",
    "topic": "General Health and Safety"
  },
  {
    "text": "Why is good housekeeping important on a construction site?",
    "options": [
      "It only affects appearance for site visits",
      "It reduces trip hazards, fire risk, and helps keep the workplace organised and safe",
      "It is only relevant in offices",
      "It has no impact on safety"
    ],
    "correct": "It reduces trip hazards, fire risk, and helps keep the workplace organised and safe",
    "explanation": "Keeping walkways clear, materials stacked safely and waste removed reduces the risk of trips, fires and other accidents.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What should you do before starting work in an area you have not worked in before?",
    "options": [
      "Start immediately to save time",
      "Check for a site induction, task briefing or risk assessment relevant to that area",
      "Ask a colleague for a rough idea only",
      "Assume the same rules apply everywhere"
    ],
    "correct": "Check for a site induction, task briefing or risk assessment relevant to that area",
    "explanation": "Different areas of a site can have different hazards, so checking induction information or a task-specific briefing helps ensure you're aware of local risks.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What is the purpose of a Method Statement?",
    "options": [
      "To record staff wages",
      "To describe how a task will be carried out safely, step by step",
      "To list the tools available in the store",
      "To advertise the job to new workers"
    ],
    "correct": "To describe how a task will be carried out safely, step by step",
    "explanation": "A method statement sets out the safe sequence of work for a task, including the precautions and controls identified in the risk assessment.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What is the relationship between a risk assessment and a method statement?",
    "options": [
      "They are unrelated documents",
      "The method statement should reflect the controls identified in the risk assessment for that task",
      "The method statement replaces the need for a risk assessment",
      "Only one of the two is ever required, never both"
    ],
    "correct": "The method statement should reflect the controls identified in the risk assessment for that task",
    "explanation": "A method statement translates the risk assessment's findings into a practical, step-by-step safe sequence of work.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What should you do if you are asked to carry out a task you have not been trained for?",
    "options": [
      "Attempt it anyway to avoid delay",
      "Raise it with your supervisor before starting, since working outside your competence is unsafe",
      "Ask a colleague to do it in secret",
      "Guess how it should be done"
    ],
    "correct": "Raise it with your supervisor before starting, since working outside your competence is unsafe",
    "explanation": "Working beyond your training or competence increases risk to yourself and others; concerns should be raised with a supervisor before starting.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What is meant by a 'competent person' in a health and safety context?",
    "options": [
      "Anyone who has worked on site for over a year",
      "Someone with the necessary skills, knowledge, training and experience to carry out a task safely",
      "Only a qualified engineer",
      "A person appointed purely for administrative purposes"
    ],
    "correct": "Someone with the necessary skills, knowledge, training and experience to carry out a task safely",
    "explanation": "A competent person has sufficient training, knowledge and experience to properly identify hazards and carry out or oversee a task safely.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What does the term 'safe system of work' mean?",
    "options": [
      "A system used only for electrical work",
      "A formal procedure that identifies hazards and sets out the safe way to carry out a task",
      "A type of alarm system",
      "A system for tracking deliveries"
    ],
    "correct": "A formal procedure that identifies hazards and sets out the safe way to carry out a task",
    "explanation": "A safe system of work is a formal procedure resulting from a systematic examination of a task, designed to identify hazards and specify safe methods to carry it out.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What is the purpose of toe boards fitted to a working platform?",
    "options": [
      "To provide extra seating",
      "To prevent materials and tools from falling from the platform edge onto people below",
      "To increase the platform's height",
      "To improve the platform's appearance"
    ],
    "correct": "To prevent materials and tools from falling from the platform edge onto people below",
    "explanation": "Toe boards form a barrier at floor level on a working platform, stopping tools or materials from rolling or being kicked off the edge.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a scaffold inspection tag used to confirm?",
    "options": [
      "The scaffold company's insurance",
      "That the scaffold has been inspected and is safe to use as of a stated date",
      "The weight of the scaffold structure",
      "The number of workers permitted"
    ],
    "correct": "That the scaffold has been inspected and is safe to use as of a stated date",
    "explanation": "A scaffold tag confirms the date of the last inspection and that the scaffold has been checked and deemed safe to use by a competent person.",
    "topic": "Work at Height"
  },
  {
    "text": "How often must a scaffold used for construction work generally be inspected in the UK?",
    "options": [
      "Once a year only",
      "At least every 7 days, and after any event likely to affect its stability",
      "Only when first erected",
      "Every 6 months"
    ],
    "correct": "At least every 7 days, and after any event likely to affect its stability",
    "explanation": "Scaffolds used for construction work must be inspected by a competent person at least every 7 days, and after any event that could affect their safety, such as high winds.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the main purpose of an anchor point used with a fall arrest harness?",
    "options": [
      "To hold tools during work",
      "To provide a secure attachment point that can withstand the force of arresting a fall",
      "To mark the work area",
      "To support scaffold boards"
    ],
    "correct": "To provide a secure attachment point that can withstand the force of arresting a fall",
    "explanation": "An anchor point must be strong enough and correctly positioned to safely arrest a fall if the harness lanyard becomes taut.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the danger of a 'pendulum swing' fall when using a fall arrest lanyard?",
    "options": [
      "It has no real danger",
      "The person can swing sideways into a structure, causing injury even though the fall itself was arrested",
      "It only affects the equipment, not the person",
      "It only happens with very short lanyards"
    ],
    "correct": "The person can swing sideways into a structure, causing injury even though the fall itself was arrested",
    "explanation": "If the anchor point is not directly above the work position, a fall can cause a pendulum swing into nearby structures, causing injury despite the fall being arrested.",
    "topic": "Work at Height"
  },
  {
    "text": "What is a 'fragile roof' in a construction context?",
    "options": [
      "Any roof over 10 years old",
      "A roof surface, such as certain roof lights or corroded sheeting, that cannot safely support a person's weight",
      "A roof that has recently been cleaned",
      "A flat roof of any material"
    ],
    "correct": "A roof surface, such as certain roof lights or corroded sheeting, that cannot safely support a person's weight",
    "explanation": "A fragile roof cannot be relied upon to support a person's weight, so specific precautions such as crawling boards or covers are needed before working near or on it.",
    "topic": "Special Site Hazards"
  },
  {
    "text": "What is a confined space in a health and safety context?",
    "options": [
      "Any small room",
      "A largely enclosed space with a reasonably foreseeable risk of serious injury from hazards such as poor air quality",
      "Any outdoor trench regardless of depth",
      "A space that only lacks natural light"
    ],
    "correct": "A largely enclosed space with a reasonably foreseeable risk of serious injury from hazards such as poor air quality",
    "explanation": "A confined space is defined by both being substantially enclosed and having a specified risk, such as oxygen deficiency, toxic gas or flooding.",
    "topic": "Special Site Hazards"
  },
  {
    "text": "What should always be checked before anyone enters a confined space?",
    "options": [
      "Only that the entrance is wide enough",
      "That the atmosphere has been tested and a safe system of work, including rescue arrangements, is in place",
      "That the space has been painted recently",
      "Nothing extra is needed beyond normal PPE"
    ],
    "correct": "That the atmosphere has been tested and a safe system of work, including rescue arrangements, is in place",
    "explanation": "Confined space entry requires atmosphere testing, a safe system of work, and pre-planned rescue arrangements before anyone goes in.",
    "topic": "Special Site Hazards"
  },
  {
    "text": "What is a common hazard associated with excavation and trench work?",
    "options": [
      "Excessive daylight",
      "Collapse of the sides of the excavation burying or crushing workers",
      "Reduced Wi-Fi signal",
      "Overheating of nearby equipment"
    ],
    "correct": "Collapse of the sides of the excavation burying or crushing workers",
    "explanation": "Unsupported trench and excavation sides can collapse suddenly, which is one of the most serious hazards of groundworks.",
    "topic": "Special Site Hazards"
  },
  {
    "text": "What precaution helps prevent the sides of a deep excavation from collapsing?",
    "options": [
      "Digging faster to finish sooner",
      "Using appropriate shoring, battering or trench boxes as required by the ground conditions",
      "Leaving the excavation open longer to let it settle",
      "Filling the excavation with water"
    ],
    "correct": "Using appropriate shoring, battering or trench boxes as required by the ground conditions",
    "explanation": "Shoring, battering the sides to a safe angle, or using trench boxes are common methods of supporting excavation sides to prevent collapse.",
    "topic": "Special Site Hazards"
  },
  {
    "text": "Why should underground and overhead services be identified before excavation or work at height begins?",
    "options": [
      "It is not necessary if the area looks clear",
      "To avoid striking buried services such as gas, electricity or water, or contacting overhead power lines",
      "Only to satisfy paperwork",
      "Because services are always shown accurately on old drawings"
    ],
    "correct": "To avoid striking buried services such as gas, electricity or water, or contacting overhead power lines",
    "explanation": "Striking buried services or contacting overhead lines can cause explosions, electrocution or serious injury, so services must be identified and planned around in advance.",
    "topic": "Special Site Hazards"
  },
  {
    "text": "What is the purpose of a cable avoidance tool (CAT) and signal generator?",
    "options": [
      "To generate electrical power on site",
      "To help locate buried services before excavation work begins",
      "To test the strength of concrete",
      "To measure noise levels"
    ],
    "correct": "To help locate buried services before excavation work begins",
    "explanation": "A CAT and signal generator are used to trace and mark the likely position of buried cables and some pipework before digging starts, reducing the risk of striking them.",
    "topic": "Special Site Hazards"
  },
  {
    "text": "What does the abbreviation WEEE stand for?",
    "options": [
      "Waste Electrical and Electronic Equipment",
      "Work Environment Energy Efficiency",
      "Water and Electrical Emergency Exit",
      "Worker Exposure and Environmental Evaluation"
    ],
    "correct": "Waste Electrical and Electronic Equipment",
    "explanation": "WEEE refers to waste electrical and electronic equipment, which is subject to specific recycling and disposal regulations.",
    "topic": "Environmental"
  },
  {
    "text": "Why should oils, solvents or other chemicals never be poured down a site drain?",
    "options": [
      "It has no real environmental impact",
      "They can pollute watercourses and groundwater, and drains often lead directly to rivers",
      "It only affects the appearance of the drain",
      "Drains are designed to handle any liquid safely"
    ],
    "correct": "They can pollute watercourses and groundwater, and drains often lead directly to rivers",
    "explanation": "Many site drains connect directly to watercourses, so pouring chemicals down them can cause serious environmental pollution and may be a legal offence.",
    "topic": "Environmental"
  },
  {
    "text": "What is the purpose of segregating waste into different skips on a construction site?",
    "options": [
      "To make the site look tidier for photos only",
      "To support recycling and correct disposal of different waste types, reducing environmental impact",
      "It has no practical benefit",
      "To reduce the number of deliveries"
    ],
    "correct": "To support recycling and correct disposal of different waste types, reducing environmental impact",
    "explanation": "Segregating waste (e.g. wood, metal, general) supports recycling and ensures hazardous or specific waste streams are disposed of correctly and legally.",
    "topic": "Environmental"
  },
  {
    "text": "What should be done if a fuel or oil spill occurs on site?",
    "options": [
      "Wait for it to evaporate naturally",
      "Contain and clean it up promptly using appropriate spill kit materials, and report it",
      "Wash it into the nearest drain",
      "Cover it with soil and leave it"
    ],
    "correct": "Contain and clean it up promptly using appropriate spill kit materials, and report it",
    "explanation": "Spills should be contained quickly with absorbent spill kit materials to prevent environmental contamination, and reported per site procedures.",
    "topic": "Environmental"
  },
  {
    "text": "What is the purpose of dust suppression measures, such as water sprays, on a demolition or cutting task?",
    "options": [
      "To cool the operator down only",
      "To reduce airborne dust that could harm health or affect nearby people and the environment",
      "To make the work area slippery",
      "To reduce the noise of the tool"
    ],
    "correct": "To reduce airborne dust that could harm health or affect nearby people and the environment",
    "explanation": "Dust suppression reduces the amount of airborne dust generated during cutting or demolition, protecting workers' lungs and limiting nuisance to neighbours.",
    "topic": "Environmental"
  },
  {
    "text": "What is respirable crystalline silica (RCS) dust commonly associated with?",
    "options": [
      "Working with timber only",
      "Cutting, drilling or grinding materials such as concrete, brick and stone",
      "Painting activities",
      "Working with plastics only"
    ],
    "correct": "Cutting, drilling or grinding materials such as concrete, brick and stone",
    "explanation": "RCS dust is released when cutting, drilling, grinding or breaking silica-containing materials such as concrete, brick, stone and some blocks, and long-term exposure can cause serious lung disease.",
    "topic": "Health & Hygiene"
  },
  {
    "text": "What control measure is commonly used to reduce exposure to silica dust when cutting masonry?",
    "options": [
      "Working faster to reduce exposure time",
      "Using water suppression or on-tool extraction, along with suitable RPE",
      "Opening a window only",
      "Wearing gloves alone"
    ],
    "correct": "Using water suppression or on-tool extraction, along with suitable RPE",
    "explanation": "Water suppression or on-tool dust extraction significantly reduces airborne silica dust, and should be combined with suitable respiratory protective equipment where exposure remains.",
    "topic": "Health & Hygiene"
  },
  {
    "text": "What does RPE stand for in a health and safety context?",
    "options": [
      "Rapid Personal Evacuation",
      "Respiratory Protective Equipment",
      "Regulated Power Equipment",
      "Reinforced Protective Enclosure"
    ],
    "correct": "Respiratory Protective Equipment",
    "explanation": "RPE stands for Respiratory Protective Equipment, such as a filtering face mask or powered respirator, used to protect against airborne contaminants.",
    "topic": "PPE"
  },
  {
    "text": "Why must RPE be correctly fit-tested to the wearer?",
    "options": [
      "Fit testing is not necessary for RPE",
      "A poor seal against the face allows contaminated air to bypass the filter, reducing protection",
      "It is only a cosmetic requirement",
      "Fit testing only applies to full-face respirators"
    ],
    "correct": "A poor seal against the face allows contaminated air to bypass the filter, reducing protection",
    "explanation": "If tight-fitting RPE does not seal properly against the face, contaminated air can leak in around the edges, significantly reducing the protection provided.",
    "topic": "PPE"
  },
  {
    "text": "What is the purpose of safety footwear with a steel or composite toe cap?",
    "options": [
      "To improve running speed",
      "To protect the foot from impact and compression injuries, such as from falling objects",
      "To make the boots waterproof only",
      "To improve grip on ice only"
    ],
    "correct": "To protect the foot from impact and compression injuries, such as from falling objects",
    "explanation": "Toe-cap safety footwear protects the toes from impact and crushing injuries, which are common on construction sites where heavy objects may be dropped.",
    "topic": "PPE"
  },
  {
    "text": "Why should damaged PPE be reported and replaced rather than continuing to use it?",
    "options": [
      "Damaged PPE always looks the same as new PPE",
      "Damage can significantly reduce or remove the protection it is designed to provide",
      "It is only a cosmetic issue",
      "PPE cannot become damaged through normal use"
    ],
    "correct": "Damage can significantly reduce or remove the protection it is designed to provide",
    "explanation": "Damage such as cracks, tears or worn straps can compromise PPE's ability to protect the wearer, so damaged items should be reported and replaced.",
    "topic": "PPE"
  },
  {
    "text": "Whose responsibility is it to wear PPE correctly once it has been provided and suitable training given?",
    "options": [
      "Only the employer's",
      "Both the employer, to provide and maintain it, and the employee, to use it correctly",
      "Only the site manager's",
      "No one; PPE use is optional"
    ],
    "correct": "Both the employer, to provide and maintain it, and the employee, to use it correctly",
    "explanation": "Employers must provide, maintain and train workers to use PPE correctly, while employees have a duty to use it as instructed and report any defects.",
    "topic": "PPE"
  },
  {
    "text": "What is the purpose of ear defenders compared with foam ear plugs?",
    "options": [
      "They serve no different purpose",
      "Ear defenders cover the whole ear externally and can be quicker to put on and take off, while plugs are inserted into the ear canal",
      "Ear defenders are only decorative",
      "Foam plugs provide no protection at all"
    ],
    "correct": "Ear defenders cover the whole ear externally and can be quicker to put on and take off, while plugs are inserted into the ear canal",
    "explanation": "Both protect hearing but work differently: defenders sit externally over the ears, while plugs are inserted into the ear canal; the right choice depends on the task and comfort.",
    "topic": "PPE"
  },
  {
    "text": "What voltage is commonly used for portable power tools on many UK construction sites to reduce shock risk?",
    "options": [
      "230 volts",
      "110 volts",
      "400 volts",
      "12 volts only"
    ],
    "correct": "110 volts",
    "explanation": "110V centre-tapped-to-earth systems are widely used on UK construction sites for portable tools, as a fault to earth produces a much lower shock voltage than at 230V.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What colour is typically used for a 110V site transformer or plug body?",
    "options": [
      "Blue",
      "Yellow",
      "Red",
      "White"
    ],
    "correct": "Yellow",
    "explanation": "110V site equipment is conventionally coloured yellow, helping workers quickly identify the voltage rating of plugs and transformers on site.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is the purpose of an RCD (Residual Current Device)?",
    "options": [
      "To increase the current supplied to a circuit",
      "To rapidly disconnect the supply if it detects a dangerous earth leakage current",
      "To store electrical energy",
      "To convert AC to DC"
    ],
    "correct": "To rapidly disconnect the supply if it detects a dangerous earth leakage current",
    "explanation": "An RCD monitors for an imbalance between live and neutral current, which indicates leakage to earth, and disconnects the supply quickly to reduce shock risk.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is the purpose of an equipotential bonding conductor in an installation?",
    "options": [
      "To supply power to lighting circuits",
      "To connect metallic parts together so they are at, or close to, the same electrical potential, reducing shock risk",
      "To increase circuit resistance deliberately",
      "To provide a data connection"
    ],
    "correct": "To connect metallic parts together so they are at, or close to, the same electrical potential, reducing shock risk",
    "explanation": "Equipotential bonding minimises voltage differences between exposed and extraneous conductive parts, reducing the risk of electric shock during a fault.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What does the term 'earthing' primarily provide in an electrical installation?",
    "options": [
      "A path for fault current to flow, allowing protective devices to operate and disconnect the supply",
      "Increased brightness for lighting circuits",
      "Reduced electricity bills",
      "Improved Wi-Fi signal near the consumer unit"
    ],
    "correct": "A path for fault current to flow, allowing protective devices to operate and disconnect the supply",
    "explanation": "Earthing provides a low-impedance path for fault current, ensuring protective devices such as fuses or circuit breakers operate quickly to disconnect a faulty circuit.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is a circuit breaker's main function in a consumer unit?",
    "options": [
      "To provide lighting only",
      "To automatically disconnect a circuit if it detects an overcurrent, such as from a fault or overload",
      "To store backup power",
      "To boost the incoming supply voltage"
    ],
    "correct": "To automatically disconnect a circuit if it detects an overcurrent, such as from a fault or overload",
    "explanation": "A circuit breaker automatically opens the circuit if current exceeds a safe level, protecting cables and equipment from damage due to overload or fault current.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is meant by 'polarity' when testing an electrical installation?",
    "options": [
      "The colour of the cable insulation",
      "Confirming that line, neutral and switching conductors are correctly connected throughout the installation",
      "The total resistance of the circuit",
      "The type of protective device fitted"
    ],
    "correct": "Confirming that line, neutral and switching conductors are correctly connected throughout the installation",
    "explanation": "Polarity testing confirms that conductors are correctly connected, for example that single-pole switches and protective devices are wired into the line conductor, not neutral.",
    "topic": "Electrotechnical"
  },
  {
    "text": "Why is continuity testing carried out on protective conductors during an electrical installation test?",
    "options": [
      "To check the colour of the cable only",
      "To confirm a low-resistance, effective earth path exists for fault current to flow",
      "To measure the voltage of the supply",
      "To check the length of the cable run only"
    ],
    "correct": "To confirm a low-resistance, effective earth path exists for fault current to flow",
    "explanation": "Continuity testing of protective conductors confirms there is a sound, low-resistance path to earth, which is essential for protective devices to operate correctly during a fault.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is the purpose of periodic inspection and testing of an existing electrical installation?",
    "options": [
      "To install new circuits only",
      "To assess the condition of an existing installation and identify any deterioration, damage or non-compliance",
      "To replace the consumer unit automatically",
      "To calculate the electricity bill"
    ],
    "correct": "To assess the condition of an existing installation and identify any deterioration, damage or non-compliance",
    "explanation": "Periodic inspection and testing checks the ongoing safety of an existing installation, identifying wear, damage or issues that may have developed since it was installed.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is the purpose of a socket outlet's shuttered contacts?",
    "options": [
      "To increase the current rating of the socket",
      "To help prevent foreign objects, such as fingers, being inserted into live contacts",
      "To reduce the cost of manufacture",
      "To improve the socket's appearance"
    ],
    "correct": "To help prevent foreign objects, such as fingers, being inserted into live contacts",
    "explanation": "Shuttered sockets only open when a plug's earth pin (or an equivalent mechanism) is inserted, reducing the risk of contact with live parts.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What does 'IP rating' describe for electrical enclosures and fittings?",
    "options": [
      "The Internet Protocol version used by the device",
      "The level of protection against ingress of solid objects and liquids",
      "The insurance premium of the equipment",
      "The installation price of the fitting"
    ],
    "correct": "The level of protection against ingress of solid objects and liquids",
    "explanation": "IP (Ingress Protection) ratings describe how well an enclosure resists solid objects and liquid ingress, important for selecting suitable fittings for wet or dusty areas.",
    "topic": "Electrotechnical"
  },
  {
    "text": "Why might an electrical fitting installed in a bathroom need a higher IP rating than one in a dry office?",
    "options": [
      "Bathroom fittings need to look different only",
      "Bathrooms have zones with increased exposure to moisture, requiring greater protection against water ingress",
      "IP ratings do not apply to bathrooms",
      "Higher IP ratings are only about dust, not water"
    ],
    "correct": "Bathrooms have zones with increased exposure to moisture, requiring greater protection against water ingress",
    "explanation": "Bathroom zones are classified by their proximity to water sources, and fittings in higher-risk zones need appropriately rated protection against moisture ingress.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is the purpose of a wiring diagram or schematic before starting an installation task?",
    "options": [
      "It is only useful after the job is finished",
      "It shows how the circuit is intended to be connected, helping ensure correct and safe installation",
      "It replaces the need for testing",
      "It is only required for domestic work"
    ],
    "correct": "It shows how the circuit is intended to be connected, helping ensure correct and safe installation",
    "explanation": "A wiring diagram shows the intended connections of a circuit, helping installers wire it correctly and reducing the risk of errors that could create a hazard.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is a common cause of an overloaded circuit tripping its protective device?",
    "options": [
      "Too few appliances connected",
      "Too many appliances drawing more current than the circuit or protective device is rated for",
      "The lights being switched off",
      "Using a shorter extension lead"
    ],
    "correct": "Too many appliances drawing more current than the circuit or protective device is rated for",
    "explanation": "When the combined current drawn by connected appliances exceeds the rating of the circuit or its protective device, the device is designed to trip and disconnect the supply.",
    "topic": "Electrotechnical"
  },
  {
    "text": "Why should extension leads be fully unwound before use with high-current equipment?",
    "options": [
      "It has no effect on safety",
      "A coiled cable can overheat due to the electromagnetic and thermal effects of current flowing through it in loops",
      "Coiled cables use less electricity",
      "It only affects the appearance of the cable"
    ],
    "correct": "A coiled cable can overheat due to the electromagnetic and thermal effects of current flowing through it in loops",
    "explanation": "A coiled extension lead can build up heat faster than an unwound one when carrying significant current, increasing the risk of overheating or fire.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What should be done before connecting a new circuit to an existing consumer unit?",
    "options": [
      "Nothing extra beyond wiring it in",
      "Confirm the consumer unit has adequate capacity and the new circuit is correctly designed, protected and will be tested before use",
      "Just switch off one other circuit to make room",
      "Assume the existing wiring can handle any addition"
    ],
    "correct": "Confirm the consumer unit has adequate capacity and the new circuit is correctly designed, protected and will be tested before use",
    "explanation": "Adding a circuit requires checking the consumer unit's capacity, correctly designing and protecting the new circuit, and testing it before it is put into service.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is a key benefit of using a torque screwdriver when terminating conductors in a consumer unit?",
    "options": [
      "It looks more professional only",
      "It helps ensure terminations are tightened to the correct value, reducing the risk of a loose connection overheating",
      "It reduces the time needed for the whole job significantly",
      "It removes the need for insulation testing"
    ],
    "correct": "It helps ensure terminations are tightened to the correct value, reducing the risk of a loose connection overheating",
    "explanation": "Correctly torqued terminations reduce the risk of a loose connection developing high resistance, which can generate heat and potentially cause a fire.",
    "topic": "Electrotechnical"
  },
  {
    "text": "What is the purpose of a maintenance schedule for site plant and equipment?",
    "options": [
      "To increase paperwork without benefit",
      "To ensure equipment is regularly checked and serviced so it remains safe and reliable to use",
      "To track staff holidays",
      "To calculate fuel costs only"
    ],
    "correct": "To ensure equipment is regularly checked and serviced so it remains safe and reliable to use",
    "explanation": "A maintenance schedule ensures equipment receives regular checks and servicing, helping to catch developing faults before they cause a failure or accident.",
    "topic": "Work Equipment"
  },
  {
    "text": "What should you do if you notice a colleague not following a safe system of work?",
    "options": [
      "Say nothing, as it is not your responsibility",
      "Raise it with them or a supervisor, since everyone has a duty to look after their own and others' safety",
      "Report it only if an accident occurs",
      "Copy what they are doing"
    ],
    "correct": "Raise it with them or a supervisor, since everyone has a duty to look after their own and others' safety",
    "explanation": "All workers share responsibility for health and safety, and raising unsafe practices helps prevent accidents before they happen.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What is the purpose of a Site Waste Management Plan?",
    "options": [
      "To plan staff rotas",
      "To plan how waste generated by a project will be minimised, managed and disposed of responsibly",
      "To record deliveries of materials only",
      "To schedule fire drills"
    ],
    "correct": "To plan how waste generated by a project will be minimised, managed and disposed of responsibly",
    "explanation": "A Site Waste Management Plan sets out how waste will be reduced, reused, recycled or disposed of correctly throughout a project.",
    "topic": "Environmental"
  },
  {
    "text": "What is a key benefit of segregating recyclable materials such as timber and metal offcuts on site?",
    "options": [
      "It only benefits the waste contractor financially",
      "It reduces landfill waste and supports more sustainable, responsible disposal",
      "It has no environmental benefit",
      "It slows down the job unnecessarily"
    ],
    "correct": "It reduces landfill waste and supports more sustainable, responsible disposal",
    "explanation": "Segregating recyclable materials allows more waste to be reused or recycled rather than sent to landfill, reducing environmental impact.",
    "topic": "Environmental"
  },
  {
    "text": "Why is protecting nearby trees and vegetation often a consideration during construction work?",
    "options": [
      "It has no legal or environmental relevance",
      "Established trees can be protected by planning conditions or Tree Preservation Orders, and root/canopy damage can harm them",
      "Trees are only relevant to landscaping contractors",
      "Vegetation never needs protecting during construction"
    ],
    "correct": "Established trees can be protected by planning conditions or Tree Preservation Orders, and root/canopy damage can harm them",
    "explanation": "Trees may be legally protected, and damage to roots or canopies during construction can seriously harm or kill them, so protective measures are often required.",
    "topic": "Environmental"
  },
  {
    "text": "What is the purpose of noise monitoring on a construction site near residential properties?",
    "options": [
      "To increase noise levels deliberately",
      "To help ensure noise stays within agreed limits and minimise disturbance to neighbours",
      "It has no practical purpose",
      "To advertise the contractor's work"
    ],
    "correct": "To help ensure noise stays within agreed limits and minimise disturbance to neighbours",
    "explanation": "Noise monitoring helps contractors stay within permitted limits (often set by local authority conditions) and reduce nuisance to people living or working nearby.",
    "topic": "Environmental"
  },
  {
    "text": "What is the main purpose of dust and debris netting on a scaffold around a building under renovation?",
    "options": [
      "To improve the scaffold's structural strength",
      "To help contain dust and debris, protecting the public and environment around the site",
      "To provide additional weatherproofing to the scaffold boards only",
      "To advertise the project"
    ],
    "correct": "To help contain dust and debris, protecting the public and environment around the site",
    "explanation": "Debris netting helps prevent dust, small debris and falling materials from affecting pedestrians, neighbouring properties and the wider environment.",
    "topic": "Environmental"
  },
  {
    "text": "What is a key reason for keeping delivery and access routes on site clear and well managed?",
    "options": [
      "It only matters for large sites",
      "To reduce the risk of collisions between vehicles, plant and pedestrians",
      "It has no safety relevance",
      "To reduce fuel costs only"
    ],
    "correct": "To reduce the risk of collisions between vehicles, plant and pedestrians",
    "explanation": "Well-managed traffic routes with clear separation between vehicles, plant and pedestrians reduce the risk of collisions, which are a common cause of serious site injuries.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What is the purpose of a banksman when reversing a vehicle or plant on site?",
    "options": [
      "To operate the vehicle's radio",
      "To guide the driver safely, helping avoid collisions with people, structures or other vehicles",
      "To record fuel usage",
      "To direct deliveries to the wrong location"
    ],
    "correct": "To guide the driver safely, helping avoid collisions with people, structures or other vehicles",
    "explanation": "A banksman uses clear signals to guide a driver during reversing or manoeuvring in restricted areas, reducing the risk of collision, especially where visibility is limited.",
    "topic": "General Health and Safety"
  },
  {
    "text": "Why should pedestrians and vehicles ideally be segregated on a construction site?",
    "options": [
      "It is not important if drivers are experienced",
      "To reduce the risk of a pedestrian being struck by moving plant or vehicles",
      "Segregation only matters on public roads",
      "It slows down deliveries unnecessarily"
    ],
    "correct": "To reduce the risk of a pedestrian being struck by moving plant or vehicles",
    "explanation": "Separating pedestrian routes from vehicle and plant movement areas significantly reduces the risk of people being struck, one of the more common causes of serious site injury.",
    "topic": "General Health and Safety"
  },
  {
    "text": "What is the purpose of wheel washing facilities at a site exit?",
    "options": [
      "To improve vehicle appearance only",
      "To remove mud and debris from vehicle wheels before they enter the public highway, reducing hazard and mess",
      "To measure vehicle speed",
      "To weigh outgoing vehicles"
    ],
    "correct": "To remove mud and debris from vehicle wheels before they enter the public highway, reducing hazard and mess",
    "explanation": "Wheel washing reduces the amount of mud and debris deposited on public roads, which can create a slip and skid hazard as well as a nuisance.",
    "topic": "Environmental"
  },
  {
    "text": "What should be considered when storing flammable materials such as solvents or gas cylinders on site?",
    "options": [
      "Store them anywhere convenient",
      "Store them in a designated, ventilated area away from ignition sources, following relevant guidance",
      "Store them next to a welding area for convenience",
      "Store them without any specific precautions"
    ],
    "correct": "Store them in a designated, ventilated area away from ignition sources, following relevant guidance",
    "explanation": "Flammable materials should be stored in a properly designated, ventilated location away from sources of ignition to reduce fire and explosion risk.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What is 'hot work' in a construction safety context?",
    "options": [
      "Any work carried out in summer",
      "Work involving an open flame, sparks or sufficient heat to ignite flammable materials, such as welding or grinding",
      "Only work carried out in a heated building",
      "Work involving hot beverages on a break"
    ],
    "correct": "Work involving an open flame, sparks or sufficient heat to ignite flammable materials, such as welding or grinding",
    "explanation": "Hot work includes activities like welding, cutting and grinding that generate heat, sparks or flame capable of igniting nearby combustible materials.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "Why is a hot work permit often required before welding or cutting on site?",
    "options": [
      "It is a formality with no real safety purpose",
      "To ensure fire precautions, such as clearing combustibles and having extinguishers ready, are in place before work starts",
      "It is only needed for work outdoors",
      "It replaces the need for PPE"
    ],
    "correct": "To ensure fire precautions, such as clearing combustibles and having extinguishers ready, are in place before work starts",
    "explanation": "A hot work permit confirms that fire risks have been assessed and precautions, such as removing combustible materials and having fire watch arrangements, are in place before starting.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What is the purpose of a fire watch after hot work has finished?",
    "options": [
      "It is unnecessary once the tool is switched off",
      "To monitor the area for a period afterwards in case smouldering material later ignites",
      "To clean up tools only",
      "To record the time the job finished"
    ],
    "correct": "To monitor the area for a period afterwards in case smouldering material later ignites",
    "explanation": "Sparks or hot debris from hot work can smoulder unnoticed and ignite later, so a fire watch period after work finishes helps catch a delayed fire before it takes hold.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What is the main function of a smoke detector's interconnection in a domestic fire alarm system?",
    "options": [
      "To reduce the purchase cost of detectors",
      "So that if one detector activates, all interconnected detectors sound, giving an earlier warning throughout the property",
      "To allow remote control of lighting",
      "To connect to the internet only"
    ],
    "correct": "So that if one detector activates, all interconnected detectors sound, giving an earlier warning throughout the property",
    "explanation": "Interconnected smoke detectors all sound together when one is triggered, helping ensure occupants throughout a property are warned as early as possible.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What is the purpose of a fire door's self-closing device?",
    "options": [
      "To make the door easier to open",
      "To ensure the door automatically closes and stays shut, maintaining the fire compartment line",
      "To reduce draughts for comfort only",
      "To lock the door automatically"
    ],
    "correct": "To ensure the door automatically closes and stays shut, maintaining the fire compartment line",
    "explanation": "A self-closer ensures a fire door returns to a fully closed position after use, so it can perform its role of containing fire and smoke if needed.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What might invalidate the fire-resisting performance of a fire door?",
    "options": [
      "Painting it a different colour",
      "Fitting incorrect hardware, damaging the intumescent seals, or wedging it open",
      "Cleaning it regularly",
      "Installing it in a different building"
    ],
    "correct": "Fitting incorrect hardware, damaging the intumescent seals, or wedging it open",
    "explanation": "Fire doors rely on their full assembly, including certified hardware and intumescent seals, being intact and closed to perform correctly; damage or wedging can seriously reduce their effectiveness.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What is the primary purpose of an evacuation assembly point?",
    "options": [
      "A designated area for deliveries",
      "A pre-agreed, safe location away from the building where evacuated people gather so a headcount can confirm everyone is out",
      "A storage area for tools during a fire",
      "An area reserved for management only"
    ],
    "correct": "A pre-agreed, safe location away from the building where evacuated people gather so a headcount can confirm everyone is out",
    "explanation": "The assembly point allows a roll call to confirm everyone has evacuated safely, and gives the fire service clear information about anyone possibly still inside.",
    "topic": "Fire and Emergency"
  },
  {
    "text": "What should you do if you hear a fire alarm activate while working on site?",
    "options": [
      "Finish the task you are doing first",
      "Stop work immediately and follow the evacuation procedure to the assembly point",
      "Investigate the cause yourself before evacuating",
      "Wait to be told individually before moving"
    ],
    "correct": "Stop work immediately and follow the evacuation procedure to the assembly point",
    "explanation": "On hearing a fire alarm, you should stop what you're doing and evacuate immediately via the nearest safe route to the designated assembly point.",
    "topic": "Fire and Emergency"
  },

  // UPDATE 4: a further 50 original questions have now been appended after
  // all of the above — the existing 1,161 questions are completely
  // untouched — taking the bank to 1,211 questions total.
  {
    "text": "What is the correct order of steps in a safe isolation procedure?",
    "options": [
      "Identify circuit, switch off, lock off, prove tester, test dead, re-prove tester",
      "Switch off, test dead, identify circuit, lock off",
      "Lock off, identify circuit, switch off, test dead",
      "Test dead, switch off, identify circuit, lock off"
    ],
    "correct": "Identify circuit, switch off, lock off, prove tester, test dead, re-prove tester",
    "explanation": "The recognised safe isolation sequence is: identify the correct circuit, switch off, secure with a lock and warning tag, prove the voltage indicator on a known source, test the circuit is dead, then re-prove the indicator on the known source again.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Why must a voltage indicator be proved before AND after testing a circuit dead?",
    "options": [
      "It is only a formality with no real purpose",
      "To confirm the indicator itself is working correctly, so a dead reading can be trusted",
      "To use up time before starting work",
      "Only the 'before' check matters"
    ],
    "correct": "To confirm the indicator itself is working correctly, so a dead reading can be trusted",
    "explanation": "Proving on a known live source before and after the dead test confirms the instrument hasn't failed, so you can trust that a 'dead' reading genuinely means the circuit is isolated.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Who should hold the key or combination to a lock-off device during isolation?",
    "options": [
      "Any worker on site",
      "The person carrying out the isolation and work, and no one else",
      "The site receptionist",
      "It doesn't matter as long as it's locked"
    ],
    "correct": "The person carrying out the isolation and work, and no one else",
    "explanation": "Only the person who applied the lock-off (and is doing the work) should control the key, ensuring the supply cannot be restored while they are still working on the circuit.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is a 'point of isolation'?",
    "options": [
      "Any switch on the circuit",
      "The specific device (e.g. isolator, MCB) that, when operated, disconnects the circuit from all sources of supply",
      "The consumer unit cover",
      "The nearest socket outlet"
    ],
    "correct": "The specific device (e.g. isolator, MCB) that, when operated, disconnects the circuit from all sources of supply",
    "explanation": "The point of isolation is the specific switching device used to disconnect a circuit from every source of electrical supply, so it can be locked off safely.",
    "topic": "Safe Isolation"
  },
  {
    "text": "Before starting work, you find a circuit has more than one possible source of supply. What must you do?",
    "options": [
      "Isolate only the most obvious source",
      "Identify and isolate every source of supply feeding the circuit",
      "Proceed carefully without isolating",
      "Ask a colleague to keep watch instead"
    ],
    "correct": "Identify and isolate every source of supply feeding the circuit",
    "explanation": "A circuit can sometimes be fed or backfed from more than one source (e.g. generators, alternative supplies). All sources must be identified and isolated before work begins.",
    "topic": "Safe Isolation"
  },
  {
    "text": "What is the purpose of an insulation resistance test?",
    "options": [
      "To check the colour of cable insulation",
      "To check that insulation between conductors, and between conductors and earth, is sound and not breaking down",
      "To measure the length of a cable run",
      "To check the supply voltage"
    ],
    "correct": "To check that insulation between conductors, and between conductors and earth, is sound and not breaking down",
    "explanation": "An insulation resistance test applies a DC test voltage to check that cable and equipment insulation is in good condition and not allowing current to leak between conductors or to earth.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does a continuity test on the protective conductor (R1+R2 or R2) confirm?",
    "options": [
      "The supply voltage is correct",
      "That there is a low-resistance, unbroken earth path back to the origin of the installation",
      "That the circuit breaker will trip on overload",
      "That the cable is the correct colour"
    ],
    "correct": "That there is a low-resistance, unbroken earth path back to the origin of the installation",
    "explanation": "Continuity testing of the protective conductor confirms an effective, low-resistance earth fault path exists, which is essential for protective devices to operate correctly during a fault.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the purpose of a polarity test?",
    "options": [
      "To check cable colour matches drawings",
      "To confirm line, neutral and switching are correctly connected so single-pole devices switch the line conductor",
      "To measure earth fault loop impedance",
      "To confirm the RCD trips within time"
    ],
    "correct": "To confirm line, neutral and switching are correctly connected so single-pole devices switch the line conductor",
    "explanation": "Polarity testing confirms single-pole switches and protective devices are wired into the line conductor (not neutral), and that centre-contact lampholders and sockets are correctly connected.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What does earth fault loop impedance (Zs) testing confirm?",
    "options": [
      "The colour of the cable sheath",
      "That the fault loop path has low enough impedance for the protective device to disconnect within the required time",
      "The length of the final circuit only",
      "The type of consumer unit fitted"
    ],
    "correct": "That the fault loop path has low enough impedance for the protective device to disconnect within the required time",
    "explanation": "A low enough Zs value ensures sufficient fault current flows to operate the protective device quickly during a fault, disconnecting the supply within the required disconnection time.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the correct order for carrying out initial verification tests, in general terms?",
    "options": [
      "Live tests before dead tests",
      "Dead tests (continuity, insulation resistance, polarity) before live tests (earth fault loop impedance, RCD operation)",
      "It does not matter what order tests are done in",
      "Only live tests are required"
    ],
    "correct": "Dead tests (continuity, insulation resistance, polarity) before live tests (earth fault loop impedance, RCD operation)",
    "explanation": "Dead tests are always carried out first, with the installation isolated, before any live testing takes place — this protects both the tester and the installation.",
    "topic": "Testing and Inspection"
  },
  {
    "text": "What is the main purpose of an earthing conductor?",
    "options": [
      "To carry normal load current continuously",
      "To connect the main earthing terminal to the means of earthing, providing a path for fault current",
      "To supply power to lighting circuits",
      "To connect two separate buildings together"
    ],
    "correct": "To connect the main earthing terminal to the means of earthing, providing a path for fault current",
    "explanation": "The earthing conductor links the installation's main earthing terminal to the earth electrode or supply earth, giving fault current a path back to source so protective devices can operate.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is 'main protective bonding' intended to achieve?",
    "options": [
      "To decorate exposed metalwork",
      "To connect extraneous-conductive-parts (like gas and water pipes) to the main earthing terminal, minimising touch voltage between them",
      "To increase the resistance of metal pipework",
      "To replace the need for an earthing conductor"
    ],
    "correct": "To connect extraneous-conductive-parts (like gas and water pipes) to the main earthing terminal, minimising touch voltage between them",
    "explanation": "Main protective bonding connects services such as gas, water and oil pipes to the main earthing terminal so that, during a fault, all these parts stay at a similar potential, reducing shock risk.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is a 'supplementary bonding' conductor used for?",
    "options": [
      "General cable support",
      "Connecting simultaneously accessible exposed and extraneous-conductive-parts locally, e.g. in a bathroom, to reduce touch voltage",
      "Increasing circuit current rating",
      "Replacing an RCD"
    ],
    "correct": "Connecting simultaneously accessible exposed and extraneous-conductive-parts locally, e.g. in a bathroom, to reduce touch voltage",
    "explanation": "Supplementary bonding links accessible conductive parts in a local area (such as a bathroom) so that, if a fault occurs, they cannot develop a dangerous voltage difference between them.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "In a TN-S earthing system, where does the earth path return to?",
    "options": [
      "A local earth electrode only, with no metallic path back to source",
      "A separate metallic earth conductor (e.g. cable sheath) provided by the supplier back to the source",
      "The neutral conductor only",
      "There is no return path in a TN-S system"
    ],
    "correct": "A separate metallic earth conductor (e.g. cable sheath) provided by the supplier back to the source",
    "explanation": "In a TN-S system, the supply earth is provided via a separate metallic conductor (often the cable sheath/armour) run back to the source, distinct from the neutral conductor.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is the main difference between a TN-C-S (PME) and a TT earthing system?",
    "options": [
      "There is no difference",
      "TN-C-S uses a combined neutral/earth conductor from the supplier; TT relies on a local earth electrode with no supplier earth connection",
      "TT systems don't need RCDs",
      "TN-C-S only works with three-phase supplies"
    ],
    "correct": "TN-C-S uses a combined neutral/earth conductor from the supplier; TT relies on a local earth electrode with no supplier earth connection",
    "explanation": "TN-C-S (PME) combines neutral and earth in one conductor supplied by the DNO, whereas TT systems have no metallic earth path from the supplier and must rely on a local earth electrode, typically needing RCD protection.",
    "topic": "Earthing and Bonding"
  },
  {
    "text": "What is Ohm's Law used to calculate?",
    "options": [
      "The colour of a cable",
      "The relationship between voltage, current and resistance in a circuit",
      "The length of a conduit run",
      "The type of enclosure needed"
    ],
    "correct": "The relationship between voltage, current and resistance in a circuit",
    "explanation": "Ohm's Law (V = I × R) relates voltage, current and resistance, and is fundamental to calculating circuit values in electrical work.",
    "topic": "Electrical Theory"
  },
  {
    "text": "In a purely resistive AC circuit, what is the relationship between voltage and current?",
    "options": [
      "Current leads voltage by 90 degrees",
      "Voltage and current are in phase with each other",
      "Voltage lags current by 180 degrees",
      "There is no relationship"
    ],
    "correct": "Voltage and current are in phase with each other",
    "explanation": "In a purely resistive circuit, voltage and current rise and fall together, reaching their peaks and zero points at the same time — they are described as being 'in phase'.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What does 'power factor' describe in an AC circuit?",
    "options": [
      "The colour coding of cables",
      "The ratio of real (useful) power to apparent power, reflecting how efficiently current is being used",
      "The number of circuits in a consumer unit",
      "The type of earthing system in use"
    ],
    "correct": "The ratio of real (useful) power to apparent power, reflecting how efficiently current is being used",
    "explanation": "Power factor compares real power (kW), which does useful work, to apparent power (kVA), which includes reactive power; a low power factor means more current is drawn for the same useful output.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What effect does increasing the cross-sectional area (csa) of a conductor have on its resistance?",
    "options": [
      "Resistance increases",
      "Resistance decreases",
      "Resistance stays exactly the same",
      "Resistance becomes zero"
    ],
    "correct": "Resistance decreases",
    "explanation": "Resistance is inversely proportional to cross-sectional area — a larger csa gives more room for current to flow, reducing resistance for a given conductor length and material.",
    "topic": "Electrical Theory"
  },
  {
    "text": "What is the main advantage of a three-phase supply over a single-phase supply for large loads?",
    "options": [
      "It is always cheaper to install",
      "It can deliver more power efficiently for a given conductor size and provides a smoother, more constant delivery of power",
      "It requires no protective devices",
      "It cannot be used with motors"
    ],
    "correct": "It can deliver more power efficiently for a given conductor size and provides a smoother, more constant delivery of power",
    "explanation": "Three-phase supplies distribute power across three conductors, allowing higher power transfer for a given conductor size and giving smoother, more constant power delivery — ideal for larger loads and motors.",
    "topic": "Electrical Theory"
  },
  {
    "text": "When must eye protection be worn on a construction site?",
    "options": [
      "Only when using power tools that create dust or debris, or as instructed by risk assessment/signage",
      "Only in the office areas",
      "Only during summer months",
      "Eye protection is never required on construction sites"
    ],
    "correct": "Only when using power tools that create dust or debris, or as instructed by risk assessment/signage",
    "explanation": "Eye protection must be worn whenever a task or the site risk assessment identifies a risk to the eyes — e.g. cutting, grinding, drilling — or where signage mandates it in a designated area.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the correct technique when lifting a load from the ground?",
    "options": [
      "Bend at the waist, keep legs straight, and lift with your back",
      "Keep a straight back, bend your knees, get a firm grip, and lift smoothly using your legs",
      "Twist your body while lifting to save time",
      "Lift as quickly as possible regardless of posture"
    ],
    "correct": "Keep a straight back, bend your knees, get a firm grip, and lift smoothly using your legs",
    "explanation": "Correct manual handling technique involves keeping the back straight, bending the knees, gripping the load firmly, and lifting smoothly using the leg muscles rather than the back.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What should you check about PPE before each use?",
    "options": [
      "Only that it is the correct colour",
      "That it is undamaged, clean, correctly fitted, and within any expiry/inspection date",
      "Nothing, as long as it was issued to you",
      "Only that it has the company logo on it"
    ],
    "correct": "That it is undamaged, clean, correctly fitted, and within any expiry/inspection date",
    "explanation": "PPE only protects you if it is in good condition and properly fitted — always check for damage, cleanliness, correct fit, and any relevant inspection or expiry dates before use.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What class of hearing protection should be selected for a task?",
    "options": [
      "Always the highest attenuation available regardless of noise level",
      "One suitable for the specific noise level of the task, based on the risk assessment/noise survey",
      "Hearing protection is never necessary on a construction site",
      "Any hearing protection is acceptable for any noise level"
    ],
    "correct": "One suitable for the specific noise level of the task, based on the risk assessment/noise survey",
    "explanation": "Hearing protection should match the actual noise exposure identified by a risk assessment or noise survey — over- or under-protecting can both create problems, such as missing warning sounds.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is a TILE assessment used for?",
    "options": [
      "Testing electrical installations",
      "Assessing manual handling risk by looking at the Task, Individual, Load and Environment",
      "Testing fire alarm systems",
      "Checking scaffold stability"
    ],
    "correct": "Assessing manual handling risk by looking at the Task, Individual, Load and Environment",
    "explanation": "TILE stands for Task, Individual, Load and Environment — a structured way of assessing the risk factors involved in a manual handling operation.",
    "topic": "PPE and Manual Handling"
  },
  {
    "text": "What is the main purpose of a Safety Data Sheet (SDS) for a hazardous substance?",
    "options": [
      "To advertise the product",
      "To provide information on the hazards, safe handling, storage and emergency measures for a substance",
      "To list the price of the substance",
      "To record delivery dates only"
    ],
    "correct": "To provide information on the hazards, safe handling, storage and emergency measures for a substance",
    "explanation": "An SDS gives essential safety information about a hazardous substance, including its hazards, correct handling and storage, and what to do in an emergency such as a spill or exposure.",
    "topic": "COSHH and Health Hygiene"
  },
  {
    "text": "What does 'hierarchy of control' mean when managing exposure to hazardous substances under COSHH?",
    "options": [
      "Always relying on PPE first",
      "A ranked approach: eliminate, substitute, engineering controls, administrative controls, then PPE as a last resort",
      "Only using warning signs",
      "There is no defined hierarchy for substances"
    ],
    "correct": "A ranked approach: eliminate, substitute, engineering controls, administrative controls, then PPE as a last resort",
    "explanation": "COSHH follows the same hierarchy of control as general risk management — eliminating or substituting the hazard first, then engineering and administrative controls, with PPE used only as a last line of defence.",
    "topic": "COSHH and Health Hygiene"
  },
  {
    "text": "What health effect is commonly associated with prolonged exposure to silica dust?",
    "options": [
      "Improved lung capacity",
      "Silicosis, a serious and irreversible lung disease",
      "Temporary skin rash only",
      "No known health effects"
    ],
    "correct": "Silicosis, a serious and irreversible lung disease",
    "explanation": "Prolonged inhalation of respirable crystalline silica dust (from cutting concrete, block or stone) can cause silicosis, a serious, irreversible and potentially fatal lung disease.",
    "topic": "COSHH and Health Hygiene"
  },
  {
    "text": "What is the correct way to dispose of used solvent-soaked rags on site?",
    "options": [
      "Leave them anywhere convenient",
      "Place them in a designated, sealed, fire-resistant container as they can be a fire risk",
      "Burn them immediately on site",
      "Wash and reuse them without any precautions"
    ],
    "correct": "Place them in a designated, sealed, fire-resistant container as they can be a fire risk",
    "explanation": "Solvent-soaked rags can spontaneously combust or release flammable vapours, so they must be stored in a sealed, fire-resistant container and disposed of according to site procedures.",
    "topic": "COSHH and Health Hygiene"
  },
  {
    "text": "What is Hand-Arm Vibration Syndrome (HAVS)?",
    "options": [
      "A skin condition caused by sun exposure",
      "A painful, irreversible condition affecting hands and arms from prolonged use of vibrating tools",
      "A hearing condition caused by loud noise",
      "A back condition caused by heavy lifting"
    ],
    "correct": "A painful, irreversible condition affecting hands and arms from prolonged use of vibrating tools",
    "explanation": "HAVS is caused by regular and prolonged exposure to vibration from hand-held power tools, damaging blood vessels, nerves and joints in the hands and arms, and is irreversible once established.",
    "topic": "COSHH and Health Hygiene"
  },
  {
    "text": "What is the minimum guard rail height required for a working platform edge protection under Work at Height Regulations guidance?",
    "options": [
      "Any height is acceptable",
      "At least 950mm, with an intermediate guard rail so no unprotected gap exceeds 470mm",
      "Exactly 500mm and no more",
      "Guard rails are optional if workers are careful"
    ],
    "correct": "At least 950mm, with an intermediate guard rail so no unprotected gap exceeds 470mm",
    "explanation": "Guidance under the Work at Height Regulations specifies a minimum top guard rail height of 950mm, with an intermediate rail positioned so that no gap exceeds 470mm, to prevent falls.",
    "topic": "Work at Height"
  },
  {
    "text": "What must be checked before using a mobile scaffold tower?",
    "options": [
      "Nothing, towers are always safe",
      "That it has been erected by a competent person, wheels are locked, and it is on firm, level ground",
      "Only that the colour is correct",
      "Only that it has a ladder attached"
    ],
    "correct": "That it has been erected by a competent person, wheels are locked, and it is on firm, level ground",
    "explanation": "Mobile towers must be erected by a competent person following manufacturer's instructions, have their wheels locked before use, and stand on firm, level ground to prevent tipping.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the correct action if a harness lanyard shows signs of fraying?",
    "options": [
      "Continue to use it as normal",
      "Take it out of service immediately and report it, do not use it",
      "Tape over the frayed section and keep using it",
      "Only report it if it fails during use"
    ],
    "correct": "Take it out of service immediately and report it, do not use it",
    "explanation": "Any damage to fall-arrest equipment, including fraying, must result in it being taken out of use immediately and reported — a damaged lanyard could fail under load in a fall.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the purpose of a 'rescue plan' when working at height with fall-arrest equipment?",
    "options": [
      "It is only needed for very tall buildings",
      "To ensure a person who falls and is suspended can be rescued quickly, since suspension trauma can be life-threatening",
      "To decide who gets to use the harness first",
      "It has no real safety purpose"
    ],
    "correct": "To ensure a person who falls and is suspended can be rescued quickly, since suspension trauma can be life-threatening",
    "explanation": "A rescue plan ensures a fallen, suspended worker can be reached and rescued quickly, because prolonged suspension in a harness can cause suspension trauma, which can become fatal within a short time.",
    "topic": "Work at Height"
  },
  {
    "text": "According to the hierarchy in the Work at Height Regulations, what should be considered first?",
    "options": [
      "Using the cheapest access equipment available",
      "Avoiding work at height altogether where reasonably practicable",
      "Always using a harness regardless of task",
      "Relying on ladders for all tasks"
    ],
    "correct": "Avoiding work at height altogether where reasonably practicable",
    "explanation": "The Work at Height Regulations set out a hierarchy: avoid work at height where reasonably practicable, then use equipment/measures to prevent falls, and finally minimise the distance and consequences of a fall if it cannot be avoided.",
    "topic": "Work at Height"
  },
  {
    "text": "What is the purpose of the Construction (Design and Management) Regulations 2015 (CDM 2015)?",
    "options": [
      "To regulate only office-based work",
      "To improve health, safety and welfare management throughout all stages of a construction project",
      "To set wage rates for construction workers",
      "To regulate only demolition projects"
    ],
    "correct": "To improve health, safety and welfare management throughout all stages of a construction project",
    "explanation": "CDM 2015 places duties on clients, designers, principal designers and contractors to plan, manage and monitor health, safety and welfare from design through to completion of construction work.",
    "topic": "Legislation"
  },
  {
    "text": "Under the Health and Safety at Work etc. Act 1974, what must employers do 'so far as is reasonably practicable'?",
    "options": [
      "Only comply if it's convenient",
      "Ensure the health, safety and welfare of their employees and others affected by their work",
      "Provide free transport to work",
      "Guarantee zero risk in all circumstances"
    ],
    "correct": "Ensure the health, safety and welfare of their employees and others affected by their work",
    "explanation": "HSWA 1974 requires employers to ensure, so far as is reasonably practicable, the health, safety and welfare of employees and others who may be affected by their work activities.",
    "topic": "Legislation"
  },
  {
    "text": "What is the purpose of the Provision and Use of Work Equipment Regulations (PUWER)?",
    "options": [
      "To set the price of work equipment",
      "To ensure work equipment is suitable, maintained, and used safely by trained, competent people",
      "To ban the use of power tools on site",
      "To regulate only vehicles"
    ],
    "correct": "To ensure work equipment is suitable, maintained, and used safely by trained, competent people",
    "explanation": "PUWER requires that equipment provided for use at work is suitable for its intended purpose, properly maintained, and used only by people who have received adequate training and information.",
    "topic": "Legislation"
  },
  {
    "text": "Under RIDDOR, what type of incident must be reported to the HSE?",
    "options": [
      "Only fatal accidents",
      "Certain specified injuries, occupational diseases, dangerous occurrences, and over-7-day incapacitation injuries",
      "Every minor cut or graze",
      "Only incidents involving members of the public"
    ],
    "correct": "Certain specified injuries, occupational diseases, dangerous occurrences, and over-7-day incapacitation injuries",
    "explanation": "RIDDOR requires reporting of specified serious injuries, certain occupational diseases, dangerous occurrences, and work-related injuries that keep someone off normal duties for more than seven days.",
    "topic": "Legislation"
  },
  {
    "text": "What is the main duty placed on employees under Section 7 of HSWA 1974?",
    "options": [
      "No duties are placed on employees",
      "To take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions",
      "To manage the whole site's safety",
      "To only follow instructions from the client"
    ],
    "correct": "To take reasonable care of their own health and safety and that of others who may be affected by their acts or omissions",
    "explanation": "Section 7 of HSWA 1974 places a legal duty on every employee to take reasonable care for their own safety and that of others affected by what they do or fail to do at work.",
    "topic": "Legislation"
  },
  {
    "text": "What should you check before using a power drill on site?",
    "options": [
      "Nothing, power tools are always safe to use",
      "That the cable, plug and casing are undamaged, and that it has a current PAT test tag if required",
      "Only that the battery is charged",
      "Only that it is the correct colour"
    ],
    "correct": "That the cable, plug and casing are undamaged, and that it has a current PAT test tag if required",
    "explanation": "Before using any electrical hand tool, check the cable, plug and casing for damage, and confirm it has a valid portable appliance test (PAT) tag where the site requires one.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What voltage is commonly used for portable power tools on construction sites in the UK to reduce shock risk?",
    "options": [
      "230V, the same as mains supply",
      "110V, supplied via a site transformer",
      "24V only",
      "400V three-phase"
    ],
    "correct": "110V, supplied via a site transformer",
    "explanation": "UK construction sites commonly use a 110V centre-tapped-to-earth supply for portable power tools, reducing the maximum shock voltage to earth to around 55V, significantly lowering the risk compared to 230V.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What should you do if a hand tool is found to be damaged during a pre-use check?",
    "options": [
      "Use it carefully anyway",
      "Take it out of use, tag it as faulty, and report it so it can be repaired or replaced",
      "Hide it so no one else uses it, but say nothing",
      "Fix it yourself if you're not qualified to do so"
    ],
    "correct": "Take it out of use, tag it as faulty, and report it so it can be repaired or replaced",
    "explanation": "A damaged tool should never be used — take it out of service, clearly tag or label it as faulty, and report it so it can be properly repaired or replaced by a competent person.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why is a residual current device (RCD) recommended when using portable power tools outdoors?",
    "options": [
      "It makes tools run faster",
      "It disconnects the supply very quickly if a dangerous earth leakage current is detected, reducing shock risk",
      "It reduces the noise of the tool",
      "It has no safety function"
    ],
    "correct": "It disconnects the supply very quickly if a dangerous earth leakage current is detected, reducing shock risk",
    "explanation": "An RCD monitors for earth leakage current and rapidly disconnects the supply if a dangerous imbalance is detected, significantly reducing the risk of serious electric shock, especially in damp outdoor conditions.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "What is the purpose of guarding on a bench grinder or similar rotating machine?",
    "options": [
      "To make the machine look tidy",
      "To prevent contact with moving parts and contain debris, protecting the operator from injury",
      "To reduce the machine's electrical consumption",
      "Guards are optional and rarely fitted"
    ],
    "correct": "To prevent contact with moving parts and contain debris, protecting the operator from injury",
    "explanation": "Machine guards are a physical barrier that prevent operators from making contact with dangerous moving parts and help contain flying debris, sparks or fragments during use.",
    "topic": "Tools and Equipment"
  },
  {
    "text": "Why should cables be supported at correct intervals along their run?",
    "options": [
      "It has no real purpose",
      "To prevent excessive sagging or strain that could damage the cable or its terminations over time",
      "To make the installation look neater only",
      "To reduce the cable's current rating"
    ],
    "correct": "To prevent excessive sagging or strain that could damage the cable or its terminations over time",
    "explanation": "Correct, regular cable support prevents mechanical strain, sagging and abrasion, which over time could damage conductors, insulation or terminations and create a safety hazard.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the purpose of cable colour identification (e.g. brown for line, blue for neutral)?",
    "options": [
      "Purely decorative, with no functional purpose",
      "To allow conductors to be correctly and safely identified during installation, testing and maintenance",
      "To indicate the manufacturer only",
      "To show which cables are the oldest"
    ],
    "correct": "To allow conductors to be correctly and safely identified during installation, testing and maintenance",
    "explanation": "Standardised cable core colours allow electricians to correctly identify line, neutral and protective conductors, reducing the risk of wiring errors during installation, testing and future maintenance.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What should be checked when selecting the correct cable size for a circuit?",
    "options": [
      "Only the colour of the available cable",
      "The design current, installation method, ambient temperature, and any grouping/derating factors",
      "Only the price of the cable",
      "Cable size does not need to be calculated"
    ],
    "correct": "The design current, installation method, ambient temperature, and any grouping/derating factors",
    "explanation": "Correct cable sizing takes into account the circuit's design current, how and where it is installed, ambient temperature, and any derating needed due to grouping with other cables, to avoid overheating.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What could happen if a cable is installed with too small a cross-sectional area for its load?",
    "options": [
      "Nothing, cable size makes no real difference",
      "The cable could overheat, degrading insulation and creating a fire or shock risk",
      "The circuit would automatically become safer",
      "The supply voltage would increase"
    ],
    "correct": "The cable could overheat, degrading insulation and creating a fire or shock risk",
    "explanation": "An undersized cable can overheat under normal load, causing the insulation to degrade over time, which increases the risk of short circuits, electric shock or fire.",
    "topic": "Cables and Wiring"
  },
  {
    "text": "What is the purpose of a cable gland where an armoured cable enters an enclosure?",
    "options": [
      "It is purely cosmetic",
      "To mechanically secure the cable, maintain enclosure ingress protection, and correctly terminate the armour for earthing continuity",
      "To increase the current rating of the cable",
      "To change the colour of the conductors"
    ],
    "correct": "To mechanically secure the cable, maintain enclosure ingress protection, and correctly terminate the armour for earthing continuity",
    "explanation": "A correctly fitted cable gland grips and supports the cable, preserves the enclosure's ingress protection rating, and, for armoured cable, terminates the armour to maintain earth continuity.",
    "topic": "Cables and Wiring"
  },
];
