---
description: If the application interacts with browser extensions, handle
  potential issues with message channels closing before a response is received.
alwaysApply: false
---

When sending messages to browser extensions, implement error handling to catch cases where the message channel closes before a response is received. Display a user-friendly message suggesting that the user check their browser extensions.