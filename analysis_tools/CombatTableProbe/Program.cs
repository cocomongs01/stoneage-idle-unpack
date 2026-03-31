using System.Globalization;
using System.Text;
using MemoryPack;

string root = args.Length > 0 ? args[0] : @"d:\MODS\exports\stonkey_tables_live_20260320";
string outDir = args.Length > 1 ? args[1] : Path.Combine(root, "combat_probe_out");
Directory.CreateDirectory(outDir);

var koText = ParseTextTable(Path.Combine(root, "ko_TextTable.bin"));
var tableStatNames = LoadTableStatNames(Path.Combine(root, "out", "table_stat.csv"));

var defenseFactors = DeserializeCollection<TableDefenseFactor>(Path.Combine(root, "TableDefenseFactor.bin"));
var combatPowerDiffs = DeserializeCollection<TableCombatPowerDiff>(Path.Combine(root, "TableCombatPowerDiff.bin"));
var stageCombatPowers = DeserializeCollection<TableStageCombatPower>(Path.Combine(root, "TableStageCombatPower.bin"));
var arenaTiers = DeserializeCollection<TableArenaTier>(Path.Combine(root, "TableArenaTier.bin"));
var elementsData = DeserializeCollection<TableElementsData>(Path.Combine(root, "TableElementsData.bin"));
var safetyRows = DeserializeCollection<TableSafety>(Path.Combine(root, "TableSafety.bin"));
var arenaBots = TryDeserializeCollection<TableArenaBot>(Path.Combine(root, "TableArenaBot.bin"));
var arenaSeasons = TryDeserializeCollection<TableArenaSeason>(Path.Combine(root, "TableArenaSeason.bin"));
var raceEventWinDefense = TryDeserializeCollection<TableRaceEventWinDefense>(Path.Combine(root, "TableRaceEventWinDefense.bin"));
var tableConstant = TryDeserializeSingle<TableConstant>(Path.Combine(root, "TableConstant.bin"));

WriteDefenseFactorCsv(defenseFactors, Path.Combine(outDir, "defense_factor.csv"));
WriteCombatPowerDiffCsv(combatPowerDiffs, Path.Combine(outDir, "combat_power_diff.csv"));
WriteStageCombatPowerCsv(stageCombatPowers, Path.Combine(outDir, "stage_combat_power.csv"));
WriteArenaTierCsv(arenaTiers, koText, tableStatNames, Path.Combine(outDir, "arena_tier.csv"));
WriteElementsDataCsv(elementsData, koText, tableStatNames, Path.Combine(outDir, "elements_data.csv"));
WriteSafetyCsv(safetyRows, Path.Combine(outDir, "safety.csv"));
WriteArenaBotCsv(arenaBots, koText, Path.Combine(outDir, "arena_bot.csv"));
WriteArenaSeasonCsv(arenaSeasons, koText, Path.Combine(outDir, "arena_season.csv"));
WriteRaceEventWinDefenseCsv(raceEventWinDefense, Path.Combine(outDir, "race_event_win_defense.csv"));
WriteTableConstantCsv(tableConstant, Path.Combine(outDir, "table_constant.csv"));

Console.WriteLine($"Wrote combat probe csv files to {outDir}");

static Dictionary<string, string> ParseTextTable(string path)
{
    var map = new Dictionary<string, string>(StringComparer.Ordinal);
    if (!File.Exists(path))
    {
        return map;
    }

    using var ms = File.OpenRead(path);
    using var br = new BinaryReader(ms);

    int count = br.ReadInt32();
    for (int i = 0; i < count; i++)
    {
        byte fieldCount = br.ReadByte();
        var fields = new List<string?>(fieldCount);
        for (int j = 0; j < fieldCount; j++)
        {
            int len = br.ReadInt32();
            if (len == -1)
            {
                fields.Add(null);
                continue;
            }

            if (len >= 0)
            {
                int byteLen = checked(len * 2);
                fields.Add(Encoding.Unicode.GetString(br.ReadBytes(byteLen)));
            }
            else
            {
                _ = br.ReadInt32();
                int byteLen = checked((-len) - 1);
                fields.Add(Encoding.UTF8.GetString(br.ReadBytes(byteLen)));
            }
        }

        if (fields.Count >= 2 && !string.IsNullOrWhiteSpace(fields[0]))
        {
            map[fields[0]!] = fields[1] ?? string.Empty;
        }
    }

    return map;
}

