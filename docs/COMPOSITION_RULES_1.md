# UX Composition Guidelines (Flexible)

## Core Principle: Visual Hierarchy, Not Arbitrary Limits

**Goal:** User knows what action to take without confusion.  
**Method:** Visual hierarchy through size, color, position - NOT by limiting number of elements.

---

## How AI Should Read FRD Documents

### Step 1: Extract User Goals from FRD

**FRD Example:**
```
Feature: User Management Dashboard
Requirements:
- Admins can view list of all users
- Admins can add new users
- Admins can export user data to CSV
- Admins can filter users by status (active/inactive)
```

**AI Should Extract:**
```
Primary Goal: View users
Secondary Goals: Add user, Export data, Filter
User Type: Admin
Data: List of users with status
```

### Step 2: Map FRD to Screen Pattern

**FRD Patterns → Screen Templates:**

| FRD Says | AI Should Use |
|----------|---------------|
| "View list of X" | DashboardShell + Table |
| "Create/Add X" | Modal or Form page |
| "Compare X metrics" | Dashboard with metric cards + charts |
| "Analyze X over time" | Charts (Line/Bar) + date filter |
| "Browse X catalog" | Grid of cards (products/items) |
| "Configure X settings" | Form with sections (Tabs or Accordion) |
| "Approve/Review X" | Stepper (multi-step workflow) |
| "Upload/Import X" | FileUpload component + Table preview |

**Example Mapping:**

```
FRD: "Sales dashboard showing revenue, orders, and top products"

AI Maps To:
✓ DashboardShell (admin layout)
✓ 3 metric cards (revenue, orders, conversion)
✓ 1 line chart (revenue over time)
✓ 1 table (top products)
```

---

## High-Level Visual Structure (Before Code)

### The 5 Visual Zones

Every screen should have a **clear visual structure** before AI writes code:

```
┌─────────────────────────────────────┐
│ ZONE 1: Header/Topbar               │ ← Page title, search, profile
├─────────────────────────────────────┤
│ ZONE 2: Primary Action              │ ← Main CTA (Add, Create, etc)
├─────────────────────────────────────┤
│ ZONE 3: Filters/Navigation          │ ← Tabs, filters, date range
├─────────────────────────────────────┤
│ ZONE 4: Content (Main Focus)        │ ← Table, charts, cards, form
│                                     │
│                                     │
├─────────────────────────────────────┤
│ ZONE 5: Secondary Actions/Context   │ ← Pagination, footer, help
└─────────────────────────────────────┘
```

### AI Must Define Zones BEFORE Coding

**Wrong Process:**
```
AI: [immediately writes JSX code]
```

**Right Process:**
```
AI: "Screen structure:
Zone 1: AppTopbar with 'Users Dashboard' title + search
Zone 2: Primary button 'Add User' (top-right)
Zone 3: Tabs for 'All', 'Active', 'Inactive'
Zone 4: Table with user data (name, email, status, actions)
Zone 5: Pagination (10 per page)

Now generating code..."
```

### Visual Hierarchy Checklist (AI Must Answer)

Before writing code, AI must answer:

1. **What's the primary focus?** (Table? Chart? Form?)
2. **What's the main action?** (Add? Export? Submit?)
3. **How is content grouped?** (Sections? Tabs? Cards?)
4. **What creates visual rhythm?** (Grid? List? Mixed?)
5. **Where does the eye go first?** (Top-left metric? Hero chart?)

---

## UX Flow Patterns (User Journey)

### Pattern 1: View → Action Flow

**User Journey:**
```
1. User lands on screen
2. User scans content (table/cards)
3. User takes action (Add/Edit/Delete)
```

**Visual Structure:**
```tsx
<DashboardShell>
  {/* Step 1: User sees title */}
  <AppTopbar title="Users" />
  
  {/* Step 2: User scans data */}
  <Table data={users} />
  
  {/* Step 3: User acts */}
  <Button variant="primary" onClick={openAddModal}>
    Add User
  </Button>
</DashboardShell>
```

---

### Pattern 2: Filter → View → Action Flow

**User Journey:**
```
1. User lands on screen
2. User filters data (date range, category)
3. User views filtered results
4. User takes action
```

