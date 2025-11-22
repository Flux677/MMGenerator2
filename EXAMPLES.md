# 📝 Example Prompts - MythicMobs Generator

Kumpulan contoh prompts yang bagus untuk hasil optimal.

## 🔥 Boss Examples

### Fire Theme Boss
```
Buat boss bernama "Inferno Dragon King" dengan:
- HP: 8000
- Type: ENDER_DRAGON
- Skills:
  * Fireball Barrage - spam banyak fireball
  * Flame Breath - flamethrower attack
  * Meteor Strike - summon meteor dari langit
  * Fire Nova - AOE damage di sekitar boss
  * Flame Wings - dash attack dengan trail api
- Phase system:
  * Phase 1 (100-50% HP): Skills normal
  * Phase 2 (50-0% HP): Skills lebih cepat + summon Fire Minions
- LibsDisguises: Ender Dragon dengan particle api
- Drop: Dragon Scale, Fire Essence, Legendary Sword
- BossBar: merah dengan title "Inferno Dragon King"
```

### Ice Theme Boss
```
Buat boss "Frost Queen" dengan:
- HP: 5000
- Type: ZOMBIE (female player model)
- Appearance: Elsa-style ice queen
- Skills:
  * Ice Spike Rain - ice spike jatuh dari langit
  * Frozen Prison - freeze player dalam ice block
  * Blizzard - slow + damage AOE
  * Ice Clone - summon ice clone
  * Frost Nova - knockback + slow
- Mechanics:
  * Teleport setiap 20 detik
  * Summon Ice Golem di 50% HP
  * Invulnerable saat casting ultimate
- LibsDisguises: PLAYER skin ice queen
- Loot: Ice Crown, Frozen Heart, Ice Wand
```

### Dark Theme Boss
```
Generate boss "Shadow Reaper" dengan tema dark/void:
- HP: 6000
- Model: WITHER_SKELETON dengan wings
- Combat style: Melee + dark magic
- Skills referensi dari Lerfing_Skills.txt:
  * dimension_slash_mob
  * soul_blast_mob
  * demon_sword_assault
  * corrupted_nebula
- Tambah skill custom:
  * Void Teleport
  * Shadow Clone
  * Death Mark (DOT damage)
- Boss mechanics:
  * Immune to arrows
  * Teleport behind player setiap 15 detik
  * Summon shadow minions di 30% HP
- Drops: Shadow Scythe, Void Crystal, Dark Essence
```

## ⚔️ Dungeon Set Examples

### Ice Dungeon
```
Buat dungeon set tema "Frozen Citadel":

Boss: Frost King
- HP: 10000
- Full ice skills
- Summon ice knights

Supporting Mobs:
1. Ice Knight (Tank)
   - HP: 1000
   - Melee dengan shield
   - Skill: Ice Slam, Shield Bash
   
2. Frost Mage (Ranged DPS)
   - HP: 500
   - Ice projectile attacks
   - Skill: Ice Bolt, Freeze Ray
   
3. Ice Golem (Heavy)
   - HP: 2000
   - Slow tapi tanky
   - Skill: Ground Slam, Ice Armor

4. Frost Archer (Ranged)
   - HP: 400
   - Arrow barrage
   - Skill: Multi-shot, Ice Arrow

Semua mob pakai LibsDisguises tema ice/frost
```

### Nether Theme Dungeon
```
Dungeon: "Hellfire Fortress"

Main Boss: Demon Lord
- HP: 15000
- Ender Dragon model + fire particles
- Ultimate skills dari template

Miniboss: Flame Commander
- HP: 5000
- Wither Skeleton
- Fire skills

Regular Mobs:
1. Hellhound - Fast melee, fire trail
2. Infernal Mage - Fireball caster
3. Lava Golem - Tank dengan lava puddles
4. Fire Imp - Small, annoying, explode on death

Include drop tables untuk semua mobs
```

## 🎯 MiniBoss Examples

### Speed Type
```
MiniBoss "Lightning Assassin":
- HP: 2000
- Speed-based combat
- Skills:
  * Dash Strike
  * Lightning Step (blink)
  * Quick Slash (multi-hit)
  * Smoke Bomb (escape)
- Very mobile, hard to hit
- Drop: Swift Boots, Lightning Blade
```

### Tank Type
```
MiniBoss "Stone Colossus":
- HP: 5000
- Slow movement, high defense
- Skills:
  * Ground Pound (AOE)
  * Stone Throw (ranged)
  * Rock Armor (damage reduction)
  * Earthquake (stun)
- Immune to knockback
- Drop: Stone Heart, Heavy Armor
```

