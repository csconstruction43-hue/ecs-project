// data/am2Data.js
// Content for the AM2 Simulator: task-by-task practice checklists (mirroring
// the real AM2 assessment structure) + a scenario-based mock-exam question
// bank. This is unofficial revision material written to help candidates
// prepare — it is not the real NET/EAL AM2 paperwork or task brief.

// ---------------------------------------------------------------- Tasks ---
export const AM2_TASKS = [
  {
    id: 'safe-isolation',
    code: 'Task A',
    title: 'Safe Isolation',
    duration: 10,
    summary: 'Prove you can isolate a circuit or installation safely before any work begins — this is a pass/fail task on its own.',
    steps: [
      'Identify the correct circuit/installation to be isolated from the task brief',
      'Select a voltage indicator that is GS38-compliant and proving unit',
      'Prove the voltage indicator works on a known live source (proving unit)',
      'Test the voltage indicator confirms dead at the point of work (all conductors: L-N, L-E, N-E)',
      'Prove the voltage indicator still works on the proving unit again after testing dead',
      'Lock off the isolation device (MCB/switch) with a unique lock and warning notice',
      'Retain the only key/means of removing the lock on your person',
      'Post a warning notice at the point of isolation stating who isolated it and why',
      'Re-confirm dead immediately before starting any live work on the circuit',
    ],
    mistakes: [
      'Not proving the tester dead-live-dead (before AND after testing)',
      'Forgetting to test all conductor combinations, not just L-N',
      'Isolating the wrong circuit or wrong point',
      'Not physically locking off — just switching off is not isolation',
      'Losing control of the lock-off key',
    ],
  },
  {
    id: 'installation',
    code: 'Task B',
    title: 'Installation',
    duration: 150,
    summary: 'Install a small single-phase installation to the task brief and drawing, wiring it correctly and neatly to BS 7671.',
    steps: [
      'Read the full task brief and drawing before touching any material',
      'Plan your first fix: containment, cable routes, box positions',
      'Fix containment (trunking/conduit/tray) square, level and secure',
      'Run cables using correct size/type per the drawing, avoiding damage',
      'Complete first fix connections (back boxes, ceiling roses, consumer unit tails)',
      'Carry out second fix: accessories, fittings, terminations dressed neatly',
      'Terminate at the consumer unit / distribution board to the correct ways',
      'Label the circuit(s) and check polarity throughout before energising',
      'Carry out a full visual inspection of your own work against BS 7671',
    ],
    mistakes: [
      'Not following the drawing exactly (wrong accessory positions, wrong circuit ids)',
      'Poor containment fixing — not level, wrong fixing centres',
      'Reversed polarity at an accessory or ceiling rose',
      'Cables not adequately supported or protected from mechanical damage',
      'Running out of time because first fix wasn\u2019t planned before starting',
    ],
  },
  {
    id: 'inspection-testing',
    code: 'Task C',
    title: 'Inspection, Testing & Certification',
    duration: 90,
    summary: 'Inspect and test the installation in the correct sequence, recording accurate results, then complete certification paperwork.',
    steps: [
      'Visual inspection: connections, polarity, cable support, IP ratings, labelling',
      'Continuity of protective conductors (R1+R2 or R2) test',
      'Continuity of ring final circuit conductors (if applicable)',
      'Insulation resistance test (L-N, L-E, N-E, at 500V DC for typical circuits)',
      'Polarity confirmed by continuity method before energising',
      'Earth fault loop impedance (Zs) test at the furthest point of each circuit',
      'Prospective fault current (PFC) test at the origin, if required',
      'RCD test (if applicable): trip times at rated and 5x rated current',
      'Functional testing of switches, RCDs (test button) and other equipment',
      'Complete the Electrical Installation Certificate / schedule of test results accurately',
    ],
    mistakes: [
      'Testing out of sequence (e.g. energising before dead tests are complete)',
      'Recording results without actually reading the instrument correctly',
      'Missing a conductor combination on the insulation resistance test',
      'Forgetting to test at the furthest point of the circuit for Zs',
      'Leaving the certificate incomplete or with contradictory values',
    ],
  },
  {
    id: 'fault-diagnosis',
    code: 'Task D',
    title: 'Fault Diagnosis & Rectification',
    duration: 45,
    summary: 'Locate and correctly identify a set of introduced faults using a logical method, then rectify them safely.',
    steps: [
      'Gather information: what is the reported symptom, what changed recently',
      'Carry out safe isolation before any fault-finding on dead circuits',
      'Visual inspection first — obvious faults are often visible',
      'Use a logical method: e.g. divide the circuit in half, then narrow down',
      'Confirm findings with correct test instrument for each fault type',
      'State each fault clearly and accurately, referencing location and type',
      'Rectify the fault correctly and safely',
      'Re-test and re-inspect to confirm the fault is fully cleared',
      'Restore supply and confirm circuit operates correctly',
    ],
    mistakes: [
      'Guessing rather than following a systematic method',
      'Not isolating before probing/repairing a "dead" fault',
      'Fixing a symptom without identifying the actual root cause',
      'Failing to re-test after the repair to confirm it is cleared',
      'Running out of time due to no clear method or plan',
    ],
  },
  {
    id: 'ancillary',
    code: 'Task E',
    title: 'Ancillary (Knowledge Questions)',
    duration: 20,
    summary: 'Answer an assessor\u2019s short oral/written questions on regulations, safe working practice and your own work.',
    steps: [
      'Be ready to explain why you chose specific cable sizes/protective devices',
      'Know your isolation and safe working procedures cold — you may be asked directly',
      'Understand basic BS 7671 requirements relevant to the task (e.g. Part 4 protection)',
      'Be able to explain the purpose of each test you carried out in Task C',
      'Know your health & safety responsibilities on a live site',
      'Be able to justify decisions made during installation and fault-finding',
    ],
    mistakes: [
      'Freezing instead of talking through your reasoning out loud',
      'Not knowing the "why" behind a step, only the "what"',
      'Contradicting what you actually did during the practical tasks',
    ],
  },
]

