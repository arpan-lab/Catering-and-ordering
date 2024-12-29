
const firebaseConfig = {
    apiKey: "AIzaSyCY2P8QJwVoRFVYT6Sy_z2HgJxSGOo-07Y",
    authDomain: "cat-and-order.firebaseapp.com",
    projectId: "cat-and-order",
    storageBucket: "cat-and-order.firebasestorage.app",
    messagingSenderId: "429545876284",
    appId: "1:429545876284:web:e88bc26c485b08c83f4c39",
    measurementId: "G-KTYGJEDL58"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User registered:', userCredential.user);
            alert('User registered successfully!');
        })
        .catch((error) => {
            console.error('Error registering user:', error);
            alert('Error registering user.');
        });
});


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('User logged in:', userCredential.user);
            alert('User logged in successfully!');
        })
        .catch((error) => {
            console.error('Error logging in:', error);
            alert('Error logging in.');
        });
});

document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const reservationDetails = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        guests: document.getElementById('guests').value
    };
    addDoc(collection(db, "reservations"), reservationDetails)
        .then((docRef) => {
            console.log('Reservation added with ID:', docRef.id);
            alert('Reservation successfully made!');
        })
        .catch((error) => {
            console.error('Error making reservation:', error);
            alert('Error making reservation.');
        });
});

function addProduct(productDetails) {
    addDoc(collection(db, "products"), productDetails)
        .then((docRef) => {
            console.log('Product added with ID:', docRef.id);
        })
        .catch((error) => {
            console.error('Error adding product:', error);
        });
}

function getProducts() {
    getDocs(collection(db, "products"))
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log('Product:', doc.data());
            });
        })
        .catch((error) => {
            console.error('Error getting products:', error);
        });
}
