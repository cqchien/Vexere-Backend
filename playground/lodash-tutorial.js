const _ = require("lodash");

// _.get;
const person1 = {
  name: "Nguyen van A",
  job: {
    title: "student",
    university: {
      name: "DH UIT",
      major: "CNTT"
    }
  }
};

const person2 = {
  name: "ABU",
  job: {
    title: "Bussiness man",
    offices: [
      {
        name: "VP quan 1",
        address: "Quan 1"
      },
      {
        name: "VP quan 2",
        address: "Quan 2"
      },
      {
        name: "VP quan 3",
        address: "Quan 3"
      }
    ]
  }
};

const person = [person1, person2];

//1._.get
person.forEach((p) => {
  //  console.log(p.job.university.major)  => err vi person2 k co university
  console.log(_.get(p, "job.university.major", "khong co major"));
});
//2 _.set
console.log(_.set(person2, "job.university.major", "AI"))

