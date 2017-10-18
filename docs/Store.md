# Store

Data cache objects. Store can contain a model or collection of models that
should be a part of domain model. Store may listen to the dispatcher and update
its state based on dispatched actions. Store should not introduce any setters
or its data to public API.
