# Component Architecture - LockedTestScreen Fix

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER VISITS PAGE                         │
│              /ecs-black-card-mock-test                          │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Page Component Loads                          │
│        (BlackCardMockTest / GenericMockTest / etc)              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Check User Access                              │
│          canAccessTest(pathname, isPro)                         │
│                                                                 │
│  ├─ User is Pro? → YES ─→ Show Full Test ✓                    │
│  └─ User is Free? → NO ──→ Continue...                         │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────────┐
│              Show LockedTestScreen Component                     │
│                                                                  │
│  Props Received:                                                │
│  ├─ testName: "ECS Black Card Mock Test"                       │
│  ├─ testPath: "/ecs-black-card-mock-test" (optional)           │
│  ├─ previewQuestions: [3 questions] (optional)                 │
│  └─ testStats: { totalQuestions, passMark, duration }          │
└──────────────────────┬──────────────────────────────────────────┘
                       │
    ┌──────────────────┴──────────────────┐
    │                                     │
    ▼                                     ▼
 Route A:                             Route B:
 GenericMockTest                       Standalone Pages
 (uses testPath)                       (uses previewQuestions)
    │                                     │
    ▼                                     ▼
Load from extraTests                 Use passed previewQuestions
config[testPath]                      + testStats object
    │                                     │
    └──────────────────┬──────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────┐
        │  Render Preview Section          │
        │  ├─ Test title & metadata        │
        │  ├─ 3 sample questions           │
        │  └─ Pass mark / duration         │
        └──────────────────┬───────────────┘
                           │
                           ▼
        ┌──────────────────────────────────┐
        │  Render Paywall Section          │
        │  ├─ Feature comparison table     │
        │  ├─ Upgrade button               │
        │  └─ Back to tests link           │
        └──────────────────┬───────────────┘
                           │
                           ▼
        ┌──────────────────────────────────┐
        │  USER SEES COMPLETE PAGE         │
        │  ✓ Preview questions visible     │
        │  ✓ Test metadata shown           │
        │  ✓ Paywall below preview         │
        │  ✓ Can't submit answers          │
        └──────────────────────────────────┘
```

---

## Component Hierarchy

```
App.jsx (Routes)
│
├─ GenericMockTest.jsx
│  ├─ Check canAccessTest()
│  ├─ If locked:
│  │  └─ LockedTestScreen
│  │     ├─ props: testName, testPath
│  │     ├─ loads extraTests[testPath]
│  │     └─ displays preview + paywall
│  └─ If unlocked:
│     └─ Full test UI (questions, timer, etc)
│
├─ BlackCardMockTest.jsx
│  ├─ Check canAccessTest()
│  ├─ If locked:
│  │  └─ LockedTestScreen
│  │     ├─ props: testName, previewQuestions, testStats
│  │     └─ displays preview + paywall
│  └─ If unlocked:
│     └─ Full test UI
│
├─ GreenCardMockTest.jsx
│  └─ (same structure as BlackCardMockTest)
│
├─ ManagerTest.jsx
│  └─ (same structure as BlackCardMockTest)
│
├─ SkilledWorkerTest.jsx
│  └─ (same structure as BlackCardMockTest)
│
└─ SupervisorTest.jsx
   └─ (same structure as BlackCardMockTest)
