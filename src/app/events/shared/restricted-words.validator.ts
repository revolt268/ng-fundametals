import { FormControl } from "@angular/forms";


// This is also a good example of an arrow function that is beign returned by another function
export function restrictedWords(words) {
  return (control: FormControl): {[key: string]: any} => {
    if (!words) return null;

    // loops over the invalid words, then checks to see if they are included
    //  in the value, if so then it will return them, if not it returns a null
    //  the .filter is the clean out the nulls that were found
    const invalidWords = words
      .map(w => control.value.includes(w) ? w : null)
      .filter(w => w != null);

      // returns all the restricted words that were used
      return invalidWords && invalidWords.length > 0
        ? { 'restrictedWords': invalidWords.join(', ')}
        : null;
      }
}
