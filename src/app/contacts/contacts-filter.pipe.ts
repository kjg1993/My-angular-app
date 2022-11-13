import { Pipe, PipeTransform } from '@angular/core';
import { Contact} from './contact.model';
 
@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string) {
    let contactsList: Contact[] = [];

    if (term && term.length > 0) {
      contactsList = contacts.filter((contact:Contact) => contact.name.toLocaleLowerCase()
      .includes(term.toLocaleLowerCase()) );
    }

    if(contactsList.length < 1){
      return contacts;
    }

    return contactsList;
  }

}
