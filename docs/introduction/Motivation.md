# Motivation

At Immowelt we had a fairly large portion of developers who where not familiar with JavaScript and we wanted to get the day to day work with redux as straightforward as possible while still maintaining best practices.

E.g. proper namespacing of `actionTypes` and code reduction during the setup of the store often get overlooked in the first place, especially by newcomers.

This package provides several functions with which you can be sure that your redux application scales well while keeping restrictions as low as possible. It also adds additional features such as a simple way to declare async code(sagas) to be run only in a certain environment.