## 🐺 Regular Mob Examples

### Elemental Mobs
```
Buat 4 elemental mobs untuk world spawning:

1. Fire Spirit
   - HP: 100
   - Fireball attack
   - Melee burn damage
   
2. Water Spirit
   - HP: 120
   - Water spray (slow)
   - Healing puddles

3. Earth Spirit
   - HP: 150
   - Stone throw
   - Defense buff

4. Air Spirit
   - HP: 80
   - Fast movement
   - Knockback attacks

Semua balanced untuk survival world
```

### Fantasy Creatures
```
Regular mobs tema fantasy:

1. Forest Guardian
   - HP: 200
   - Protect forest area
   - Vine entangle, leaf storm

2. Cave Dweller
   - HP: 150
   - Spawn di caves
   - Stone throw, dark vision

3. Plains Runner
   - HP: 100
   - Fast mount-like mob
   - Charge attack

Include fair drops untuk early game
```

## 🎮 Themed Sets

### Anime-Inspired

#### One Punch Man Theme
```
Reference: Saitama dari One Punch Man

Boss "The Caped Baldy":
- HP: 10000 (but joke, terlalu strong)
- Skills:
  * Normal Punch (one-hit ko 50% chance)
  * Consecutive Normal Punches (rapid punch)
  * Serious Punch (massive damage + knockback)
- Mechanics:
  * Bored stance (idle animation)
  * Instant kill below 10% chance
- LibsDisguises: Bald player skin dengan cape
```

#### Naruto Theme
```
Referensi: Naruto characters

Set 3 mobs:

1. Sharingan User
   - Copy player's last attack
   - Fire style jutsu
   - Genjutsu (blindness effect)

2. Rasengan Master
   - Rasengan attack (dash + damage)
   - Shadow clone technique
   - Sage mode buff

3. Puppet Master
   - Control summoned puppets
   - Poison attacks
   - Thread trap
```

### Game-Inspired

#### Dark Souls Theme
```
Reference: Dark Souls bosses

"The Abyssal Knight":
- HP: 8000
- Slow, telegraphed attacks
- High damage, punishing
- Skills:
  * Heavy Slash (charge up)
  * Dark Wave (projectile)
  * Abyss Consume (lifesteal)
  * Phase transition di 50%
- Drop: Boss Soul, Rare Weapon
- Mechanics: Roll-catchable attacks
```

#### Minecraft Warden Style
```
Based on: Minecraft Warden

"Ancient Warden":
- HP: 4000
- Blind (detect by sound/vibration)
- Skills:
  * Sonic Boom (ranged attack)
  * Darkness (blindness effect)
  * Ground Smash (stun)
  * Enrage (when hit too much)
- Mechanics:
  * Can't see through walls
  * Aggro by movement/sound
  * Extremely strong melee
```

## 💡 Tips for Great Prompts

### ✅ DO:
- Specify HP range
- List desired skills clearly
- Mention theme/element
- Reference vanilla models
- Include drop items
- Specify difficulty level
- Mention special mechanics

### ❌ DON'T:
- Be too vague ("buat boss keren")
- Request impossible mechanics
- Forget to specify category
- Over-complicate dalam satu mob
- Request copyrighted skins without mention

### 🎯 Formula Sukses:
```
[Nama Mob] dengan tema [Theme]:
- HP: [number]
- Type/Model: [vanilla mob type]
- Skills: [list 3-5 skills]
- Mechanics: [special behaviors]
- LibsDisguises: [appearance]
- Drops: [loot items]
```

## 🔧 Advanced Examples

### Boss dengan Skill Phases
```
Boss "Elemental Chaos" dengan 4 phases:

Phase 1 (100-75% HP) - Fire
- Fire skills only
- Red particles

Phase 2 (75-50% HP) - Water
- Switch ke water skills
- Blue particles
- Heal slowly

Phase 3 (50-25% HP) - Earth
- Stone/earth skills
- High defense
- Summon rock minions

Phase 4 (25-0% HP) - Air
- Wind/lightning skills
- Fast movement
- Ultimate skill: Elemental Storm

Include phase transition animations
```

### Interactive Boss
```
Boss "The Strategist" dengan mechanic interactive:

Mechanics:
- Summon 3 pillars di arena
- Player harus destroy pillar untuk damage boss
- Pillar give buff ke boss
- Boss invulnerable saat semua pillar hidup
- Boss rage mode saat pillar destroyed
- Phase 2: Summon new pillars + minions

Skills adapt based on pillar count
```

---

**Pro Tip:** Combine template skills dengan custom idea untuk hasil terbaik! 🎮✨