// ---------------------------------------------------------- Quiz bank -----
// Scenario-style multiple choice questions modelled on the five AM2 task
// areas above, for the timed mock-exam mode.
export const AM2_QUIZ_QUESTIONS = [
  { id: 'si-1', taskId: 'safe-isolation', text: 'Before testing a circuit dead, what must you do with your voltage indicator?', options: ['Nothing, just use it', 'Prove it on a known live source or proving unit', 'Only check the battery level', 'Calibrate it on site with a multimeter'], correct: 'Prove it on a known live source or proving unit', explanation: 'The GS38 dead-testing procedure is prove-test-prove: prove the tester works, test the circuit is dead, then prove the tester still works afterwards.' },
  { id: 'si-2', taskId: 'safe-isolation', text: 'After isolating a circuit, who should hold the key or means of releasing the lock-off device?', options: ['Whoever is nearby', 'The site supervisor only', 'The person carrying out the work', 'It can be left in the consumer unit'], correct: 'The person carrying out the work', explanation: 'The person doing the work must retain sole control of the isolation to prevent anyone re-energising the circuit while they are exposed to danger.' },
  { id: 'si-3', taskId: 'safe-isolation', text: 'On a single-phase circuit, which conductor combinations should be tested to confirm dead?', options: ['L-N only', 'L-E only', 'L-N, L-E and N-E', 'N-E only'], correct: 'L-N, L-E and N-E', explanation: 'All three combinations must be tested; a fault could exist that leaves one combination live even if another reads dead.' },
  { id: 'si-4', taskId: 'safe-isolation', text: 'What should a warning notice at the point of isolation state?', options: ['Nothing, a lock is enough', 'Who isolated the circuit and why', 'The postcode of the site', 'The date the installation was built'], correct: 'Who isolated the circuit and why', explanation: 'A warning notice tells anyone else on site that the circuit has been deliberately isolated, by whom, and why, preventing accidental reconnection.' },
  { id: 'si-5', taskId: 'safe-isolation', text: 'Isolating a circuit by switching it off at the consumer unit without locking off is:', options: ['Fully compliant safe isolation', 'Acceptable only for lighting circuits', 'Not safe isolation on its own', 'Only needed for three-phase supplies'], correct: 'Not safe isolation on its own', explanation: 'Switching off alone does not prevent someone else switching the supply back on — a lock-off device and retained key are required.' },
  { id: 'in-1', taskId: 'installation', text: 'Before starting first fix, what should you always check first?', options: ['The colour of the tea room walls', 'The full task brief and drawing', 'Only the cable lengths available', 'The time on your phone'], correct: 'The full task brief and drawing', explanation: 'Working from the brief and drawing avoids wiring the wrong circuit configuration or positioning accessories incorrectly, which is hard to fix later.' },
  { id: 'in-2', taskId: 'installation', text: 'Why should containment be fixed square and level, not just "close enough"?', options: ['It is purely cosmetic and doesn’t matter', 'It is assessed as part of workmanship and affects fixing integrity', 'It slows down inspection', 'BS 7671 does not mention workmanship'], correct: 'It is assessed as part of workmanship and affects fixing integrity', explanation: 'Neat, secure containment is both a workmanship mark and a practical requirement — poorly fixed containment can fail or damage cables over time.' },
  { id: 'in-3', taskId: 'installation', text: 'Reversed polarity at a ceiling rose or accessory found during your own visual check should be:', options: ['Left for the assessor to find', 'Corrected before moving on to testing', 'Ignored if the light still works', 'Only a problem on three-phase circuits'], correct: 'Corrected before moving on to testing', explanation: 'Reversed polarity is a safety fault. Catching and correcting it yourself during inspection avoids a failed test result later.' },
  { id: 'in-4', taskId: 'installation', text: 'What is the main risk of not planning your first-fix cable routes before starting?', options: ['Nothing, cables can always be re-routed later', 'Running out of time or damaging containment already fixed', 'It only affects appearance', 'It has no impact on the fault diagnosis task'], correct: 'Running out of time or damaging containment already fixed', explanation: 'AM2 installation tasks are time-limited; poor planning leads to rework, wasted time, and can damage already-installed containment or cabling.' },
  { id: 'it-1', taskId: 'inspection-testing', text: 'What must be completed before any dead testing begins?', options: ['Functional testing of RCDs', 'A thorough visual inspection', 'Insulation resistance test', 'Zs testing'], correct: 'A thorough visual inspection', explanation: 'BS 7671 requires visual inspection to precede testing — some faults are visible and should be caught (and safely made good) before energising or testing.' },
  { id: 'it-2', taskId: 'inspection-testing', text: 'Insulation resistance testing is normally carried out:', options: ['With the circuit still energised', 'With the circuit isolated and dead', 'Only after Zs testing', 'Only on three-phase circuits'], correct: 'With the circuit isolated and dead', explanation: 'Insulation resistance tests apply a DC test voltage and must only be performed on a de-energised, isolated circuit to avoid damage and danger.' },
  { id: 'it-3', taskId: 'inspection-testing', text: 'Earth fault loop impedance (Zs) should be measured:', options: ['At the origin of the installation only', 'At the furthest point of each circuit', 'Only where RCDs are fitted', 'Only during the fault diagnosis task'], correct: 'At the furthest point of each circuit', explanation: 'Testing at the furthest point (the worst case) confirms disconnection times will be met even at the extremity of the circuit.' },
  { id: 'it-4', taskId: 'inspection-testing', text: 'A polarity check before energising is used to confirm:', options: ['Cable colour matches drawing only', 'Line, neutral and switching are correctly connected throughout', 'The RCD trips within time', 'The consumer unit is correctly labelled'], correct: 'Line, neutral and switching are correctly connected throughout', explanation: 'Correct polarity ensures single-pole devices switch the line conductor and prevents live parts remaining energised when a device is switched "off".' },
  { id: 'it-5', taskId: 'inspection-testing', text: 'An RCD functional test (using the integral test button) confirms:', options: ['Its trip time complies with BS 7671', 'The mechanical trip mechanism operates', 'The earth loop impedance value', 'The continuity of the ring final circuit'], correct: 'The mechanical trip mechanism operates', explanation: 'The test button checks the device mechanically trips; the actual trip time is confirmed separately with an RCD test instrument at rated/5x current.' },
  { id: 'it-6', taskId: 'inspection-testing', text: 'If a schedule of test results shows contradictory or missing values, this is treated as:', options: ['A minor presentation issue only', 'A serious problem — accurate records are part of the assessed task', 'Not assessed at all', 'Acceptable as long as the installation works'], correct: 'A serious problem — accurate records are part of the assessed task', explanation: 'Certification accuracy is a core competence being assessed — the paperwork must reflect real, correctly obtained readings.' },
  { id: 'fd-1', taskId: 'fault-diagnosis', text: 'What is the first step when starting a fault-finding task?', options: ['Start disconnecting components at random', 'Gather information about the symptom and any recent changes', 'Replace the consumer unit', 'Call the client immediately'], correct: 'Gather information about the symptom and any recent changes', explanation: 'A systematic approach begins with information gathering — understanding the reported symptom focuses the search and saves time.' },
  { id: 'fd-2', taskId: 'fault-diagnosis', text: 'Before physically investigating a "dead" fault on a circuit, you must:', options: ['Assume it is already isolated', 'Carry out safe isolation', 'Only wear gloves', 'Test with your hand first'], correct: 'Carry out safe isolation', explanation: 'Any dead fault-finding still requires a full safe isolation procedure — never assume a circuit is safe without proving it.' },
  { id: 'fd-3', taskId: 'fault-diagnosis', text: 'A logical fault-finding method such as "halving the circuit" is preferred because it:', options: ['Looks impressive to the assessor', 'Narrows down the fault location efficiently within time limits', 'Avoids the need for test instruments', 'Is required only for three-phase faults'], correct: 'Narrows down the fault location efficiently within time limits', explanation: 'Dividing the circuit and testing sections systematically narrows the fault location quickly, which matters heavily under AM2 time pressure.' },
  { id: 'fd-4', taskId: 'fault-diagnosis', text: 'After rectifying a diagnosed fault, what must you do before considering the task complete?', options: ['Move straight to the next task', 'Re-test and re-inspect to confirm the fault is fully cleared', 'Just visually check the repair', 'Nothing further is required'], correct: 'Re-test and re-inspect to confirm the fault is fully cleared', explanation: 'A repair is only confirmed complete once it has been re-tested and shown to meet requirements — never assume a fix has worked.' },
  { id: 'fd-5', taskId: 'fault-diagnosis', text: 'Correctly identifying the fault type and location but failing to state it clearly on the report will likely:', options: ['Still gain full marks', 'Cost marks — findings must be clearly and accurately recorded', 'Have no impact', 'Only matter for Task C'], correct: 'Cost marks — findings must be clearly and accurately recorded', explanation: 'Assessment relies on what you record as well as what you find — an unclear or missing statement of the fault can be marked as not identified.' },
  { id: 'an-1', taskId: 'ancillary', text: 'During the ancillary/oral questioning, you are typically expected to:', options: ['Recite BS 7671 word for word', 'Explain and justify decisions made during your practical tasks', 'Only answer yes/no', 'Avoid discussing your own work'], correct: 'Explain and justify decisions made during your practical tasks', explanation: 'This task checks understanding, not memorisation — you should be able to explain why you did what you did, not just recall a definition.' },
  { id: 'an-2', taskId: 'ancillary', text: 'If asked why you selected a particular protective device rating, a strong answer references:', options: ['"That’s what was in the van"', 'Cable current-carrying capacity, disconnection time and coordination with the circuit', 'The cheapest option available', 'The colour of the device'], correct: 'Cable current-carrying capacity, disconnection time and coordination with the circuit', explanation: 'Protective device selection should be justified with reference to design current, cable rating and required disconnection times under BS 7671.' },
  { id: 'an-3', taskId: 'ancillary', text: 'Giving an oral answer that contradicts what you actually did in the practical tasks is a problem because:', options: ['It is not a problem at all', 'Assessors cross-reference your practical work with your explanation', 'Oral answers are not assessed', 'It only affects Task A'], correct: 'Assessors cross-reference your practical work with your explanation', explanation: 'The ancillary task is designed to confirm genuine understanding, so inconsistency between your actions and your explanation is a red flag.' },
]

export const AM2_TOTAL_TIME_MIN = AM2_TASKS.reduce((sum, t) => sum + t.duration, 0)
