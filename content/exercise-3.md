# Exercise 3

For each message, pull out a 1-2 sentence BLUF that you can use to introduce the message. Write the BLUF that you would want to read if you were being sent this long message out of the blue. 

## Target audience: All Engineering Leads

Many of our engineering systems retain detailed records connected to an individual user or account. That data is often collected for a legitimate short-term purpose: diagnosing a failed request, investigating unexpected behavior, helping Customer Support, or measuring whether a feature works as intended.

The problem is that short-term diagnostic data frequently becomes long-term stored data by default. A table is created during a launch, the original owner moves to another project, and the deletion work never gets prioritized. Years later, the records may still exist even though nobody regularly uses them.

Long retention creates several risks. It increases the amount of user data involved in any security or privacy incident, makes access controls harder to reason about, and raises storage and maintenance costs. It can also leave teams unable to explain why they hold particular records when responding to privacy reviews or deletion requests.

The revised Riverbank standard introduces shorter default retention periods for user- and account-associated data. System owners need to record each covered dataset in DataMap, including its retention period, deletion mechanism, and reason for retention. Privacy Engineering will begin reviewing DataMap on October 1, so entries must be complete by September 30. Please work with your engineering teams and data analytics partners to decide on appropriate retention periods for your use case. 

Riverbank does not require every dataset to use the shortest possible period. Some records must be retained longer for fraud prevention, financial reporting, active disputes, or other legal obligations. Those cases may continue with documented justification and the appropriate review.

{{word-counter: Your BLUF: (approx. 25-60 words)}}


## Target audience: Previous System Owners

I’ve been working on scheduled listing revisions in Juniper. The feature lets a seller prepare a change now and publish it at a specified time, which means we store the requested revision and run it later rather than sending it through the usual synchronous path.

While wiring this up, I found that Juniper requires marketContext on every revision. That makes sense for changes involving marketplace-specific fields, but it also applies when the revision only updates something like quantity or a seller note. The synchronous caller gets around this by loading the current listing and copying marketContext into the request.

I initially assumed the requirement came from BrowseIndex, so I traced the publication path through Cedar and Lantern. BrowseIndex ignores the field, Lantern stores it without inspecting it, and Cedar only uses it when currency or shipping-region data changes. What I haven’t been able to determine is whether Juniper’s general requirement protects some older routing behavior that no longer appears in the current code. I’m hoping someone who worked on the original Juniper rollout remembers that decision.

The validation was added in 2019 with the commit message “ensure routing consistency.” The linked design document points to an archived location I cannot access, and the original reviewers are no longer listed in the directory. There are also tests requiring the field, but their names repeat the validation rule rather than describing the scenario behind it.

For scheduled revisions, retaining the rule means an additional listing read before every publication. That is manageable, but I would prefer not to build the new workflow around it if the constraint is obsolete.

{{word-counter: Your BLUF: (approx. 25-60 words)}}

## Target audience: Aurora Project Leads

I wanted to send an Aurora status update after the conversations this week because there are a few things moving at the same time. The implementation is in a good place overall. Front End has completed the new mobile-web filter layout, and Design checked the latest build on Tuesday. There were some small differences in spacing and capitalization compared with the mockups, but those have either been fixed or added to the cleanup list.

Analytics has also finished adding the events for opening the panel, selecting a filter, removing one, and clearing everything. They are still deciding how to handle sessions where someone changes several filters quickly, because those events can arrive close together, but we will still be able to measure the main experiment metrics. The usability sessions were mostly positive as well. Six of eight participants completed the search task faster with Aurora, although a few people needed extra time to find some of the less commonly used filters.

There are two accessibility issues that came out of the review: selected filters are not always announced correctly by screen readers, and keyboard users lose their position whenever the results refresh. We originally thought we might be able to fix those while the experiment was running, but Accessibility needs to approve the updated behavior first, and between the estimated development time and when the reviewer can look at it again, the earliest slot we can realistically use is September 23 rather than September 9. The mobile-web release team has reserved that slot for us, so we are not waiting for release capacity. This also gives QA more time for regression testing, and Design might make the “More filters” control more noticeable based on the usability feedback. That change is separate from the accessibility work, so we can leave it out if it starts creating more risk.

{{word-counter: Your BLUF: (approx. 25-60 words)}}