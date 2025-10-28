// Authentication Utilities
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d'; // Token expires in 7 days

// Hash password
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Compare password with hash
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// Generate JWT token
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Authenticate admin user
export async function authenticateAdmin(email, password) {
  try {
    const users = await query(
      'SELECT * FROM admin_users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return { success: false, message: 'Invalid credentials' };
    }

    const user = users[0];
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Authentication failed' };
  }
}

// Get admin user from token
export async function getAdminFromToken(token) {
  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return null;
    }

    const users = await query(
      'SELECT id, email, name FROM admin_users WHERE id = ?',
      [decoded.id]
    );

    return users.length > 0 ? users[0] : null;
  } catch (error) {
    console.error('Get admin from token error:', error);
    return null;
  }
}

