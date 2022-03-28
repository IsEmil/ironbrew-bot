using IronBrew2.Bytecode_Library.Bytecode;
using IronBrew2.Bytecode_Library.IR;

namespace IronBrew2.Obfuscator.Opcodes
{
	public class OpEq : VOpcode
	{
		public override bool IsInstruction(Instruction instruction) =>
			instruction.OpCode == Opcode.Eq && instruction.A == 0 && instruction.B <= 255 && instruction.C <= 255;

		public override string GetObfuscated(ObfuscationContext context) =>
			"if(Stk[Inst[OP_A]]==Stk[Inst[OP_C]])then InstrPoint=InstrPoint+1;else InstrPoint=Inst[OP_B];end;";
		
		public override void Mutate(Instruction instruction)
		{
			instruction.A  = instruction.B;

			instruction.B = instruction.PC + instruction.Chunk.Instructions[instruction.PC + 1].B + 2;
			instruction.InstructionType = InstructionType.AsBxC;
		}
	}
	
	public class OpEqB : VOpcode
	{
		public override bool IsInstruction(Instruction instruction) =>
			instruction.OpCode == Opcode.Eq && instruction.A == 0 && instruction.B > 255 && instruction.C <= 255;

		public override string GetObfuscated(ObfuscationContext context) =>
			"if(Inst[OP_A] == Stk[Inst[OP_C]]) then InstrPoint = InstrPoint+1;else InstrPoint=Inst[OP_B];end;";
		
		public override void Mutate(Instruction instruction)
		{
			instruction.A  = instruction.B - 255;

			instruction.B = instruction.PC + instruction.Chunk.Instructions[instruction.PC + 1].B + 2;
			instruction.InstructionType = InstructionType.AsBxC;
			instruction.ConstantMask |= InstructionConstantMask.RA;
		}
	}
	
	public class OpEqC : VOpcode
	{
		public override bool IsInstruction(Instruction instruction) =>
			instruction.OpCode == Opcode.Eq && instruction.A == 0 && instruction.B <= 255 && instruction.C > 255;

		public override string GetObfuscated(ObfuscationContext context) =>
			"if(Stk[Inst[OP_A]] == Inst[OP_C])then InstrPoint=InstrPoint+1;else InstrPoint=Inst[OP_B];end;";

		public override void Mutate(Instruction instruction)
		{
			instruction.A  = instruction.B;
			instruction.C -= 255;

			instruction.B = instruction.PC + instruction.Chunk.Instructions[instruction.PC + 1].B + 2;
			instruction.InstructionType = InstructionType.AsBxC;
			instruction.ConstantMask |= InstructionConstantMask.RC;
		}
	}
	
	public class OpEqBC : VOpcode
	{
		public override bool IsInstruction(Instruction instruction) =>
			instruction.OpCode == Opcode.Eq && instruction.A == 0 && instruction.B > 255 && instruction.C > 255;

		public override string GetObfuscated(ObfuscationContext context) =>
			"if(Inst[OP_A] == Inst[OP_C]) then InstrPoint=InstrPoint+1;else InstrPoint=Inst[OP_B];end;";

		public override void Mutate(Instruction instruction)
		{
			instruction.A  = instruction.B - 255;
			instruction.C -= 255;

			instruction.B = instruction.PC + instruction.Chunk.Instructions[instruction.PC + 1].B + 2;
			instruction.InstructionType = InstructionType.AsBxC;
			instruction.ConstantMask |= InstructionConstantMask.RA | InstructionConstantMask.RC;
		}
	}
}