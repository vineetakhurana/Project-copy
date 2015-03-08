describe("Answer 1", function() {
  it("computes no Answer", function() {
    //fuzzer = require('fuzzer');
    var target = new SiteSettingsViewModel();
    //target.Pref = "true"
    expect(target.Pref1()).toBe("Not yet attempted");
  });

   it("computes correct Answer", function() {
    var target = new SiteSettingsViewModel();
    target.Pref("true");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.Pref1()).toBe("Correct!!");
  });

   it("computes wrong Answer", function() {
    var target = new SiteSettingsViewModel();
    target.Pref("false");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.Pref1()).toBe("Incorrect!!");
  });

   it("gives wrong input - for correct ans", function() {
    var target = new SiteSettingsViewModel();
    target.Pref("false");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.Pref1()).toBe("Correct!!");
  });

    it("gives wrong input - for incorrect ans", function() {
    var target = new SiteSettingsViewModel();
    target.Pref("true");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.Pref1()).toBe("Incorrect!!");
  });

    it("gives wrong input - integer", function() {
    var target = new SiteSettingsViewModel();
    target.q3(8879);
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.Pref1()).toBe("Correct!!");
  });

    it("gives wrong input - float", function() {
    var target = new SiteSettingsViewModel();
    target.q3(12.69);
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.Pref1()).toBe("Incorrect!!");
  });


});

describe("Answer 2", function() {
  it("computes no Answer", function() {
    var target = new SiteSettingsViewModel();
    //target.Pref = "true"
    expect(target.answer2()).toBe(" Not yet attempted");
  });

   it("computes correct Answer", function() {
    var target = new SiteSettingsViewModel();
    target.q2("false");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer2()).toBe("Correct!!");
  });

     it("computes wrong Answer", function() {
    var target = new SiteSettingsViewModel();
    target.q2("true");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer2()).toBe("Incorrect!!");
  });

   it("gives wrong input - for correct ans", function() {
    var target = new SiteSettingsViewModel();
    target.q2("true");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer2()).toBe("Correct!!");
  });

    it("gives wrong input - for incorrect ans", function() {
    var target = new SiteSettingsViewModel();
    target.q2("false");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer2()).toBe("Incorrect!!");
  });

    it("gives wrong input - integer", function() {
    var target = new SiteSettingsViewModel();
    target.q2(410);
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer2()).toBe("Correct!!");
  });

    it("gives wrong input - float", function() {
    var target = new SiteSettingsViewModel();
    target.q3(12.69);
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer3()).toBe("Incorrect!!");
  });   


});

describe("Answer 3", function() {
  it("computes no Answer", function() {
    var target = new SiteSettingsViewModel();
    //target.Pref = "true"
    expect(target.answer3()).toBe(" Not yet attempted");
  });

   it("computes correct Answer", function() {
    var target = new SiteSettingsViewModel();
    target.q3("true");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer3()).toBe("Correct!!");
  });

    it("computes wrong Answer", function() {
    var target = new SiteSettingsViewModel();
    target.q3("false");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer3()).toBe("Incorrect!!");
  });

     it("gives wrong input - for correct ans", function() {
    var target = new SiteSettingsViewModel();
    target.q3("false");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer3()).toBe("Correct!!");
  });

    it("gives wrong input - for incorrect ans", function() {
    var target = new SiteSettingsViewModel();
    target.q3("true");
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer3()).toBe("Incorrect!!");
  });

    it("gives wrong input - integer", function() {
    var target = new SiteSettingsViewModel();
    target.q3(8879);
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer3()).toBe("Correct!!");
  });

    it("gives wrong input - float", function() {
    var target = new SiteSettingsViewModel();
    target.q3(12.69);
    //ko.utils.unwrapObservable(self.Pref)
    expect(target.answer3()).toBe("Incorrect!!");
  });
});


