import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/* ---------------- RATE LIMIT CONFIG ---------------- */

const RATE_LIMIT = 10 // max requests
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const EMAIL_WINDOW_MS = 1 * 60 * 1000 // 10 minutes
const MIN_FORM_TIME = 3000 // 3 seconds

const ipStore = new Map<string, { count: number; time: number }>()
const emailStore = new Map<string, number>()

/* -------------------------------------------------- */

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      firstName,
      lastName,
      email,
      message,
      company,
      formStart,
    } = body

    /* ---------- 1️⃣ Honeypot (silent) ---------- */
    if (company) {
      return NextResponse.json({ success: true })
    }

    /* ---------- 2️⃣ Time-based bot check ---------- */
    if (!formStart || Date.now() - Number(formStart) < MIN_FORM_TIME) {
      return NextResponse.json({ success: true })
    }

    /* ---------- 3️⃣ IP Rate Limiting ---------- */
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    const now = Date.now()
    const record = ipStore.get(ip)

    if (record && now - record.time < WINDOW_MS) {
      if (record.count >= RATE_LIMIT) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        )
      }
      record.count++
    } else {
      ipStore.set(ip, { count: 1, time: now })
    }

    /* ---------- 4️⃣ Email Throttling ---------- */
    const lastEmailTime = emailStore.get(email)
    if (lastEmailTime && now - lastEmailTime < EMAIL_WINDOW_MS) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
    emailStore.set(email, now)

    /* ---------- 5️⃣ Basic Validation ---------- */
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'Invalid data' },
        { status: 400 }
      )
    }

    /* ---------- 6️⃣ Send Emails ---------- */

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 📩 Email to you
    await transporter.sendMail({
      from: `"Tirthajal Website" <${process.env.EMAIL_USER}>`,
      to: 'info@tirthancottage.com',
      replyTo: email,
      subject: 'New Website Enquiry',
      html: `
        <h3>New Enquiry</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr/>
        <small>IP: ${ip}</small>
      `,
    })

    // 📬 Auto-reply to guest
    await transporter.sendMail({
      from: `"Tirthajal Kuteer" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'We received your message 🌿',
      html: `
        <p>Hi ${firstName},</p>
        <p>Thank you for reaching out to <strong>Tirthajal Kuteer</strong>.</p>
        <p>We’ve received your enquiry and will get back to you shortly.</p>
        <p>Warm regards,<br/>Tirthajal Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
