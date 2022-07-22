/**
 * Konsep-Konsep Functional Programming
Setelah Anda memiliki sedikit gambaran tentang bagaimana paradigma FP dapat membuat kode yang Anda tuliskan lebih mudah dibaca dan ringkas, 
kini saatnya Anda ketahui, apa saja konsep-konsep dasar yang ada di dalam paradigma FP.

Di sini kita akan membahas 4 konsep besar yang ada di FP. 
Yakni Pure Function, Immutability, Recursive, dan High-Order Function.



Pure Function
Salah satu konsep besar dari paradigma FP adalah Pure Function. 
Apa artinya? Pure Function merupakan konsep dari pembuatan fungsi yang mengharuskan fungsi untuk tidak bergantung terhadap nilai yang berada di luar fungsi atau parameternya. 
Sehingga mau seperti apa keadaanya, 
fungsi yang dibuat selalu menghasilkan sesuatu yang sama, 
terkecuali bila fungsi tersebut diberikan nilai parameter yang berbeda.

Untuk lebih jelasnya, simak kode berikut:
 */

let PI = 3.14;

const hitungLuasLingkaran = (jariJari) => {
  return PI * (jariJari * jariJari); 
}

console.log(hitungLuasLingkaran(4)); // 50.24

PI = 5; // tidak sengaja nilai PI berubah

console.log(hitungLuasLingkaran(4)); // 80

/**
 * 
 * Menurut Anda, apakah fungsi hitungLuasLingkaran merupakan pure function atau impure function 
 * (lawan dari pure function)? Jika Anda menjawab impure function, Anda tepat sekali!

Fungsi tersebut tidak bisa dikatakan pure function karena ia membutuhkan nilai yang berada di luar dari fungsinya, 
yakni nilai PI. Bila nilai PI berubah, maka penggunaan fungsi menghasilkan nilai yang berbeda walaupun diberikan nilai parameter yang sama.

Lantas, bagaimana cara membuat fungsi tersebut menjadi pure? Mudah!
 */

/*
const hitungLuasLingkaran = (jariJari) => {
    return 3.14 * (jariJari * jariJari); 
  }
  
  console.log(hitungLuasLingkaran(4)); // 50.24
  console.log(hitungLuasLingkaran(4)); // 50.24
  console.log(hitungLuasLingkaran(8)); // 200.96
  console.log(hitungLuasLingkaran(8)); // 200.96

/**
 * Dengan memindahkan nilai PI secara konstan di dalam fungsi, 
 * maka dapat dipastikan nilai tersebut tidak akan berubah atau tak sengaja diubah. 
 * Dengan begitu fungsi selalu menghasilkan nilai yang sama bila nilai parameter yang diberikan sama.

Selain dilarang untuk bergantung terhadap nilai luar, 
pure function juga dilarang keras untuk mengubah nilai yang berada di luar baik secara sengaja atau tidak sengaja. 
Pure function tidak boleh menimbulkan efek samping (no side effect) ketika digunakan.

Untuk lebih jelasnya, coba lihat contoh kode berikut:
 */

/*
const createPersonWithAge = (age, person) => {
    person.age = age;
    return person;
  };
  
  const person = {
    name: 'Bobo'
  };
  
  const newPerson = createPersonWithAge(18, person);
  
  console.log({
    person,
    newPerson
  });
  
  /**
   * Output:
   *  {
        person: { name: 'Bobo', age: 18 },
        newPerson: { name: 'Bobo', age: 18 }
      }
  */

/**
 * 
 * Fungsi createPersonWithAge bertujuan untuk membuat objek person baru dengan tambahan properti age dari objek person yang ada. 
 * Namun alih-alih hanya membuat objek baru, 
 * ia juga malah mengubah nilai dari objek lama. 
 * Nah, hal inilah yang menyebabkan fungsi createPersonWithAge bukanlah pure function.

Lalu bagaimana cara membuat fungsi tersebut menjadi pure? 
Mudah, kita manfaatkan destructuring object daripada mengubah objek tersebut secara langsung.
 */

/*
const createPersonWithAge = (age, person) => {
    return { ...person, age };
  };
  
  const person = {
    name: 'Bobo'
  };
  
  const newPerson = createPersonWithAge(18, person);
  
  console.log({
    person,
    newPerson
  });
  
  /**
   * Output:
   *  { 
   *    person: { name: 'Bobo' },
   *    newPerson: { name: 'Bobo', age: 18 } 
   *  }
  */
  

/**
 * Lihat! Lagi-lagi lebih mudah dan singkat bukan?

Agar lebih mudah dalam mengetahui apakah fungsi yang Anda buat sudah pure atau belum, pastikan 3 konsep ini ada pada fungsi yang Anda buat.

Mengembalikan nilai yang sama bila inputannya (nilai parameter) sama.
Hanya bergantung pada argumen yang diberikan.
Tidak menimbulkan efek samping.
Bila 3 konsep di atas terpenuhi, maka bisa dipastikan Anda membuat sebuah pure function.



Immutability
Konsep yang kedua adalah immutability. 
Immutable berarti sebuah objek tidak boleh diubah setelah objek tersebut dibuat. 
Kontras dengan mutable yang artinya objek boleh diubah setelah objek tersebut dibuat.

Konsep immutability sangat kental pada paradigma FP. 
Anda bisa lihat sebelumnya pada contoh penggunaan array map. 
Ketika menggunakan array.map(), 
alih-alih ia mengubah nilai dari array itu sendiri, 
malah ia membuat atau menghasilkan array baru.
 */

