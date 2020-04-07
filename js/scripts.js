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
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.update = function() {
  return this.firstName + " " + this.lastName + " " + this.phoneNumber;
}

var addressBook = new Addressbook();
var contact = new Contact("Ada", "Lovelace", "503-555-0100");
var contact2 = new Contact("Grace", "Hopper", "503-555-0199");
addressBook.addContact(contact);
addressBook.addContact(contact2);

// Frontend UI
$(document).ready(function() {
  event.preventDefault();
})