**Visual Structure:**
```tsx
<DashboardShell>
  {/* Step 1: Title */}
  <AppTopbar title="Sales Dashboard" />
  
  {/* Step 2: User filters */}
  <FilterRow>
    <DatePicker label="Date Range" />
    <Select label="Category" options={categories} />
    <Button variant="secondary">Apply Filters</Button>
  </FilterRow>
  
  {/* Step 3: User views results */}
  <div className="grid grid-cols-3 gap-4 mb-6">
    <MetricCard label="Revenue" value="$45K" />
    <MetricCard label="Orders" value="890" />
    <MetricCard label="Conversion" value="3.2%" />
  </div>
  
  <Card>
    <LineChart data={filteredRevenue} />
  </Card>
  
  {/* Step 4: User acts */}
  <Button variant="outline">Export Report</Button>
</DashboardShell>
```

---

### Pattern 3: Multi-Step Flow (Wizard)

**User Journey:**
```
1. User starts process
2. User completes step 1 (info)
3. User completes step 2 (details)
4. User reviews and submits
```

**Visual Structure:**
```tsx
<DashboardShell>
  <AppTopbar title="Create Product" />
  
  {/* Show progress */}
  <Stepper currentStep={1} totalSteps={3}>
    <StepperStep marker={1}>Basic Info</StepperStep>
    <StepperStep marker={2}>Details</StepperStep>
    <StepperStep marker={3}>Review</StepperStep>
  </Stepper>
  
  {/* Current step content */}
  <Card>
    <CardHeader>
      <CardTitle>Step 1: Basic Information</CardTitle>
    </CardHeader>
    <CardContent>
      <Form>
        <Input label="Product Name" />
        <TextArea label="Description" />
      </Form>
    </CardContent>
    <CardFooter>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Next: Details</Button>
    </CardFooter>
  </Card>
</DashboardShell>
```

---

## AI Decision Tree (From FRD to Code)

### Step-by-Step Process AI Must Follow:

```
1. READ FRD
   ↓
2. IDENTIFY USER GOAL
   - View data? → Table/Cards
   - Create something? → Form/Modal
   - Analyze trends? → Charts
   - Browse items? → Grid
   - Multi-step process? → Stepper
   ↓
3. DEFINE 5 VISUAL ZONES
   - Zone 1: Header/Title
   - Zone 2: Primary Action
   - Zone 3: Filters/Nav
   - Zone 4: Main Content
   - Zone 5: Secondary Actions
   ↓
4. MAP TO COMPONENTS
   - Choose from 78 components
   - Apply composition rules
   - Use design tokens
   ↓
5. WRITE CODE
   - Start with DashboardShell
   - Build zones top-to-bottom
   - Apply tokens (no hard-coded values)
   ↓
6. SELF-CHECK
   - Visual hierarchy clear?
   - User journey makes sense?
   - Tokens used correctly?
   - Accessible (WCAG 2.2 AA)?
```

---

## Common FRD → UX Mappings

### FRD: "Admin needs to manage users"

**UX Breakdown:**
```
Primary Goal: View all users
Secondary Goals: Add, Edit, Delete, Export

Visual Structure:
- Zone 1: Title "User Management"
- Zone 2: "Add User" button (primary, top-right)
- Zone 3: Tabs: All | Active | Inactive
- Zone 4: Table with columns (Name, Email, Status, Actions)
- Zone 5: Pagination

Components:
- DashboardShell
- AppTopbar
- Tabs
- Table
- Button (Add User - primary)
- Button per row (Edit - ghost, Delete - ghost)
```

---

### FRD: "Sales dashboard with revenue metrics"

**UX Breakdown:**
```
Primary Goal: View revenue performance
Secondary Goals: Filter by date, Export report

Visual Structure:
- Zone 1: Title "Sales Dashboard"
- Zone 2: Date range picker + Export button
- Zone 3: 4 metric cards (Revenue, Orders, Avg Order, Growth)
- Zone 4: Revenue trend chart (line chart)
- Zone 5: Top products table

Components:
- DashboardShell
- AppTopbar
- DatePicker
- Button (Export - secondary)
- MetricCard × 4
- Card + LineChart
- Card + Table
```

---

