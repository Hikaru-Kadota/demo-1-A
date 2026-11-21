\# Copilot Code Review instructions



When reviewing changes related to Issue #19 in this repository:



1\. Use the configured GitHub MCP server and `issue\_artifact\_read` to retrieve all Issue Artifacts attached to Issue #19.

2\. Examine the plan, detailed specification, embedded HTML prototype, and external link artifact.

3\. If an artifact links to an external document, retrieve its contents when accessible.

4\. Compare the implementation and tests against the requirements in each artifact.

5\. Include UI text, layout, colors, button behavior, input validation, and boundary conditions in the comparison.

6\. Report deviations from the requirements, including visual or textual differences, even when the application otherwise functions correctly.

7\. Identify the affected file and code location for each confirmed discrepancy.

8\. If requirements conflict, explain the conflict rather than silently selecting one.

9\. If an artifact cannot be retrieved, state that its requirements could not be verified.



Do not assume the implementation is correct simply because its tests pass.

Do not modify the code.

