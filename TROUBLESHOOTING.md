# 🔧 Troubleshooting Guide

Solusi untuk masalah umum yang mungkin terjadi.

## 🚨 Deployment Issues

### Error: "Server configuration error"

**Penyebab:** Environment variable `ANTHROPIC_API_KEY` belum di-set

**Solusi:**
```bash
# Check environment variables
vercel env ls

# Add API key
vercel env add ANTHROPIC_API_KEY production

# Redeploy
vercel --prod
```

**Verifikasi:**
```bash
# Check di Vercel Dashboard:
# Project > Settings > Environment Variables
# Pastikan ANTHROPIC_API_KEY ada dan valuenya benar
```

---

### Error: "Function execution timeout"

**Penyebab:** Claude API response terlalu lama (>60 detik)

**Solusi:**
1. Simplify prompt (jangan terlalu kompleks)
2. Reduce jumlah mobs (jika dungeon set)
3. Check Claude API status

**Temporary fix:**
```json
// vercel.json - increase timeout
{
  "functions": {
    "api/generate.js": {
      "maxDuration": 300  // 5 minutes (Pro plan only)
    }
  }
}
```

---

### Error: "Build failed" saat deploy

**Penyebab:** File structure salah atau dependency error

**Solusi:**
1. Check struktur folder:
```
mythicmobs-generator/
├── public/
│   ├── index.html
│   ├── css/
│   └── js/
├── api/
│   └── generate.js
└── vercel.json
```

2. Validate vercel.json syntax:
```bash
# Use JSON validator online
cat vercel.json | jq .
```

3. Clear Vercel cache:
```bash
vercel --force
```

---

## 🤖 API Issues

### Error: "Invalid API key"

**Penyebab:** API key salah atau expired

**Solusi:**
1. Check API key format: `sk-ant-api03-...`
2. Generate new key di https://console.anthropic.com
3. Update di Vercel:
```bash
vercel env rm ANTHROPIC_API_KEY production
vercel env add ANTHROPIC_API_KEY production
vercel --prod
```

---

### Error: "Rate limit exceeded (429)"

**Penyebab:** Terlalu banyak request dalam waktu singkat

**Solusi:**
1. **Wait:** Tunggu 1-5 menit
2. **Check usage:** https://console.anthropic.com/usage
3. **Implement rate limiting** (if needed):

```javascript
// Add to api/generate.js
const rateLimit = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  
  // Filter requests dalam 1 menit terakhir
  const recentRequests = userRequests.filter(time => now - time < 60000);
  
  if (recentRequests.length >= 3) {
    return false; // Too many requests
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return true;
}
```

---

### Error: "API request failed"

**Penyebab:** Network issue atau Claude API down

**Solusi:**
1. Check Claude API status: https://status.anthropic.com
2. Check logs:
```bash
vercel logs
```
3. Retry setelah beberapa menit

---

## 📝 Generation Issues

### Generated YAML syntax error

**Penyebab:** Claude generate syntax yang salah

**Solusi:**
1. **Validate YAML:**
```bash
# Online validator: yamllint.com
# Or use command:
cat generated.yml | yamllint -
```

2. **Common fixes:**
```yaml
# ❌ Wrong
Skills:
- damage {amount=10}  # Missing colon

# ✅ Correct
Skills:
- damage{amount=10}

# ❌ Wrong
Type: ZOMBIE # Tab character

# ✅ Correct (2 spaces)
Type: ZOMBIE
```

3. **Re-generate dengan prompt lebih spesifik**

---

### Mob tidak spawn in-game

**Checks:**
```bash
# 1. Reload MythicMobs
/mm reload

# 2. Check for errors
/mm errors

# 3. Check mob exists
/mm mobs list

# 4. Try spawn directly
/mm mobs spawn YourMobName
```

**Common causes:**
- File tidak di folder yang benar
- YAML syntax error
- Mob name typo
- MythicMobs version incompatibility

---

### Skills tidak work

**Debug steps:**
```yaml
# Add debug messages
Skills:
- message{m="Skill triggered!"} @self ~onSpawn
- delay 20
- damage{amount=10} @target
```

**Common issues:**
1. **Cooldown terlalu tinggi**
```yaml
# Lower cooldown for testing
Cooldown: 1  # Instead of 10
```

2. **Conditions tidak terpenuhi**
```yaml
# Remove conditions untuk test
# Conditions:
# - targetwithin 10
```

3. **Targeter salah**
```yaml
# Test dengan simple targeter
- damage{amount=10} @self  # Damage diri sendiri untuk test
```

---

### LibsDisguises tidak apply

**Solusi:**

1. **Check LibsDisguises installed:**
```bash
/plugins
# Should see: LibsDisguises
```

2. **Check syntax:**
```yaml
# Method 1: Options
Options:
  Disguise: ENDER_DRAGON

# Method 2: Skill
Skills:
- disguise{d=ENDER_DRAGON} @self ~onSpawn

# Method 3: Direct field
Disguise: ENDER_DRAGON setGlowing true
```

3. **Check permissions:**
```yaml
# OP yourself for testing
/op YourName
```

4. **Version compatibility:**
- MythicMobs 5.x needs LibsDisguises 10.x
- Check version compatibility

---

