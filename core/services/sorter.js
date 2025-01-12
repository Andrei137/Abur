export default async (list, sortFunction, order = "ascending") => {
    const sortedList = (await Promise.all(
            list.map(async item => ({
                item,
                sortKey: await sortFunction(item)
            }))
        ))
        .sort((a, b) => a.sortKey > b.sortKey ? 1 : -1)
        .map(({ item }) => item);

    return order === "ascending"
        ? sortedList
        : sortedList.reverse();
};