### FRD: "Multi-step product creation"

**UX Breakdown:**
```
Primary Goal: Create new product
Steps: Basic info → Images → Pricing → Review

Visual Structure:
- Zone 1: Title "Create Product"
- Zone 2: Stepper showing progress
- Zone 3: Current step form
- Zone 4: Help text / preview
- Zone 5: Back + Next buttons

Components:
- DashboardShell
- AppTopbar
- Stepper
- Card (for each step)
- Form (Input, TextArea, FileUpload)
- Button (Back - secondary, Next - primary)
```

---

## Information Density Guidelines

### Rule: Match density to user goal

**High Density (Scanning):**
```tsx
// User goal: Scan many items quickly
<div className="grid grid-cols-4 gap-3">
  {metrics.map(m => (
    <MetricCard key={m.id} compact label={m.label} value={m.value} />
  ))}
</div>
```
- ✓ Tight spacing (gap-3 = 24px)
- ✓ Compact cards
- ✓ 4 columns = scannable

**Medium Density (Comparing):**
```tsx
// User goal: Compare 2-3 items
<div className="grid grid-cols-2 gap-6">
  <Card>
    <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
    <CardContent><LineChart data={revenue} /></CardContent>
  </Card>
  <Card>
    <CardHeader><CardTitle>Orders</CardTitle></CardHeader>
    <CardContent><BarChart data={orders} /></CardContent>
  </Card>
</div>
```
- ✓ Moderate spacing (gap-6 = 48px)
- ✓ Detailed cards with headers
- ✓ 2 columns = comparable

**Low Density (Focus):**
```tsx
// User goal: Complete complex form
<Card>
  <CardHeader>
    <CardTitle>Create Invoice</CardTitle>
    <CardDescription>Fill in details below</CardDescription>
  </CardHeader>
  <CardContent className="space-y-6">
    <Input label="Client Name" />
    <Input label="Amount" />
    <DatePicker label="Due Date" />
    <TextArea label="Notes" />
  </CardContent>
</Card>
```
- ✓ Wide spacing (space-y-6 = 48px between fields)
- ✓ Single column
- ✓ Generous padding = focus

---

## Responsive Behavior (AI Must Consider)

### Desktop → Tablet → Mobile

**AI must specify breakpoints:**

```tsx
// Desktop: 4 columns
// Tablet: 2 columns
// Mobile: 1 column

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <MetricCard />
  <MetricCard />
  <MetricCard />
  <MetricCard />
</div>
```

### Critical Responsive Rules:

1. **Metrics cards:** 4 cols (desktop) → 2 cols (tablet) → 1 col (mobile)
2. **Charts:** 2 cols (desktop) → 1 col (tablet/mobile)
3. **Tables:** Full width always, horizontal scroll on mobile
4. **Forms:** 1 col always (never 2-col forms on mobile)
5. **Sidebar:** Collapsible on tablet, drawer on mobile

---

## Accessibility Checklist (AI Must Verify)

Before generating code, AI checks:

```
□ All interactive elements ≥ 44×44px touch target?
□ Focus rings visible (using --color-focus-ring)?
□ Color contrast ≥ 4.5:1 for text?
□ Form labels associated with inputs?
□ Table headers defined (<TableHead>)?
□ Modal has aria-label?
□ Loading states have aria-busy?
□ Error messages linked to inputs (aria-describedby)?
```

---

## Error Prevention (Common AI Mistakes)

### ❌ AI Mistake 1: No Clear Primary Focus

**Bad:**
```tsx
<DashboardShell>
  <MetricCard />
  <Chart />
  <Table />
  <Form />
</DashboardShell>
```
**Problem:** What should user look at first?

**Fix:** Define primary focus
```tsx
<DashboardShell>
  {/* Primary focus: Revenue chart */}
  <Card className="col-span-full mb-6">
    <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
    <CardContent><LineChart height={400} /></CardContent>
  </Card>
  
  {/* Supporting metrics */}
  <div className="grid grid-cols-4 gap-4">
    <MetricCard />
    <MetricCard />
    <MetricCard />
    <MetricCard />
  </div>
</DashboardShell>
```

---

### ❌ AI Mistake 2: Ignoring User Journey

