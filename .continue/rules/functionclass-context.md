---
description: When modifying code within a function or class, make sure to
  include the entire function or class definition in the code snippet.
alwaysApply: true
---

In existing files, you should always restate the function or class that the snippet belongs to:

```language /path/to/file
// ... existing code ...

function exampleFunction() {
  // ... existing code ...

  {{ modified code here }}

  // ... rest of function ...
}

// ... rest of code ...
```