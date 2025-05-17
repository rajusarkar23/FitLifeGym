import nodemailer from "nodemailer";

export async function otpVerifyEmail(otp: string, email: string) {
  const sender = process.env.NODEMAILER_EMAIL;
  const password = process.env.NODEMAILER_EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: sender,
      pass: password,
    },
  });

  await transporter
    .sendMail({
      from: '"Fit Life Gym" <rsa22027@gmail.com>',
      to: email,
      replyTo: sender,
      subject: `Fit Life Gym verification OTP`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 0; margin: 0; width: 100%; height: 100%;">
       <table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; height: 100%; background-color: #f4f4f4; text-align: center;">
         <tr>
           <td style="padding: 40px 0;">
             <table align="center" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center;">
               <tr>
                 <td>
                   <h2 style="color: #333333; margin-bottom: 20px;">Here is your OTP</h2>
                   <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">Welcome onboard, Please verify your email with the below OTP.</p>
                   <p style="font-size: 18px; color: #333333; margin-bottom: 30px;"><strong>OTP: ${otp}</strong></p>
                   <p style="font-size: 16px; color: #555555; margin-bottom: 20px;">From: ${sender}</p>
                   <p style="font-size: 14px; color: #777777;">This is an automated message, please do not reply.</p>
                 </td>
               </tr>
             </table>
           </td>
         </tr>
       </table>
     </div>`,
    })
    .catch((error) => {
      console.log(error);
    });
}