import { v4 as uuidv4 } from 'uuid'
export function getUUID12() {
  return uuidv4().split('-')[4]
}