static Dictionary<int, string> LoadTableStatNames(string path)
{
    var map = new Dictionary<int, string>();
    if (!File.Exists(path))
    {
        return map;
    }

    using var sr = new StreamReader(path, true);
    string? line = sr.ReadLine();
    while ((line = sr.ReadLine()) != null)
    {
        var parts = ParseCsvLine(line);
        if (parts.Count < 3 || !int.TryParse(parts[0], out var id))
        {
            continue;
        }

        map[id] = parts[2];
    }

    return map;
}

static List<string> ParseCsvLine(string line)
{
    var result = new List<string>();
    var sb = new StringBuilder();
    bool inQuotes = false;

    for (int i = 0; i < line.Length; i++)
    {
        char c = line[i];
        if (inQuotes)
        {
            if (c == '"')
            {
                if (i + 1 < line.Length && line[i + 1] == '"')
                {
                    sb.Append('"');
                    i++;
                }
                else
                {
                    inQuotes = false;
                }
            }
            else
            {
                sb.Append(c);
            }
        }
        else
        {
            if (c == ',')
            {
                result.Add(sb.ToString());
                sb.Clear();
            }
            else if (c == '"')
            {
                inQuotes = true;
            }
            else
            {
                sb.Append(c);
            }
        }
    }

    result.Add(sb.ToString());
    return result;
}

static List<T> DeserializeCollection<T>(string path)
{
    byte[] bytes = File.ReadAllBytes(path);
    Exception? lastError = null;

    try
    {
        var arr = MemoryPackSerializer.Deserialize<T[]>(bytes);
        if (arr != null)
        {
            return arr.ToList();
        }
    }
    catch (Exception ex)
    {
        lastError = ex;
    }

    try
    {
        var list = MemoryPackSerializer.Deserialize<List<T>>(bytes);
        if (list != null)
        {
            return list;
        }
    }
    catch (Exception ex)
    {
        lastError = ex;
    }

    throw new InvalidOperationException($"Failed to deserialize {typeof(T).Name} from {path}", lastError);
}

static List<T> TryDeserializeCollection<T>(string path)
{
    if (!File.Exists(path))
    {
        return new List<T>();
    }

    try
    {
        return DeserializeCollection<T>(path);
    }
    catch
    {
        return new List<T>();
    }
}

static T? TryDeserializeSingle<T>(string path)
{
    if (!File.Exists(path))
    {
        return default;
    }

    try
    {
        byte[] bytes = File.ReadAllBytes(path);
        return MemoryPackSerializer.Deserialize<T>(bytes);
    }
    catch
    {
        return default;
    }
}

static void WriteDefenseFactorCsv(List<TableDefenseFactor> rows, string outPath)
{
    using var sw = CreateWriter(outPath);
    sw.WriteLine("ID,DefenseFactor");
    foreach (var row in rows.OrderBy(x => x.ID))
    {
        sw.WriteLine(string.Join(",",
            Csv(row.ID),
            Csv(row.DefenseFactor)
        ));
    }
}

static void WriteCombatPowerDiffCsv(List<TableCombatPowerDiff> rows, string outPath)
{
    using var sw = CreateWriter(outPath);
    sw.WriteLine("ID,CombatPowerDiff,DamageMultiplier");
    foreach (var row in rows.OrderBy(x => x.CombatPowerDiff))
    {
        sw.WriteLine(string.Join(",",
            Csv(row.ID),
            Csv(row.CombatPowerDiff.ToString(CultureInfo.InvariantCulture)),
            Csv(row.DamageMultiplier.ToString(CultureInfo.InvariantCulture))
        ));
    }
}

