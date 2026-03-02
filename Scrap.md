## AI AGENT PROMPT

You are tasked with producing a **single, submission-ready Jupyter Notebook** for a midterm data analysis project using the **StackOverflow Developer Survey 2025 dataset** (publicly available from Stack Overflow via Stack Overflow Developer Survey).

The notebook must strictly follow the grading rubric described below and be structured to maximize marks in every category.

---

# PRIMARY OBJECTIVE

Produce a polished, concise, well-structured Jupyter Notebook that earns **Level 4 in every rubric category**, including:

- Research Question
    
- Content Descriptions
    
- Conclusions
    
- Code Cells
    
- Cell Output
    
- Regex Usefulness (Option 1)
    
- Split-Apply-Combine
    
- Visualization Aesthetics
    
- Visualization Content (double weight)
    
- Basic Modelling
    

You MUST prioritize clarity, cohesion, and grading efficiency.

---

# DATASET

Use the **StackOverflow Developer Survey 2025 dataset**.

This dataset contains:

- Text-based multi-response columns (semicolon-separated technologies, tools, etc.)
    
- Continuous variables (CompTotal, YearsCode, YearsCodePro, etc.)
    
- Categorical variables (Country, Employment, EdLevel, DevType, etc.)
    

It satisfies project requirements for:

- ≥ 3 continuous variables
    
- ≥ 3 categorical variables
    
- Regex opportunities
    
- Groupby opportunities
    
- Modelling opportunities
    

---

# REQUIRED STRUCTURE OF NOTEBOOK

Follow this exact structure:

---

## 1. Title + Research Question

Does working with modern AI-related technologies in 2025 associate with higher compensation and different career trajectories, and does this relationship vary by experience level and geographic region?

---

## 2. Data Loading and Cleaning (Concise)

- Load dataset
    
- Show ONLY `df.head()` ONCE (first 6 rows max)
    
- Do not display full raw data again
    
- Remove unnecessary output
    
- Clean relevant variables only
    

Avoid:

- Printing entire DataFrame
    
- Showing redundant summaries
    

---

## 3. Required Variables

Ensure at least:

### Continuous (≥3)

- CompTotal (or converted annual compensation)
    
- YearsCode
    
- YearsCodePro
    
- Possibly Age (if available)
    

### Categorical (≥3)

- Country
    
- Employment
    
- DevType
    
- EdLevel
    

Use only variables relevant to the research question.

---

## 4. Regex Component (MANDATORY – Option 1)

You must use **regex in a meaningful and necessary way**.

Regex must:

- Operate on a text column
    
- Extract or define key variables
    
- Be essential to answering the research question
    

Recommended approach:

Use regex on semicolon-separated technology columns such as:

- LanguageHaveWorkedWith
    
- DatabaseHaveWorkedWith
    
- PlatformHaveWorkedWith
    

Example task:

Create indicator variables for:

- Python
    
- R
    
- Julia
    

Use regex pattern matching like:

- `r'\bPython\b'`
    
- `r'\bR\b'`
    
- `r'\bJulia\b'`
    

This MUST:

- Define grouping variables
    
- Be necessary for analysis
    
- Be used in modelling or visualization
    

To achieve Level 4:

- Regex should define core independent variable
    
- Without regex, the project could not proceed
    

---

## 5. Split-Apply-Combine (Groupby)

You must:

- Use meaningful groupings
    
- Derive insights
    
- Avoid trivial `.sum()` usage
    

Strong examples:

- Median compensation by language group
    
- Compensation by country AND language
    
- YearsCodePro by DevType among Python users
    
- Proportion of data-science-related roles by language group
    

Make groupings insightful and creative.

---

## 6. Visualization Requirements

### Aesthetics (Level 4 required)

- Clear axis labels
    
- Proper titles
    
- Clean legends
    
- Good color choices
    
- No clutter
    
- Only relevant plots
    

### Content (Double Weight – Must Be Strong)

Use:

- Boxplots for salary comparisons
    
- Bar plots for proportions
    
- Scatterplots with color-coded categories
    
- Possibly faceting or hue distinctions
    

Each plot must:

- Be referenced in text
    
- Directly support conclusions
    
- Reveal insight beyond raw data
    

No unnecessary plots.

---

## 7. Basic Modelling (Required)

Fit at least one model.

Acceptable models:

- Linear regression (CompTotal as outcome)
    
- Logistic regression (e.g., DataScience role vs not)
    
- Multiple regression with language indicators
    

Model must:

- Include at least one regex-derived variable
    
- Include at least one continuous predictor
    
- Include at least one categorical predictor
    

Interpret:

- Coefficients
    
- Direction
    
- Magnitude
    
- Practical implications
    

Do NOT:

- Fit model without interpretation
    
- Dump regression table without explanation
    

Model must hint at deeper analysis but remain basic.

---

## 8. Conclusions (Level 4 Required)

Conclusions must:

- Directly answer research question
    
- Reference visualizations
    
- Reference modelling results
    
- Connect to broader context of tech industry
    
- Be fully justified
    

Avoid vague statements.

Example strong conclusion structure:

- Summarize key finding
    
- Discuss salary differences
    
- Discuss role distribution differences
    
- Discuss country variation
    
- Discuss implications for developers
    
- Mention limitations
    

---

# CODE STYLE REQUIREMENTS

- Clean
    
- Modular where appropriate
    
- No irrelevant outputs
    
- No repeated DataFrame displays
    
- No unused variables
    
- No commented-out junk
    
- Logical ordering
    

Notebook must be easy to grade.

---

# CRITICAL RUBRIC WARNINGS

1. NEVER display more than first 6 rows.
    
2. NEVER show raw unformatted large outputs.
    
3. NEVER include irrelevant plots.
    
4. Every output must be referenced in text.
    
5. No disconnected analysis steps.
    
6. Everything must support the research question.
    

---

# FINAL DELIVERABLE

Produce:

- A single cohesive Jupyter Notebook
    
- Fully written markdown explanations
    
- Clean code cells
    
- Professional presentation
    
- Concise but complete
    
- Ready for submission
    

Aim for approximately:

- 8–15 visualizations
    
- 1–2 models
    
- 1 strong research question
    
- 1 strong conclusion section
    

---

# TONE AND STYLE

Write as an upper-level undergraduate statistics/data science student.

Be:

- Analytical
    
- Precise
    
- Evidence-based
    
- Concise
    

Avoid:

- Fluff
    
- Over-explaining basic Python
    
- Repetition
    
- Irrelevant exploration
    

---

# FINAL GOAL

Maximize marks in every rubric category.

The notebook should clearly demonstrate mastery of:

- Regex
    
- Data wrangling
    
- Groupby (split-apply-combine)
    
- Visualization design
    
- Statistical modelling
    
- Analytical reasoning
    

Produce a notebook that graders find easy to follow and rewarding to mark.

---

If you'd like, Vikas, I can also generate:

- A refined research question specifically engineered for maximum marks
    
- A project outline you and your group can divide into roles
    
- A model answer notebook structure with pseudo-code
    
- Or a rubric-maximizing strategy checklist
    

Just tell me which one you'd like.