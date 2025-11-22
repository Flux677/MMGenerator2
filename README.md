# 🔮 MythicMobs AI Generator

Generator otomatis untuk custom mobs MythicMobs menggunakan AI Claude Sonnet 4.x

## ✨ Features

- 🤖 AI-powered mob generation
- 🎭 LibsDisguises integration
- ⚔️ Advanced skill templates
- 📦 Multiple mob categories (Boss, Dungeon, MiniBoss, Regular)
- 🎨 Modern, user-friendly interface
- 📥 Download as YAML files
- 🔒 Private deployment (Vercel)

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ (untuk development lokal)
- Vercel account
- Claude API key (dari https://console.anthropic.com)

### 2. Setup

```bash
# Clone atau download project ini
git clone <your-repo-url>
cd mythicmobs-generator

# Install dependencies (opsional, untuk testing lokal)
npm install
```

### 3. Deploy ke Vercel

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

#### Option B: Vercel Dashboard
1. Buka https://vercel.com
2. Klik "Import Project"
3. Connect ke Git repository atau upload folder
4. Vercel akan auto-detect configuration

### 4. Configure Environment Variables

**PENTING:** Setelah deploy, set environment variable di Vercel Dashboard:

1. Buka project di Vercel Dashboard
2. Go to Settings > Environment Variables
3. Tambahkan variable baru:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your Claude API key (sk-ant-...)
   - **Environment:** Production (dan Deevelopment jika perlu)
4. Save dan redeploy project

### 5. Make it Private

Untuk membuat deployment private:

1. Di Vercel Dashboard > Settings > General
2. Scroll ke "Privacy"
3. Enable "Password Protection" atau "Vercel Authentication"
4. Set password yang strong

Atau gunakan Vercel's built-in authentication untuk team.

## 📖 Usage Guide

### Membuat Boss

1. Pilih kategori "Boss"
2. Isi deskripsi, contoh:
   ```
   Buat boss "Ancient Fire Dragon" dengan:
   - HP: 5000
   - Skills: Fireball Barrage, Flame Breath, Wing Attack, Fire Rain
   - Model: Ender Dragon dengan efek api
   - Drop: Dragon scales dan rare items
   ```
3. (Opsional) Centang "Gunakan referensi" dan masukkan karakter anime/game
4. Klik "Generate MythicMobs"
5. Download file YAML yang dihasilkan

### Membuat Dungeon Set

1. Pilih "Boss + Dungeon Mobs"
2. Deskripsikan tema dungeon:
   ```
   Dungeon tema ice castle dengan:
   - Boss: Frost King (boss utama)
   - 3 mob pendukung: Ice Knight, Frost Mage, Ice Golem
   - Skill tema ice/frost
   ```
3. Generate dan download

### Tips untuk Hasil Terbaik

✅ **DO:**
- Sebutkan nama mob dengan jelas
- Deskripsi skill yang diinginkan
- Tentukan tema/element (fire, ice, dark, etc.)
- Sebutkan model vanilla yang ingin digunakan
- Berikan referensi karakter jika ada

❌ **DON'T:**
- Jangan terlalu vague ("buat mob keren")
- Hindari request yang terlalu kompleks dalam satu generation
- Jangan expect skill yang tidak possible di MythicMobs

## 🎮 MythicMobs Setup

### Install ke Server

1. Copy generated YAML files ke folder:
   ```
   plugins/MythicMobs/
   ├── Mobs/
   │   └── GeneratedMobs.yml
   ├── Skills/
   │   └── GeneratedSkills.yml
   ├── Items/ (jika ada)
   │   └── GeneratedItems.yml
   └── DropTables/ (jika ada)
       └── GeneratedDrops.yml
   ```

2. Reload MythicMobs:
   ```
   /mm reload
   ```

3. Spawn mob untuk test:
   ```
   /mm mobs spawn <mobname>
   ```

### LibsDisguises Setup

1. Install plugin LibsDisguises
2. Disguise akan auto-apply saat mob spawn
3. Untuk custom player skins, upload skin ke server

## 🔧 Troubleshooting

### Error: "Server configuration error"
**Solusi:** ANTHROPIC_API_KEY belum di-set di Vercel environment variables

### Error: "429 Too Many Requests"
**Solusi:** Claude API rate limit tercapai. Tunggu beberapa menit.

### Error: "Invalid response from API"
**Solusi:** 
- Check prompt tidak terlalu panjang
- Simplify request jika terlalu complex

### Mob tidak spawn dengan benar
**Solusi:**
- Check console untuk syntax errors
- Pastikan MythicMobs versi compatible
- Validate YAML syntax online

### Disguise tidak work
**Solusi:**
- Pastikan LibsDisguises installed
- Check LibsDisguises permissions
- Cek console untuk errors

## 📚 Advanced Features

### Skill Templates

Generator menggunakan skill templates dari file referensi:
- `Lerfing_Skills.txt` - Combat skills
- `Bullets.txt` - Projectile/bullet systems

Templates ini memberikan skill yang sudah tested dan balanced.

### Custom Categories

Edit `api/generate.js` untuk menambah kategori baru atau modify specs.

### Extending the Generator

Untuk menambah features:
1. Update frontend di `public/index.html`
2. Update state handling di `js/main.js`
3. Update API handler di `api/generate.js`
4. Update system prompt untuk include new features

## 🔒 Security Notes

- ✅ API key hanya ada di server (Vercel environment)
- ✅ Tidak ada API key di frontend code
- ✅ HTTPS encryption by default
- ✅ Private deployment options available
- ⚠️ Rate limiting dihandle oleh Claude API

## 📝 Contributing

Untuk contribute atau report bugs:
1. Create issue di repository
2. Submit pull request dengan changes
3. Follow existing code style

## 📄 License

This project is for personal/private use. MythicMobs adalah trademark dari Mythic contributors.

## 🙏 Credits

- MythicMobs plugin by Mythic team
- Skill templates by Lerfing
- UI inspired by modern web design
- Powered by Claude AI (Anthropic)

## 📞 Support

Jika ada masalah atau pertanyaan:
- Check documentation di https://git.mythiccraft.io/mythiccraft/MythicMobs/-/wikis/home
- Join MythicMobs Discord
- Create issue di repository ini

---

**Happy Mob Creating!** 🎮✨