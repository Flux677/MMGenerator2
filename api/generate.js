/**
 * Serverless function for MythicMobs generation
 * Uses Claude API to generate configurations
 * 
 * Environment Variables Required:
 * - ANTHROPIC_API_KEY: Your Claude API key (set in Vercel dashboard)
 */

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { category, prompt, reference, useLibsDisguises, includeItems, includeDrops, advancedSkills } = req.body;

        // Validation
        if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Check for API key
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            console.error('ANTHROPIC_API_KEY not set');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        // Build system prompt
        const systemPrompt = buildSystemPrompt(category, useLibsDisguises, includeItems, includeDrops, advancedSkills);
        
        // Build user prompt
        const userPrompt = buildUserPrompt(prompt, reference, category);

        // Call Claude API
        const claudeResponse = await fetch(CLAUDE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: MODEL,
                max_tokens: 8000,
                messages: [{
                    role: 'user',
                    content: userPrompt
                }],
                system: systemPrompt
            })
        });

        if (!claudeResponse.ok) {
            const errorText = await claudeResponse.text();
            console.error('Claude API error:', errorText);
            return res.status(claudeResponse.status).json({ 
                error: 'API request failed',
                details: errorText 
            });
        }

        const claudeData = await claudeResponse.json();
        
        // Extract generated content
        const generatedText = claudeData.content[0].text;
        
        // Parse the response
        const parsed = parseGeneratedContent(generatedText);

        // Return success response
        return res.status(200).json(parsed);

    } catch (error) {
        console.error('Error in generate handler:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}

function buildSystemPrompt(category, useLibsDisguises, includeItems, includeDrops, advancedSkills) {
    let prompt = `You are an expert MythicMobs configuration generator for Minecraft. Your task is to create high-quality, balanced, and creative mob configurations based on user requests.

CRITICAL RULES:
1. Generate ONLY valid YAML syntax following MythicMobs wiki standards
2. All configurations must be production-ready and bug-free
3. Use proper indentation (2 spaces per level)
4. Include comments to explain complex mechanics
5. Balance the mob appropriately for the category (${category})
6. Never use placeholder values - everything must be complete and functional

CATEGORY SPECIFICATIONS:
${getCategorySpecs(category)}

${useLibsDisguises ? `LIBSDISGUISES:
- ALWAYS use LibsDisguises for custom appearances
- Use disguise commands in Skills or mob Options
- Choose appropriate disguise types (PLAYER, mob types, or custom models)
- Example: Disguise: ENDER_DRAGON setGlowing true` : ''}

${advancedSkills ? `ADVANCED SKILLS:
- Use the provided skill templates from the reference files
- Create complex skill combinations and rotations
- Include cooldowns, conditions, and proper targeting
- Use particles, sounds, and visual effects
- Create skill phases for bosses
- Use metaskills for complex behaviors` : `BASIC SKILLS:
- Keep skills simple and straightforward
- Focus on core mechanics only
- Use basic damage, movement, and effects`}

SKILL MECHANICS TO USE:
- Damage mechanics with proper scaling
- Particle effects for visual feedback
- Sound effects for audio feedback  
- Targeters (@Target, @Self, @PIR, @LivingInCone, etc.)
- Conditions (targetwithin, health checks, etc.)
- Delays and timing for skill sequences
- Potion effects, throws, leaps
- Projectiles (shoot, shootfireball, missile)
- Summons for minions or effects

${includeItems ? `ITEMS:
- Generate custom items with proper stats
- Use vanilla-compatible item options
- Include enchantments and attributes
- Add lore and display names` : ''}

${includeDrops ? `DROPS:
- Create balanced drop tables
- Include exp and item drops
- Use drop conditions where appropriate` : ''}

OUTPUT FORMAT:
Return your response in this exact format:

=== MOBS ===
[mob configuration here]

=== SKILLS ===
[skills configuration here]

${includeItems ? '=== ITEMS ===\n[items configuration here]\n' : ''}
${includeDrops ? '=== DROPS ===\n[drops configuration here]\n' : ''}

IMPORTANT:
- Never use localStorage, sessionStorage, or browser storage APIs
- All configs must be complete, no TODOs or placeholders
- Test mentally for syntax errors before responding
- Ensure proper YAML indentation
- Reference the MythicMobs wiki for accurate syntax`;

    return prompt;
}

function getCategorySpecs(category) {
    const specs = {
        boss: `BOSS MOBS:
- High HP (1000-10000+)
- Multiple skill phases
- Boss bar enabled
- Complex AI with skill rotations
- Music/sound on spawn
- Special mechanics (invulnerability phases, summons, etc.)
- Epic loot drops`,

        boss_dungeon: `BOSS + DUNGEON MOBS:
- Create 1 main boss (high HP, complex skills)
- Create 3-5 supporting mobs (medium HP, simpler skills)
- Mobs should complement the boss theme
- Include miniboss variants
- Coordinated abilities between mobs`,

        miniboss: `MINI BOSS:
- Medium-high HP (500-2000)
- 3-5 signature abilities
- Boss bar optional
- Challenging but not overwhelming
- Good drops`,

        regular: `REGULAR MOBS:
- Balanced HP (20-200)
- 1-3 simple abilities
- Suitable for world spawning
- Thematic but not overpowered`
    };

    return specs[category] || specs.regular;
}

function buildUserPrompt(prompt, reference, category) {
    let userPrompt = `Generate a MythicMobs configuration for the following request:

CATEGORY: ${category}
DESCRIPTION: ${prompt}
${reference ? `REFERENCE: Base this on ${reference}` : ''}

Please create a complete, production-ready configuration that:
1. Matches the description perfectly
2. Uses appropriate skills from the template library
3. Has balanced stats for the category
4. Includes LibsDisguises configuration
5. Features creative and fun mechanics
6. Is bug-free and ready to use

Generate the configuration now:`;

    return userPrompt;
}

function parseGeneratedContent(text) {
    const result = {
        mobs: '',
        skills: '',
        items: '',
        drops: ''
    };

    try {
        // Extract sections using markers
        const mobsMatch = text.match(/===\s*MOBS\s*===\s*([\s\S]*?)(?:===|$)/i);
        const skillsMatch = text.match(/===\s*SKILLS\s*===\s*([\s\S]*?)(?:===|$)/i);
        const itemsMatch = text.match(/===\s*ITEMS\s*===\s*([\s\S]*?)(?:===|$)/i);
        const dropsMatch = text.match(/===\s*DROPS\s*===\s*([\s\S]*?)(?:===|$)/i);

        if (mobsMatch) result.mobs = mobsMatch[1].trim();
        if (skillsMatch) result.skills = skillsMatch[1].trim();
        if (itemsMatch) result.items = itemsMatch[1].trim();
        if (dropsMatch) result.drops = dropsMatch[1].trim();

        // Fallback: if no markers found, try to parse as single YAML
        if (!result.mobs && !result.skills) {
            // Assume it's all mobs config
            result.mobs = text.trim();
            result.skills = '# Skills referenced inline in mob config';
        }

    } catch (error) {
        console.error('Error parsing generated content:', error);
        throw new Error('Failed to parse generated configuration');
    }

    return result;
}