**Bad:**
```tsx
<Form>
  <Button variant="primary">Submit</Button>
  <Input label="Name" />
  <Input label="Email" />
</Form>
```
**Problem:** Button before inputs (wrong visual flow)

**Fix:** Follow natural reading order
```tsx
<Form>
  <Input label="Name" />
  <Input label="Email" />
  <div className="flex justify-end gap-2 mt-6">
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Submit</Button>
  </div>
</Form>
```

---

### ❌ AI Mistake 3: No Visual Grouping

**Bad:**
```tsx
<div>
  <MetricCard label="Revenue" />
  <Chart />
  <MetricCard label="Orders" />
  <Table />
</div>
```
**Problem:** No sections, random order

**Fix:** Group by type/function
```tsx
<DashboardShell>
  {/* Metrics Section */}
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Overview</h2>
    <div className="grid grid-cols-2 gap-4">
      <MetricCard label="Revenue" />
      <MetricCard label="Orders" />
    </div>
  </section>
  
  {/* Analytics Section */}
  <section className="mb-8">
    <h2 className="text-xl font-semibold mb-4">Performance</h2>
    <Card><Chart /></Card>
  </section>
  
  {/* Data Section */}
  <section>
    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
    <Card><Table /></Card>
  </section>
</DashboardShell>
```

---

## Summary: AI Must Think Like a UX Designer

**Before writing ANY code, AI answers:**

1. ✅ What's the user's primary goal? (from FRD)
2. ✅ What screen pattern matches this goal?
3. ✅ What are the 5 visual zones?
4. ✅ What creates visual hierarchy?
5. ✅ What's the user journey/flow?
6. ✅ Is information density appropriate?
7. ✅ Is it responsive?
8. ✅ Is it accessible?

**Only then → Write code**

---

## Multiple CTAs: When It's OK (And How)

### ✅ Scenario 1: Different Actions, Clear Hierarchy

**Dashboard with 2 Primary CTAs:**

```tsx
<DashboardShell>
  <PageHeader>
    <h1>Users Dashboard</h1>
    <div className="flex gap-2">
      <Button variant="primary" size="lg">Add User</Button>  {/* Main action */}
      <Button variant="primary" size="md">Import CSV</Button> {/* Secondary action */}
    </div>
  </PageHeader>
</DashboardShell>
```

**Why this works:**
- ✓ Size difference creates hierarchy (lg vs md)
- ✓ Position creates hierarchy (left = primary)
- ✓ Both are valid "positive" actions (not competing)

---

### ✅ Scenario 2: Grouped Actions (Action Palette)

**Dashboard with 4+ CTAs:**

```tsx
<Card>
  <CardHeader>
    <CardTitle>Quick Actions</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-2 gap-3">
      <Button variant="primary">Create Invoice</Button>
      <Button variant="primary">Add Product</Button>
      <Button variant="primary">New Customer</Button>
      <Button variant="primary">Generate Report</Button>
    </div>
  </CardContent>
</Card>
```

**Why this works:**
- ✓ Grouped in a container (card) = "action palette" pattern
- ✓ Equal visual weight = no confusion (all equal priority)
- ✓ User expects to choose one action from the palette

---

### ✅ Scenario 3: Contextual CTAs (Different Sections)

**Dashboard with Multiple Sections:**

```tsx
<DashboardShell>
  {/* Section 1: Users */}
  <Card>
    <CardHeader>
      <CardTitle>Active Users</CardTitle>
      <CardAction>
        <Button variant="primary">Add User</Button>
      </CardAction>
    </CardHeader>
  </Card>

  {/* Section 2: Products */}
  <Card>
    <CardHeader>
      <CardTitle>Products</CardTitle>
      <CardAction>
        <Button variant="primary">Add Product</Button>
      </CardAction>
    </CardHeader>
  </Card>
</DashboardShell>
```

**Why this works:**
- ✓ Each CTA is scoped to its section
- ✓ Visual separation prevents confusion
- ✓ User knows "Add User" acts on Users, "Add Product" acts on Products

---

### ❌ When Multiple CTAs Fail

**Bad: Competing Actions at Same Level**