static void WriteStageCombatPowerCsv(List<TableStageCombatPower> rows, string outPath)
{
    using var sw = CreateWriter(outPath);
    sw.WriteLine("ID,CombatPower");
    foreach (var row in rows.OrderBy(x => x.ID))
    {
        sw.WriteLine(string.Join(",",
            Csv(row.ID),
            Csv(row.CombatPower)
        ));
    }
}

static void WriteArenaTierCsv(List<TableArenaTier> rows, Dictionary<string, string> text, Dictionary<int, string> tableStatNames, string outPath)
{
    using var sw = CreateWriter(outPath);
    sw.WriteLine("ID,MatchingType,MatchingGroup,MatchingScoreMinus,MatchingScorePlus,ArenaTierScoreMin,ArenaTierScoreMax,ArenaTierRankConditionMin,ArenaTierRankConditionMax,ArenaTierNameKey,ArenaTierNameKo,ArenaTierIcon,ArenaTierResetScore,PackageID,DisplayRating,MyStatCalibrate,EnemyStatCalibrate");
    foreach (var row in rows.OrderBy(x => x.ID))
    {
        sw.WriteLine(string.Join(",",
            Csv(row.ID),
            Csv(row.MatchingType),
            Csv(row.MatchingGroup),
            Csv(row.MatchingScoreMinus),
            Csv(row.MatchingScorePlus),
            Csv(row.ArenaTierScoreMin),
            Csv(row.ArenaTierScoreMax),
            Csv(row.ArenaTierRankConditionMin),
            Csv(row.ArenaTierRankConditionMax),
            Csv(row.ArenaTierName),
            Csv(ResolveTid(text, row.ArenaTierName)),
            Csv(row.ArenaTierIcon),
            Csv(row.ArenaTierResetScore),
            Csv(row.PackageID),
            Csv(row.DisplayRating),
            Csv(FormatArenaStatRates(row.MyStatCalibrate, tableStatNames)),
            Csv(FormatArenaStatRates(row.EnemyStatCalibrate, tableStatNames))
        ));
    }
}

static void WriteArenaBotCsv(List<TableArenaBot> rows, Dictionary<string, string> text, string outPath)
{
    if (rows.Count == 0)
    {
        return;
    }

    using var sw = CreateWriter(outPath);
    sw.WriteLine("ID,ArenaNameKey,ArenaNameKo,EnemyCharacterTID,EnemyRating,EnemyTierID,PetID01,PetID02,PetID03,WeaponID,RideID");
    foreach (var row in rows.OrderBy(x => x.ID))
    {
        sw.WriteLine(string.Join(",",
            Csv(row.ID),
            Csv(row.ArenaName),
            Csv(ResolveTid(text, row.ArenaName)),
            Csv(row.EnemyCharacterTID),
            Csv(row.EnemyRating),
            Csv(row.EnemyTierID),
            Csv(row.PetID01),
            Csv(row.PetID02),
            Csv(row.PetID03),
            Csv(row.WeaponID),
            Csv(row.RideID)
        ));
    }
}

static void WriteElementsDataCsv(List<TableElementsData> rows, Dictionary<string, string> text, Dictionary<int, string> tableStatNames, string outPath)
{
    using var sw = CreateWriter(outPath);
    sw.WriteLine("ID,NameKey,NameKo,Keyword,CompatibilityTypeID1,DamageRate1,CompatibilityTypeID2,DamageRate2,CompatibilityTypeID3,DamageRate3,ElementFactor,ElementFactorName,ElementResistance,ElementResistanceName,HashtagColor");
    foreach (var row in rows.OrderBy(x => x.ID))
    {
        sw.WriteLine(string.Join(",",
            Csv(row.ID),
            Csv(row.NameTID),
            Csv(ResolveTid(text, row.NameTID)),
            Csv(row.Keyword),
            Csv(row.CompatibilityTypeID1),
            Csv(row.DamageRate1.ToString(CultureInfo.InvariantCulture)),
            Csv(row.CompatibilityTypeID2),
            Csv(row.DamageRate2.ToString(CultureInfo.InvariantCulture)),
            Csv(row.CompatibilityTypeID3),
            Csv(row.DamageRate3.ToString(CultureInfo.InvariantCulture)),
            Csv(row.ElementFactor),
            Csv(ResolveStatName(tableStatNames, row.ElementFactor)),
            Csv(row.ElementResistance),
            Csv(ResolveStatName(tableStatNames, row.ElementResistance)),
            Csv(row.HashtagColor)
        ));
    }
}

