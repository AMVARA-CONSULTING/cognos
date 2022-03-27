
<h1>Question</h1>

Hello Gurus, I have recently started working with COGNOS in this year. I would like to know your ideas or suggestions to my requirement. I am currently development customer reconciliation report and there are 5 columns (DECIMAL) need to compare with Previous records. For example, I have two rows STEP 3 and STEP 4. Both rows contains 5 columns each as below.

---------------------------------------------

STEP | INV | BL | MT | WH | X

3 | 3490.78 | 767.23 | 23 | 56.45 | 9

4 | 234.45 | 767.23 | 23 | 56.23 | 9

---------------------------------------------

From above report, need to change "Conditional Styles" if STEP 3 of INV column value is different than STEP 4 of INV column value then RED. 

I can able to write Conditional Styles between columns in same row but not sure which function to use to compare STEP3.INV vs STEP4.INV. Kindly provide your suggestions or ideas here.

<h1>Answer</h1>

Create two queries (A+B) and with a new data-item "newid" containing "ceil(STEP/2)".

Query B should be filtered to "ceil(STEP/2) = STEP/2".

Then join Query A + B on the item "newid" into a new query where columns from A+B  are in one data row so Step 4 and Step 3 are in one row. Now you can compare value from INV on Step 4 with INV from Step 3 into a new data item and put conditional formatting on it.



This is my simple reporting doing so using ibmsys.sysdummy1 sql with your values.



<report xmlns="http://developer.cognos.com/schemas/report/16.0/"           useStyleVersion="11.6" expressionLocale="en">
				
				<drillBehavior/>
				<layouts>
					<layout>
						<reportPages>
							<page name="Page1">
								<style>
									<defaultStyles>
										<defaultStyle refStyle="pg"/>
									</defaultStyles>
								</style>
								<pageBody>
									<style>
										<defaultStyles>
											<defaultStyle refStyle="pb"/>
										</defaultStyles>
									</style>
									<contents><list horizontalPagination="true" refQuery="Query4" name="List1">
			
			
			
			<noDataHandler>
				<contents>
					<block>
						<contents>
							<textItem>
								<dataSource>
									<staticValue>No Data Available</staticValue>
								</dataSource>
							</textItem>
						</contents>
						<style>
							<CSS value="padding:16px;"/>
						</style>
					</block>
				</contents>
			</noDataHandler>
			<style>
				<CSS value="border-collapse:collapse"/>
				<defaultStyles>
					<defaultStyle refStyle="ls"/>
				</defaultStyles>
			</style>
		<listColumns><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="STEP"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="STEP"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="INV"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="INV"/></dataSource></textItem></contents><conditionalStyleRefs><conditionalStyleRef refConditionalStyle="Conditional Style 1"/></conditionalStyleRefs></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="BL"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="BL"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="MT"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="MT"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="WH"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="WH"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="X"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="X"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="Data Item1"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="Data Item1"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="Data Item2"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="Data Item2"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="B_STEP"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="B_STEP"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="B_INV"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="B_INV"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="B_BL"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="B_BL"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="B_MT"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="B_MT"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="B_WH"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="B_WH"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="B_X"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="B_X"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="B_Data Item1"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="B_Data Item1"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="B_Data Item2"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="B_Data Item2"/></dataSource></textItem></contents></listColumnBody></listColumn><listColumn><listColumnTitle><style><defaultStyles><defaultStyle refStyle="lt"/></defaultStyles></style><contents><textItem><dataSource><dataItemLabel refDataItem="Data Item3"/></dataSource></textItem></contents></listColumnTitle><listColumnBody><style><defaultStyles><defaultStyle refStyle="lm"/></defaultStyles></style><contents><textItem><dataSource><dataItemValue refDataItem="Data Item3"/></dataSource></textItem></contents><conditionalStyleRefs><conditionalStyleRef refConditionalStyle="Conditional Style 1"/></conditionalStyleRefs></listColumnBody></listColumn></listColumns><conditionalStyles><conditionalStyleCases refVariable="Boolean1"><conditionalStyle refVariableValue="1"/></conditionalStyleCases><conditionalStyleDefault/></conditionalStyles></list></contents>
								</pageBody>
							<XMLAttributes><XMLAttribute output="no" name="RS_legacyDrillDown" value="0"/></XMLAttributes></page>
						</reportPages>
					</layout>
				</layouts>
			<XMLAttributes><XMLAttribute output="no" name="RS_CreateExtendedDataItems" value="true"/><XMLAttribute output="no" name="listSeparator" value=","/><XMLAttribute output="no" name="decimalSeparator" value="."/><XMLAttribute output="no" name="RS_modelModificationTime" value="2020-08-18T08:16:03.093Z"/></XMLAttributes><queries><query name="Query1"><source><sqlQuery name="SQL1" dataSource="QSUSERDS">
			<sqlText>select 3 as STEP, &apos;3490.78&apos; as INV, &apos;767.23&apos; as BL, &apos;56,45&apos; as MT, &apos;23&apos; as WH, &apos;9&apos; as X from sysibm.sysdummy1