```tsx
<div className="flex gap-2">
  <Button variant="primary" size="lg">Save Draft</Button>
  <Button variant="primary" size="lg">Publish Now</Button>
  <Button variant="primary" size="lg">Schedule</Button>
</div>
```

**Why this fails:**
- ❌ Same size = no hierarchy
- ❌ Competing actions (mutually exclusive)
- ❌ User doesn't know which to choose

**Fix: Use Visual Hierarchy**

```tsx
<div className="flex gap-2">
  <Button variant="primary" size="lg">Publish Now</Button>      {/* Main action */}
  <Button variant="secondary" size="md">Save Draft</Button>     {/* Alternative */}
  <Button variant="outline" size="md">Schedule...</Button>      {/* Advanced */}
</div>
```

---

## Multiple Cards: When It's OK (And How)

### ✅ Scenario 1: Metric Cards (4, 6, 8+ Cards)

**Dashboard with 8 Metric Cards:**

```tsx
<div className="grid grid-cols-4 gap-4">
  <MetricCard label="Total Users" value="12,345" />
  <MetricCard label="Revenue" value="$45,678" />
  <MetricCard label="Orders" value="890" />
  <MetricCard label="Conversion" value="3.2%" />
  <MetricCard label="New Users" value="1,234" />
  <MetricCard label="Churn Rate" value="2.1%" />
  <MetricCard label="Avg Order" value="$51" />
  <MetricCard label="Sessions" value="45K" />
</div>
```

**Why this works:**
- ✓ Same type (all metrics) = scannable pattern
- ✓ Grid creates visual rhythm
- ✓ User expects to scan, not deep-read

---

### ✅ Scenario 2: Product Grid (20+ Cards)

**Product Catalog:**

```tsx
<div className="grid grid-cols-3 gap-6">
  {products.map(product => (
    <Card key={product.id}>
      <CardContent>
        <img src={product.image} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <Button variant="secondary" size="sm">View Details</Button>
      </CardContent>
    </Card>
  ))}
</div>
```

**Why this works:**
- ✓ Same type, same pattern = browsing interface
- ✓ User expects to scroll and browse
- ✓ Each card is lightweight (not overwhelming)

---

### ❌ When Multiple Cards Fail

**Bad: Different Card Types Mixed**

```tsx
<div className="grid grid-cols-3 gap-4">
  <Card shadow="lg"> {/* Large card with form */}
    <form>...</form>
  </Card>
  <Card shadow="sm"> {/* Metric card */}
    <MetricCard />
  </Card>
  <Card shadow="md"> {/* Chart card */}
    <LineChart />
  </Card>
</div>
```

**Why this fails:**
- ❌ Different shadows = visual inconsistency
- ❌ Different content types = cognitive load
- ❌ No clear pattern to scan

**Fix: Group by Type**

```tsx
{/* Metrics Row */}
<div className="grid grid-cols-4 gap-4 mb-6">
  <MetricCard />
  <MetricCard />
  <MetricCard />
  <MetricCard />
</div>

{/* Charts Row */}
<div className="grid grid-cols-2 gap-6 mb-6">
  <Card><LineChart /></Card>
  <Card><BarChart /></Card>
</div>

{/* Form Section */}
<Card>
  <form>...</form>
</Card>
```

---

## Updated Rules (Flexible)

### Rule 1: Visual Hierarchy Over Count Limits

**Old (Rigid):** Max 1 primary button per screen ❌

**New (Flexible):** 
- ✅ Multiple primaries OK if scoped to sections
- ✅ Multiple primaries OK if size/position creates hierarchy
- ✅ Multiple primaries OK if grouped as "action palette"
- ❌ Never put competing primaries at same level with same size

---

### Rule 2: Pattern Consistency Over Card Limits

**Old (Rigid):** Max 3 cards per screen ❌

**New (Flexible):**
- ✅ Many cards OK if same type (metrics, products, team members)
- ✅ Many cards OK if user expects to browse/scan
- ❌ Never mix different card types in same row/section
- ❌ Never use different shadows for same-level cards

---

### Rule 3: Information Architecture

**Group Related Content:**

