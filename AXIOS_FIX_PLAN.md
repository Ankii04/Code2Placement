# Fix All Axios Imports Script

This script documents all the files that need to be updated to use the configured `api` instance instead of raw `axios`.

## Files to Fix:

### 1. ResumeAnalysis.jsx
- Replace: `import axios from 'axios'` → `import api from '../services/api'`
- Update all axios calls to use `api` and remove manual token headers

### 2. MockInterview.jsx
- Replace: `import axios from 'axios'` → `import api from '../services/api'`
- Update all axios calls to use `api` and remove manual token headers

### 3. Courses.jsx
- Replace: `import axios from 'axios'` → `import api from '../services/api'`
- Update all axios calls to use `api` and remove manual token headers

### 4. DSATopicNotes.jsx (component)
- Replace: `import axios from 'axios'` → `import api from '../services/api'`
- Update all axios calls to use `api`

## Pattern to Follow:

### Before:
```javascript
import axios from 'axios';

const token = localStorage.getItem('token');
const { data } = await axios.get('/api/endpoint', {
    headers: { Authorization: `Bearer ${token}` }
});
```

### After:
```javascript
import api from '../services/api';

const { data } = await api.get('/endpoint');
```

Note: Remove `/api` prefix from endpoints since it's already in the baseURL.
