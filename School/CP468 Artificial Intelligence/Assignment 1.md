# Problem 1
### **PEAS Descriptions**

|Activity|Performance Measure|Environment|Actuators|Sensors|
|---|---|---|---|---|
|**Playing Soccer**|Score goals, prevent opponent goals, win matches|Soccer field, ball, teammates, opponents|Legs (running/kicking), voice (communication)|Vision (ball/player tracking), proprioception|
|**Exploring Titan's Oceans**|Collect samples, map terrain, avoid hazards|Subsurface ocean, methane/ethane liquid, pressure|Propulsion, robotic arms, sensors|Sonar, cameras, chemical analyzers|
|**Shopping for Used AI Books**|Find books at optimal price, minimize time|Online marketplaces (eBay, Amazon), sellers|Search queries, bids, purchases|Screen (listings/prices), notifications|
|**Playing a Tennis Match**|Win points/games, minimize errors|Court, ball, opponent, umpire|Racket swings, serves, footwork|Vision (ball tracking), hearing (line calls)|
|**Practicing Tennis Against a Wall**|Improve accuracy/consistency|Wall, ball, court|Racket swings, footwork|Vision (ball tracking), proprioception|
|**Performing a High Jump**|Maximize height, correct technique|Bar, mat, approach track|Legs (jumping), body control|Vision (bar position), proprioception|
|**Knitting a Sweater**|Correct pattern, no errors|Yarn, needles, pattern|Hand movements (stitching)|Vision (stitch inspection)|
|**Bidding at an Auction**|Win item at minimal cost|Auction platform, bidders, timer|Bid submissions, strategy adjustments|Screen (current bids/time)|

### **Task Environment Properties**

|Activity|Observable|Agents|Deterministic vs. Stochastic|Episodic vs. Sequential|Static vs. Dynamic|Discrete vs. Continuous|Known vs. Unknown|
|---|---|---|---|---|---|---|---|
|**Playing Soccer**|Partially|Multiagent|Stochastic|Sequential|Dynamic|Continuous|Known|
|**Exploring Titan's Oceans**|Partially|Single|Stochastic|Sequential|Static|Continuous|Unknown|
|**Shopping for Used AI Books**|Partially|Multiagent|Stochastic|Sequential|Dynamic|Discrete|Known|
|**Playing a Tennis Match**|Partially|Multiagent|Stochastic|Sequential|Dynamic|Continuous|Known|
|**Practicing Tennis Against a Wall**|Fully|Single|Deterministic|Sequential|Dynamic|Continuous|Known|
|**Performing a High Jump**|Fully|Single|Deterministic|Episodic|Static|Continuous|Known|
|**Knitting a Sweater**|Partially|Single|Deterministic|Sequential|Static|Discrete|Known|
|**Bidding at an Auction**|Partially|Multiagent|Stochastic|Sequential|Dynamic|Discrete|Known|

# Problem 2
**a) False**  
An agent with complete state information isn't necessarily perfectly rational. Rationality requires optimal decision-making based on goals and computational constraints. 
_Example_: A chess agent with full board visibility might still lose if its search algorithm is too shallow to evaluate future moves effectively.

**b) True**  
In environments where the optimal action depends solely on the current state, a reflex agent can act rationally. 
_Example_: A thermostat (reflex agent) optimally adjusts heating/cooling based only on the current temperature, achieving its goal perfectly.

**c) True**  
If a task environment’s performance measure is inherently unachievable or independent of the agent’s actions, no agent can be rational. 
_Example_: A casino slot machine with purely random payouts—no agent can influence outcomes, making rationality impossible.

**d) False**  
The agent function maps _entire percept sequences_ to actions, while the agent program typically receives only the _current percept_. 
_Example_: A reflex agent program uses only the latest percept, but its agent function’s input includes all prior percepts.

# Problem 3