## 🎮 In-Game Issues

### Boss terlalu strong

**Balance fixes:**
```yaml
# Reduce HP
Health: 1000  # Instead of 10000

# Reduce damage
- damage{amount=5}  # Instead of 50

# Add cooldown
Cooldown: 10  # Higher = less frequent

# Reduce armor
Armor: 10  # Lower number
```

---

### Boss terlalu weak

**Buff options:**
```yaml
# Increase HP
Health: 10000

# Add damage resistance
Options:
  KnockbackResistance: 1.0
  
# Add regeneration
Skills:
- heal{amount=10} @self ~onTimer:100

# Add damage boost
Damage: 20
```

---

### Skills spam terlalu cepat

**Fix cooldowns:**
```yaml
YourSkill:
  Cooldown: 10  # Add/increase cooldown
  Conditions:
  - targetwithin 20
  Skills:
  - damage{amount=10}
```

---

### Mob despawn instantly

**Prevent despawn:**
```yaml
Options:
  Despawn: false
  Persistent: true
  PreventOtherDrops: true
```

---

## 💻 Frontend Issues

### Button tidak respond

**Solusi:**
1. **Check browser console** (F12)
2. **Clear cache:**
   - Ctrl+Shift+R (hard reload)
3. **Check JavaScript errors**
4. **Try different browser**

---

### Copy button tidak work

**Fallback manual:**
1. Select text manually
2. Ctrl+C to copy
3. Or use Download button instead

**Fix for browsers:**
```javascript
// Already included fallback in code
// If still fails, check HTTPS (clipboard API needs HTTPS)
```

---

### Download tidak work

**Manual download:**
1. Copy text dari code block
2. Buka text editor (Notepad++)
3. Paste dan save as `.yml`
4. Ensure UTF-8 encoding

---

## 🔐 Security Issues

### API key exposed in browser

**Verify:**
```javascript
// Check network tab (F12)
// API key should NOT appear in:
// - Response body
// - Request headers (client-side)

// API key ONLY in:
// - Server-side headers (api/generate.js)
```

**If exposed:**
1. Immediately rotate key
2. Check code tidak ada hardcoded key
3. Update `.gitignore`

---

### Unauthorized access to app

**Enable protection:**

**Method 1: Password**
```
Vercel Dashboard > Settings > Protection
Enable "Password Protection"
```

**Method 2: Team Auth**
```
Vercel Dashboard > Settings > Protection  
Enable "Vercel Authentication"
```

**Method 3: Environment Detection**
```javascript
// api/generate.js
if (process.env.NODE_ENV === 'production') {
  const authHeader = req.headers.authorization;
  if (authHeader !== 'Bearer YOUR_SECRET') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
```

---

## 📊 Performance Issues

### Slow generation (>60 seconds)

**Optimization:**

1. **Simplify prompt:**
```
❌ Too complex:
"Buat 10 boss dengan masing-masing 20 skills unik..."

✅ Better:
"Buat 1 boss dengan 5 skills"
```

2. **Split large requests:**
- Generate boss dulu
- Generate mobs terpisah
- Combine manually

3. **Use templates:**
- Enable "Advanced Skills" untuk use templates
- Faster + better quality

---

### High API costs

**Cost optimization:**

1. **Check usage:**
```
https://console.anthropic.com/usage
```

2. **Reduce token usage:**
- Shorter prompts
- Disable items/drops jika tidak perlu
- Use basic skills instead of advanced

3. **Set spending limits:**
```
Anthropic Dashboard > Settings > Billing
Set monthly limit
```

---

## 🆘 Still Need Help?

### Check Logs
```bash
# Vercel logs
vercel logs --follow

# Or in dashboard:
# Deployments > [deployment] > Runtime Logs
```

### Debug Mode
```javascript
// Add to api/generate.js for debugging
console.log('Request:', JSON.stringify(req.body));
console.log('Response:', JSON.stringify(claudeData));
```

### Get Support

1. **Vercel Issues:**
   - https://vercel.com/support
   - https://github.com/vercel/vercel/discussions

2. **Claude API:**
   - https://docs.anthropic.com
   - support@anthropic.com

3. **MythicMobs:**
   - https://discord.gg/mythicmobs
   - https://www.mythiccraft.io

4. **This Project:**
   - Create issue on GitHub
   - Contact maintainer

---

## ✅ Health Check Script

Quick script untuk check everything:

```bash
#!/bin/bash
echo "🔍 Checking MythicMobs Generator Health..."

# Check Vercel
echo "📦 Checking Vercel deployment..."
vercel ls

# Check environment
echo "🔑 Checking environment variables..."
vercel env ls

# Check logs
echo "📋 Recent logs:"
vercel logs --limit 10

# Test endpoint
echo "🧪 Testing API endpoint..."
curl -X POST https://your-app.vercel.app/api/generate \
  -H "Content-Type: application/json" \
  -d '{"category":"boss","prompt":"test"}' \
  | jq .

echo "✅ Health check complete!"
```

---

**Remember:** Jika ada issue yang tidak tercover di sini, buat issue di repository dengan:
- Error message lengkap
- Steps to reproduce
- Screenshots (jika UI issue)
- Browser/environment info

Happy debugging! 🐛➡️✨