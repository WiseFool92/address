//Backend Logic

//Buisness Logic for Addressbook
function Addressbook() {
  this.contacts = [];
  this.currentId = 0;
}

Addressbook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

Addressbook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Addressbook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };  
  return false;
}

Addressbook.prototype.deleteContact = function(id) {
  for (var i=0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

//Buisness Logic for Contacts
function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddresses = [];
  this.physicalAddresses = [];
  this.addEmail(emailAddress)
  this.addAddress(physicalAddress)

}
Contact.prototype.addEmail = function (email) {
  this.emailAddresses.push(email)
}
Contact.prototype.addAddress = function (physicalAddress) {
  this.physicalAddresses.push(physicalAddress)
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.update = function() {
  return this.firstName + " " + this.lastName + " " + this.phoneNumber;
}

// Frontend UI

var addressBook = new Addressbook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  let emailString = ""
  let addressString = ""
  contact.emailAddresses.forEach(element => {
    emailString +=` ${element}`;
  });
  $(".email-address").html(emailString)
  contact.physicalAddresses.forEach(element => {
    addressString +=` ${element}`;
  })
  $(".physical-address").html(addressString)
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='btn btn-danger deleteButton' id=" + + contact.id + ">Delete</button>");
  var email = $("#email-button")
  var address = $("#address-button")
  email.empty();
  email.append(`<button class= "btn btn-success addEmail" id="${contact.id}email">Add Email</button>`)
  address.empty();
  address.append(`<button class= "btn btn-success addAddress" id="${contact.id}address">Add Address</button>`)
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  $("#email-button").on("click", ".addEmail", function() {
    $("#email-button").append(`<input type="email" id="${this.id}-email"><button class="btn btn-success" value="${this.id}">add</button>`)
  })
  $("#address-button").on("click", ".addAddress", function() {
    $("#address-button").append(`<input type="address" id="${this.id}-address"><button class="btn btn-success" value="${this.id}">add</button>`)
    
  })
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
      event.preventDefault();
      var inputtedFirstName = $("input#new-first-name").val();
      var inputtedLastName = $("input#new-last-name").val();
      var inputtedPhoneNumber = $("input#new-phone-number").val();
      var inputtedEmailAddress = $("input#email-address").val();
      var inputtedPhysicalAddress = $("input#physical-address").val();
      var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedPhysicalAddress);
      addressBook.addContact(newContact);
      console.log("Address book: ", addressBook);
      console.log("New contact: ", newContact);
      displayContactDetails(addressBook);
    })
})