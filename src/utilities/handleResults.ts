export function handleResults(results: PromiseSettledResult<unknown>[]) {
    const errors = results
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .map((result) => result.reason);

    if (errors.length) {
        // Aggregate all errors into one
        throw new AggregateError(errors);
    }
}
