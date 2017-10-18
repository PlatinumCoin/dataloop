# Dispatcher

Global message queue which is used for dispatching actions. Once dispatched,
action is sent to all dispatcher’s listeners. To prevent circular dispatches
and updates that might cause bugs and performance issues, dispatcher’s
listeners cannot dispatch new actions.