/*
const names = ['Harry', 'Ron', 'Jeff', 'Thomas'];

const newNamesWithExcMark = names.map((name) => `${name}!`);

console.log({
    names,
    newNamesWithExcMark,
});

/**
 * {
     names: [ 'Harry', 'Ron', 'Jeff', 'Thomas' ],
     newNamesWithExcMark: [ 'Harry!', 'Ron!', 'Jeff!', 'Thomas!' ]
   }
 */


/**
 * Lantas, bagaimana bila kita benar-benar perlu mengubah nilai dari sebuah objek? Contohnya seperti ini:
 */
/*
 const user = {
    firstname: 'Harry',
    lastName: 'Protter', // ups, typo!
}

const renameLastNameUser = (newLastName, user) => {
    user.lastName = newLastName;
}

renameLastNameUser('Potter', user);

console.log(user);

/**
 * output:
 * { firstname: 'Harry', lastName: 'Potter' }
 * 
 */

/**
 * Yup! Tujuan Anda memang tercapai namun itu bukanlah konsep dari paradigma FP. 
 * Bila Anda ingin menerapkan FP sepenuhnya, hindari cara seperti di atas. 
 * Lantas bagaimana solusinya? Sama seperti fungsi array map(), 
 * alih-alih mengubah nilai objek secara langsung, 
 * terapkan perubahan tersebut pada nilai return dalam objek baru.
 */

/** 
 const user = {
    firstname: 'Harry',
    lastName: 'Protter', // ups, typo!
}

const createUserWithNewLastName = (newLastName, user) => {
    return { ...user, lastName: newLastName }
}

const newUser = createUserWithNewLastName('Potter', user);

console.log(newUser);

/**
 * output:
 * { firstname: 'Harry', lastName: 'Potter' }
 * 
 */

/**
 * 
 Hasilnya sama kan? Selain itu, 
 Anda juga bisa menyesuaikan nama fungsinya dari renameLastNameUser menjadi createUserWithNewLastName. 
 Hal itu perlu untuk mengindikasikan bahwa fungsi mengembalikan atau menghasilkan objek user baru.

 Rekursif
Konsep selanjutnya yang ada di Functional Programming adalah rekursif. 
Apa itu rekursif? Rekursif merupakan teknik pada sebuah function yang memanggil dirinya sendiri.

Kita akan mencoba mengubah fungsi countDown yang biasanya kita buat menggunakan sintaksis iterasi seperti for, 
foreach, while seperti kode di bawah menjadi bentuk rekursif.

const countDown = start => {
  do {
    console.log(start);
    start -=1;
  }
  while(start > 0);
};
 
countDown(10);

Maka, bentuk rekursinya adalah sebagai berikut:
---------------------------------
const countDown = start => {
  console.log(start);
  if(start > 0) countDown(start-1);
};

countDown(10);
----------------------------------

Dengan teknik rekursif ini, 
kita sebenarnya bisa menggantikan operasi iterasi dengan rekursi. 
Namun tidak sebatas itu saja, dengan rekursi kita dapat membuat 
dan mengolah data structures seperti Tree dan Array.

----
Higher-Order Function
JavaScript memiliki kemampuan First Class Functions, 
karena itu fungsi pada JavaScript dapat diperlakukan layaknya sebuah data. 
Kita bisa menyimpan function dalam variabel, 
memberikan function sebagai parameter pada fungsi lainnya, 
hingga mengembalikan function di dalam function.

------------------------------------
const hello = () => {
  console.log('Hello!')
};

const say = (someFunction) => {
  someFunction();
}

const sayHello = () => {
    return () => {
        console.log('Hello!');
    }
}

hello();
say(hello);
sayHello()();

/**
 * Hello!
 * Hello!
 * Hello!
 
-------------------------------------

Karena dengan kemampuan First Class Functions-nya itu, 
kita dapat membuat Higher-Order Function secara mudah. 
Tunggu, tunggu. Apa itu Higher-Order Function?

Higher-Order Function menjadi bagian konsep pada paradigma FP. 
Higher-Order Function merupakan fungsi yang dapat menerima fungsi lainnya pada argumen; 
mengembalikan sebuah fungsi; atau bahkan keduanya.

Teknik Higher-Order Function biasanya digunakan untuk:

Mengabstraksi atau mengisolasi sebuah aksi, event, 
atau menangani alur asynchronous menggunakan callback, promise, dan lainnya.
Membuat utilities yang dapat digunakan di berbagai tipe data.
Membuat teknik currying atau function composition.

Array map() merupakan salah satu contoh Higher-Order Function yang ada di JavaScript. 
Karena dalam penggunaanya, ia menerima satu buah argumen yang merupakan sebuah function.

Dengan mengetahui adanya Higher-Order Function, Anda bisa membuat fungsi map() versi Anda sendiri!

const names = ['Harry', 'Ron', 'Jeff', 'Thomas'];

const arrayMap = (arr, action) => {
  const loopTrough = (arr, action, newArray = [], index = 0) => {
    const item = arr[index];
    if(!item) return newArray;
    return loopTrough(arr, action, [...newArray, action(arr[index])], index + 1);
  }

  return loopTrough(arr, action);
}


const newNames = arrayMap(names, (name) => `${name}!` );

console.log({
    names,
    newNames,
});

/**
 * output:
 * {
 *   names: [ 'Harry', 'Ron', 'Jeff', 'Thomas' ],
 *   newNames: [ 'Harry!', 'Ron!', 'Jeff!', 'Thomas!' ]
 * }
 */
 
 