```tsx
{/* ✓ Good: Grouped by function */}
<DashboardShell>
  {/* Metrics Section */}
  <section className="mb-8">
    <h2>Overview Metrics</h2>
    <div className="grid grid-cols-4 gap-4">
      {/* 4-8 metric cards */}
    </div>
  </section>

  {/* Charts Section */}
  <section className="mb-8">
    <h2>Performance Analytics</h2>
    <div className="grid grid-cols-2 gap-6">
      {/* 2-3 chart cards */}
    </div>
  </section>

  {/* Data Section */}
  <section>
    <h2>Recent Activity</h2>
    <Card>
      {/* Full-width table */}
    </Card>
  </section>
</DashboardShell>
```

---

### Rule 4: Cognitive Load Management

**Know When to Stop:**

For a **single screen**, consider:
- ✓ 4-8 metric cards = Good (scannable)
- ⚠ 12+ metric cards = Consider tabs or filtering
- ✓ 2-3 chart cards = Good (comparable)
- ⚠ 6+ chart cards = Too much, split into tabs
- ✓ 2-3 CTAs with hierarchy = Good
- ⚠ 5+ CTAs at top level = Use dropdown or menu

**Not a hard limit, but a warning signal to reconsider UX.**

---

## AI Generation Rules

Add to `AGENTS.md`:

### Multiple CTAs Guidelines

AI can use multiple primary buttons when:
1. **Different sections:** Each CTA scoped to its card/section
2. **Size hierarchy:** Larger CTA is main action, smaller is secondary
3. **Action palette:** Grouped in a "Quick Actions" card
4. **Position hierarchy:** Left/top CTA is primary

AI should NOT use multiple primaries when:
1. Actions are mutually exclusive (Save vs Publish)
2. Same size and position (creates confusion)
3. Competing for user attention

### Multiple Cards Guidelines

AI can use many cards when:
1. **Same type:** All metrics, all products, all team members
2. **Browsing pattern:** User expects to scan/browse
3. **Grouped by function:** Metrics section, Charts section, etc.

AI should limit cards when:
1. **Different types mixed:** Don't mix metrics + forms + charts in same row
2. **Cognitive overload:** 6+ complex cards on one screen
3. **No clear pattern:** Random cards with no visual rhythm

---

## Real-World Example: Admin Dashboard

```tsx
<DashboardShell
  topbar={
    <AppTopbar title="Admin Dashboard">
      {/* 3 CTAs with hierarchy */}
      <Button variant="primary" size="lg">Add User</Button>
      <Button variant="secondary" size="md">Import</Button>
      <Button variant="outline" size="md">Settings</Button>
    </AppTopbar>
  }
>
  {/* 8 Metric Cards */}
  <div className="grid grid-cols-4 gap-4 mb-6">
    <MetricCard label="Users" value="12K" />
    <MetricCard label="Revenue" value="$45K" />
    <MetricCard label="Orders" value="890" />
    <MetricCard label="Growth" value="+12%" />
    <MetricCard label="Active" value="8.9K" />
    <MetricCard label="Churn" value="2.1%" />
    <MetricCard label="LTV" value="$340" />
    <MetricCard label="Sessions" value="45K" />
  </div>

  {/* 2 Chart Cards */}
  <div className="grid grid-cols-2 gap-6 mb-6">
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm">Export</Button>
        </CardAction>
      </CardHeader>
      <CardContent><LineChart /></CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm">Export</Button>
        </CardAction>
      </CardHeader>
      <CardContent><BarChart /></CardContent>
    </Card>
  </div>

  {/* Table with Row Actions */}
  <Card>
    <CardHeader>
      <CardTitle>Recent Users</CardTitle>
      <CardAction>
        <Button variant="primary">View All</Button>
      </CardAction>
    </CardHeader>
    <CardContent>
      <Table 
        data={users}
        actions={row => (
          <>
            <Button variant="ghost" size="xs">Edit</Button>
            <Button variant="ghost" size="xs">Delete</Button>
          </>
        )}
      />
    </CardContent>
  </Card>
</DashboardShell>
```

**Why this works:**
- ✓ 3 top CTAs with size hierarchy (lg > md > md)
- ✓ 8 metric cards = same type, scannable pattern
- ✓ 2 chart cards = comparable analytics
- ✓ Card-level CTAs scoped to their sections
- ✓ Row-level actions for each table row
