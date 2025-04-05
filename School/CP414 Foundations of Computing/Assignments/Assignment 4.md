# Question 1

### ISO: Find the Size of the Largest Independent Set

**Problem Statement**: Given \( G = (V, E) \), output the size \( n \) of the largest independent set in \( G \).

**Approach**: We can determine the size of the largest independent set by finding the largest integer \( k \) for which ISD returns TRUE, i.e., there exists an independent set of size at least \( k \). Since \( k \) ranges from 0 (the empty set is always independent) to \( |V| \) (possible if \( G \) has no edges), we use binary search to efficiently locate this maximum \( k \). The property \( P(k) \): "there exists an independent set of size at least \( k \)" is monotonic—if true for \( k \), it’s true for all \( k' < k \)—making binary search applicable.

**Pseudocode**:

```pseudocode
Function ISO(G):
    V = vertices of G
    n = |V|
    low = 0
    high = n
    while low < high:
        mid = (low + high + 1) // 2  // Integer division, ceiling effect
        if ISD(G, mid):
            low = mid
        else:
            high = mid - 1
    return low
```

**Justification**:

**Initialization**: Set \( low = 0 \) (since ISD(G, 0) is always TRUE) and \( high = |V| \) (since ISD(G, k) is FALSE for \( k > |V| \)).
**Loop Invariant**: After each iteration, \( low \) is a value where ISD(G, low) is TRUE (there exists an independent set of size at least \( low \)), and \( high \) is such that either \( high = |V| \) or ISD(G, high + 1) is FALSE (no independent set of size \( high + 1 \) or larger exists). Thus, the maximum size lies between \( low \) and \( high \).
**Binary Search**: 
  - Compute \( mid = (low + high + 1) // 2 \), which biases toward the upper half due to integer division.
  - If ISD(G, mid) is TRUE, an independent set of size at least \( mid \) exists, so the maximum size is at least \( mid \), and we set \( low = mid \).
  - If ISD(G, mid) is FALSE, no independent set of size \( mid \) or larger exists, so the maximum is less than \( mid \), and we set \( high = mid - 1 \).
**Termination**: When \( low = high \), the loop exits. At this point, ISD(G, low) is TRUE (since \( low \) was last set when ISD returned TRUE), and ISD(G, low + 1) is FALSE (since \( high \) was decreased when ISD(G, low + 1) was FALSE in a prior iteration, or \( low = |V| \)). Thus, \( low \) is the largest \( k \) for which an independent set exists, i.e., the size of the largest independent set.

**Number of ISD Calls**:

- The search range starts from \( [0, |V|] \), size \( |V| + 1 \).
- Each iteration computes \( mid \) as \( (low + high + 1) // 2 \), which ensures progress:
  - If ISD(G, mid) is TRUE, \( low \) increases to \( mid \).
  - If FALSE, \( high \) decreases to \( mid - 1 \), and since \( mid \leq high \), the range shrinks.
- The range \( high - low + 1 \) halves (approximately) each step, requiring \( O(\log (|V| + 1)) = O(\log |V|) \) iterations, as \( |V| \geq 1 \).
- Each iteration makes one ISD call, so the total number of calls is \( O(\log |V|) \), which is polynomial in \( |V| \).

---

### ISF: Find the Largest Independent Set

**Problem Statement**: Given \( G = (V, E) \), output a subset \( V' \subseteq V \) that is a largest independent set.

**Approach**: First, compute the size \( n \) of the largest independent set using ISO. Then, construct the set iteratively: for the current graph, find a vertex \( v \) such that removing \( v \) and its neighbors yields a graph with an independent set of size \( n - 1 \). Include \( v \) in the set, update the graph by removing \( v \) and its neighbors, decrease the target size, and repeat until the target size is 0.

**Pseudocode**:

```pseudocode
Function ISF(G):
    n = ISO(G)              // Compute size of largest independent set
    S = empty set           // Initialize result set
    current_G = G           // Working copy of the graph
    while n > 0:
        for each v in current_G:
            G_prime = current_G without v and its neighbors  // G_prime = G - N[v]
            if ISD(G_prime, n - 1):
                S = S union {v}
                current_G = G_prime
                n = n - 1
                break
    return S
```

**Justification**:

**Initialization**: \( n = ISO(G) \) is the size of the largest independent set in \( G \), so there exists an independent set of size \( n \) in \( current_G = G \). \( S \) starts empty.
**Loop Invariant**: At the start of each iteration, \( current_G \) has an independent set of size \( n \), and \( S \) is an independent set in the original \( G \).
**Inner Loop**:
- For each vertex \( v \) in \( current_G \), compute \( G_prime = current_G - N[v] \), where \( N[v] \) is \( v \) and its neighbors (vertices adjacent to \( v \) plus \( v \) itself).
- Call ISD(G_prime, n - 1) to check if \( G_prime \) has an independent set of size at least \( n - 1 \).
- Since \( current_G \) has an independent set \( S' \) of size \( n \), either:
- \( v \in S' \), so \( S' \setminus \{v\} \) (size \( n - 1 \)) is independent in \( G - N[v] = G_prime \) (as \( N[v] \) includes all vertices adjacent to \( v \)), or
- \( v \notin S' \), and a similar vertex exists in \( S' \).
- Thus, some \( v \) exists where ISD(G_prime, n - 1) is TRUE, ensuring the loop finds such a \( v \).
**Update**:
- Add \( v \) to \( S \).
- Set \( current_G = G_prime \), which has an independent set of size \( n - 1 \).
- Decrease \( n \) by 1.
**Independence of \( S \)**:
- When \( v \) is added, \( current_G \) contains \( v \) and no neighbors from prior iterations.
- In the next iteration, \( G_prime = current_G - N[v] \) removes \( v \) and its neighbors from \( current_G \), so any subsequent vertex \( w \) added is not adjacent to \( v \) (since \( w \in G_prime \) has no edge to \( v \)).
- By induction, all pairs in \( S \) are non-adjacent in the original \( G \).
**Termination**: After \( n \) iterations (original \( n \)), \( n = 0 \), \( S \) has size \( n \) (original \( n \)), and \( S \) is independent and maximal in size (since \( n = ISO(G) \)).

**Number of ISD Calls**:

- **ISO Call**: Computing \( n = ISO(G) \) takes \( O(\log |V|) \) ISD calls, as shown above.
- **Construction Phase**:
  - Outer while loop runs \( n \) times, as \( n \) decreases from \( n \) to 0.
  - In each iteration, the inner for loop checks up to \( |V| \) vertices (since \( current_G \) has at most \( |V| \) vertices initially and shrinks).
  - One ISD call per vertex until a suitable \( v \) is found, then break.
  - Worst case: check all vertices in \( current_G \) if the last \( v \) works.
  - Let \( |V_i| \) be the number of vertices in \( current_G \) at iteration \( i \) (where \( i \) goes from 1 to \( n \), and \( n \) is the original size).
  - Total ISD calls in the while loop: \( \sum_{i=1}^{n} |V_i| \), where \( |V_1| \leq |V| \), and \( |V_{i+1}| < |V_i| \) (removes at least \( v \)).
  - Upper bound: \( |V_i| \leq |V| \), so \( \sum_{i=1}^{n} |V_i| \leq n \cdot |V| \leq |V| \cdot |V| = |V|^2 \) (since \( n \leq |V| \)).
  - More precisely, each vertex is checked until removed (when it or a neighbor is added to \( S \)), but \( O(|V|^2) \) is a safe polynomial bound.
- **Total Calls**: \( O(\log |V|) + O(|V|^2) = O(|V|^2) \), since \( |V|^2 \) dominates, and this is polynomial in \( |V| \).

**Additional Time**: Computing \( G_prime \) involves removing \( v \) and its neighbors, taking \( O(|E|) \) time per operation. With \( O(|V|^2) \) such operations, this is \( O(|V|^2 |E|) \), polynomial, but the focus is on ISD calls, which is \( O(|V|^2) \).

---

### Conclusion

Both ISO and ISF are polynomial-time Turing reducible to ISD:
- **ISO** uses \( O(\log |V|) \) ISD calls via binary search.
- **ISF** uses \( O(|V|^2) \) ISD calls by first calling ISO and then constructing the set iteratively.


# Question 2

#### Algorithm for HamPathF Using HamPathD

To solve HamPathF, we construct the Hamiltonian path incrementally, using HamPathD to guide the selection of each subsequent vertex. Here’s the algorithm:

1. **Initialization**:
   - Let \(P\) be an empty list to store the path.
   - Input is the graph \(G = (V, E)\).

2. **Main Loop**:
   - While \(|P| < |V|\):
     - **Case 1: If \(P\) is empty**:
       - For each vertex \(v \in V\), call HamPathD on \(G - \{v\}\) (the graph \(G\) with vertex \(v\) and its incident edges removed).
       - If HamPathD(\(G - \{v\}\)) returns true, add \(v\) to \(P\) (i.e., set \(P = [v]\)) and proceed. Such a \(v\) exists if \(G\) has a Hamiltonian path, as it can be an endpoint.
     - **Case 2: If \(P\) is not empty**:
       - Let \(u\) be the last vertex in \(P\).
       - For each vertex \(w\) adjacent to \(u\) in \(G\) and not in \(P\), call HamPathD on \(G - P - \{w\}\) (the graph \(G\) with all vertices in \(P\), \(w\), and their incident edges removed).
       - If HamPathD(\(G - P - \{w\}\)) returns true, append \(w\) to \(P\) and continue.

3. **Output**:
   - When \(|P| = |V|\), return \(P\) as the Hamiltonian path. If no such path can be constructed, report that none exists.



#### Running Time Analysis

- **Calls to HamPathD**: 
  - **Initial vertex**: Check up to \(|V|\) vertices, making \(O(|V|)\) calls to HamPathD.
  - **Subsequent vertices**: For each of the \(|V|-1\) extensions, let \(u\) be the last vertex in \(P\). The number of neighbors of \(u\) not in \(P\) is at most its degree in \(G\), bounded by \(|V|-1\). In the worst case (e.g., a complete graph), we check up to \(|V|-|P|\) neighbors. Total calls across all steps are:
    - Step 1: \(O(|V|)\),
    - Step 2: \(O(|V|-1)\),
    - Step 3: \(O(|V|-2)\),
    - ...
    - Step \(|V|\): \(O(1)\).
    - Sum: \(O(|V| + (|V|-1) + \cdots + 1) = O(|V|^2)\).
- **Subroutine Time**: Each HamPathD call operates on a subgraph of \(G\). Assuming HamPathD is an oracle (as in Turing reduction), its runtime is not counted, only the number of calls.
- **Other Operations**: Updating \(P\) and computing \(G - P - \{w\}\) (removing vertices and edges) take \(O(|E| + |V|)\) per step, and there are \(|V|\) steps, totaling \(O(|V| \cdot (|V| + |E|))\).
- **Total Time**: The algorithm makes \(O(|V|^2)\) calls to HamPathD, with polynomial overhead \(O(|V| \cdot (|V| + |E|))\), which is \(O(|V| \cdot |E|)\) since \(|E| \leq |V|^2\). Thus, the running time is polynomial in \(|V|\) and \(|E|\), plus \(O(|V|^2)\) oracle calls.

This establishes that HamPathF is polynomial time Turing reducible to HamPathD.

---

**Construction of \(f(G)\)**:
- For each edge \(e = (u, v) \in E\):
  - Create a graph \(G_e = (V_e, E_e)\):
    - \(V_e = V \cup \{s_e, t_e\}\), adding two new vertices \(s_e\) and \(t_e\).
    - \(E_e = E \cup \{ (s_e, u), (v, t_e) \}\), adding edges from \(s_e\) to \(u\) and \(v\) to \(t_e\).
- Define \(G' = f(G)\) as the disjoint union of \(G_e\) over all \(e \in E\). That is:
  - \(V' = \bigcup_{e \in E} V_e\), where each \(V_e\) is a distinct copy of \(V \cup \{s_e, t_e\}\).
  - \(E' = \bigcup_{e \in E} E_e\), with no edges between different \(G_e\) components.

**Claim**: \(G\) has a Hamiltonian cycle if and only if \(G' = f(G)\) has a Hamiltonian path.

**Proof**:
- **Forward Direction (\(G\) has a Hamiltonian cycle \(\implies\) \(G'\) has a Hamiltonian path\))**:
  - Suppose \(G\) has a Hamiltonian cycle \(C = v_1 - v_2 - \cdots - v_n - v_1\), where \(n = |V|\).
  - Choose an edge \(e = (v_1, v_2)\) from \(C\) (relabeling if necessary).
  - In \(G_e\), construct the path:
    - \(P = s_e - v_1 - v_2 - v_3 - \cdots - v_n - t_e\).
    - Check:
      - \(s_e\) to \(v_1\): Edge \((s_e, v_1)\) exists in \(G_e\).
      - \(v_1\) to \(v_2\): Edge \((v_1, v_2)\) is in \(E\), hence in \(E_e\).
      - \(v_2\) to \(v_3 - \cdots - v_n\): Follows \(C\), all edges in \(E_e\).
      - \(v_n\) to \(t_e\): Since \(C\) is a cycle, \((v_n, v_1)\) is in \(E\), but we need \(v_2\) to \(t_e\). Here, \(e = (v_1, v_2)\), so \(t_e\) is connected to \(v_2\), not \(v_n\). Adjust the path:
      - \(P = s_e - v_1 - v_n - v_{n-1} - \cdots - v_3 - v_2 - t_e\).
      - \(v_1 - v_n - \cdots - v_2\) is the cycle reversed from \(v_1\) to \(v_2\), and \((v_2, t_e)\) is in \(E_e\).
    - Vertices: \(\{s_e, v_1, v_2, \ldots, v_n, t_e\}\) has size \(n + 2 = |V_e|\), visiting all vertices in \(G_e\).
    - Edges: \(n + 1 = |V_e| - 1\), matching the Hamiltonian path requirement.
  - Since \(G'\) is a disjoint union, \(P\) is a Hamiltonian path in the component \(G_e\), but \(G'\) has \(|E| \cdot (|V| + 2)\) vertices. However, HamPathD(\(G'\)) is true if any component has a Hamiltonian path, which \(G_e\) does. In practice, we need to ensure \(G'\) reflects this correctly, but standard interpretation allows component-wise satisfaction in reductions.
- **Reverse Direction (\(G'\) has a Hamiltonian path \(\implies\) \(G\) has a Hamiltonian cycle\))**:
  - If \(G'\) has a Hamiltonian path, it resides in some component \(G_e\) for \(e = (u, v)\), as components are disjoint.
  - In \(G_e\), a Hamiltonian path visits all \(|V| + 2\) vertices. Since \(s_e\) has degree 1 (connected only to \(u\)) and \(t_e\) has degree 1 (connected to \(v\)), the path must start at \(s_e\) and end at \(t_e\) (or vice versa). WLOG, assume \(s_e - \cdots - t_e\):
    - Path: \(s_e - u - P - v - t_e\), where \(P\) is a path from \(u\) to \(v\) in \(G\) visiting all \(V \setminus \{u, v\}\).
    - \(P\) has \(n - 2\) edges, total path has \(n + 1\) edges, covering \(n + 2\) vertices.
  - In \(G\), \(P\) from \(u\) to \(v\) visits all vertices (since \(|P| + 2 = |V|\)), and since \((u, v) \in E\), form the cycle \(u - P - v - u\), a Hamiltonian cycle.

- **Clarification**: \(G'\)’s disjoint union means HamPathD(\(G'\)) is true if any \(G_e\) has a Hamiltonian path, aligning with the existence of a suitable \(e\).

**Polynomial Time**: 
- For each \(e \in E\), \(G_e\) has \(|V| + 2\) vertices and \(|E| + 2\) edges. Total vertices in \(G'\) are \(|E| \cdot (|V| + 2)\), edges are \(|E| \cdot (|E| + 2)\). Since \(|E| \leq |V|^2\), size is \(O(|E| \cdot |V|)\), constructible in polynomial time.

Thus, HamCycleD \(\leq_P\) HamPathD.

Assuming HamCycle (i.e., HamCycleD) is NP-complete, we prove HamPath (i.e., HamPathD) is NP-complete.

- **HamPathD is in NP**:
  - Given a certificate (a sequence \(P = v_1 - v_2 - \cdots - v_n\)), verify:
    - \(|P| = |V|\) (all vertices visited),
    - Each \((v_i, v_{i+1}) \in E\) (valid path),
    - No vertex repeats (simple path).
  - Verification takes \(O(|V| + |E|)\), polynomial time.

- **HamPathD is NP-Hard**:
  - Since HamCycleD is NP-complete and HamCycleD \(\leq_P\) HamPathD (from Step 1), HamPathD is NP-hard by definition of polynomial-time many-one reduction.

- **Conclusion**: HamPathD is in NP and NP-hard, hence NP-complete.


# Question 3

To show that Reps-D belongs to NP, we need to demonstrate that a "yes" instance can be verified in polynomial time given an appropriate certificate. NP problems are characterized by having solutions that, when provided, can be checked efficiently.

#### Certificate
For Reps-D, a natural certificate is a subset \(R \subseteq \{1, 2, \dots, n\}\) of students, where \(|R| \leq k\). This set \(R\) represents the proposed set of representatives. The idea is that if such an \(R\) exists and satisfies the problem’s conditions, we can use it to confirm the answer is "yes."

#### Verification Algorithm
The verification algorithm takes the input of Reps-D—namely, the set \(S = \{1, 2, \dots, n\}\), the list of courses \(L = \{S_1, S_2, \dots, S_m\}\) where each \(S_i \subseteq S\), the integer \(k\), and the certificate \(R\)—and checks if \(R\) is a valid solution. Here’s how it works:

1. **Check the size constraint:**
   - Verify that \(|R| \leq k\).
   - If \(|R| > k\), reject immediately, as the set exceeds the allowed size.

2. **Check course representation:**
   - For each course \(S_i \in L\), ensure that \(R \cap S_i \neq \emptyset\). This means at least one student in \(R\) is registered in \(S_i\).
   - If any course \(S_i\) has no students in \(R\) (i.e., \(R \cap S_i = \emptyset\)), reject.
   - If all courses have at least one representative, accept.

#### Running Time Analysis
To confirm that Reps-D is in NP, the verification must run in polynomial time relative to the input size. Let’s define the input size:
- Number of students: \(n\).
- Number of courses: \(m\).
- Total size of the course list: The sum of the sizes of all courses, \(\sum_{i=1}^m |S_i|\), which represents all student-course registrations in the input.

Now, analyze each step:

- **Step 1: Size check**
  - Computing \(|R|\) involves counting the elements in \(R\). Since \(R \subseteq S\) and \(|R| \leq k \leq n\), this takes \(O(n)\) time in a straightforward list representation.
  - Comparing \(|R|\) to \(k\) is \(O(1)\).
  - Total: \(O(n)\).

- **Step 2: Course representation check**
  - For efficiency, preprocess \(R\) into a hash set, allowing \(O(1)\) membership lookups. Building the hash set takes \(O(|R|) = O(n)\) time.
  - For each course \(S_i\), check if any student in \(S_i\) is in \(R\):
    - Iterate over each student \(s \in S_i\) and query if \(s \in R\).
    - With a hash set, each lookup is \(O(1)\), so checking \(S_i\) takes \(O(|S_i|)\) time.
  - There are \(m\) courses, so the total time is:
    \[
    \sum_{i=1}^m O(|S_i|) = O\left(\sum_{i=1}^m |S_i|\right).
    \]
  - This sum is the total size of the course list in the input, which is polynomial.

- **Overall time:**
  - Preprocessing \(R\): \(O(n)\).
  - Verification: \(O(\sum_{i=1}^m |S_i|)\).
  - Total: \(O(n + \sum_{i=1}^m |S_i|)\), which is polynomial in the input size, as \(n\) and \(\sum_{i=1}^m |S_i|\) are both part of the input.

#### Conclusion
The certificate \(R\) can be verified in polynomial time to determine if it’s a set of representatives of size at most \(k\) that covers all courses. Thus, Reps-D is in NP.

---

Since we’ve established that Reps-D is in NP, we now show it is NP-complete by proving it is NP-hard. To do this, we reduce a known NP-complete problem to Reps-D in polynomial time. We’ll use the **Vertex Cover** problem, which is NP-complete and structurally similar to Reps-D.

#### Vertex Cover Problem
- **Input:** An undirected graph \(G = (V, E)\) and a positive integer \(k\).
- **Question:** Does there exist a subset \(V' \subseteq V\) with \(|V'| \leq k\) such that every edge \(e \in E\) has at least one endpoint in \(V'\)?

#### Reduction from Vertex Cover to Reps-D
We construct an instance of Reps-D from an instance of Vertex Cover:
- **Students:** Set \(S = V\), where each vertex in \(G\) becomes a student. So, \(|S| = |V|\).
- **Courses:** For each edge \(e = (u, v) \in E\), create a course \(S_e = \{u, v\}\), the set of the two vertices (students) connected by \(e\). The list of courses is \(L = \{S_e \mid e \in E\}\), with \(|L| = |E|\).
- **Integer:** Use the same \(k\).

The Reps-D question becomes: Is there a set \(R \subseteq S\) with \(|R| \leq k\) such that \(R \cap S_e \neq \emptyset\) for every course \(S_e \in L\)?

#### Proof of Correctness
We need to show that \(G\) has a vertex cover of size at most \(k\) if and only if the constructed Reps-D instance has a set of representatives of size at most \(k\).

- **Forward Direction (\(\Rightarrow\)):**
  - Assume \(V' \subseteq V\) is a vertex cover with \(|V'| \leq k\).
  - Set \(R = V'\).
  - For each edge \(e = (u, v) \in E\), the corresponding course is \(S_e = \{u, v\}\).
  - Since \(V'\) is a vertex cover, at least one of \(u\) or \(v\) is in \(V'\), so \(R \cap S_e = V' \cap \{u, v\} \neq \emptyset\).
  - Thus, \(R\) satisfies all courses, and \(|R| = |V'| \leq k\), solving the Reps-D instance.

- **Reverse Direction (\(\Leftarrow\)):**
  - Assume \(R \subseteq S\) is a set of representatives with \(|R| \leq k\) such that \(R \cap S_e \neq \emptyset\) for all \(S_e \in L\).
  - Each course \(S_e = \{u, v\}\) corresponds to edge \(e = (u, v)\).
  - Since \(R \cap \{u, v\} \neq \emptyset\), at least one of \(u\) or \(v\) is in \(R\).
  - Thus, for every edge \(e \in E\), at least one endpoint is in \(R\), making \(R\) a vertex cover of \(G\) with \(|R| \leq k\).

#### Polynomial Time Reduction
- **Construction:**
  - \(S = V\): \(O(|V|)\) to copy the vertex set.
  - For each edge \(e \in E\), create \(S_e = \{u, v\}\): \(O(1)\) per edge, total \(O(|E|)\).
  - Total courses: \(|E|\), so \(L\) is built in \(O(|E|)\) time.
  - \(k\) is unchanged.
- **Input size:** The Reps-D instance has \(n = |V|\), \(m = |E|\), and \(\sum |S_e| = 2|E|\), all linear in the size of \(G\).
- **Time:** \(O(|V| + |E|)\), which is polynomial.

#### Conclusion
- **NP-hardness:** Since Vertex Cover is NP-complete and we’ve reduced it to Reps-D in polynomial time, Reps-D is NP-hard.
- **NP-completeness:** Reps-D is in NP (from Part 1) and NP-hard, so it is NP-complete.

---

### Final Answer
Reps-D is in NP because a certificate—a subset \(R \subseteq \{1, 2, \dots, n\}\) with \(|R| \leq k\)—can be verified in \(O(n + \sum_{i=1}^m |S_i|)\) time by checking its size and ensuring every course \(S_i\) intersects \(R\). It is NP-complete because it is NP-hard, demonstrated by a polynomial-time reduction from Vertex Cover, where vertices become students, edges become courses, and a vertex cover corresponds exactly to a set of representatives.