static void WriteSafetyCsv(List<TableSafety> rows, string outPath)
{
    using var sw = CreateWriter(outPath);
    sw.WriteLine("ID,Type,Params,Name,MinValue,MaxValue");
    foreach (var row in rows.OrderBy(x => x.ID))
    {
        sw.WriteLine(string.Join(",",
            Csv(row.ID),
            Csv(row.Type),
            Csv(row.Params == null ? string.Empty : string.Join("|", row.Params)),
            Csv(row.Name),
            Csv(row.MinValue.ToString(CultureInfo.InvariantCulture)),
            Csv(row.MaxValue.ToString(CultureInfo.InvariantCulture))
        ));
    }
}

static void WriteArenaSeasonCsv(List<TableArenaSeason> rows, Dictionary<string, string> text, string outPath)
{
    if (rows.Count == 0)
    {
        return;
    }

    using var sw = CreateWriter(outPath);
    sw.WriteLine("ID,SeasonNameKey,SeasonNameKo,StartDate,EndDate,ApplyDate");
    foreach (var row in rows.OrderBy(x => x.ID))
    {
        sw.WriteLine(string.Join(",",
            Csv(row.ID),
            Csv(row.SeasonName),
            Csv(ResolveTid(text, row.SeasonName)),
            Csv(FormatDateTime(row.StartDate)),
            Csv(FormatDateTime(row.EndDate)),
            Csv(FormatDateTime(row.ApplyDate))
        ));
    }
}

static void WriteRaceEventWinDefenseCsv(List<TableRaceEventWinDefense> rows, string outPath)
{
    if (rows.Count == 0)
    {
        return;
    }

    using var sw = CreateWriter(outPath);
    sw.WriteLine("ID,Group,WinStep,DefenseMetaType,DefenseMetaID,DefenseValue");
    foreach (var row in rows.OrderBy(x => x.Group).ThenBy(x => x.Win_Step).ThenBy(x => x.ID))
    {
        sw.WriteLine(string.Join(",",
            Csv(row.ID),
            Csv(row.Group),
            Csv(row.Win_Step),
            Csv(row.Defense_MetaType),
            Csv(row.Defense_MetaID),
            Csv(row.Defense_Value)
        ));
    }
}

static void WriteTableConstantCsv(TableConstant? row, string outPath)
{
    if (row == null)
    {
        return;
    }

    using var sw = CreateWriter(outPath);
    sw.WriteLine("ResolutionX,ResolutionY,HitConstant,HealthRegenTime,BossCameraNum");
    sw.WriteLine(string.Join(",",
        Csv(row.ResolutionX),
        Csv(row.ResolutionY),
        Csv(row.HitConstant),
        Csv(row.HealthRegenTime.ToString(CultureInfo.InvariantCulture)),
        Csv(row.BossCameraNum)
    ));
}

static string FormatArenaStatRates(List<ArenaTierStatRate>? rows, Dictionary<int, string> tableStatNames)
{
    if (rows == null || rows.Count == 0)
    {
        return string.Empty;
    }

    return string.Join(" | ", rows.Select(row =>
    {
        var statName = tableStatNames.TryGetValue(row.Stat, out var name) ? name : $"Stat_{row.Stat}";
        return $"{row.Stat}:{statName}:{row.Value.ToString(CultureInfo.InvariantCulture)}";
    }));
}

static string ResolveStatName(Dictionary<int, string> tableStatNames, long statId)
{
    return tableStatNames.TryGetValue((int)statId, out var name) ? name : $"Stat_{statId}";
}

static string ResolveTid(Dictionary<string, string> map, string? key)
{
    if (string.IsNullOrWhiteSpace(key))
    {
        return string.Empty;
    }

    return map.TryGetValue(key, out var value) ? value : string.Empty;
}

