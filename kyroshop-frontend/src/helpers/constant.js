export const API_URL = import.meta.env.VITE_API_URL
export const mediaUrl = import.meta.env.VITE_MEDIA_BASE_URL
export const TOKEN_EXPIRATION_HOUR = import.meta.env.VITE_TOKEN_EXPIRATION_HOUR

export const ORDER_STATUS_OPTIONS = [
  {"value": "SAVED", "label": "Saved"},
  {"value": "CHECK_OUT", "label": "Check Out"},
  {"value": "CREATED", "label": "Created"},
  {"value": "PAID", "label": "Paid"},
  {"value": "SENT", "label": "Sent"},
  {"value": "RECEIVED", "label": "Received"},
  {"value": "RETURNED", "label": "Returned"},
  {"value": "DONE", "label": "Done"},
]