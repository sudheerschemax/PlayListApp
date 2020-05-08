export class FilterUtil {
    getDistinctObjectsFromArrayOfObjects(data: { text: any, value: any }[]) {
        let flags: any = {};
        const distinctCpos = data.filter(function (entry: any) {
            if (flags[entry.text]) {
                return false;
            }
            flags[entry.text] = true;
            return true;
        });
        return distinctCpos;
    }

    getFilters(dataSource: any[], filterKeys: string) {
        const filtersDataCpo = dataSource.map(
            (item: any) => ({
                text: item[filterKeys],
                value: item[filterKeys],
            })
        );
        return this.getDistinctObjectsFromArrayOfObjects(filtersDataCpo);
    }
}