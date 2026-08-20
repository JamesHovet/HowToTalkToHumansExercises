# Exercise 1

For a given production issue, write a short message to each of the following audiences: Your fellow engineers, the relevant product manager, and your Director/VP. 

Don't worry about polish or style, just focus on identifying the the different content for each audience. 

**If you can think of your own production issue, then use that.** Otherwise, you can use this example one: 

## Example (Completely Fictional) Production Issue

- At 09:17, the first seller support ticket came in saying the “Next payout” amount in Seller Hub looked lower than expected. By 11:06, support had 61 related contacts, most describing either unexpected fees or missing payout money.
- Seller Hub gets the expected payout amount from `PayoutSummaryService`, while actual payouts are sourced from `CoreLedger`.
- The incorrect amount appears only on the “Next payout” card; payout details and completed payout history show the correct amount.
- Sellers who click from the card into payout details see a different, correct number.
- We checked 38 affected sellers against `CoreLedger`. In all 38 cases, the amount scheduled for payout was correct and higher than the amount shown in Seller Hub; so far, we have not found an example where the actual payout is wrong.
- The relevant calculation is in `PendingPayoutCalculator`, `calculateProjectedNetAmount()`. For transactions using the newer fee model, `FeeBreakdown.getTotalFees()` already includes `regulatoryOperatingFee`, but `calculateProjectedNetAmount()` then subtracts it again.
- The bug was introduced in PR `#4837`, first appeared in production in deployment manifest `20260817T164200Z`, and the first affected transaction we found was processed at `2026-08-17T16:47:13Z`.
- A query returned `128,641` sellers with pending payouts. `19,284` had at least one transaction using the affected calculation path.
- Across those `19,284` sellers, Seller Hub is showing a combined `2,731,884.19` less than `CoreLedger`. The median difference is `41.82`, the 95th percentile is `384.67`, and the largest difference found is `6,943.11`.
- Roughly `4,300` affected sellers are scheduled to receive a payout within the next 24 hours.
- Several sellers have posted screenshots of the discrepancy in seller community forums, although we have not seen evidence of the issue affecting sellers outside the newer fee-model path.
- There is an existing feature flag that can hide the “Next payout” card, but it would hide it for all sellers, including unaffected sellers.
- The same `CoreLedger` data used to generate payouts is also used by the downstream reconciliation process, and no manual payout corrections or credits have been issued.
- The engineering team has reproduced the issue and has a candidate fix, but it has not yet completed production validation. If it works as expected, existing incorrect estimates should correct themselves the next time the payout summary is recalculated.


{{word-counter: Message to your fellow engineers: (approx. 125-250 words)}}

{{word-counter: Message to the product manager: (approx 50-125 words)}}

{{word-counter: Message to your director/VP: (approx 50-75 words)}}
