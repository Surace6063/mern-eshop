import bcrypt from "bcryptjs"

const SALT = 10

const hashText = async (plainText) => {
   const salt = await bcrypt.genSalt(SALT)
   const hashedValue = await bcrypt.hash(plainText, salt)

   return hashedValue
}

export default hashText