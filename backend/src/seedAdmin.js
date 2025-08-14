import bcrypt from 'bcryptjs';
import User from './models/User.js'; // ✅ match exact file name & case

export const ensureAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@shop.com';
  const pass = process.env.ADMIN_PASSWORD || 'Admin@123';

  const existing = await User.findOne({ email });
  if (!existing) {
    const hash = await bcrypt.hash(pass, 10);
    await User.create({
      name: 'Admin',
      email,
      password: hash,
      role: 'admin'
    });
    console.log(`✅ Admin created: ${email} / ${pass}`);
  } else {
    console.log('ℹ️ Admin already exists');
  }
};
