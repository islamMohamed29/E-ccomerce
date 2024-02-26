export default class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  paginate() {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 20;
    const skip = (page - 1) * limit;
    this.mongooseQuery.limit(limit).skip(skip);
    return this;
  }
  filter() {
    let queryString = { ...this.queryString };
    let excludedParams = ["page", "size", "sort", "search", "fields"];
    excludedParams.forEach((elm) => {
      delete queryString[elm];
    });
    queryString = JSON.stringify(queryString);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    queryString = JSON.parse(queryString);
    this.mongooseQuery.find(queryString);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);
    }

    return this;
  }
  search() {
    if (this.queryString.search) {
      let word = this.queryString.search;
      this.mongooseQuery.find({
        $or: [
          { name: { $regex: word, $options: "i" } },
          { description: { $regex: word, $options: "i" } },
        ],
      });
    }
    return this;
  }
  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.replace(/(,)/g, " ");
      // or use ==>   let fields=this.queryString.fields.split(',').join(" ")
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}