```

---

## LockedTestScreen Component Internals

```
LockedTestScreen({ testName, testPath, previewQuestions, testStats })
│
├─ Props Management
│  ├─ testName: String (required)
│  ├─ testPath: String (optional, for GenericMockTest)
│  ├─ previewQuestions: Array (optional, for standalone pages)
│  └─ testStats: Object (optional, for standalone pages)
│
├─ Data Loading
│  └─ useMemo(() => {
│     ├─ If previewQuestions passed: use those
│     ├─ Else if testPath provided:
│     │  └─ Load from extraTests[testPath]
│     │     ├─ Get questions array
│     │     ├─ Call getQuestions() if function
│     │     └─ Slice first 3 items
│     └─ Return previewQuestions
│     })
│
├─ State Calculation
│  ├─ passMark: from testStats OR config OR 0.8
│  ├─ totalQuestions: from testStats OR config OR 0
│  ├─ testDuration: from testStats OR config OR 1800
│  └─ minutes: Math.floor(testDuration / 60)
│
├─ Render Sections
│  │
│  ├─ Header Section
│  │  ├─ Test title
│  │  ├─ Metadata row
│  │  │  ├─ # of questions
│  │  │  ├─ Pass mark %
│  │  │  └─ Duration
│  │  ├─ Timer display (disabled)
│  │  └─ Official guidance (if available)
│  │
│  ├─ Preview Section
│  │  ├─ "Preview: Sample Questions" heading
│  │  └─ Loop through previewQuestions[0..2]:
│  │     ├─ Question number badge
│  │     ├─ Full question text
│  │     ├─ Options (A, B, C, D, etc)
│  │     └─ "Full explanation available to Pro members"
│  │     (All with opacity-75 + pointer-events-none)
│  │
│  └─ Paywall Section
│     ├─ Hero Section
│     │  ├─ Lock icon
│     │  ├─ "Unlock Full Test Access"
│     │  └─ Value prop text
│     │
│     ├─ Comparison Table
│     │  ├─ Left: "With Free Preview"
│     │  │  ├─ ✓ See sample questions
│     │  │  ├─ ✓ View test structure
│     │  │  ├─ ✓ Read official guidance
│     │  │  ├─ ✗ Cannot submit answers
│     │  │  ├─ ✗ No AI explanations
│     │  │  └─ ✗ No progress tracking
│     │  │
│     │  └─ Right: "With Pro Upgrade"
│     │     ├─ ✓ Full test access
│     │     ├─ ✓ All {totalQuestions} questions
│     │     ├─ ✓ AI answer explanations
│     │     ├─ ✓ Real-time scoring
│     │     ├─ ✓ Full analytics
│     │     └─ ✓ Unlimited attempts
│     │
│     ├─ CTA Buttons
│     │  ├─ Primary: "Upgrade to Pro" → /plans
│     │  └─ Secondary: "Back to available tests" → /mock-test
│     │
│     └─ Authentication-aware button text
│        ├─ If authenticated: "Upgrade to Pro"
│        └─ If not authenticated: "Sign up & See Plans"
│
└─ Utilities
   ├─ useAuth() hook
   │  └─ isAuthenticated: bool
   ├─ extraTests config
   │  └─ Dynamic test data loading
   └─ Tailwind classes for styling
```

---

## Data Structures

### Props for GenericMockTest Route

```javascript
// From GenericMockTest.jsx
<LockedTestScreen 
  testName={config.title}           // "ECS HSE Full Exam"
  testPath={location.pathname}      // "/ecs-hse-full-exam"
/>

// Component reads from:
// extraTests['/ecs-hse-full-exam'] = {
//   title: "...",
//   duration: 1800,
//   passMark: 0.8,
//   questions: [...],
//   getQuestions: () => [...],
//   icon: "📋",
//   info: { official: true, ... }
// }
```

### Props for Standalone Test Pages

```javascript
// From BlackCardMockTest.jsx
<LockedTestScreen 
  testName="ECS Black Card Mock Test"
  previewQuestions={fullQuestionBank.slice(0, 3)}
  testStats={{
    totalQuestions: fullQuestionBank.length,  // 100+
    passMark: 0.8,                           // 80%
    duration: 1800                           // 30 min
  }}
/>
```

### Question Object Structure

```javascript
{
  // For options-based questions
  id: 1,
  text: "Question text here...",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: "Option B",
  explanation: "Explanation text...",
  
  // Alternative structure (some tests use 'answers')
  // answers: [...same as options...]
  
  // Optional fields
  topic: "health-safety",
  difficulty: "medium",
  category: "Health & Safety",
  categoryId: 1
}
```

---

## Styling Approach

### Components Used
- **Tailwind CSS**: All styling via utility classes
- **React Icons**: FaLock, FaCheckCircle, FaClock, FaArrowRight
- **Gradient backgrounds**: from-purple-50 to-blue-50
- **Responsive grid**: md:grid-cols-2 for comparison table

### Key CSS Classes
- `opacity-75 pointer-events-none` - Disabled preview questions
- `bg-gradient-to-r / from-purple-600 to-blue-600` - Hero section
- `rounded-2xl shadow-lg` - Card styling
- `border-2 border-purple-200` - Card border

### Mobile Responsiveness
- `flex-wrap gap-4` - Header wraps on small screens
- `md:grid-cols-2` - Comparison table stacks on mobile
- `max-w-4xl mx-auto` - Contained width
- `p-6 md:p-8` - Responsive padding

---

## State Management

### What LockedTestScreen Manages
```javascript
// Props only - no useState needed
// All data comes from props or extraTests config

