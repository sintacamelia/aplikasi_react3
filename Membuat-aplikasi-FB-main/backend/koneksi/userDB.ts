import mongoose, { ConnectOptions } from "mongoose";

const connectUserDB = async () => {
  try {
    // Menggunakan variabel lingkungan jika tersedia, jika tidak menggunakan URI default
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://sinta123:sinta123@cluster0.qqt3i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    
    // Koneksi ke MongoDB
    const koneksi = await mongoose.connect(mongoURI, {
        useNewUrlParser: true, // Menambahkan opsi ini untuk penggunaan parser URL baru
        useUnifiedTopology: true, // Menambahkan opsi ini untuk penggunaan engine pengelolaan koneksi yang baru
        ...(<ConnectOptions>{useNewUrlParser: true}) // Extending the ConnectOptions type
      } as ConnectOptions);
    console.log(`MongoDB Connected: ${koneksi.connection.host}`);
  } catch (error) {
    // Menangani error dengan tipe `Error` dan mengakses `message`
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1); // Keluar dari proses jika terjadi error
  }
};

export default connectUserDB;