UNION ALL


select 4 as STEP, &apos;234.45&apos; as INV, &apos;767.23&apos; as BL, &apos;56,45&apos; as MT, &apos;23&apos; as WH, &apos;9&apos; as X from sysibm.sysdummy1




UNION ALL


select 5 as STEP, &apos;234.45&apos; as INV, &apos;167.23&apos; as BL, &apos;56,45&apos; as MT, &apos;23&apos; as WH, &apos;9&apos; as X from sysibm.sysdummy1
</sqlText>
		<mdProjectedItems><mdProjectedItem name="STEP"/><mdProjectedItem name="INV"/><mdProjectedItem name="BL"/><mdProjectedItem name="MT"/><mdProjectedItem name="WH"/><mdProjectedItem name="X"/></mdProjectedItems></sqlQuery></source><selection><dataItem name="STEP"><expression>[SQL1].[STEP]</expression></dataItem><dataItem name="INV"><expression>[SQL1].[INV]</expression></dataItem><dataItem name="BL"><expression>[SQL1].[BL]</expression></dataItem><dataItem name="MT"><expression>[SQL1].[MT]</expression></dataItem><dataItem name="WH"><expression>[SQL1].[WH]</expression></dataItem><dataItem name="X"><expression>[SQL1].[X]</expression></dataItem></selection></query><query name="Query2">
			<source>
				
			<queryRef refQuery="Query1"/></source>
			<selection><dataItem name="STEP"><expression>[Query1].[STEP]</expression></dataItem><dataItem name="INV"><expression>[Query1].[INV]</expression></dataItem><dataItem name="BL"><expression>[Query1].[BL]</expression></dataItem><dataItem name="MT"><expression>[Query1].[MT]</expression></dataItem><dataItem name="WH"><expression>[Query1].[WH]</expression></dataItem><dataItem name="X"><expression>[Query1].[X]</expression></dataItem><dataItem name="Data Item1"><expression>ceil([STEP]/2) </expression></dataItem><dataItem name="Data Item2"><expression>[STEP]/2</expression></dataItem></selection>
		</query><query name="Query3">
			<source>
				
			<queryRef refQuery="Query1"/></source>
			<selection><dataItem name="B_STEP"><expression>[Query1].[STEP]</expression></dataItem><dataItem name="B_INV"><expression>[Query1].[INV]</expression></dataItem><dataItem name="B_BL"><expression>[Query1].[BL]</expression></dataItem><dataItem name="B_MT"><expression>[Query1].[MT]</expression></dataItem><dataItem name="B_WH"><expression>[Query1].[WH]</expression></dataItem><dataItem name="B_X"><expression>[Query1].[X]</expression></dataItem><dataItem name="B_Data Item1"><expression>ceil([B_STEP]/2) </expression></dataItem><dataItem name="B_Data Item2"><expression>[B_STEP]/2</expression></dataItem></selection>
		<detailFilters><detailFilter><filterExpression>ceil([B_STEP]/2) &lt;&gt; [B_STEP]/2</filterExpression></detailFilter></detailFilters></query><query name="Query4">
			<source>
				
			<joinOperation>
			<joinOperands>
				<joinOperand cardinality="1:1"><queryRef refQuery="Query2"/></joinOperand>
				<joinOperand cardinality="1:1"><queryRef refQuery="Query3"/></joinOperand>
			</joinOperands>
			<joinFilter>
				<filterExpression>[Query2].[Data Item1] = [Query3].[B_Data Item1]</filterExpression>
			</joinFilter>
		</joinOperation></source>
			<selection><dataItem name="STEP"><expression>[Query2].[STEP]</expression></dataItem><dataItem name="INV"><expression>[Query2].[INV]</expression></dataItem><dataItem name="BL"><expression>[Query2].[BL]</expression></dataItem><dataItem name="MT"><expression>[Query2].[MT]</expression></dataItem><dataItem name="WH"><expression>[Query2].[WH]</expression></dataItem><dataItem name="X"><expression>[Query2].[X]</expression></dataItem><dataItem name="Data Item1"><expression>[Query2].[Data Item1]</expression></dataItem><dataItem name="Data Item2"><expression>[Query2].[Data Item2]</expression></dataItem><dataItem name="B_STEP"><expression>[Query3].[B_STEP]</expression></dataItem><dataItem name="B_INV"><expression>[Query3].[B_INV]</expression></dataItem><dataItem name="B_BL"><expression>[Query3].[B_BL]</expression></dataItem><dataItem name="B_MT"><expression>[Query3].[B_MT]</expression></dataItem><dataItem name="B_WH"><expression>[Query3].[B_WH]</expression></dataItem><dataItem name="B_X"><expression>[Query3].[B_X]</expression></dataItem><dataItem name="B_Data Item1"><expression>[Query3].[B_Data Item1]</expression></dataItem><dataItem name="B_Data Item2"><expression>[Query3].[B_Data Item2]</expression></dataItem><dataItem name="Data Item3"><expression>[Query2].[INV] = [Query3].[B_INV]</expression></dataItem></selection>
		</query></queries><reportVariables><reportVariable type="boolean" name="Boolean1">
			<reportExpression>[Query4].[INV] = [Query4].[B_INV]</reportExpression>
			<variableValues>
				<variableValue value="1"/>
			</variableValues>
		</reportVariable></reportVariables><classStyles><classStyle name="GuidedLayoutLeftPadding"><CSS value="padding-left:5px;border-top-width:1px;border-bottom-width:1px;border-left-width:1px;border-right-width:1px"/></classStyle><classStyle name="GuidedLayoutTopPadding"><CSS value="padding-top:5px;border-top-width:1px;border-bottom-width:1px;border-left-width:1px;border-right-width:1px"/></classStyle><classStyle name="GuidedLayoutRightPadding"><CSS value="padding-right:5px;border-top-width:1px;border-bottom-width:1px;border-left-width:1px;border-right-width:1px"/></classStyle><classStyle name="GuidedLayoutBottomPadding"><CSS value="padding-bottom:5px;border-top-width:1px;border-bottom-width:1px;border-left-width:1px;border-right-width:1px"/></classStyle><classStyle name="GuidedLayoutMargin"><CSS value="margin-bottom:10px"/></classStyle></classStyles><modelPath>/content/package[@name=&apos;MIF_DASHBOARD&apos;]/model[@name=&apos;model&apos;]</modelPath><reportName>Conditional Formatting between rows</reportName><namedConditionalStyles><advancedConditionalStyle name="Conditional Style 1"><styleCases><styleCase><style><CSS value="background-color:green"/></style><reportCondition>[Query4].[INV] = [Query4].[B_INV]</reportCondition></styleCase><styleCase><style><CSS value="background-color:fuchsia"/></style><reportCondition>[Query4].[B_INV]&lt;&gt;[Query4].[INV]</reportCondition></styleCase></styleCases><styleDefault><style><CSS value="background-color:red"/></style></styleDefault></advancedConditionalStyle></namedConditionalStyles></report>




See data:


| STEP | 	INV	| BL| 	MT| 	WH| 	X| 	Data Item1| 	Data Item2| 	B_STEP| 	B_INV| 	B_BL| 	B_MT| 	B_WH| 	B_X	| B_Data Item1| 	B_Data Item2| 	Data Item3| 
| 3	| 3490.78	| 767.23| 	56,45| 	23| 	9| 	2| 	1.5| 	3| 	3490.78| 	767.23| 	56,45| 	23| 	9| 	2| 	1.5	1| 
| 4	| 234.45	| 767.23| 	56,45| 	23| 	9| 	2| 	2 | 	3| 	3490.78| 	767.23| 	56,45| 	23| 	9| 	2| 	1.5	0| 
| 5 | 	234.45	| 167.23| 	56,45| 	23| 	9| 	3| 	2.5| 	5| 	234.45| 	167.23| 	56,45| 	23| 	9| 	3| 	2.5	1| 

Report Screenshot

<img src="report_with_conditional_formatting/2022-03-27 16_02_46-New report.png"></img>


