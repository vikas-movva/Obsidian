### Requirements
**Definition**: A _requirement_ is a singular documented physical or functional need that particular design, product or process aims to satisfy

> [!NOTE]
> In software engineering, requirements are documented customer needs or features that a computer system aims to satisfy

#### Why are requirements important?
- In order to understand what we are going to do.
	- Accountability and responsibility
- We build software systems for customers
	- Reputation and Integrity
- Getting accurate requirements is crucial
	- Ernest and meticulous and no assumption

>[!NOTE]
>According to [statista](www.statista.com) the leading reason for why software projects fail according to developers is either _Unclear project requirements_ or _Changing or poorly documented requirements_

#### Characteristics of good requirements
**Use of correct terms**
- Shall -> requirement
- Will -> facts or declaration of purpose
- Should -> goal
**Understandable** -> we know what's needed
**Correct/Precise** -> it will do what's needed
**Unambiguous** -> everyone interprets it in the same way
**Complete** -> it can be fully documented
**Consistent** -> it is not contradictory with other requirements
**Interoperable** -> dependencies among requirements are known
**Verifiable/Valid** -> it can be tested 
**Singular** -> it appears once
**Traceable** -> it can be traced through design, test, and delivery
**Prioritized** -> relative importance is understood
**Achievable** -> we have the capability and the resources to do it

Examples:
- The system _shall_ operate at a power level of 12 volts.
- The software _shall_ acquire data from the sensors that are located at the motor.
- The data structure _shall_ contain a linked list.

#### How to prioritize requirements

> [!important]
> **MOSCOW method**
> 
> **MO** -> Must have -> The most _vital_ things you can't live without
> **S** -> Should have -> Things you consider as _important_ but not _vital_
> **Co** -> Could have -> The "nice-to-haves"
> **W** -> Won't have -> Things that provide little to _no value_ you can give up on

#### Why prioritize requirements?
Priorities help you
- Concentrate on the most important user and customer requirements
- Focus the development effort
- Manage projects more effectively
- Plan for staged deliveries

It can also help you
- Make acceptable trade-offs among conflicting goals
- Allocate resources

#### Categories of Requirements
Business Requirements
- business requirements _lay out the project's high-level goals._ they explain what the customer hopes to achieve with the project
- Example:
	- Automated Teller Machine (ATM)
		- Cash withdraw
		- Deposit
		- Transfer money
		- Balance inquiry
		- etc.

User Requirements
- User requirements describe _how the software product of the project will be used by the end users_.
- Example:
	- ATM
		- Required to insert an ATM card
		- Enter a personal identification number (PIN)
		- Amount selection
		- etc.

System Requirements
- System requirements are the _configuration that a system must have_ in order for a hardware or software application to run smoothly and efficiently such that _business and user requirements are achieved_.
- Example:
	- ATM
		- Touch screen or keypad
		- Computer languages, python, C++, C#,...
		- Physical measurements (size)
		- etc.


| Detail              | Type of Requirement  |                                                                                       |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------- |
| High level overview | Business Requirments | - Sponsor point of view<br>- Scope of the project<br>- Business Objectives            |
| Mid-level           | User Requirements    | - User point of view<br>- User goals<br>- User inputs & outputs                       |
| Detailed            | System Requirements  | - Functional (What the system does)<br>- Non-Functional (How well the system does it) |
Functional Requirements
- Functional requirements are detailed _statements of the project's desired capabilities._
- Examples of functional requirements
	- Business Rles
	- Transaction corrections, adjustments and cancellations
	- Administrative functions
	- _Authentication_
	- Authorization levels
	- Audit tracjing
	- External interfaces
	- Certification requirements

Non-Functional Requirements
- Non-functional requirements are _statements about the quality of the product's behavior or constraints on how it produces a desired result_.
- Examples - based on IEEE-Std 830 - 1993
	- Performance requirements
	- Operational requirements
	- Resource requirements
	- Verification requirements
	- Acceptance requirements
	- Documentation requirements
	- Security requirements
	- Portability requirements

Functional vs Non-Functional Requirements

| Functional           | Non-Functional                        |
| -------------------- | ------------------------------------- |
| Verbs                | Attributes                            |
| Mandatory            | Not mandatory                         |
| Captured in use case | Captured in quality attribute senario |
| Product feature      | Product properties                    |
| Easy to capture      | Difficult to capture                  |

#### FLURPS
FLURPS is an acronym for categorizing system requirements.

> [!Important] 
> 
> 
>**F**unctionality requirement
>**U**sability requirement
>**R**eliability requirement
>**P**erformance requirement
>**S**upportability requirement
> 
> | Characteristics | Description                                                                                                                                   |
> | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
> | Functionality   | Include feature sets, capabilities, and security                                                                                              |
> | Usability       | Human factors, overall aesthetics, consistency, and documentation                                                                             |
> | Reliability     | Frequency and severity of failure, recoverability, predictability, accuracy, and mean time between failures (**MTBF**)                        |
> | Performance     | Processing speed, response time, resource consumption, throughput and efficiency                                                              |
> | Supportability  | Testability, extensibility, adaptability, maintainability, compatibility, configurability, serviceability, installability, and localizability |
> 