const config = testPath ? extraTests[testPath] : null
const { isAuthenticated } = useAuth()
const previewQuestions = useMemo(() => {...})
const passMark = testStats?.passMark ?? config?.passMark ?? 0.8
const totalQuestions = testStats?.totalQuestions ?? config?.questions?.length ?? 0
const testDuration = testStats?.duration ?? config?.duration ?? 1800
```

### What Calling Components Manage
- **GenericMockTest**: Full test state + access control
- **BlackCardMockTest**: Full test state + access control
- **Access check**: Done in each test page with `canAccessTest()`

---

## Error Handling

### Null/Undefined Safety

```javascript
// Safe access with optional chaining
const passMark = testStats?.passMark ?? config?.passMark ?? 0.8

// Safe array access
const previewQuestions = 
  passedPreviewQuestions?.slice(0, 3) ??
  config?.questions?.slice(0, 3) ??
  []

// Safe function calls
const questions = 
  typeof config.getQuestions === 'function'
    ? config.getQuestions()
    : (config?.questions || [])
```

### Graceful Degradation
- If no previewQuestions: component still renders
- If no testStats: uses defaults (0.8 pass mark, 1800 duration)
- If no config: shows test name and paywall only

---

## Integration Points

### With Authentication
```javascript
import { useAuth } from '../context/AuthContext'
const { isAuthenticated } = useAuth()
// Used for: "Sign up & See Plans" vs "Upgrade to Pro"
```

### With Routing
```javascript
import { Link } from 'react-router-dom'
// Link to="/plans" - Upgrade button
// Link to="/mock-test" - Back to tests
```

### With Test Data
```javascript
import { extraTests } from '../data/extraTests'
// Dynamic test config loading
// Supports both: static questions array OR getQuestions() function
```

### With Access Control
```javascript
import { canAccessTest } from '../lib/testAccess'
// Checks if user has access before showing LockedTestScreen
```

---

## Performance Considerations

### Optimization Techniques

1. **useMemo for preview questions**
   - Prevents recalculation on every render
   - Depends on: [config, passedPreviewQuestions]

2. **Lazy questions loading**
   - GenericMockTest loads questions on demand
   - getQuestions() called only when needed

3. **No excessive re-renders**
   - LockedTestScreen is a pure component
   - Only re-renders if props change

4. **CSS-based disabled state**
   - Uses `opacity-75 pointer-events-none`
   - No JavaScript to disable interactions

### Bundle Size Impact
- **LockedTestScreen**: ~7.6 KB (already exists)
- **No new dependencies added**
- **No performance regression expected**

---

## Testing Checklist

### Unit Testing (What to verify)
- [ ] Preview questions load correctly
- [ ] Test metadata displays
- [ ] Paywall section appears
- [ ] Authentication-aware button text changes
- [ ] No console errors

### Integration Testing
- [ ] GenericMockTest route shows preview
- [ ] BlackCardMockTest route shows preview
- [ ] All test pages load without errors
- [ ] Navigation links work (/plans, /mock-test)
- [ ] Mobile layout responsive

### E2E Testing
- [ ] Visit locked page as anonymous user
- [ ] See preview questions
- [ ] Try to submit (should fail or be disabled)
- [ ] Click upgrade button → goes to /plans
- [ ] Click back button → goes to /mock-test

---

## Summary

The LockedTestScreen fix is a **component-level enhancement** that:

1. Accepts questions either via **props** (standalone pages) or **testPath** (GenericMockTest)
2. Renders a **preview section** with 3 sample questions  
3. Displays **test metadata** (questions, pass mark, duration)
4. Shows a **paywall section** with upgrade options
5. Maintains **Pro-only access** to full test functionality

**Result**: Converts 55+ thin content pages into valuable educational previews ✅