static StreamWriter CreateWriter(string outPath)
{
    return new StreamWriter(outPath, false, new UTF8Encoding(true));
}

static string Csv(object? value)
{
    string s = value?.ToString() ?? string.Empty;
    bool needQuote = s.Contains(',') || s.Contains('"') || s.Contains('\n') || s.Contains('\r');
    if (s.Contains('"'))
    {
        s = s.Replace("\"", "\"\"");
    }

    return needQuote ? $"\"{s}\"" : s;
}

static string FormatDateTime(DateTime? value)
{
    return value?.ToString("yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture) ?? string.Empty;
}

[MemoryPackable]
public partial class StaticInfoBase
{
    public long ID;
}

[MemoryPackable]
public partial class TableDefenseFactor : StaticInfoBase
{
    public long DefenseFactor;
}

[MemoryPackable]
public partial class TableCombatPowerDiff : StaticInfoBase
{
    public float CombatPowerDiff;
    public float DamageMultiplier;
}

[MemoryPackable]
public partial class TableStageCombatPower : StaticInfoBase
{
    public long CombatPower;
}

[MemoryPackable]
public partial class ArenaTierStatRate
{
    public int Stat;
    public float Value;
}

[MemoryPackable]
public partial class TableArenaTier : StaticInfoBase
{
    public int MatchingType;
    public int MatchingGroup;
    public int MatchingScoreMinus;
    public int MatchingScorePlus;
    public int ArenaTierScoreMin;
    public int ArenaTierScoreMax;
    public int ArenaTierRankConditionMin;
    public int ArenaTierRankConditionMax;
    public string? ArenaTierName;
    public string? ArenaTierIcon;
    public int ArenaTierResetScore;
    public long PackageID;
    public long DisplayRating;
    public List<ArenaTierStatRate>? MyStatCalibrate;
    public List<ArenaTierStatRate>? EnemyStatCalibrate;
}

[MemoryPackable]
public partial class TableArenaBot : StaticInfoBase
{
    public string? ArenaName;
    public long EnemyCharacterTID;
    public long EnemyRating;
    public long EnemyTierID;
    public long PetID01;
    public long PetID02;
    public long PetID03;
    public long WeaponID;
    public long RideID;
}

[MemoryPackable]
public partial class TableArenaSeason : StaticInfoBase
{
    public string? SeasonName;
    public DateTime StartDate;
    public DateTime EndDate;
    public DateTime ApplyDate;
}

[MemoryPackable]
public partial class TableRaceEventWinDefense : StaticInfoBase
{
    public int Group;
    public int Win_Step;
    public int Defense_MetaType;
    public int Defense_MetaID;
    public int Defense_Value;
}

[MemoryPackable]
public partial class TableElementsData : StaticInfoBase
{
    public string? NameTID;
    public int Keyword;
    public long CompatibilityTypeID1;
    public double DamageRate1;
    public long CompatibilityTypeID2;
    public double DamageRate2;
    public long CompatibilityTypeID3;
    public double DamageRate3;
    public string? Icon;
    public string? GachaPrefab;
    public long ElementFactor;
    public long ElementResistance;
    public string? HashtagColor;
}

[MemoryPackable]
public partial class TableSafety : StaticInfoBase
{
    public int Type;
    public List<int>? Params;
    public string? Name;
    public double MinValue;
    public double MaxValue;
}

[MemoryPackable]
public partial class TableConstant
{
    public int ResolutionX;
    public int ResolutionY;
    public float SfxDistance;
    public float ReturnDistance;
    public float ReturnSpeedupDistance;
    public float StoppingDistance;
    public int FormationRowCount;
    public int FormationColCount;
    public Vector2Value FormationDistance;
    public float FormationDistance_Pet;
    public int HitConstant;
    public float ReturnMoveSpeed;
    public float ReturnFollowerSpeed;
    public float HealthRegenTime;
    public float KeepAlivePacketTime;
    public float VerifySecureTokenPacketTime;
    public int BossCameraNum;
}

[MemoryPackable]
public partial class Vector2Value
{
    public float x;
    public float y;
}
